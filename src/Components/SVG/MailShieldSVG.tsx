import { useLocation } from "react-router-dom";
import mailShieldBlue from "../../assets/Svg/Settings/mail-shield-blue.svg";
import mailShieldWhite from "../../assets/Svg/Settings/mail-shield-white.svg";

export const MailShieldSVG = ({ mailShieldOnHover }: { mailShieldOnHover: boolean }) => {
    const location = useLocation();
    return (
        <div>
            {mailShieldOnHover === true ?
                <img
                    src={mailShieldWhite}
                    alt="mailShield" className='h-5 w-5 sm:h-4 sm:w-4'
                />
                :
                <img
                    src={location.pathname === "/settings/email-and-password" ? mailShieldWhite : mailShieldBlue}
                    alt="mailShield" className='h-5 w-5 sm:h-4 sm:w-4'
                />
            }
        </div>
    )
}