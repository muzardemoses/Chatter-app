import { ReactNode } from "react"
import { SettingsSideBar } from "../../Components"

export const Settings = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-full overflow-hidden flex-row w-full">
            <SettingsSideBar />
            <div className="">
                {children}
            </div>
        </div>
    )
}