/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { toast } from "react-toastify";




// useEffect(() => {
//     if (routeUser && loggedInUser) {
//         setLoading(false)
//         console.log(routeUser.id, loggedInUser.id)
//     }
// }, [routeUser, loggedInUser])

// Define the complete UserState type

export const handleFollow = async (
    loggedInUser: any,
    routeUser: any,
    // setLoggedInUser: any,
    // setRouteUser: any,
    // dispatch: any,
    // users: User[] 
) => {
    if (loggedInUser?.following.includes(routeUser?.id)) {
        // Unfollow
        loggedInUser = {
            ...loggedInUser,
            following: loggedInUser.following.filter((userId: string) => userId !== routeUser?.id),
        };

        routeUser = {
            ...routeUser,
            followers: routeUser.followers.filter((userId: string) => userId !== loggedInUser?.id),
        };

        toast.info('User unfollowed');
        console.log(loggedInUser.displayName, routeUser.displayName)
    } else {
        // Follow
        loggedInUser = {
            ...loggedInUser,
            following: [...loggedInUser.following, routeUser?.id],
        };

        routeUser = {
            ...routeUser,
            followers: [...routeUser.followers, loggedInUser?.id],
        };

        toast.success('User followed');
        console.log(loggedInUser.displayName, routeUser.displayName)
    }

    await updateDoc(doc(db, 'users', loggedInUser?.id), {
        following: loggedInUser.following,
    });

    await updateDoc(doc(db, 'users', routeUser?.id), {
        followers: routeUser.followers,
    });
    console.log(loggedInUser.displayName, routeUser.displayName)
}

