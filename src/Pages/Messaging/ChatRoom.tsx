import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { selectUsers } from '../../Config/usersSlice';
import { useEffect, useState } from 'react';
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
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const [message, setMessage] = useState('')
    const { chatid } = useParams<{ chatid: string }>()
    const idone = chatid?.split("-")[0]
    const idtwo = chatid?.split("-")[1]
    const otherUserid = loggedInUser?.id === idone ? idtwo : idone
    const chatUser = users.find((user) => user.id === otherUserid)

    useEffect(() => {
        if (loggedInUser) {
            setIsLoading(false); // Set loading state to false once user data is available
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (!isLoading && loggedInUser?.id !== idone && loggedInUser?.id !== idtwo) {
            navigate("/messages");
        }
    }, [isLoading, loggedInUser, idone, idtwo, navigate]);

    // console.log("loggedInUser", loggedInUser?.id)
    // console.log("chatUser", chatUser)
    // console.log("idone", idone)
    // console.log("idtwo", idtwo)

    const handleImageUpload = async (e) => {

    }

    const sendMessage = async () => {
    }

    return (
        <div className="flex flex-col items-center justify-center bg-slate-300 w-full">
            <form action="" className="flex flex-col items-center justify-center bg-pink-50 gap-5 p-5">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-[400px] pl-10 p-2.5 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
                />

                <input type="file" onChange={handleImageUpload}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-[400px] pl-10 p-2.5 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
                />
                <button type="submit" onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Send</button>
            </form>
        </div>
    )
}