import { useState, useRef, useEffect } from 'react'
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
import { toast } from 'react-toastify'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom'
import useAutosizeTextArea from '../../Hooks/useAutoSizeTextArea';
import addSVG from '../../assets/Svg/Feed/outline-add.svg'
import closeSVG from '../../assets/Svg/Feed/outline-close.svg'
import imageSVG from '../../assets/Svg/Feed/image-outline.svg'
import videoSVG from '../../assets/Svg/Feed/video-outline.svg'



export const CreateContent = () => {
    const loggedInUser = useSelector(selectUser);

    const [showMediaOptions, setShowMediaOptions] = useState(false)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const titleRef = useRef<HTMLTextAreaElement>(null)

    useAutosizeTextArea(titleRef.current, title)



    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([]);
    const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const openImagePicker = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const openVideoPicker = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
    };



    const postId = `${loggedInUser?.id}-${Date.now()}`;
    const timestamp = serverTimestamp();

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imageFiles.length + videoFiles.length + e.target.files!.length > 4 || mediaPreviewUrls.length + e.target.files!.length > 4) {
            toast.error("You can only upload 4 media files at a time");
            return;
        }
        const files = Array.from(e.target.files || []);
        const previewUrls: string[] = [];
        const newFiles: File[] = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                previewUrls.push(reader.result as string);
                if (previewUrls.length === files.length) {
                    setMediaPreviewUrls([...mediaPreviewUrls, ...previewUrls]);
                }
            };
            reader.readAsDataURL(file);
            newFiles.push(file);
        });

        setImageFiles([...imageFiles, ...newFiles]);
    };

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imageFiles.length + videoFiles.length + e.target.files!.length > 4 || mediaPreviewUrls.length + e.target.files!.length > 4) {
            toast.error("You can only upload 4 media files at a time");
            return;
        }
        const files = Array.from(e.target.files || []);
        const previewUrls: string[] = [];
        const newFiles: File[] = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                previewUrls.push(reader.result as string);
                if (previewUrls.length === files.length) {
                    setMediaPreviewUrls([...mediaPreviewUrls, ...previewUrls]);
                }
            };
            reader.readAsDataURL(file);
            newFiles.push(file);
        });

        setVideoFiles([...videoFiles, ...newFiles]);
    };

    const cancelMediaFile = (index: number) => {
        const updatedPreviewUrls = [...mediaPreviewUrls];
        updatedPreviewUrls.splice(index, 1);
        setMediaPreviewUrls(updatedPreviewUrls);

        if (index < imageFiles.length) {
            const updatedImageFiles = [...imageFiles];
            updatedImageFiles.splice(index, 1);
            setImageFiles(updatedImageFiles);
        } else {
            const updatedVideoFiles = [...videoFiles];
            const videoIndex = index - imageFiles.length;
            updatedVideoFiles.splice(videoIndex, 1);
            setVideoFiles(updatedVideoFiles);
        }
    };


    const createPost = async () => {
        const postRef = doc(db, "posts", postId);

        // Upload media files and get their download URLs
        const imageDownloadUrls = await Promise.all(
            imageFiles.map(async (file) => {
                const imageRef = ref(storage, `images/${postId}/${file.name}`);
                await uploadBytes(imageRef, file);
                const downloadUrl = await getDownloadURL(imageRef);
                return downloadUrl;
            })
        );

        // Upload video files and get their download URLs
        const videoDownloadUrls = await Promise.all(
            videoFiles.map(async (file) => {
                const videoRef = ref(storage, `videos/${postId}/${file.name}`);
                await uploadBytes(videoRef, file);
                const downloadUrl = await getDownloadURL(videoRef);
                return downloadUrl;
            })
        );

        //if title and content is empty
        if (title.trim() === "" || content.trim() === "") {
            toast.error("Title and content cannot be empty");
            return;
        }

        await setDoc(postRef, {
            id: postId,
            title: title,
            content: content,
            media: {
                images: imageDownloadUrls,
                videos: videoDownloadUrls,
            },
            authorId: loggedInUser?.id,
            authorName: loggedInUser?.displayName,
            timestamp: timestamp,
            likes: [],
            comments: [],
            shares: [],
            views: [],
            isDeleted: false,
            bookmarkedBy: [],
        });
        setTitle("")
        setContent("")
        setImageFiles([])
        setVideoFiles([])
        setMediaPreviewUrls([])
        toast.success("Post created successfully")
    }

    return (
        <div className="h-full p-8">
            <div className="w-full h-full pt-9 pl-16 pr-36 border border-gray-300 rounded-lg flex flex-col gap-10">
                <button
                    onClick={createPost}
                    className="self-end bg-blue-700 text-white w-36 py-4 rounded-lg text-base font-medium">
                    Publish
                </button>
                <div className="w-full flex gap-9">
                    <div className='mt-9 h-max w-24 flex flex-col items-center gap-7'>
                        <button className='p-2 border border-gray-300 rounded-full'
                            onClick={() => setShowMediaOptions(!showMediaOptions)}
                        >
                            <img src={showMediaOptions ? closeSVG : addSVG}
                                alt={showMediaOptions ? "close" : "add"}
                                className={`w-9 h-9 transform transition-transform duration-500 ${showMediaOptions ? "rotate-0" : "rotate-90"}`}
                            />
                        </button>
                        {showMediaOptions &&
                            <div className='flex flex-col items-center h-full gap-7'>
                                {/* <p className='h-full border-l border-gray-200'></p> */}
                                <label htmlFor="image-input">
                                    <button
                                        onClick={openImagePicker}
                                        className='p-4 border border-blue-600 rounded-full h-max w-max'>
                                        <img
                                            src={imageSVG}
                                            alt="image"
                                            className="w-6 h-6"
                                        />
                                    </button>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={imageInputRef}
                                    onChange={handleImageFileChange}
                                    className="hidden"
                                    id="image-input"
                                    multiple
                                />
                                <label htmlFor="video-input">
                                    <button
                                        onClick={openVideoPicker}
                                        className='p-4 border border-blue-600 rounded-full h-max w-max'>
                                        <img
                                            src={videoSVG}
                                            alt="video"
                                            className="w-6 h-6"
                                        />
                                    </button>
                                </label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    ref={videoInputRef}
                                    onChange={handleVideoFileChange}
                                    className="hidden"
                                    id="video-input"
                                    multiple
                                />



                            </div>
                        }
                    </div>
                    <div className={`w-full flex flex-col gap-4 ${showMediaOptions ? "" : ""}`}>
                        <div className="flex  gap-4">
                            {mediaPreviewUrls.map((url, index) => (
                                <div key={index} className={`h-80 relative object-cover rounded-lg ${mediaPreviewUrls.length === 1 ? "w-[40%]" : mediaPreviewUrls.length === 2 ? "w-[50%]" : mediaPreviewUrls.length === 3 ? "w-full" : ""}`}>

                                    <div className='relative'>
                                        {url.includes("image") && (
                                            <img
                                                src={url}
                                                alt={`Preview ${index}`}
                                                className=' h-80 object-cover rounded-lg'
                                            />
                                        )}
                                    </div>
                                    <div>
                                        {url.includes("video") && (
                                            <video
                                                src={url}
                                                className="h-80 object-cover rounded-lg w-96"
                                                controls
                                            />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => cancelMediaFile(index)}
                                        className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hiddn"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <textarea
                            rows={1}
                            maxLength={100}
                            minLength={10}
                            required
                            placeholder="Title"
                            value={title}
                            ref={titleRef}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-none px-4 text-[40px] font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out overflow-hiden resize-none"
                        />
                        <textarea
                            minLength={100}
                            required
                            placeholder="Write your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-96 border-none px-4 text-xl font-normal focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

