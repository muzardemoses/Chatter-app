import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { useState } from 'react';
import {
    serverTimestamp,
    setDoc,
    doc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";


export const ChatRoom = () => {
    const loggedInUser = useSelector(selectUser);
    const {idone, idtwo} = useParams<{idone: string, idtwo: string}>()
    const [message, setMessage] = useState('')
    const chatUser = loggedInUser?.id === idone ? idtwo : idone




    return (
        <div className="">
            room
        </div>
    )
}