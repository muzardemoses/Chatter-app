import { useLocation } from "react-router-dom";
import profileBlue from "../../assets/Svg/Settings/profile-blue.svg";
import profileWhite from "../../assets/Svg/Settings/profile-white.svg";

export const ProfileSVG = ({ profileOnHover }: { profileOnHover: boolean }) => {
    const location = useLocation();
    return (
        <div>
            {profileOnHover === true ?
                <img
                    src={profileWhite}
                    alt="profile" className='h-5 w-5 sm:h-4 sm:w-4'
                />
                :
                <img
                    src={location.pathname === "/settings/profile" ? profileWhite : profileBlue}
                    alt="profile" className='h-5 w-5 sm:h-4 sm:w-4'
                />
            }
        </div>
    )
}