/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, updateProfile } from "../../Config/firebase";
import { uploadImage } from "../../Config/firebaseStorage";
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import devAvatar from "../../Images/Profile/avatar-default.png";
import downloadCloudSVG from "../../assets/Svg/Profile/download-cloud.svg";
import closeSVG from "../../assets/Svg/Profile/close.svg";


export const EditProfile = () => {
    const currentUser = auth.currentUser;
    const navigate = useNavigate()
    const user = useSelector(selectUser);
    const [displayName, setDisplayName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoURL, setPhotoURL] = useState(devAvatar);


    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate])

    useEffect(() => {
        setDisplayName(user?.displayName || "");
        setFirstName(user?.displayName?.split(" ")[0] || "");
        setLastName(user?.displayName?.split(" ")[1] || "");
        if (currentUser) {
            setPhotoURL(user?.photoURL || devAvatar);
        }
    }, [currentUser, user])

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const [photo, setPhoto] = useState<any>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1000000) {
                alert("File size must be less than 1MB");
                return;
            }
            setPhoto(file);
            createImagePreview(file);
        } else {
            setPhoto(null);
        }
    }

    const createImagePreview = (file: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Ensure reader.result is a string or provide a default value (empty string)
            const resultString = reader.result as string;
            setPhotoURL(resultString);
        };
        reader.readAsDataURL(file);
    };

    // useEffect(() => {
    //     const imagePreview = (file: any) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             // Ensure reader.result is a string or provide a default value (empty string)
    //             const resultString = reader?.result ?? "";
    //             setPhotoURL(resultString as string);
    //         };
    //         reader.readAsDataURL(file);
    //     };
    //     setCreateImagePreview(imagePreview);
    // }, []);

    const handleImageClick = async () => {
        if (currentUser) {
            setLoading(true);
            await uploadImage(photo, currentUser);
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                photoURL: photoURL,
            });
            //save to redux not yet implemented
            setModal(false);
            alert("Profile picture updated successfully");
            console.log(currentUser.photoURL)
            setLoading(false);
        }
    }


    const updateDetails = async () => {
        if (currentUser) {
            try {
                //setLoading(true);
                await updateProfile(currentUser, {
                    displayName: `${firstName} ${lastName}`,
                });

                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    displayName: `${firstName} ${lastName}`,
                });

                //setLoading(false);
                alert("Profile updated successfully");
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className="relative">
            <div
                className="w-full absolute top-0 z-10 h-60 bg-gradient-to-br from-purple-500 via-fuchsia-400 to-green-300"
            ></div>
            <div className="w-full relative pt-[195px] flex flex-col gap-20 px-8 z-20">
                <div className="flex justify-between">
                    <div className="flex gap-8">
                        <img src={user?.photoURL ? user?.photoURL : devAvatar}
                            alt="avatar"
                            className="h-40 w-40 rounded-full border-4 border-white shadow-lg bg-white" />
                        <div className="mt-16">
                            <h1 className="text-3xl font-semibold text-gray-900">
                                {displayName}
                            </h1>
                            <p className="text-gray-600 text-base font-normal">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <Link to={`/${user?.username}`} className="mt-16 h-max">
                        <button className="self-end bg-blue-700 text-white w-28 h-11 rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out">
                            View Profile
                        </button>
                    </Link>
                </div>
                <div className="px-8 flex flex-col gap-5">
                    <div className="flex gap-8">
                        <div className="w-max">
                            <h5 className="text-gray-700 font-medium text-sm">Personal info</h5>
                            <p className="text-gray-600 font-normal text-sm w-max">
                                Update your photo and personal details.
                            </p>
                        </div>
                        <form className="flex flex-col border border-gray-200 rounded-xl shadow-sm bg-white w-full"
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateDetails();
                            }}
                        >
                            <div className="flex flex-col p-6 gap-6">
                                <div className="flex gap-6">
                                    <label htmlFor="firstName" className="flex flex-col gap-1.5 w-full">
                                        <p className="text-sm font-medium text-gray-700">First name</p>
                                        <input
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                                        />
                                    </label>
                                    <label htmlFor="lastName" className="flex flex-col gap-1.5 w-full">
                                        <p className="text-sm font-medium text-gray-700">Last name</p>
                                        <input
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                                        />
                                    </label>
                                </div>
                                <p className="text-sm font-medium text-gray-700 italic">Update your email in settings</p>
                                <div className="flex justify-between gap-5">
                                    <img
                                        src={user?.photoURL ? user?.photoURL : devAvatar}
                                        alt="avatar"
                                        className="h-16 w-16 rounded-full" />
                                    <div
                                        className="flex items-center flex-col gap-3 py-4 border border-dashed border-gray-200 w-full rounded-xl hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
                                        onClick={() => setModal(true)}
                                    >
                                        <div
                                            className="w-12 h-12 bg-violet-100 rounded-full text-center flex justify-center items-center border-8 border-solid border-violet-50 p-2"
                                        >
                                            <img
                                                src={downloadCloudSVG}
                                                className="h-5 w-5 m-auto"
                                                alt="upload"
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className="text-sm font-semibold text-purple-700 text-center"
                                            >
                                                Click to upload
                                            </p>
                                            <p className="text-xs font-normal text-gray-600 text-center">
                                                SVG, PNG, JPG or GIF (max. 800x400px)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex gap-3 py-4 pr-6 border-t border-gray-200 justify-end"
                            >
                                <button
                                    className="px-4 h-10 self-end bg-blue-700 text-white rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex items-center gap-3 justify-center text-blue-900 bg-white px-4 h-11  rounded-lg border border-gray-300 text-base font-[600] shadow hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100disabled:cursor-not-allowed transition duration-500 ease-in-out"
                                    type="submit"
                                >
                                    Save changes
                                </button>
                            </div>
                        </form>
                        {modal && (
                            <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center"
                                onClick={() => setModal(false)}
                            >
                                <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div
                                        className="flex justify-between items-center border-b-gray-200 border-b pb-6"
                                    >
                                        <h1 className="text-2xl font-semibold text-gray-900">
                                            Upload your photo
                                        </h1>
                                        <div>
                                            <button onClick={() => setModal(false)}
                                                className="text-gray-500 hover:text-gray-600 transition duration-500 ease-in-out"
                                            >
                                                <img src={closeSVG}
                                                    alt="close svg"
                                                    className="h-5 w-5"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <label htmlFor="upload" className="flex flex-col gap-1.5 relative">
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                                            id="photoURL"
                                            type="file"
                                            placeholder="Profile Picture"
                                            required
                                            name="photoURL"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </label>
                                    <div className="justify-self-center flex justify-center">
                                        <img
                                            src={photoURL}
                                            alt="Preview of the selected image"
                                            className="h-64 w-64 object-cover"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-5">
                                        <button
                                            className="px-4 h-10 flex items-center gap-3 justify-center text-blue-900 bg-white rounded-lg border border-gray-300 text-base font-[600] shadow hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100disabled:cursor-not-allowed transition duration-500 ease-in-out"
                                            onClick={() => setModal(false)}
                                        >
                                            Cancel upload
                                        </button>
                                        <button
                                            className={`px-4 h-10 self-end bg-blue-700 text-white rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100 transition duration-500 ease-in-out ${!photo || loading ? "opacity-50" : "hover:bg-blue-800"}`} 
                                            onClick={handleImageClick}
                                            disabled={!photo || loading}
                                            type="submit"
                                            id="upload-button"
                                        >
                                            {loading ? "Uploading..." : "Upload Image"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            </div >
        </div >
    )
}