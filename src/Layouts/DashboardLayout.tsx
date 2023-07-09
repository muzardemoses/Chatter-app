import { ReactNode } from 'react';
import { LeftBar, RightBar, SubHeader } from '../Components';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <LeftBar />
            <div className='flex flex-grow overflow-auto'>
                {/* flex-grow or flex-1 */}
                <div className='flex-grow border-r border-r-gray-300 min-h-screen h-max flex flex-col'>
                    <div className='sticky top-0'>
                        <SubHeader />
                    </div>

                    <div className='flex-grow h-max'>
                        {children}
                    </div>
                </div>
                <RightBar />
            </div>
        </div>
    )
}