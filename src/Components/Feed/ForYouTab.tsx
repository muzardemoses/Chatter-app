import { useEffect, useState } from 'react';
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


export const ForYouTab = () => {
    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);

    const getAuthorProfile = (authorId: string) => {
        const author = users.find((user) => user.id === authorId);
        return author;
    };
    const [posts, setPosts] = useState<any[]>([]);

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
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postData = querySnapshot.docs.map((doc) => doc.data());
                setPosts(postData);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);



    const handleLike = async (postId: string) => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            likes: [...posts.find((post) => post.id === postId)?.likes, loggedInUser?.id],
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

    return (
        <div className='flex flex-col justify-center items-center'>

            <ul className="flex flex-col gap-14">
                {posts.map((post) => (
                    <li key={post.id} className="w-[700px] flex flex-col gap-3 borer border-gray-300 p-5 rounded-md shadow">
                        <div className='flex gap-3'>
                            <img
                                src={getAuthorProfile(post.authorId)?.photoURL || devAvatar}
                                alt="" className="w-16 h-16 rounded-full"
                            />
                            <div className='flex flex-col gap-1'>
                                <p className="text-gray-900 text-xl font-semibold">
                                    {getAuthorProfile(post.authorId)?.displayName}
                                </p>
                                <p className="text-gray-500">
                                    {formatDate(post.timestamp.seconds * 1000)}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-1.5'>
                                <h3 className="text-black text-2xl font-bold">
                                    {post.title}
                                </h3>
                                <div className='flex gap-2'>
                                    <img
                                        src={readSVG}
                                        alt="edit"
                                        className="h-6 w-6"
                                    />
                                    <p className="text-gray-500 text-sm">
                                        {readTime(post.content)}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className="text-gray-500">
                                    {post.content}
                                </p>
                                { }
                                <div>
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
                                                        src={image} alt="" className="w-full h object-cover rounded-md"
                                                    />
                                                ))}
                                                {post.media.videos.map((video: string | undefined, index: number) => (
                                                    <video
                                                        key={index}
                                                        src={video} className='w-full h object-cover rounded-md' />
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



                        <div className="flex justify-between pt-4 px-3 border-t border-gray-200">
                            <div className='flex items-center gap-1'>
                                <button onClick={() => handleLike(post.id)} className="text-blue-500 hover:text-blue-700">
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
                                <button onClick={() => handleUnlike(post.id)} className="text-red-500 hover:text-red-700 ml-4">
                                    Unlike
                                </button>
                                <img
                                    src={bookmarkBeforeSVG}
                                    alt="bookmark"
                                    className="h-6 w-8"
                                />
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};
