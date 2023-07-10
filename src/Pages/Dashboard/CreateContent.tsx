import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectUser } from '../../Config/userSlice'
import {
    serverTimestamp,
    setDoc,
    doc,
} from "firebase/firestore";
import { toast } from 'react-toastify'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../Config/firebase';
import useAutosizeTextArea from '../../Hooks/useAutoSizeTextArea';
import addSVG from '../../assets/Svg/Feed/outline-add.svg'
import closeSVG from '../../assets/Svg/Feed/outline-close.svg'
import imageSVG from '../../assets/Svg/Feed/image-outline.svg'
import videoSVG from '../../assets/Svg/Feed/video-outline.svg'

import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";



export const CreateContent = () => {
    const mdEditor = useRef<Editor>(null);
    //const [value, setValue] = useState("");
    // const handleClick = () => {
    //     if (mdEditor.current) {
    //         alert(mdEditor.current.getMdValue());
    //     }
    // };
    const handleEditorChange = ({ text }: { html: string; text: string }) => {
        //const newValue = text.replace(/\d/g, "");
        // console.log(newValue);
        setContent(text);
    };

    const navigate = useNavigate()
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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



        if (title.trim() === "" || content.trim() === "") {
            toast.error("Title and content cannot be empty");
            return;
        }

        if (title.trim().length < 6) {
            toast.error("Title must be at least 6 characters long");
            return;
        }

        if (content.trim().length < 90) {
            toast.error("Content must be at least 90 characters long");
            return;
        }

        const preservedContent = content.replace(/  +/g, '&nbsp; ');

        await setDoc(postRef, {
            id: postId,
            title: title,
            content: preservedContent,
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
        navigate(`/content/${postId}`)
    }

    return (
        <div className="min-h-screen p-8 md:p-5 sm:pt-5 sm:p-2">
            <div className="w[900px] min-h-screen py-9 px-8 border border-gray-300 rounded-lg flex flex-col gap-10 2xl:gap-7 xl:px-4 md:gap-6">
                <button
                    onClick={createPost}
                    className="self-end bg-blue-700 text-white w-36 py-4 rounded-lg text-base font-medium xl:py-3 md:w-28 md:py-2">
                    Publish
                </button>
                <div className="w-full flex gap-9 z-0 2xl:flex-col 2xl:gap-4">
                    <div className='mt-9 h-max w-24 flex flex-col items-center gap-7 2xl:flex-row 2xl:w-max 2xl:h-16 2xl:mt-6 md:gap-5 md:mt-4 sm:h-14'>
                        <button className='p-2 border border-gray-300 rounded-full'
                            onClick={() => setShowMediaOptions(!showMediaOptions)}
                        >
                            <img src={showMediaOptions ? closeSVG : addSVG}
                                alt={showMediaOptions ? "close" : "add"}
                                className={`w-9 h-9 transform transition-transform duration-500 md:w-8 md:h-8 sm:w-8 sm:h-8 ${showMediaOptions ? "rotate-0" : "rotate-90"}`}
                            />
                        </button>
                        {showMediaOptions &&
                            <div className='flex flex-col items-center h-full gap-7 2xl:flex-row md:gap-5'>
                                {/* <p className='h-full border-l border-gray-200'></p> */}
                                <label htmlFor="image-input">
                                    <button
                                        onClick={openImagePicker}
                                        className='p-4 border border-blue-600 rounded-full h-max w-max md:p-3'>
                                        <img
                                            src={imageSVG}
                                            alt="image"
                                            className="w-6 h-6 md:w-5 md:h-5"
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
                                        className='p-4 border border-blue-600 rounded-full h-max w-max md:p-3'>
                                        <img
                                            src={videoSVG}
                                            alt="video"
                                            className="w-6 h-6 md:w-5 md:h-5"
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
                    <div className={`w-full flex flex-col gap-6 h-max ${showMediaOptions ? "" : ""}`}>
                        <div className={`w-full h-max p-4 flex flex-shrink 2xl:p-2 sm:p-1 ${mediaPreviewUrls.length === 1 ? "p-8 bg-slate-50 flex flex-shrink xl:p-5" : mediaPreviewUrls.length > 1 ? " gap-4 bg-slate-50 sm:gap-1" : mediaPreviewUrls.length === 2 ? "flex flex-shrink" : mediaPreviewUrls.length === 3 ? "flex flex-shrink" :
                            mediaPreviewUrls.length === 4 ? " grid grid-cols-2 grid-flow-row" :
                                ""}`}
                            style={{
                                display: mediaPreviewUrls.length > 2 ?
                                    "grid" : "flex", gridTemplateColumns: mediaPreviewUrls.length > 2 ? "repeat(2, minmax(0, 1fr))" : "", gridAutoFlow: mediaPreviewUrls.length > 2 ? "row" : ""
                            }}
                        >
                            {mediaPreviewUrls.map((url, index) => (
                                <div key={index}
                                    className={`relative object-cover rounded-lg
                                     ${mediaPreviewUrls.length === 1 ? "" : mediaPreviewUrls.length === 2 ? "max-w-[65%]" : mediaPreviewUrls.length === 3 ? "" : ""}
                                    `}
                                >

                                    <div className='relative'>
                                        {url.includes("image") && (
                                            <img
                                                src={url}
                                                alt={`Preview ${index}`}
                                                // className={`max-h-[500px] object-cover rounded-lg ${mediaPreviewUrls.length === 1 ? "w-[95%]" : mediaPreviewUrls.length === 2 ? "w-[50%]" : mediaPreviewUrls.length === 3 ? "w-[33%]" : ""}`}
                                                className='w-full max-h-[500px] object-cover rounded-lg object-top shadow-md'
                                            />
                                        )}
                                    </div>
                                    <div>
                                        {url.includes("video") && (
                                            <video
                                                src={url}
                                                className="w-full object-cover rounded-lg object-top shadow-md"
                                            //controls
                                            />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => cancelMediaFile(index)}
                                        className="absolute top-0 right-0 w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-red-900 transition duration-500 ease-in-out"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* <div className="flex items-center gap-4">
                            <button className="bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center"
                                onClick={handleClick}
                            >
                                Get Value
                            </button>

                        </div> */}

                        {/* <textarea
                            minLength={90}
                            required
                            placeholder="Write your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-96 border-none px-4 text-xl font-normal focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out resize-none"
                        /> */}
                    </div>
                </div>
                <div className=''>
                    <textarea
                        rows={1}
                        maxLength={100}
                        minLength={6}
                        required
                        placeholder="Title"
                        value={title}
                        ref={titleRef}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-none mb-3 px-4 text-[40px] font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out overflow-hiden resize-none xl:text-4xl xl:px-2 md:text-[30px] md:mb-2 sm:text-[25px] sm:mb-1"
                    />
                </div>
                <div>
                    <Editor
                        ref={mdEditor}
                        value={content}
                        onChange={handleEditorChange}
                        renderHTML={(text) => <ReactMarkdown children={text} />}
                        style={{ minHeight: "700px" }}
                        //hide preview by default
                        loggerMaxSize={0}
                    />
                </div>
            </div>
        </div>
    )
}

