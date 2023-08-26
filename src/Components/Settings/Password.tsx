/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
// import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import {
    auth,
    updatePassword,
} from '../../Config/firebase'
import { EmailModalTwo, GoogleModalTwo, TwitterModalTwo, GitHubModalTwo } from '../../ReUsable';
import hideImg from "../../assets/Svg/Auth/Eye.svg"
import showImg from "../../assets/Svg/Auth/eye-closed.svg"


export const Password = () => {
    const currentUser = auth.currentUser
    const user = useSelector(selectUser)
    const [password, setPassword] = useState('')
    const [existingEmail, setExistingEmail] = useState('')

    //const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

    //const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [showEmailInfo, setShowEmailInfo] = useState(false)

    const [emailModal, setEmailModal] = useState(false)
    const [googleModal, setGoogleModal] = useState(false)
    const [twitterModal, setTwitterModal] = useState(false)
    const [gitHubModal, setGitHubModal] = useState(false)

    useEffect(() => {
        if (user && currentUser) {
            setExistingEmail(user.email)
        }
    }, [user, currentUser])

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("Passwords don't match")
            return
        }

        if (currentUser) {
            try {
                await updatePassword(currentUser, newPassword)
                setShowEmailInfo(false)
                setNewPassword('')
                setConfirmNewPassword('')
                alert('Password updated successfully')
            } catch (error: any) {
                console.log(error)
                alert(error.message)
                if (error.code === 'auth/requires-recent-login') {
                    setShowEmailInfo(true)
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
            }
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-8'>
                <h3 className='text-2xl font-medium text-black'>
                    Change Password
                </h3>
                <div className='flex flex-col gap-5 w-[90%]'>
                    {/* <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="password" className="text-base font-normal">
                            Current Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your current password"
                            className='w-full text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <img
                            src={showOldPassword ? hideImg : showImg} alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer md:bottom-0"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        />
                    </div> */}
                    <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="new-password" className="text-base font-normal">
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="new-password"
                            placeholder="Enter your new password"
                            className='w-full text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <img
                            src={showNewPassword ? hideImg : showImg}
                            alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer md:bottom-0"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                    </div>
                    <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="confirm-password" className="text-base font-normal">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            id="confirm-password"
                            placeholder="Confirm your new password"
                            className='w-full text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <img
                            src={showConfirmNewPassword ? hideImg : showImg}
                            alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer md:bottom-0"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        />
                    </div>
                </div>
                {showEmailInfo && (
                    <div className='flex flex-col gap-0.5 mt-1'>
                        <div className='flex items-center gap-2'>
                            <p className='h-2 w-2 bg-blue-800 rounded-full'></p>
                            <p className="text-sm text-blue-600">
                                You were asked to confirm your password or re-authenticate your account because you are required to do so before changing your password
                            </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='h-2 w-2 bg-green-800 rounded-full'></p>
                            <p className="text-sm text-green-700">
                                You can proceed to change your password
                            </p>
                        </div>
                    </div>
                )}
                <button
                    className='w-max h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out'
                    onClick={handleUpdatePassword}
                >
                    Update Password
                </button>
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