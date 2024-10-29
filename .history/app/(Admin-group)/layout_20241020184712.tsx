import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/AdminComponents/TabComps';


interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className="body">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div>
                        jabir
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
