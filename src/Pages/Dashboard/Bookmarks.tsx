//import Markdown from "markdown-to-jsx";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Config/userSlice';
import { selectUsers } from '../../Config/usersSlice';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import readSVG from '../../assets/Svg/Feed/read.svg';
import devAvatar from '../../Images/Profile/avatar-default.png';
import loveBeforeSVG from '../../assets/Svg/Feed/love-before.svg';
import loveAfterSVG from '../../assets/Svg/Feed/love-after.svg';
import bookmarkBeforeSVG from '../../assets/Svg/Feed/bookmark-before.svg';
import bookmarkAfterSVG from '../../assets/Svg/Feed/bookmark-after.svg';
import commentSVG from '../../assets/Svg/Feed/comment.svg';
import { toast } from 'react-toastify';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export const Bookmarks = () => {
    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);

    const getAuthorProfile = (authorId: string) => {
        const author = users.find((user) => user.id === authorId);
        return author;
    };

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatDate = (timestamp: any) => {
        const now = moment();
        const messageTime = moment(timestamp);
        const diffInDays = now.diff(messageTime, "days");

        // If the message is from today, show just the time
        if (diffInDays === 0) {
            return messageTime.format("h:mm A");
        }

        // If the message is from within the last 7 days, show the day of the week and time
        if (diffInDays < 7) {
            return messageTime.format("ddd h:mm A");
        }

        // Otherwise, show the full date and time
        return messageTime.format("MMM D, YYYY h:mm A");
    };

    const readTime = (content: string) => {
        // Average reading speed in words per minute
        const wordsPerMinute = 200;

        // Calculate the number of words in the content
        const wordCount = content.split(' ').length;

        // Calculate the reading time in minutes
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        return `${readingTime} min read`;
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postData = querySnapshot.docs.map((doc) => doc.data());
                setPosts(postData);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const bookmarks = posts.filter((post) => post.bookmarkedBy.includes(loggedInUser?.id));


    const handleLike = async (postId: string) => {
        const postRef = doc(db, 'posts', postId);
        const post = posts.find((post) => post.id === postId);
        await updateDoc(postRef, {
            likes: [...(post?.likes || []), loggedInUser?.id],
        });
        // Refresh the posts state to reflect the updated likes
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: [...post.likes, loggedInUser?.id] } : post
            )
        );
    };


    const handleUnlike = async (postId: string) => {
        const postRef = doc(db, 'posts', postId);
        const updatedLikes = posts.find((post) => post.id === postId)?.likes.filter((like: string | undefined) => like !== loggedInUser?.id);
        await updateDoc(postRef, {
            likes: updatedLikes,
        });
        // Refresh the posts state to reflect the updated likes
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: updatedLikes } : post
            )
        );
    };


    const handleBookmark = async (postId: string) => {
        const postIndex = posts.findIndex((post) => post.id === postId);
        const post = { ...posts[postIndex] };

        if (post.bookmarkedBy && post.bookmarkedBy.includes(loggedInUser?.id)) {
            post.bookmarkedBy = post.bookmarkedBy.filter((id: string) => id !== loggedInUser?.id);
            toast.info('Post removed from bookmarks');
        } else {
            post.bookmarkedBy.push(loggedInUser?.id);
            toast.success('Post added to bookmarks');
        }

        const updatedPosts = [...posts];
        updatedPosts[postIndex] = post;
        setPosts(updatedPosts);

        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            bookmarkedBy: post.bookmarkedBy,
        });

    };




    return (
        <div className='flex flex-col justify-center p-8 gap-16'>
            <h2 className='text-2xl font-semibold text-gray-900'>
                Bookmarks ({bookmarks.length})
            </h2>
            {loading ? (
                <p className="text-gray-900 text-xl font-semibold">Loading...</p>
            ) : (
                <ul className="flex flex-col gap-14 w-full">
                    {bookmarks.length === 0 ?
                        (<div className='flex justify-center flex-col items-center h-[400px] gap-5'>
                            <h4 className='text-3xl font-semibold text-gray-900'>
                                No bookmarks yet
                                <span className='ml-2 text-2xl font-semibold text-gray-900'>
                                    📚
                                </span>
                            </h4>
                            <p className='text-gray-500 text-center'>
                                When you bookmark a post, it will appear here.
                                <br />
                                <span >
                                    Check out posts <Link to='/feed' className='text-blue-500 hover:underline'>
                                        here
                                    </Link>.
                                </span>
                            </p>
                        </div>
                        ) : (
                            bookmarks.sort((a, b) => b.timestamp - a.timestamp) // Sort posts in descending order based on timestamp
                                .map((bookmark) => (
                                    <li key={bookmark.id} className="flex flex-col gap-5 border border-gray-300 p-5 rounded-md shadow md:p-4 sm:p-3">
                                        <div className='flex gap-3'>
                                            <img
                                                src={getAuthorProfile(bookmark.authorId)?.photoURL || devAvatar}
                                                alt="" className="w-16 h-16 rounded-full md:w-14 md:h-14 sm:w-12 sm:h-12"
                                            />
                                            <div className='flex flex-col gap-1 md:gap-0.5'>
                                                <p className="text-gray-900 text-xl font-semibold sm:text-lg">
                                                    {getAuthorProfile(bookmark.authorId)?.displayName}
                                                </p>
                                                <p className="text-gray-500 sm:text-sm">
                                                    {formatDate(bookmark.timestamp.seconds * 1000)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-6 md:gap-5'>
                                            <Link to={`/content/${bookmark.id}`} className='flex flex-col gap-1.5 md:gap-1 sm:gap-0.5'>
                                                <h3 className="text-black text-2xl font-bold md:text-[21px] sm:text-[20px]">
                                                    {bookmark.title}
                                                </h3>
                                                <div className='flex gap-2'>
                                                    <img
                                                        src={readSVG}
                                                        alt="edit"
                                                        className="h-6 w-6 sm:h-5 sm:w-5"
                                                    />
                                                    <p className="text-gray-500 text-sm sm:text-[13px]">
                                                        {readTime(bookmark.content)}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className='flex flex-col gap-3 md:gap-2'>
                                                <Link to={`/content/${bookmark.id}`}>
                                                    {/* <p className="text-gray-500">
                                            {post.content && post.content.slice(0, 200)}...
                                        </p> */}
                                                    <div
                                                        className="prose prose-lg xl:prose-lg md:prose-base">
                                                        <ReactMarkdown children={bookmark.content.slice(0, 150) + '...'} remarkPlugins={[remarkGfm]}
                                                        />
                                                    </div>
                                                </Link>
                                                { }
                                                <div className=''>
                                                    {
                                                        bookmark.media.images.length + bookmark.media.videos.length === 1 ? (

                                                            <div className=''>
                                                                {bookmark.media.images.map((image: string | undefined, index: number) => (
                                                                    <img
                                                                        key={index}
                                                                        src={image} alt="" className="w-full max-h-[400px] object-cover rounded-md"

                                                                    />
                                                                ))}
                                                                {bookmark.media.videos.map((video: string | undefined, index: number) => (
                                                                    <video
                                                                        key={index}
                                                                        src={video} className="w-full max-h-[400px] object-cover rounded-md"
                                                                    />
                                                                ))}

                                                            </div>
                                                        ) : bookmark.media.images.length + bookmark.media.videos.length === 2 ? (
                                                            <div className='flex gap-2'>
                                                                {bookmark.media.images.map((image: string | undefined, index: number) => (
                                                                    <img
                                                                        key={index}
                                                                        src={image} alt="" className="w-1/2 h object-cover rounded-md"
                                                                    />
                                                                ))}
                                                                {bookmark.media.videos.map((video: string | undefined, index: number) => (
                                                                    <video
                                                                        key={index}
                                                                        src={video} className='w-1/2 h object-cover rounded-md' />
                                                                ))}
                                                            </div>
                                                        ) : bookmark.media.images.length + bookmark.media.videos.length === 3 ? (
                                                            <div className='flex flex-col gap-2'>
                                                                <div>
                                                                    {bookmark.media.images.length === 3 && (
                                                                        <div className="flex gap-2">
                                                                            {bookmark.media.images.slice(0, 2).map((image: string | undefined, index: number) => (
                                                                                <img
                                                                                    key={index}
                                                                                    src={image}
                                                                                    alt=""
                                                                                    className="w-1/2 h object-cover rounded-md"
                                                                                />
                                                                            ))}

                                                                        </div>
                                                                    )}

                                                                    {bookmark.media.videos.length === 3 && (
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                            {bookmark.media.videos.slice(0, 2).map((video: string | undefined, index: number) => (
                                                                                <video
                                                                                    key={index}
                                                                                    src={video}
                                                                                    className="w-1/2 h object-cover rounded-md"
                                                                                />
                                                                            ))}

                                                                        </div>
                                                                    )}

                                                                    {bookmark.media.images.length === 2 && (
                                                                        <div className="flex gap-2">
                                                                            {bookmark.media.images.map((image: string | undefined, index: number) => (
                                                                                <img
                                                                                    key={index}
                                                                                    src={image}
                                                                                    alt=""
                                                                                    className="w-1/2 h object-cover rounded-md"
                                                                                />
                                                                            ))}

                                                                        </div>
                                                                    )}

                                                                    {bookmark.media.videos.length === 2 && (
                                                                        <div className="flex gap-2">

                                                                            {bookmark.media.videos.map((video: string | undefined, index: number) => (
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
                                                                    {bookmark.media.images.length === 1 && (

                                                                        <img
                                                                            src={bookmark.media.images[0]}
                                                                            alt=""
                                                                            className="w-full max-h-[400px] object-cover rounded-md"
                                                                        />

                                                                    )}

                                                                    {bookmark.media.videos.length === 1 && (
                                                                        <video
                                                                            src={bookmark.media.videos[0]}
                                                                            className="w-full max-h-[400px] object-cover rounded-md"
                                                                        />
                                                                    )}

                                                                    {bookmark.media.images.length === 3 && (
                                                                        <img
                                                                            src={bookmark.media.images[2]}
                                                                            alt=""
                                                                            className="w-full max-h-[400px] object-cover rounded-md"
                                                                        />
                                                                    )}

                                                                    {bookmark.media.videos.length === 3 && (
                                                                        <video
                                                                            src={bookmark.media.videos[2]}
                                                                            className="w-full max-h-[400px] object-cover rounded-md"
                                                                        />
                                                                    )}
                                                                </div>

                                                            </div>
                                                        ) : <div className='grid grid-flow-row grid-cols-2 gap-2'>
                                                            {bookmark.media.images.map((image: string | undefined, index: number) => (
                                                                <img
                                                                    key={index}
                                                                    src={image} alt="" className="w-full h object-cover rounded-md"
                                                                />
                                                            ))}
                                                            {bookmark.media.videos.map((video: string | undefined, index: number) => (
                                                                <video
                                                                    key={index}
                                                                    src={video} className='w-full h object-cover rounded-md' />
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4 px-3 border-t border-gray-200 md:px-2">
                                            <div className='flex items-center gap-1'>
                                                <button onClick={() => handleLike(bookmark.id)} className="text-blue-500 hover:text-blue-700">
                                                    <img
                                                        src={bookmark.likes.includes(loggedInUser?.id) ? loveAfterSVG : loveBeforeSVG}
                                                        alt="love"
                                                        className={`h-6 w-6  ${bookmark.likes.includes(loggedInUser?.id) ? 'sm:h-6 sm:w-6' : 'sm:h-5 sm:w-5'} `}
                                                    />
                                                </button>
                                                {bookmark.likes.length > 0 && (
                                                    <p className="text-blue-950">
                                                        {bookmark.likes.length}
                                                    </p>)
                                                }

                                            </div>

                                            <Link to={`/content/${bookmark.id}`} className='flex items-center gap-2 cursor-pointer sm:gap-1'>
                                                <img
                                                    src={commentSVG}
                                                    alt="comment"
                                                    className="h-5 w-5 sm:h-4 sm:w-4"
                                                />
                                                <p className=''>

                                                </p>
                                                <button className="text-gray-500 font-semibold hover:text-gray-700 sm:text-[15px]">
                                                    {bookmark.comments.length > 0 && (
                                                        <span className="text-gray-700 mr-1">
                                                            {bookmark.comments.length}
                                                        </span>
                                                    )}
                                                    Comments
                                                </button>
                                            </Link>
                                            <div className='flex items-center gap-1'>
                                                <button onClick={() => handleUnlike(bookmark.id)} className="text-red-500 hover:text-red-700 sm:text-[15px]">
                                                    Unlike
                                                </button>
                                                <button onClick={() => handleBookmark(bookmark.id)}>
                                                    {Array.isArray(bookmark.bookmarkedBy) && bookmark.bookmarkedBy.includes(loggedInUser?.id) ? (
                                                        <img src={bookmarkAfterSVG} alt="bookmark" className="h-6 w-6 sm:h-5 sm:w-5" />
                                                    ) : (
                                                        <img src={bookmarkBeforeSVG} alt="bookmark" className="h-6 w-6 sm:h-5 sm:w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                ))
                        )}
                </ul>
            )}
        </div>
    );
}