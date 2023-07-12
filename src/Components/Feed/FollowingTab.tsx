/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { selectUsers } from "../../Config/usersSlice";
import { useSelector } from 'react-redux';
import { db } from '../../Config/firebase';
import { Post } from "."
import { selectUser } from '../../Config/userSlice';
import { Link } from 'react-router-dom';


export const FollowingTab = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const users = useSelector(selectUsers);
    const reduxUser = useSelector(selectUser);
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    const loggedInUser = reduxUser || storageUser;

    const getAuthorProfile = (authorId: string) => {
        return users.find((user) => user.id === authorId);
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

    const getFollowingPosts = posts.filter((post) => {
        const authorProfile = getAuthorProfile(post.authorId);
        return loggedInUser.following.includes(authorProfile?.id);
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="w-full">
            {getFollowingPosts.length === 0 ? (
                <div className='flex justify-center flex-col items-center h-[400px] gap-5'>
                    <h4 className='text-3xl font-semibold text-gray-900'>
                        No posts yet
                        <span className='ml-2 text-2xl font-semibold text-gray-900'>
                            😢
                        </span>
                    </h4>
                    <p className='text-gray-500 text-center'>
                        Follow users and topics to see posts in your feed
                        <br />
                        <span >
                            You can find users and topics to follow{' '}
                            <Link to='/feed' className='text-blue-500 hover:underline'>
                                here
                            </Link>.
                        </span>
                    </p>
                </div>
            ) : (
                <div className="min-w-[100%] flex flex-col gap-14">
                    {getFollowingPosts.sort((a, b) => b.timestamp - a.timestamp).map((post) => (
                        <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                    ))}
                </div>
            )}
        </div>
    );
};
