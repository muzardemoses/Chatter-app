import { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <h1>Auth Layout</h1>
            {children}
        </div>
    )
}