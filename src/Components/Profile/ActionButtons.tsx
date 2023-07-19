/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom"



export const ActionButtons = (routeUser: any, loggedInUser: any) => {
    return (
        <div>
            {routeUser.id === loggedInUser.id ? (
                <div>
                    <Link to="/edit-profile">
                        <button className="self-end bg-blue-700 text-white w-36 py-3 rounded-lg text-base font-medium xl:py-3 md:w-28 md:py-2">
                            Edit Profile
                        </button>
                    </Link>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}