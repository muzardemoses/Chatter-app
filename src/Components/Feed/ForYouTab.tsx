/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { Post } from "."


export const ForYouTab = () => {
    const [posts, setPosts] = useState<any[]>([]);

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


    return (
        <div className='flex flex-col justify-center'>
            <div className="flex flex-col gap-14 w-full">
                {posts
                    .sort((a, b) => b.timestamp - a.timestamp) // Sort posts in descending order based on timestamp
                    .map((post) => (
                        <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                    ))}
            </div>
        </div>
    );
};
