import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Config/userSlice'
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
import addSVG from '../../assets/Svg/Feed/outline-add.svg'
import closeSVG from '../../assets/Svg/Feed/outline-close.svg'
import imageSVG from '../../assets/Svg/Feed/image-outline.svg'
import videoSVG from '../../assets/Svg/Feed/video-outline.svg'



export const CreateContent = () => {
    const loggedInUser = useSelector(selectUser);

    const [showMediaOptions, setShowMediaOptions] = useState(false)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [image, setImage] = useState<File | null>(null)
    return (
        <div className="h-full p-8">
            <div className="w-full h-full pt-9 pl-20 pr-36 border border-gray-300 rounded-lg flex flex-col gap-10">
                <button className="self-end bg-blue-700 text-white w-36 py-4 rounded-lg text-base font-medium">
                    Publish
                </button>
                <div className="w-full flex gap-9">
                    <div className='mt-9 h-32 w-max flex items-center gap-7'>
                        <button className='p-2 border border-gray-300 rounded-full'
                            onClick={() => setShowMediaOptions(!showMediaOptions)}
                        >
                            <img src={showMediaOptions ? closeSVG : addSVG}
                                alt={showMediaOptions ? "close" : "add"}
                                className={`w-9 h-9 transform transition-transform duration-500 ${showMediaOptions ? "rotate-0" : "rotate-90"}`}
                            />
                        </button>
                        {showMediaOptions &&
                            <div className='flex items-center h-full gap-7'>
                                <p className='h-full border-l border-gray-200'></p>
                                <button className='p-4 border border-blue-600 rounded-full h-max w-max'>
                                    <img src={imageSVG}
                                        alt="image"
                                        className="w-6 h-6"
                                    />
                                </button>
                                <button className='p-4 border border-blue-600 rounded-full h-max w-max'>
                                    <img src={videoSVG}
                                        alt="video"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>}
                    </div>
                    <div className={`w-full flex flex-col gap-3 ${showMediaOptions ? "hidden" : "block"}`}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-24 border-none px-4 text-5xl font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out"
                        />
                        <textarea
                            placeholder="Write your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-96 border-none px-4 text-xl font-normal focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}