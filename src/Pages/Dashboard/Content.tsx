/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from 'react';
import useAutosizeTextArea from "../../Hooks/useAutoSizeTextArea";
import moment from 'moment';
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { selectUsers } from '../../Config/usersSlice';
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import readSVG from '../../assets/Svg/Feed/read.svg';
import devAvatar from '../../Images/Profile/avatar-default.png';
import loveBeforeSVG from '../../assets/Svg/Feed/love-before.svg';
import loveAfterSVG from '../../assets/Svg/Feed/love-after.svg';
import bookmarkBeforeSVG from '../../assets/Svg/Feed/bookmark-before.svg';
import bookmarkAfterSVG from '../../assets/Svg/Feed/bookmark-after.svg';
import commentSVG from '../../assets/Svg/Feed/comment.svg';
import { toast } from 'react-toastify';
import { Comment } from "../../Utils/types";






export const Content = () => {
    const { postId } = useParams<{ postId: any }>();
    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState<string>('');

    const commentRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(commentRef.current, comment)

    const getAuthorProfile = (authorId: string) => {
        const author = users.find((user) => user.id === authorId);
        return author;
    };

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
        const fetchPost = async () => {
            try {
                const postRef = doc(db, 'posts', postId);
                const postSnapshot = await getDoc(postRef);
                if (postSnapshot.exists()) {
                    const postData = postSnapshot.data();
                    setPost(postData);
                } else {
                    console.log('Post does not exist');
                }
            } catch (error) {
                console.log('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);


    if (!post) {
        return (
            <div className="py-20 flex items-center justify-center">
                <div className="w-96 h-96">Loading...</div>
            </div>
        );
    }

    const { authorId, title, content, timestamp, media, likes, bookmarkedBy, id, comments } = post;
    const authorProfile = getAuthorProfile(authorId);

    const handleLike = async () => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            likes: [...likes, loggedInUser?.id],
        });

        const updatedPost = {
            ...post,
            likes: [...likes, loggedInUser?.id],
        }
        setPost(updatedPost);

    };

    const handleUnlike = async () => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            likes: likes.filter((like: string) => like !== loggedInUser?.id),
        });

        const updatedPost = {
            ...post,
            likes: likes.filter((like: string) => like !== loggedInUser?.id),
        };
        setPost(updatedPost);
    };


    const handleBookmark = async () => {
        if (bookmarkedBy.includes(loggedInUser?.id)) {
            post.bookmarkedBy = bookmarkedBy.filter((bookmark: string) => bookmark !== loggedInUser?.id);
            toast.success('Post removed from bookmarks');
        } else {
            post.bookmarkedBy.push(loggedInUser?.id);
            toast.success('Post added to bookmarks');
        }

        const updatedPost = { ...post };
        setPost(updatedPost);

        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            bookmarkedBy: post.bookmarkedBy,
        });
    };

    const handleComment = async () => {
        if (comment.trim() === '') {
            return;
        }

        const postRef = doc(db, 'posts', id);
        const newComment = {
            readerId: loggedInUser?.id,
            content: comment,
            timestamp: timestamp,
            likes: [],
        };

        await updateDoc(postRef, {
            comments: arrayUnion(newComment),
        });

        const updatedPost = {
            ...post,
            comments: [
                ...comments,
                newComment,
            ],
        };
        setPost(updatedPost);
        setComment('');
        toast.success('Comment added');
    };



    return (
        <div className="py-20 flex items-center justify-center">
            <div className="w-[800px] flex flex-col gap-3 borer border-gray-300 p-5 rounded-md shadow">
                <div className='flex gap-3'>
                    <img
                        src={authorProfile?.photoURL || devAvatar}
                        alt="" className="w-16 h-16 rounded-full"
                    />
                    <div className='flex flex-col gap-1'>
                        <p className="text-gray-900 text-xl font-semibold">
                            {authorProfile?.displayName}
                        </p>
                        <p className="text-gray-500">
                            {formatDate(post.timestamp.seconds * 1000)}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-1.5'>
                        <h3 className="text-black text-2xl font-bold">
                            {title}
                        </h3>
                        <div className='flex gap-2'>
                            <img
                                src={readSVG}
                                alt="edit"
                                className="h-6 w-6"
                            />
                            <p className="text-gray-500 text-sm">
                                {readTime(content)}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 '>


                        { }
                        <div className="py-3 px-2">
                            {
                                media.images.length + media.videos.length === 1 ? (

                                    <div className=''>
                                        {media.images.map((image: string | undefined, index: number) => (
                                            <img
                                                key={index}
                                                src={image} alt="" className="w-full max-h-[400px] object-cover rounded-md"

                                            />
                                        ))}
                                        {media.videos.map((video: string | undefined, index: number) => (
                                            <video
                                                key={index}
                                                src={video} className="w-full max-h-[400px] object-cover rounded-md"
                                            />
                                        ))}

                                    </div>
                                ) : media.images.length + media.videos.length === 2 ? (
                                    <div className='flex gap-2'>
                                        {media.images.map((image: string | undefined, index: number) => (
                                            <img
                                                key={index}
                                                src={image} alt="" className="w-1/2 h object-cover rounded-md"
                                            />
                                        ))}
                                        {media.videos.map((video: string | undefined, index: number) => (
                                            <video
                                                key={index}
                                                src={video} className='w-1/2 h object-cover rounded-md' />
                                        ))}
                                    </div>
                                ) : media.images.length + media.videos.length === 3 ? (
                                    <div className='flex flex-col gap-2'>
                                        <div>
                                            {media.images.length === 3 && (
                                                <div className="flex gap-2">
                                                    {media.images.slice(0, 2).map((image: string | undefined, index: number) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt=""
                                                            className="w-1/2 h object-cover rounded-md"
                                                        />
                                                    ))}

                                                </div>
                                            )}

                                            {media.videos.length === 3 && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {media.videos.slice(0, 2).map((video: string | undefined, index: number) => (
                                                        <video
                                                            key={index}
                                                            src={video}
                                                            className="w-1/2 h object-cover rounded-md"
                                                        />
                                                    ))}

                                                </div>
                                            )}

                                            {media.images.length === 2 && (
                                                <div className="flex gap-2">
                                                    {media.images.map((image: string | undefined, index: number) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt=""
                                                            className="w-1/2 h object-cover rounded-md"
                                                        />
                                                    ))}

                                                </div>
                                            )}

                                            {media.videos.length === 2 && (
                                                <div className="flex gap-2">

                                                    {media.videos.map((video: string | undefined, index: number) => (
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
                                            {media.images.length === 1 && (

                                                <img
                                                    src={media.images[0]}
                                                    alt=""
                                                    className="w-full max-h-[400px] object-cover rounded-md"
                                                />

                                            )}

                                            {media.videos.length === 1 && (
                                                <video
                                                    src={media.videos[0]}
                                                    className="w-full max-h-[400px] object-cover rounded-md"
                                                />
                                            )}

                                            {media.images.length === 3 && (
                                                <img
                                                    src={media.images[2]}
                                                    alt=""
                                                    className="w-full max-h-[400px] object-cover rounded-md"
                                                />
                                            )}

                                            {media.videos.length === 3 && (
                                                <video
                                                    src={post.media.videos[2]}
                                                    className="w-full max-h-[400px] object-cover rounded-md"
                                                />
                                            )}
                                        </div>

                                    </div>
                                ) : <div className='grid grid-flow-row grid-cols-2 gap-2'>
                                    {media.images.map((image: string | undefined, index: number) => (
                                        <img
                                            key={index}
                                            src={image} alt="" className="w-full h object-cover rounded-md"
                                        />
                                    ))}
                                    {media.videos.map((video: string | undefined, index: number) => (
                                        <video
                                            key={index}
                                            src={video} className='w-full h object-cover rounded-md' />
                                    ))}
                                </div>
                            }
                        </div>
                        <p className="text-gray-500 text-lg">
                            {content}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between pt-4 px-3 border-t border-gray-200">
                    <div className='flex items-center gap-1'>
                        <button onClick={() => handleLike()} className="text-blue-500 hover:text-blue-700">
                            <img
                                src={post.likes.includes(loggedInUser?.id) ? loveAfterSVG : loveBeforeSVG}
                                alt="love"
                                className="h-6 w-6"
                            />
                        </button>
                        {post.likes.length > 0 && (
                            <p className="text-blue-950">
                                {post.likes.length}
                            </p>)
                        }

                    </div>

                    <div className='flex items-center gap-2 cursor-pointer'>
                        <img
                            src={commentSVG}
                            alt="comment"
                            className="h-5 w-5"
                        />
                        <button className="text-gray-500 font-semibold hover:text-gray-700">
                            Comment
                        </button>

                    </div>
                    <div className='flex items-center gap-1'>
                        <button onClick={() => handleUnlike()}
                            className="text-red-500 hover:text-red-700 ml-4">
                            Unlike
                        </button>
                        <button onClick={() => handleBookmark()}>
                            {Array.isArray(post.bookmarkedBy) && post.bookmarkedBy.includes(loggedInUser?.id) ? (
                                <img src={bookmarkAfterSVG} alt="bookmark" className="h-6 w-6" />
                            ) : (
                                <img src={bookmarkBeforeSVG} alt="bookmark" className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="py-10 flex flex-col gap-6 px-6">
                    <div className="flex justify-between">
                        <h2 className="text-gray-700 font-bold text-2xl">
                            Comments
                            <span className="text-gray-500 text-sm ml-2">
                                {comments.length > 0 && (
                                    <span className="text-gray-500 text-sm">
                                        ({comments.length})
                                    </span>
                                )}
                            </span>

                        </h2>
                        <button>
                            {/* follow */}
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <img
                            src={loggedInUser?.photoURL}
                            alt="profile"
                            className="h-10 w-10 rounded-full"
                        />
                        <div className="w-full flex flex-col gap-6">
                            <textarea
                                placeholder="Write a comment..."
                                value={comment}
                                ref={commentRef}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full rounded-md px-4 py-4 resize-none overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition duration-300 ease-in-out"
                            />
                            <button className="w-max bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                onClick={() => handleComment()}
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                    {comments.length > 0 && (
                        <div className="flex flex-col gap-4 pt-10">
                            {comments.map((comment: Comment, index: number) => (
                                <div key={index} className="flex flex-col gap-3 border-t border-gray-200 py-6">
                                    <div className="flex gap-4 items-center">
                                        <img
                                            src={getAuthorProfile(comment.readerId)?.photoURL}
                                            alt="profile"
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div className="w-full flex flex-col gap-1">
                                            <div className="flex justify-between">
                                                <h2 className="text-gray-700 font-bold text-lg">
                                                    {getAuthorProfile(comment.readerId)?.displayName}
                                                </h2>
                                                <button>
                                                    {/* follow */}
                                                </button>
                                            </div>
                                            <p className="text-gray-500 text-sm">
                                                {formatDate(comment.timestamp.seconds * 1000)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm px-3">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}