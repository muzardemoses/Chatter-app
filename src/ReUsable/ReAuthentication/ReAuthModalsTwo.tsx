/* eslint-disable @typescript-eslint/no-explicit-any */
//This is the one used for email and password in settings
import { handleAutoSignInWithGitHubTwo, handleAutoSignInWithGoogleTwo, handleAutoSignInWithTwitterTwo, handleSignInWithEmailTwo } from "../../Hooks";


const EmailModalTwo = ({ currentUser, existingEmail, password, setPassword, setEmailModal, setShowEmailInfo }: { currentUser: any, existingEmail: string, password: string, setPassword: any, setEmailModal: any, setShowEmailInfo: any }) => {
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
                        onClick={() => handleSignInWithEmailTwo(currentUser, existingEmail, password, setEmailModal, setShowEmailInfo)}
                    >
                        Confirm to continue
                    </button>
                </div>
            </div>
        </div>
    )
}

const GoogleModalTwo = ({ currentUser, existingEmail, setGoogleModal, setShowEmailInfo }: { currentUser: any, existingEmail: string, setGoogleModal: any, setShowEmailInfo: any }) => {
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
                        onClick={() => handleAutoSignInWithGoogleTwo(currentUser, existingEmail, setGoogleModal, setShowEmailInfo)}
                    >
                        Re-authenticate with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

const TwitterModalTwo = ({ currentUser, existingEmail, setTwitterModal, setShowEmailInfo }: { currentUser: any, existingEmail: string, setTwitterModal: any, setShowEmailInfo: any}) => {
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
                        onClick={() => handleAutoSignInWithTwitterTwo(currentUser, existingEmail, setTwitterModal, setShowEmailInfo)}
                    >
                        Re-authenticate with Twitter
                    </button>
                </div>
            </div>
        </div>
    )
}

const GitHubModalTwo = ({ currentUser, existingEmail, setGitHubModal, setShowEmailInfo }: { currentUser: any, existingEmail: string, setGitHubModal: any, setShowEmailInfo: any }) => {
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
                        onClick={() => handleAutoSignInWithGitHubTwo(currentUser, existingEmail, setGitHubModal, setShowEmailInfo)}
                    >
                        Re-authenticate with GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}

export {
    EmailModalTwo,
    GoogleModalTwo,
    TwitterModalTwo,
    GitHubModalTwo
}
