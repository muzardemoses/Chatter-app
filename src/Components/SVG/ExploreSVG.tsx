import exploreBlue from '../../assets/Svg/Dashboard/explore-blue.svg';
import exploreGray from '../../assets/Svg/Dashboard/explore-gray.svg';

export const ExploreSVG = () => {
    return (
        <div>
            <img src={location.pathname === "/explore" ? exploreBlue : exploreGray}
                alt="explore" className='h-6 w-6' />
        </div>
    )
}