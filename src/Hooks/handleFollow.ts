/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";




// useEffect(() => {
//     if (routeUser && loggedInUser) {
//         setLoading(false)
//         console.log(routeUser.id, loggedInUser.id)
//     }
// }, [routeUser, loggedInUser])

export const handleFollow = async (loggedInUser: any, routeUser: any) => {
    
    if (loggedInUser?.following.includes(routeUser?.id)) {
        // Unfollow
        loggedInUser.following = loggedInUser.following.filter((userId: string) => userId !== routeUser?.id);

        routeUser.followers = routeUser.followers.filter((userId: string) => userId !== loggedInUser?.id);
        toast.info('User unfollowed');
    } else {
        // Follow
        loggedInUser.following.push(routeUser?.id);

        routeUser.followers.push(loggedInUser?.id);

        routeUser = { ...routeUser };
        toast.success('User followed');
    }

    await updateDoc(doc(db, 'users', loggedInUser?.id), {
        following: loggedInUser.following,
    });

    await updateDoc(doc(db, 'users', routeUser?.id), {
        followers: routeUser.followers,
    });
}