import draftBlue from '../../assets/Svg/Dashboard/draft-blue.svg';
import draftGray from '../../assets/Svg/Dashboard/draft-gray.svg';

export const DraftsSVG = () => {
    return (
        <div>
            <img src={location.pathname === "/drafts" ? draftBlue : draftGray}
                alt="drafts" className='h-5 w-5 sm:h-4 sm:w-4' />
        </div>
    )
}