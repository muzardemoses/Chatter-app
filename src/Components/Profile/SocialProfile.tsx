import webSVG from "../../assets/Svg/Profile/web.svg"
import locationSVG from "../../assets/Svg/Profile/location.svg"
import facebookSVG from "../../assets/Svg/Profile/facebook.svg"
import twitterSVG from "../../assets/Svg/Profile/twitter.svg"
import linkedinSVG from "../../assets/Svg/Profile/linkedin.svg"
import instagramSVG from "../../assets/Svg/Profile/instagram.svg"
import githubSVG from "../../assets/Svg/Profile/github.svg"
import youtubeSVG from "../../assets/Svg/Profile/youtube.svg"


export const SocialProfile = ({ routeUser }: any) => {
    return (
        <div className="flex flex-col gap-4">
            {routeUser?.bio ? (
                <p className="text-gray-700 text-base font-normal w-80">
                    {routeUser.bio}
                </p>
            ) : (
                <p className="text-gray-700 text-base font-normal w-80" >
                    No bio yet
                </p>
            )}
            <div className="flex gap-4">
                {routeUser.website && (
                    <a
                        href={routeUser.website}
                        target="_blank"
                        className="flex gap-2 items-center"
                    >
                        <img
                            src={webSVG}
                            alt="website"
                            className="h-4 w-4"
                        />
                        <p
                            className="text-blue-400 text-sm font-normal hover:underline hover:text-blue-500 transition duration-500 ease-in-out"
                        >
                            {routeUser.website.split("/")[2]}
                        </p>
                    </a>
                )}
                {routeUser.location && (
                    <div className="flex gap-2 items-center">
                        <img
                            src={locationSVG}
                            alt="location"
                            className="h-4 w-4"
                        />
                        <p className="text-gray-600 text-sm font-normal">
                            {routeUser.location}
                        </p>
                    </div>
                )}
            </div>
            {routeUser.social && (
                <div className="grid grid-cols-2 grid-flow-row gap-2 gap-x-3 w-max">
                    {routeUser.socials.twitter && (
                        <a
                            href={routeUser.socials.twitter}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={twitterSVG}
                                alt="twitter"
                                className="h-4 w-4"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.twitter.split("/")[3]}
                            </p>
                        </a>
                    )}
                    {routeUser.socials.facebook && (
                        <a
                            href={routeUser.socials.facebook}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={facebookSVG}
                                alt="facebook"
                                className="h-5 w-5"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.facebook.split("/")[3]}
                            </p>
                        </a>
                    )}
                    {routeUser.socials.linkedin && (
                        <a
                            href={routeUser.socials.linkedin}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={linkedinSVG}
                                alt="linkedin"
                                className="h-4 w-4"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.linkedin.split("/")[4]}
                            </p>
                        </a>
                    )}
                    {routeUser.socials.instagram && (
                        <a
                            href={routeUser.socials.instagram}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={instagramSVG}
                                alt="instagram"
                                className="h-4 w-4"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.instagram.split("/")[3]}
                            </p>
                        </a>
                    )}
                    {routeUser.socials.github && (
                        <a
                            href={routeUser.socials.github}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={githubSVG}
                                alt="github"
                                className="h-4 w-4"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.github.split("/")[3]}
                            </p>
                        </a>
                    )}
                    {routeUser.socials.youtube && (
                        <a
                            href={routeUser.socials.youtube}
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <img
                                src={youtubeSVG}
                                alt="youtube"
                                className="h-4 w-4"
                            />
                            <p className="text-gray-600 text-sm font-normal">
                                {routeUser.socials.youtube.split("/")[3]}
                            </p>
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}