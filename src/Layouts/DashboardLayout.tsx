import { ReactNode } from 'react';
import { LeftBar, RightBar, SubHeader } from '../Components';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <LeftBar />
            <div className='flex  flex-grow overflow-auto'>
                {/* flex-grow or flex-1 */}
                <div className='flex-grow border-r border-r-gray-300 h-max'>
                    <SubHeader />
                    {children}
                </div>
                <RightBar />
            </div>
        </div>
    )
}