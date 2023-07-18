import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice";
import { selectUsers } from "../../Config/usersSlice";

export const Profile = () => {
    const { username } = useParams<{ username: string }>()

    const reduxUser = useSelector(selectUser);
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    const users = useSelector(selectUsers);
    const loggedInUser = reduxUser || storageUser;
    const routeUser = users.find((user) => user.username === username);

    

    return (
        <div className="">
         {routeUser?.displayName}<br />
         {loggedInUser?.displayName}
        </div>
    )
}