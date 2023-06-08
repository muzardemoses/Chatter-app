import { ReactNode } from 'react';
import { Header, Footer } from '../Components';

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='mt-24'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}