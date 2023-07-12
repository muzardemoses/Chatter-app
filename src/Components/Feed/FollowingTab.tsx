/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { Post } from "."

export const FollowingTab = () => {

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
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-col gap-14">
                {/* Sort posts if loggedInUser is following the post's author */}
                {posts.map((post) => (
                    <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                ))}
            </div>
        </div>
    )
}