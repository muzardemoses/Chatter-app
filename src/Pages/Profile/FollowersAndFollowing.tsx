import { ConnectionHeader } from "../../Components"


export const FollowersAndFollowing = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div>
                <ConnectionHeader />
            </div>
            {children}
        </>
    )
}