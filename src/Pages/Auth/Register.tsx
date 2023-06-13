import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import hideImg from "../../assets/Svg/Auth/Eye.svg"
import showImg from "../../assets/Svg/Auth/eye-closed.svg"
import googleSvg from "../../assets/Svg/Auth/google.svg"
import { toast } from "react-toastify"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
import { auth, createUserProfileDocument, createUserWithEmailAndPassword, EmailAuthProvider, fetchSignInMethodsForEmail, GithubAuthProvider, githubProvider, GoogleAuthProvider, googleProvider, linkWithCredential, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, UserCredential, User } from "../../Config/firebase"


export const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState("writer")


    useEffect(() => {
        // Update the display name when firstName or lastName changes
        setDisplayName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            await createUserProfileDocument(user, {
                displayName,
                email,
                userType,
            })

            await sendEmailVerification(user);
            await navigate("/verify-email")
            toast.success("Registration successful");
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = () => {
        signInWithRedirect(auth, googleProvider)
            .then((result: UserCredential) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData?.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then((result: UserCredential) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...

                console.log(errorCode, errorMessage, email, credential);
                console.log(error);

                if (error.code === "auth/account-exists-with-different-credential") {
                    const existingEmail = error.customData.email;
                    const pendingCred = credential;

                    return fetchSignInMethodsForEmail(auth, existingEmail)
                        .then((methods) => {
                            if (methods.indexOf(EmailAuthProvider.PROVIDER_ID) !== -1) {
                                const password = window.prompt(
                                    "Please provide the password for " + existingEmail
                                );
                                if (password !== null) {
                                    return signInWithEmailAndPassword(auth, existingEmail, password).then((userCredential) => userCredential.user);
                                } else {
                                    return Promise.reject("Password is required.");
                                }
                            } else if (
                                methods.indexOf(GoogleAuthProvider.PROVIDER_ID) !== -1
                            ) {
                                googleProvider.setCustomParameters({ login_hint: existingEmail });
                                return signInWithPopup(auth, googleProvider).then((result) => {
                                    return result.user;
                                })
                            } else {
                                return Promise.reject("Unsupported Login Method.");
                            }
                        })
                        .then((user) => {
                            return linkWithCredential(user, pendingCred as any);
                        })
                }
            });
    }

    return (
        <div className="pt-10 flex flex-col gap-32 w-full">
            <div>
                <NavLink to="/register" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700" : "border-b-4 border-blue-50 pb-3")}>
                    <button className="w-56 text-left text-black font-bold text-base">
                        REGISTER
                    </button>
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700" : "border-b-4 border-blue-50 pb-3")}>
                    <button className="w-56 text-left text-black font-bold text-base">
                        LOGIN
                    </button>
                </NavLink>
            </div>
            <div className="flex flex-col gap-6 items-center ">

                <h2 className=" text-4xl font-medium">
                    Register as a Writer/Reader
                </h2>

                <form className="w-full flex flex-col gap-6" onSubmit={handleRegister}>

                    <div className="flex gap-3 w-full">

                        <div className="flex flex-col gap-3 flex-grow">
                            <label htmlFor="first-name" className="text-base font-normal">
                                First name
                            </label>

                            <input type="text" name="first-name"
                                id="first-name" placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                            />
                        </div>

                        <div className="flex flex-col gap-3 flex-grow">
                            <label htmlFor="last-name" className="text-base font-normal">
                                Last name
                            </label>

                            <input type="text" name="last-name"
                                id="last-name" placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="user-type" className="text-base font-normal">
                            You are joining as?
                        </label>

                        <select name="user-type" id="user-type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-3  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500">
                            <option value="writer">
                                Writer
                            </option>
                            <option value="reader">
                                Reader
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-base font-normal">
                            Email
                        </label>

                        <input type="email" name="email"
                            id="email" placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                        />
                    </div>

                    <div className="relative flex flex-col gap-3">
                        <label htmlFor="password" className="text-base font-normal">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password" placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                        />

                        <img
                            src={showPassword ? hideImg : showImg}
                            alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="relative flex flex-col gap-3">
                        <label htmlFor="confirm-password" className="text-base font-normal">
                            Confirm Password
                        </label>

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm-password"
                            id="confirm-password" placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                        />

                        <img
                            src={showConfirmPassword ? hideImg : showImg}
                            alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>

                    <button type="submit" className="bg-blue-700 text-white font-medium text-lg rounded-lg p-3">
                        Create account
                    </button>
                    <button type="button"
                        onClick={signInWithGoogle}
                        className="bg-white text-black font-medium text-lg rounded-lg p-3 flex gap-2 items-center justify-center border border-gray-300 shadow">
                        <img src={googleSvg} alt="google" className="inline-block w-6 mr-2" />
                        Sign in with Google
                    </button>

                    <div className="flex gap-3 w-full">
                        <button type="button" className="flex-grow bg-white text-black font-medium text-lg rounded-lg p-3 flex gap-2 items-center justify-center border border-gray-300 shadow">
                            <span className=" text-blue-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </span>
                            Sign in with Twitter
                        </button>
                        <button type="button"
                            onClick={signInWithGithub}
                            className="flex-grow bg-white text-black font-medium text-lg rounded-lg p-3 flex gap-2 items-center justify-center border border-gray-300 shadow">
                            <span className=" text-black">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>

                            </span>
                            Sign in with Github
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}