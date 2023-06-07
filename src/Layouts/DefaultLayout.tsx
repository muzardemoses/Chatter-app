import { ReactNode } from 'react';
import { Header } from '../Components';

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='mt-24'>
            <Header />
            {children}
        </div>
    )
}