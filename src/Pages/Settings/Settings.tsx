import { ReactNode } from "react"
import { SettingsSideBar } from "../../Components"

export const Settings = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-full overflow-hidden flex-row w-full">
            <div className="">
                <SettingsSideBar />
            </div>

            <div className="min-h-[91vh] w-full border-l border-gray-300">
                {children}
            </div>
        </div>
    )
}