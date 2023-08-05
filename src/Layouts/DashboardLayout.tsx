import { ReactNode } from 'react';
import { LeftBar, RightBar, SubHeader } from '../Components';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='z-30'>
                <LeftBar />

            </div>
            <div className='flex flex-grow overflow-auto'>
                {/* flex-grow or flex-1 */}
                <div className='flex-grow border-r border-r-gray-300 min-h-screen h-max flex flex-col'>
                    <div className='sticky top-0 z-40'>
                        <SubHeader />
                    </div>

                    <div className='flex-grow h-max'>
                        {children}
                    </div>
                </div>
                <div className='z-40 sticky top-10'>
                    <RightBar />
                </div>
            </div>
        </div>
    )
}