/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import {
    auth
} from '../../Config/firebase'
import { Email, Password } from '../../Components';
import { EmailModal, GoogleModal, TwitterModal, GitHubModal } from '../../ReUsable';


export const EmailAndPassword = () => {
    const currentUser = auth.currentUser
    const user = useSelector(selectUser)
    const [existingEmail, setExistingEmail] = useState('')

    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(true)

    const [emailModal, setEmailModal] = useState(false)
    const [googleModal, setGoogleModal] = useState(false)
    const [twitterModal, setTwitterModal] = useState(false)
    const [gitHubModal, setGitHubModal] = useState(false)

    const [isReAuthenticated, setIsReAuthenticated] = useState(false)

    useEffect(() => {
        if (user && currentUser) {
            setExistingEmail(user.email)
            setLoading(false)
        }
    }, [user, currentUser])

    //ask user to re-login/re-authenticate on page load and stop after re-authentication
    useEffect(() => {
        if (!isReAuthenticated && currentUser) {
            //if the providerData includes a provider with the name 'password', then the user has a password
            if (currentUser && currentUser.providerData.some((data: any) => data.providerId === 'password')) {
                setEmailModal(true)
            } else if (currentUser && currentUser.providerData.some((data: any) => data.providerId === 'google.com')) {
                setGoogleModal(true)
            } else if (currentUser && currentUser.providerData.some((data: any) => data.providerId === 'twitter.com')) {
                setTwitterModal(true)
            } else if (currentUser && currentUser.providerData.some((data: any) => data.providerId === 'github.com')) {
                setGitHubModal(true)
            }
            setIsReAuthenticated(true)
        }
    }, [currentUser, isReAuthenticated])

    return (
        <div>
            {loading ?
                (
                    <div className='flex justify-center items-center py-20'>
                        <div className='w-10 h-10 border-4 border-blue-600 rounded-full animate-spin'></div>
                    </div>
                ) : (

                    <div className='flex flex-col gap-16 py-20 px-8'>
                        <Email />
                        <p className="bg-gray-200 h-px"></p>
                        <Password />

                        {emailModal && (

                            <EmailModal currentUser={currentUser} existingEmail={existingEmail} password={password} setPassword={setPassword} setEmailModal={setEmailModal} />

                        )}
                        {googleModal && (
                            <GoogleModal currentUser={currentUser} existingEmail={existingEmail} setGoogleModal={setGoogleModal} />
                        )}
                        {twitterModal && (
                            <TwitterModal currentUser={currentUser} existingEmail={existingEmail} setTwitterModal={setTwitterModal} />
                        )}
                        {gitHubModal && (
                            <GitHubModal currentUser={currentUser} existingEmail={existingEmail} setGitHubModal={setGitHubModal} />
                        )}
                    </div>
                )
            }
        </div >
    )
}