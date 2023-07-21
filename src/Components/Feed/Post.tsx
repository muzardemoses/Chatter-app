/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    formatByInitialTime,
    readTime,
    handleLikePost,
    //handleUnlikePost,
    handleBookmark
} from '../../Hooks';
import { selectUser } from '../../Config/userSlice';
import { selectUsers } from "../../Config/usersSlice";
import { db } from "../../Config/firebase";
import readSVG from '../../assets/Svg/Feed/read.svg';
import devAvatar from '../../Images/Profile/avatar-default.png';
import loveBeforeSVG from '../../assets/Svg/Feed/love-before.svg';
import loveAfterSVG from '../../assets/Svg/Feed/love-after.svg';
import bookmarkBeforeSVG from '../../assets/Svg/Feed/bookmark-before.svg';
import bookmarkAfterSVG from '../../assets/Svg/Feed/bookmark-after.svg';
import commentSVG from '../../assets/Svg/Feed/comment.svg';
import analyticsSVG from '../../assets/Svg/Feed/analytics.svg';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'


export const Post = ({ post, posts, setPosts }: { post: any, posts: any[], setPosts: any }) => {
    const navigate = useNavigate();
    const reduxUser = useSelector(selectUser);
    // const [storageUser, setStorageUser] = useState<any>(null);

    // useEffect(() => {
    //     if (localStorage.getItem("user") !== undefined && localStorage.getItem("user") !== null) {
    //         setStorageUser(JSON.parse(localStorage.getItem("user") || '{}'))
    //     }
    // }, [])

    const loggedInUser = reduxUser

    const users = useSelector(selectUsers);
    const postRef = useRef<HTMLDivElement>(null);
    const [hasViewedP, setHasViewedP] = useState<boolean>(false);

    const postId = post.id;

    const getAuthorProfile = (authorId: string) => {
        const author = users.find((user) => user.id === authorId);
        return author;
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setHasViewedP(true);
                    observer.unobserve(entry.target);
                    updatePostViews(post.id);
                }
            });
        }, observerOptions);

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => {
            if (postRef.current) {
                observer.unobserve(postRef.current);
            }
        };
    }, [post.id]);

    const updatePostViews = async (postId: string) => {
        try {
            const postRef = doc(db, 'posts', postId);
            const hasViewed = post.analytics.viewers.includes(loggedInUser?.id);
            const updatedAnalytics = {
                views: hasViewedP ? post.analytics.views : post.analytics.views + 1,
                viewers: loggedInUser?.id
                    ? hasViewed
                        ? [...post.analytics.viewers]
                        : [...post.analytics.viewers, loggedInUser?.id]
                    : [...post.analytics.viewers], // If no user is logged in, keep the viewers array unchanged
                visits: post.analytics.visits,
                visitors: post.analytics.visitors,
            };
            await updateDoc(postRef, {
                analytics: updatedAnalytics,
            });

            // setPosts(
            //     posts.map((post) => {
            //         if (post.id === postId) {
            //             return {
            //                 ...post,
            //                 analytics: updatedAnalytics,
            //             };
            //         }
            //         return post;
            //     })
            // );
            // console.log('Post views updated' + post.analytics.views);
        } catch (error) {
            //console.log(loggedInUser?.id);
            console.log('Error updating post views:', error);
        }
    };

    return (
        <div ref={postRef} className="flex flex-col gap-5 border border-gray-300 p-5 rounded-md shadow md:p-4 sm:p-3">
            <div className='flex gap-3'>
                <img
                    src={getAuthorProfile(post.authorId)?.photoURL || devAvatar}
                    alt="" className="w-16 h-16 rounded-full md:w-14 md:h-14 sm:w-12 sm:h-12"
                />
                <div className='flex flex-col gap-1 md:gap-0.5'>
                    <p className="text-gray-900 text-xl font-semibold sm:text-lg">
                        {getAuthorProfile(post.authorId)?.displayName}
                    </p>
                    <p className="text-gray-500 sm:text-sm">
                        {formatByInitialTime(post.timestamp.seconds * 1000)}
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-6 md:gap-5'>
                <Link to={`/content/${post.id}`} className='flex flex-col gap-1.5 md:gap-1 sm:gap-0.5'>
                    <h3 className="text-black text-2xl font-bold md:text-[21px] sm:text-[20px]">
                        {post.title}
                    </h3>
                    <div className='flex gap-2'>
                        <img
                            src={readSVG}
                            alt="edit"
                            className="h-6 w-6 sm:h-5 sm:w-5"
                        />
                        <p className="text-gray-500 text-sm sm:text-[13px]">
                            {readTime(post.content)}
                        </p>
                    </div>
                </Link>
                <div className='flex flex-col gap-3 md:gap-2'>
                    <Link to={`/content/${post.id}`}>
                        {/* <p className="text-gray-500">
                                            {post.content && post.content.slice(0, 200)}...
                                        </p> */}
                        <div
                            className="prose prose-lg xl:prose-lg md:prose-base">
                            <ReactMarkdown children={post.content.slice(0, 150) + '...'} remarkPlugins={[remarkGfm]}
                            />
                        </div>
                    </Link>
                    { }
                    <div className=''>
                        {
                            post.media.images.length + post.media.videos.length === 1 ? (

                                <div className=''>
                                    {post.media.images.map((image: string | undefined, index: number) => (
                                        <img
                                            key={index}
                                            src={image} alt="" className="w-full max-h-[400px] object-cover rounded-md"

                                        />
                                    ))}
                                    {post.media.videos.map((video: string | undefined, index: number) => (
                                        <video
                                            key={index}
                                            src={video} className="w-full max-h-[400px] object-cover rounded-md"
                                        />
                                    ))}

                                </div>
                            ) : post.media.images.length + post.media.videos.length === 2 ? (
                                <div className='flex gap-2'>
                                    {post.media.images.map((image: string | undefined, index: number) => (
                                        <img
                                            key={index}
                                            src={image} alt="" className="w-1/2 h object-cover rounded-md"
                                        />
                                    ))}
                                    {post.media.videos.map((video: string | undefined, index: number) => (
                                        <video
                                            key={index}
                                            src={video} className='w-1/2 h object-cover rounded-md' />
                                    ))}
                                </div>
                            ) : post.media.images.length + post.media.videos.length === 3 ? (
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        {post.media.images.length === 3 && (
                                            <div className="flex gap-2">
                                                {post.media.images.slice(0, 2).map((image: string | undefined, index: number) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt=""
                                                        className="w-1/2 h object-cover rounded-md"
                                                    />
                                                ))}

                                            </div>
                                        )}

                                        {post.media.videos.length === 3 && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {post.media.videos.slice(0, 2).map((video: string | undefined, index: number) => (
                                                    <video
                                                        key={index}
                                                        src={video}
                                                        className="w-1/2 h object-cover rounded-md"
                                                    />
                                                ))}

                                            </div>
                                        )}

                                        {post.media.images.length === 2 && (
                                            <div className="flex gap-2">
                                                {post.media.images.map((image: string | undefined, index: number) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt=""
                                                        className="w-1/2 h object-cover rounded-md"
                                                    />
                                                ))}

                                            </div>
                                        )}

                                        {post.media.videos.length === 2 && (
                                            <div className="flex gap-2">

                                                {post.media.videos.map((video: string | undefined, index: number) => (
                                                    <video
                                                        key={index}
                                                        src={video}
                                                        className="w-1/2 h object-cover rounded-md"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-full'>
                                        {post.media.images.length === 1 && (

                                            <img
                                                src={post.media.images[0]}
                                                alt=""
                                                className="w-full max-h-[400px] object-cover rounded-md"
                                            />

                                        )}

                                        {post.media.videos.length === 1 && (
                                            <video
                                                src={post.media.videos[0]}
                                                className="w-full max-h-[400px] object-cover rounded-md"
                                            />
                                        )}

                                        {post.media.images.length === 3 && (
                                            <img
                                                src={post.media.images[2]}
                                                alt=""
                                                className="w-full max-h-[400px] object-cover rounded-md"
                                            />
                                        )}

                                        {post.media.videos.length === 3 && (
                                            <video
                                                src={post.media.videos[2]}
                                                className="w-full max-h-[400px] object-cover rounded-md"
                                            />
                                        )}
                                    </div>

                                </div>
                            ) : <div className='grid grid-flow-row grid-cols-2 gap-2'>
                                {post.media.images.map((image: string | undefined, index: number) => (
                                    <img
                                        key={index}
                                        src={image} alt="" className="w-full h object-cover rounded-md"
                                    />
                                ))}
                                {post.media.videos.map((video: string | undefined, index: number) => (
                                    <video
                                        key={index}
                                        src={video} className='w-full h object-cover rounded-md' />
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4 px-3 border-t border-gray-200 md:px-2 sm:px-0">
                <div className='flex items-center gap-1'>
                    <button
                        onClick={() => {
                            if (loggedInUser) {
                                handleLikePost(post, loggedInUser, setPosts);
                            } else {
                                // Redirect the user to the login page
                                navigate('/login');
                            }
                        }}
                        className="text-blue-500 hover:text-blue-700">
                        <img
                            src={post.likes.includes(loggedInUser?.id) ? loveAfterSVG : loveBeforeSVG}
                            alt="love"
                            className={`h-6 w-6  ${post.likes.includes(loggedInUser?.id) ? 'sm:h-6 sm:w-6' : 'sm:h-5 sm:w-5'} `}
                        />
                    </button>
                    {post.likes.length > 0 && (
                        <p className="text-blue-950">
                            {post.likes.length}
                        </p>)
                    }

                </div>

                <Link to={`/content/${post.id}`} className='flex items-center gap-2 cursor-pointer sm:gap-1'>
                    <img
                        src={commentSVG}
                        alt="comment"
                        className="h-5 w-5 sm:h-4 sm:w-4"
                    />
                    <p className=''>

                    </p>
                    <button className="text-gray-500 font-semibold hover:text-gray-700 sm:text-[15px]">
                        {post.comments.length > 0 && (
                            <span className="text-gray-700 mr-1">
                                {post.comments.length}
                            </span>
                        )}
                        Comments
                    </button>
                </Link>
                <div className='flex items-center gap-2'>
                    {/* <button onClick={() => handleUnlikePost(post, loggedInUser, setPosts)}
                        className="text-red-500 hover:text-red-700 sm:text-[15px]">
                        Unlike
                    </button> */}
                    <button onClick={() => {
                        if (loggedInUser) {
                            handleBookmark(postId, loggedInUser, setPosts, posts,)
                        } else {
                            // Redirect the user to the login page
                            navigate('/login');
                        }
                    }}>
                        {Array.isArray(post.bookmarkedBy) && post.bookmarkedBy.includes(loggedInUser?.id) ? (
                            <img src={bookmarkAfterSVG} alt="bookmark" className="h-6 w-6 sm:h-5 sm:w-5" />
                        ) : (
                            <img src={bookmarkBeforeSVG} alt="bookmark" className="h-6 w-6 sm:h-5 sm:w-5" />
                        )}
                    </button>
                    <button className="flex items-center gap-1 borer border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100 sm:gap-1 sm:px-1 sm:py-0">
                        <img src={analyticsSVG} alt="analytics" className="h-5 w-5 sm:h-4 sm:w-4" />
                        <p className="text-gray-500 font-semibold hover:text-gray-700 sm:text-[15px]">
                            {post.analytics.views}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};