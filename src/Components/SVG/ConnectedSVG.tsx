import { useLocation } from "react-router-dom";
import connectedBlue from "../../assets/Svg/Settings/connected-blue.svg";
import connectedWhite from "../../assets/Svg/Settings/connected-white.svg";


export const ConnectedSVG = ({ connectedOnHover }: { connectedOnHover: boolean }) => {
    const location = useLocation();
    return (
        <div>
            {connectedOnHover === true ?
                <img
                    src={connectedWhite}
                    alt="connected" className='h-5 w-5 sm:h-4 sm:w-4'
                />
                :
                <img src={location.pathname === "/settings/connected-accounts" ? connectedWhite : connectedBlue}
                    alt="connected" className='h-5 w-5 sm:h-4 sm:w-4'
                />
            }
        </div>
    )
}