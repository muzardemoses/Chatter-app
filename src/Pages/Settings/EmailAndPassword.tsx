/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { auth } from '../../Config/firebase'
import { Email, Password } from '../../Components';


export const EmailAndPassword = () => {
    const currentUser = auth.currentUser
    const user = useSelector(selectUser)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user && currentUser) {
            // setExistingEmail(user.email)
            setLoading(false)
        }
    }, [user, currentUser])

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
                    </div>
                )}
        </div>
    )
}