import { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import {
    doc,
    updateDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../Config/firebase.js";
import { toast } from "react-toastify";


export const MoreProfile = () => {
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user?.username);
            setBio(user?.bio);
            setLocation(user?.location);
            setWebsite(user?.website);
            setFacebook(user?.socials?.facebook);
            setTwitter(user?.socials?.twitter);
            setInstagram(user?.socials?.instagram);
            setLinkedin(user?.socials?.linkedin);
            setGithub(user?.socials?.github);
            setYoutube(user?.socials?.youtube);
        }
    }, [user]);

    const updateUserDetails = async () => {
        if (user) {
            setLoading(true);
            try {
                const docRef = doc(db, "users", user.id);

                if (username === "") {
                    toast.error("Username cannot be empty");
                    setUsername(user.username);
                    setLoading(false);
                    return;
                }

                if (bio && bio.trim().length > 160) {
                    toast.error("Bio cannot be more than 160 characters");
                    setLoading(false);
                    return;
                }

                // Check if username is taken
                if (username !== user.username) {

                    const q = query(collection(db, "users"), where("username", "==", username));

                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.size > 0) {
                        alert("Username is taken");
                        setUsername(user.username);
                        setLoading(false);
                        return;
                    }
                }

                await updateDoc(docRef, {
                    username,
                    bio: bio ? bio : "",
                    location: location ? location : "",
                    website: website ? website : "",
                    socials: {
                        facebook: facebook ? facebook : "",
                        twitter: twitter ? twitter : "",
                        instagram: instagram ? instagram : "",
                        linkedin: linkedin ? linkedin : "",
                        github: github ? github : "",
                        youtube: youtube ? youtube : "",
                    },
                });

                alert("Profile updated successfully");
                setLoading(false);
            } catch (error) {
                console.log(error);
                alert("Error updating profile");
                setLoading(false);
            }

        }
    }

    const cancelUpdate = () => {
        if (user) {
            setUsername(user?.username);
            setBio(user?.bio);
            setLocation(user?.location);
            setWebsite(user?.website);
            setFacebook(user?.socials?.facebook);
            setTwitter(user?.socials?.twitter);
            setInstagram(user?.socials?.instagram);
            setLinkedin(user?.socials?.linkedin);
            setGithub(user?.socials?.github);
            setYoutube(user?.socials?.youtube);
        }
    }

    return (
        <div className="flex gap-8 mb-12">
            <div className="w-max">
                <h5 className="text-gray-700 font-medium text-sm">Public profile</h5>
                <p className="text-gray-600 font-normal text-sm w-max">
                    Update your public profile information.
                </p>
            </div>
            <form
                className="flex flex-col border border-gray-200 rounded-xl shadow-sm bg-white w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    updateUserDetails();
                }}
            >
                <div className="flex flex-col p-6 gap-6">
                    <label htmlFor="username" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Username</p>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />

                    </label>
                    <label htmlFor="bio" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Bio</p>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself"
                            className="w-[80%] pl-3.5 h-32 border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:border-blue-300 focus:border focus:shadow-purple-100 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out"
                        />
                    </label>
                    <label htmlFor="location" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Location</p>
                        <input
                            id="location"
                            type="text"
                            placeholder="California, US"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="website" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Website</p>
                        <input
                            id="website"
                            type="text"
                            placeholder="https://example.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <h5 className="font-semibold text-gray-900 text-base">
                        Social Media Links
                    </h5>
                    <label htmlFor="facebook" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Facebook Profile</p>
                        <input
                            id="facebook"
                            type="text"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="https://facebook.com/username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="twitter" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Twitter Profile</p>
                        <input
                            id="twitter"
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="https://twitter.com/username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="instagram" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Instagram Profile</p>
                        <input
                            id="instagram"
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="https://instagram.com/username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="linkedin" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">LinkedIn Profile</p>
                        <input
                            id="linkedin"
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://www.linkedin.com/in/username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="github" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Github Profile</p>
                        <input
                            id="github"
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="https://github.com/username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                    <label htmlFor="youtube" className="flex flex-col gap-1.5 relative">
                        <p className="text-sm font-medium text-gray-700">Youtube Profile</p>
                        <input
                            id="youtube"
                            type="text"
                            value={youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                            placeholder="https://youtube.com/@username"
                            className="w-[80%] pl-3.5 text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                        />
                    </label>
                </div>
                <div className="flex gap-3 py-4 pr-6 border-t border-gray-200 justify-end">
                    <button className="px-4 h-10 self-end bg-blue-700 text-white rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out"
                        onClick={() => cancelUpdate()}
                        type="button">
                        Cancel
                    </button>
                    <button
                        className={`flex items-center gap-3 justify-center text-black bg-white px-4 h-11  rounded-lg border border-gray-300 text-base font-[600] shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100disabled:cursor-not-allowed transition duration-500 ease-in-out ${loading ? 'opacity-50' : ""}`}
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </form >
        </div >
    )
}