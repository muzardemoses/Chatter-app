/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import {
    auth, db, updateEmail,
    signInWithEmailAndPassword, googleProvider,
    twitterProvider, githubProvider,
    signInWithPopup
} from '../../Config/firebase'


export const Email = () => {
    const currentUser = auth.currentUser
    const user = useSelector(selectUser)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [existingEmail, setExistingEmail] = useState('')
    const [showEmailInfo, setShowEmailInfo] = useState(false)

    const [emailModal, setEmailModal] = useState(false)
    const [googleModal, setGoogleModal] = useState(false)
    const [twitterModal, setTwitterModal] = useState(false)
    const [githubModal, setGithubModal] = useState(false)

    const [updateEmailLoading, setUpdateEmailLoading] = useState(false)

    useEffect(() => {
        if (user && currentUser) {
            setExistingEmail(user.email)
        }
    }, [user, currentUser])

    const handleUpdateEmail = async () => {
        if (currentUser) {
            setUpdateEmailLoading(true)
            try {
                await updateEmail(currentUser, email)

                const userRef = doc(db, 'users', currentUser.uid)
                await updateDoc(userRef, {
                    email: email
                })
                setShowEmailInfo(false)
                setEmail('')
                setUpdateEmailLoading(false)
                alert('Email updated successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
                if (error.code === 'auth/requires-recent-login') {
                    setShowEmailInfo(true)
                    //Console.log the user provider
                    //console.log(currentUser.providerData[0].providerId)
                    if (currentUser.providerData[0].providerId === 'password') {
                        setEmailModal(true)
                    } else if (currentUser.providerData[0].providerId === 'google.com') {
                        setGoogleModal(true)
                        // googleProvider.setCustomParameters({ login_hint: existingEmail });
                        // return signInWithPopup(auth, googleProvider)
                    } else if (currentUser.providerData[0].providerId === 'twitter.com') {
                        setTwitterModal(true)
                    } else if (currentUser.providerData[0].providerId === 'github.com') {
                        setGithubModal(true)
                    }
                }
                setUpdateEmailLoading(false)
            }
        }
    }

    const handleLogin = async () => {
        if (currentUser) {
            try {
                await signInWithEmailAndPassword(auth, existingEmail, password)
                setShowEmailInfo(true)
                setEmailModal(false)
                alert('Password confirmed successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
            }
        }
    }

    const handleAutoSignInWithGoogle = async () => {
        if (currentUser) {
            try {
                googleProvider.setCustomParameters({ login_hint: existingEmail });
                await signInWithPopup(auth, googleProvider)
                setShowEmailInfo(true)
                setGoogleModal(false)
                alert('Re-authenticated with Google successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
            }
        }
    }

    const handleAutoSignInWithTwitter = async () => {
        if (currentUser) {
            try {
                twitterProvider.setCustomParameters({ login_hint: existingEmail });
                await signInWithPopup(auth, twitterProvider)
                setShowEmailInfo(true)
                setTwitterModal(false)
                alert('Re-authenticated with Twitter successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
            }
        }
    }

    const handleAutoSignInWithGithub = async () => {
        if (currentUser) {
            try {
                githubProvider.setCustomParameters({ login_hint: existingEmail });
                await signInWithPopup(auth, githubProvider)
                setShowEmailInfo(true)
                setGithubModal(false)
                alert('Re-authenticated with Github successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
            }
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-2.5'>
                <h3 className='text-2xl font-medium text-black'>
                    Email {" "}
                    <span className='text-base text-fuchsia-600 font-light'>
                        ({existingEmail})
                    </span>
                </h3>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm text-gray-600'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                            placeholder='Enter new email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {showEmailInfo && (
                        <div className='flex flex-col gap-0.5 mt-1'>
                            <div className='flex items-center gap-2'>
                                <p className='h-2 w-2 bg-blue-800 rounded-full'></p>
                                <p className="text-sm text-blue-600">
                                    You were asked to confirm your password or re-authenticate your account because you are required to do so before changing your email
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='h-2 w-2 bg-green-800 rounded-full'></p>
                                <p className="text-sm text-green-700">
                                    You can proceed to change your email
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='h-2 w-2 bg-blue-800 rounded-full'></p>
                                <p className="text-sm text-blue-700">
                                    If the email did not change, reload the page and try again
                                </p>
                            </div>
                        </div>
                    )}
                    <button
                        className={`w-max h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out ${updateEmailLoading && 'opacity-50'}`}
                        onClick={handleUpdateEmail}
                    >
                        {updateEmailLoading ? 'Updating...' : 'Update Email'}
                    </button>
                </div>
            </div>
            {emailModal && (
                <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center">
                    <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Comfirm your password to continue
                        </h3>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm text-gray-600">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <button
                                className="w-full h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                                onClick={handleLogin}
                            >
                                Confirm to continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {googleModal && (
                <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center">
                    <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Re-authenticate your Google account to continue
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-600">
                                Click the button below to re-authenticate your Google account
                            </p>
                            <button
                                className="w-full h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                                onClick={handleAutoSignInWithGoogle}
                            >
                                Re-authenticate with Google
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {twitterModal && (
                <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center">
                    <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Re-authenticate your Twitter account to continue
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-600">
                                Click the button below to re-authenticate your Twitter account
                            </p>
                            <button
                                className="w-full h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                                onClick={handleAutoSignInWithTwitter}
                            >
                                Re-authenticate with Twitter
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {githubModal && (
                <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center">
                    <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Re-authenticate your Github account to continue
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-600">
                                Click the button below to re-authenticate your Github account
                            </p>
                            <button
                                className="w-full h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                                onClick={handleAutoSignInWithGithub}
                            >
                                Re-authenticate with Github
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}