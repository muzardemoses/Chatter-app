import { ReactNode } from "react"
import { SettingsSideBar } from "../../Components"

export const Settings = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <SettingsSideBar />
            <div>
                {children}
            </div>
        </div>
    )
}