import { useLocation } from "react-router-dom";
import mutedBlue from "../../assets/Svg/Settings/muted-blue.svg";
import mutedWhite from "../../assets/Svg/Settings/muted-white.svg";


export const MutedSVG = ({ mutedOnHover }: { mutedOnHover: boolean }) => {
    const location = useLocation();
    return (
        <div>
            {mutedOnHover === true ?
                <img
                    src={mutedWhite}
                    alt="muted" className='h-5 w-5 sm:h-4 sm:w-4'
                />
                :
                <img src={location.pathname === "/settings/mutes-and-blockes" ? mutedWhite : mutedBlue}
                    alt="muted" className='h-5 w-5 sm:h-4 sm:w-4'
                />
            }
        </div>
    )
}