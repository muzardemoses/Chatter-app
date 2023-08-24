// import { useEffect, useState } from 'react'
// import { doc, updateDoc } from 'firebase/firestore'
// import { useSelector } from "react-redux";
// import { selectUser } from "../../Config/userSlice";
// import {
//     auth, db, updateEmail,
//     //updatePassword,
//     signInWithEmailAndPassword, googleProvider,
//     twitterProvider, githubProvider,
//     //GoogleAuthProvider, signInWithRedirect,
//     signInWithPopup
// } from '../../Config/firebase'

export const Password = () => {
    return (
        <div>
            <div className='flex flex-col gap-8'>
                <h3 className='text-2xl font-medium text-black'>
                    Change Password
                </h3>
                <div className='flex flex-col gap-5'>
                    <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="password" className="text-base font-normal">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your current password"
                            className='w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                        />
                    </div>
                    <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="new-password" className="text-base font-normal">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            placeholder="Enter your new password"
                            className='w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                        />
                    </div>
                    <div className="relative flex flex-col gap-3 md:gap-2">
                        <label htmlFor="confirm-password" className="text-base font-normal">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your new password"
                            className='w-[90%] text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2'
                        />
                    </div>
                </div>
                <button className='w-max h-10 px-3 mt-4 text-sm text-white bg-blue-600 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out'
                >
                    Update Password
                </button>
            </div>
        </div>
    )
}