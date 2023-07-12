/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../Components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Config/userSlice';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../Config/firebase';


export const Bookmarks = () => {
    const reduxUser = useSelector(selectUser);
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    const loggedInUser = reduxUser || storageUser;


    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);




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
                                .map((post) => (
                                    <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                                ))
                        )}
                </ul>
            )}
        </div>
    );
}