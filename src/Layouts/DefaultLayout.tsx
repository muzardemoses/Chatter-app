import { ReactNode } from 'react';
import { Header, Footer } from '../Components';

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='mt-24 md:mt-20'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}