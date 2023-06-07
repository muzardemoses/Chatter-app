import { ReactNode } from 'react';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <h1>Dashboard Layout</h1>
            {children}
        </div>
    )
}