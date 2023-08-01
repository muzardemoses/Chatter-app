//import { NavLink, useParams } from "react-router-dom";
//import { useSelector } from "react-redux";
//import { selectUsers } from "../../Config/usersSlice";


export const Followers = () => {
    //const { username } = useParams<{ username: string }>()

    //const users = useSelector(selectUsers);
    //const routeUser = users.find((user) => user.username === username);

    return (
        <>
            {/* <div className="bg-white w-6/12 p-4 shadow-md rounded-lg mx-auto">
                <div v-if="!routeUser">
                    <h1>Loading...</h1>
                </div>
                <div v-else>
                    <ul className="flex flex-col gap-3" v-if="routeUserFollowers.length > 0">
                        <li
                            v-for="user in routeUserFollowers"
              :key="user.id"
                        class="flex justify-between"
            >
                        <RouterLink
                            : to="`/${user.username}`"
                        class="flex items-center gap-4 transition duration-300 ease-in-out hover:bg-gray-100 p-2 rounded-md px-4"
              >
                        <img
                            : src="
                        user.photoURL
                        ? user.photoURL
                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                        "
                        alt="avatar"
                        class="w-12 h-12 rounded-full"
                />
                        <div className="flex flex-col">
                            <h1 class="text-gray-900 font-semibold text-base">
                                {{ user.displayName }}
                            </h1>
                            <p class="text-gray-600 text-sm">@{{ user.username }}</p>
                        </div>
                    </RouterLink>
                    <div>
                        <div v-if="loggedInUser">
                            <div v-if="user.id === loggedInUser.id">
                                <!-- <router-link to="/settings/profile">
                                    <PurpleButton class="px-4 h-10 text-sm font-semibold">
                                        Edit profile
                                    </PurpleButton>
                                </router-link> -->
                            </div>
                            <div v-else-if="user.followers.includes(loggedInUser.id)">
                                <PurpleButton
                                    class="w-28 h-10 text-sm font-semibold flex items-center gap-2 justify-center hh"
                      @click="followUser(user)"
                    >
                                <img
                                    src="../../assets/profileIcons/direct-hit.svg"
                                    alt="direct-hit"
                                    className="h-4 w-4"
                                />

                                <span>Following</span>
                            </PurpleButton>
                        </div>
                        <div v-else>
                            <WhiteButton
                                class="w-28 h-10 text-sm font-semibold flex items-center gap-3 justify-center text-purple-600 border border-purple-600"
                      @click="followUser(user)"
                    >
                            <img
                                src="../../assets/profileIcons/bullseye-purple.svg"
                                alt="bullseye"
                                className="h-4 w-4"
                            />
                            Follow
                        </WhiteButton>
                    </div>
                </div>
            </div>
        </li >
          </ul >
    <div v-else className="text-gray-500 text-sm">
        <p v-if="routeUser.id === loggedInUser.id">
            You don't have any followers yet
        </p>
        <p v-else>This user doesn't have any followers yet</p>
    </div>
        </div >
      </div > */}
      </>
    )
}