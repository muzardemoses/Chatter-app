import messageBlue from '../../assets/Svg/Dashboard/messaging-blue.svg';
import messageGray from '../../assets/Svg/Dashboard/messaging-gray.svg';

export const MessagesSVG = () => {
    return (
        <div>
            <img src={location.pathname === "/messages" ? messageBlue : messageGray}
                alt="messages" className='h-5 w-5 sm:h-4 sm:w-4' />
        </div>
    )
}