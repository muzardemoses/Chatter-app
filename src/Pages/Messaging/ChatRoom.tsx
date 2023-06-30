import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { selectUsers } from '../../Config/usersSlice';
import { useEffect, useRef, useState } from 'react';
import {
    serverTimestamp,
    setDoc,
    doc,
    collection,
    query,
    where,
    addDoc,
    getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../Config/firebase';


export const ChatRoom = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const loggedInUser = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const { routeId } = useParams<{ routeId: string }>();
    const idOne = routeId?.split("-")[0];
    const idTwo = routeId?.split("-")[1];
    const otherUserid = loggedInUser?.id === idOne ? idTwo : idOne;
    const chatUser = users.find((user) => user.id === otherUserid);


    //still under construction so go to feed
    useEffect(() => {
        navigate("/feed");
    }, [navigate]);

    useEffect(() => {
        if (loggedInUser) {
            setIsLoading(false); // Set loading state to false once user data is available
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (!isLoading && loggedInUser?.id !== idOne && loggedInUser?.id !== idTwo) {
            navigate("/messages");
        }
    }, [isLoading, loggedInUser, idOne, idTwo, navigate]);

    const [message, setMessage] = useState("");
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    interface ImageData {
        imageURL: string;
    }
    const [imageData, setImageData] = useState<ImageData | null>({ imageURL: "" });

    const openImagePicker = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        const chatId = idOne && idTwo ? (idOne < idTwo ? `${idOne}-${idTwo}` : `${idTwo}-${idOne}`) : "";
        console.log(chatId);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
                setShowImagePreview(true);
            };

            reader.readAsDataURL(file);
            setUploadImageFile(file);
        }
    };

    const cancelImageUpload = () => {
        setImagePreview("");
        setShowImagePreview(false);
        setUploadImageFile(null);
        setImageData(null);

    };

    const sendMessage = async () => {
        if (uploadImageFile) {
            const chatId = idOne && idTwo ? (idOne < idTwo ? `${idOne}-${idTwo}` : `${idTwo}-${idOne}`) : "";
            const storageRef = ref(storage, `chatImages/${chatId}/${uploadImageFile.name}`);
            const snapShot = await uploadBytes(storageRef, uploadImageFile);
            //remember to remove this console.log
            console.log(snapShot);
            const downloadURL = await getDownloadURL(storageRef);
                
            setImageData({ imageURL: downloadURL });
        }
        if (!message && !imageData?.imageURL) return;

        const chatId = idOne && idTwo ? (idOne < idTwo ? `${idOne}-${idTwo}` : `${idTwo}-${idOne}`) : "";

        const chatsRef = collection(db, "chats");
        const chatQuery = query(chatsRef, where("chatId", "==", chatId));
        const chatQuerySnapshot = await getDocs(chatQuery);

        let chatDocRef;
        if (chatQuerySnapshot.empty) {
            chatDocRef = doc(chatsRef);
            const chatData = {
                chatId,
                conversants: [idOne, idTwo],
            };
            await setDoc(chatDocRef, chatData);
        } else {
            chatDocRef = chatQuerySnapshot.docs[0].ref;
        }

        const messagesRef = collection(chatDocRef, "messages");
        const senderId = loggedInUser?.id;
        const receiverId = otherUserid;
        const senderName = loggedInUser?.displayName;
        const receiverName = chatUser?.displayName;
        const timestamp = serverTimestamp();
        const messageData = {
            senderId,
            receiverId,
            senderName,
            receiverName,
            text: message || null,
            imageURL: imageData?.imageURL || null,
            timestamp,
        };

        await addDoc(messagesRef, messageData);

        setMessage("");
        setImageData(null);
        setImagePreview("");
        setShowImagePreview(false);
        setUploadImageFile(null);
    };

    return (
        <div className="flex flex-col items-center bg-slate-300 w-full relative "
            style={{ height: "calc(100vh - 80px)" }}
        >
            <div className='w-full bg-white border border-gray-300 sticky top-0 h-10'>
                <h1>header</h1>
            </div>
            <div className='overflow-y-scroll w-full'
                style={{ height: "calc(100vh - 40px)" }}>
                <form
                    action=""
                    className="pt-10 flex flex-col items-center justify-center bg-pink-50 gap-5 p-5 "
                >

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-[400px] pl-10 p-2.5 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    />

                    <div className=''>
                        <button
                            type="button"
                            onClick={openImagePicker}
                            className="inline-flex justify-center p-2 text-purple-600 rounded-full cursor-pointer hover:text-purple-900 hover:bg-purple-100 transition duration-300 ease-in-out"
                        >
                            Upload
                        </button>
                        <input
                            type="file"
                            ref={imageInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {showImagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-40 h-40 rounded-lg object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={cancelImageUpload}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5"
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={sendMessage}
                        className={`inline-flex justify-center p-2 text-white rounded-full cursor-pointer ${!message && !showImagePreview
                            ? "bg-gray-300"
                            : "bg-purple-600 hover:bg-purple-900"
                            } transition duration-300 ease-in-out`}
                    >
                        Send
                    </button>

                    <div className="flex flex-col items-center justify-center gap-5 h-96 bg-white p-1">
                        <p className='h-16 bg-slate-500'>
                            {chatUser?.displayName} - {chatUser?.id}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 py-20"
                    >
                        jdjjiei
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 h-96">
                        jjjjjj
                    </div> <div className="flex flex-col items-center justify-center gap-5 h-96">
                        jjjjjj
                    </div> <div className="flex flex-col items-center justify-center gap-5 h-96">
                        jjjjjj
                    </div>

                </form>
            </div>
        </div>
    );
};