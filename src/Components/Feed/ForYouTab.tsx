/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { Post } from "."
import { Link } from 'react-router-dom';


export const ForYouTab = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center'>
            {posts.length === 0 ? (
                <div className='flex justify-center flex-col items-center h-[400px] gap-5'>
                    <h4 className='text-3xl font-semibold text-gray-900'>
                        No posts yet
                        <span className='ml-2 text-2xl font-semibold text-gray-900'>
                            😢
                        </span>
                    </h4>
                    <p className='text-gray-500 text-center'>
                        Posts from different creators will appear here
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
                <div className="flex flex-col gap-14 w-full">
                    {posts
                        .sort((a, b) => b.timestamp - a.timestamp) // Sort posts in descending order based on timestamp
                        .map((post) => (
                            <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                        ))}
                </div>
            )}
        </div>
    );
};
