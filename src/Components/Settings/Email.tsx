/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import {
    auth, db, updateEmail,
} from '../../Config/firebase'
import { EmailModalTwo, GoogleModalTwo, TwitterModalTwo, GitHubModalTwo } from '../../ReUsable';


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
    const [gitHubModal, setGitHubModal] = useState(false)

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
                    if (currentUser.providerData.some((data: any) => data.providerId === 'password')) {
                        setEmailModal(true)
                    } else if (currentUser.providerData.some((data: any) => data.providerId === 'google.com')) {
                        setGoogleModal(true)
                    } else if (currentUser.providerData.some((data: any) => data.providerId === 'twitter.com')) {
                        setTwitterModal(true)
                    } else if (currentUser.providerData.some((data: any) => data.providerId === 'github.com')) {
                        setGitHubModal(true)
                    }
                }
                setUpdateEmailLoading(false)
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
                <EmailModalTwo currentUser={currentUser} existingEmail={existingEmail} password={password} setPassword={setPassword} setEmailModal={setEmailModal} setShowEmailInfo={setShowEmailInfo} />
            )}
            {googleModal && (
                <GoogleModalTwo currentUser={currentUser} existingEmail={existingEmail} setGoogleModal={setGoogleModal} setShowEmailInfo={setShowEmailInfo} />
            )}
            {twitterModal && (
                <TwitterModalTwo currentUser={currentUser} existingEmail={existingEmail} setTwitterModal={setTwitterModal} setShowEmailInfo={setShowEmailInfo} />
            )}
            {gitHubModal && (
                <GitHubModalTwo currentUser={currentUser} existingEmail={existingEmail} setGitHubModal={setGitHubModal} setShowEmailInfo={setShowEmailInfo} />
            )}
        </div>
    )
}