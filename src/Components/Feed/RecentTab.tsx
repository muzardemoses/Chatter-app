import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Config/userSlice';
import { selectUsers } from '../../Config/usersSlice';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { Post } from "."

export const RecentTab = () => {
    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);

    const getAuthorProfile = (authorId: string) => {
        const author = users.find((user) => user.id === authorId);
        return author;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <div>
                {posts.map((post) => (
                    <Post key={post.id} post={post}  posts={posts} setPosts={setPosts} />
                ))}
            </div>
        </div>
    )
}