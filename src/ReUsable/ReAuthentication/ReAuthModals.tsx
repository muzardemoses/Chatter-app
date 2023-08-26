/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAutoSignInWithGitHub, handleAutoSignInWithGoogle, handleAutoSignInWithTwitter, handleSignInWithEmail } from "../../Hooks";


const EmailModal = ({ currentUser, existingEmail, password, setPassword, setEmailModal }: { currentUser: any, existingEmail: string, password: string, setPassword: any, setEmailModal: any }) => {
    return (
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
                        onClick={() => handleSignInWithEmail(currentUser, existingEmail, password, setEmailModal)}
                    >
                        Confirm to continue
                    </button>
                </div>
            </div>
        </div>
    )
}

const GoogleModal = ({ currentUser, existingEmail, setGoogleModal }: { currentUser: any, existingEmail: string, setGoogleModal: any }) => {
    return (
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
                        onClick={() => handleAutoSignInWithGoogle(currentUser, existingEmail, setGoogleModal)}
                    >
                        Re-authenticate with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

const TwitterModal = ({ currentUser, existingEmail, setTwitterModal }: { currentUser: any, existingEmail: string, setTwitterModal: any }) => {
    return (
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
                        onClick={() => handleAutoSignInWithTwitter(currentUser, existingEmail, setTwitterModal)}
                    >
                        Re-authenticate with Twitter
                    </button>
                </div>
            </div>
        </div>
    )
}

const GitHubModal = ({ currentUser, existingEmail, setGitHubModal }: { currentUser: any, existingEmail: string, setGitHubModal: any }) => {
    return (
        <div className="fixed z-50 left-0 top-0 w-full h-screen overflow-auto bg-gray-950 bg-opacity-30 flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-[#fefefe] m-auto p-6 border-[#888] w-[688px] shadow-lg rounded-xl"
            >
                <h3 className="text-2xl font-semibold text-gray-900">
                    Re-authenticate your GitHub account to continue
                </h3>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                        Click the button below to re-authenticate your GitHub account
                    </p>
                    <button
                        className="w-full h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700"
                        onClick={() => handleAutoSignInWithGitHub(currentUser, existingEmail, setGitHubModal)}
                    >
                        Re-authenticate with GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}

export {
    EmailModal,
    GoogleModal,
    TwitterModal,
    GitHubModal
}
