import { ReactNode } from 'react';
import { ChatSideBar } from '../../Components';

export const Messages = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-full bg-gray-700 overflow-hidden flex-row w-full">
            <ChatSideBar />
            {children}
        </div>
    )
}