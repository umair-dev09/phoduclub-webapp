import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/DashboardComponents/Header";
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
<<<<<<< HEAD
                    <div>
                     <Header/>
=======
                    <div className="headtab">
                        <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</p>
                        </div>
                        <div className="notify">
                            <Image
                                src="/icons/notify.png"
                                alt="Notifly Bar"
                                width={35}
                                height={35}
                            />
                        </div>
                        <div className="question-mark">
                            <Image
                                className="question-mark"
                                src="/icons/questionMark.png"
                                alt="questionMark Bar"
                                width={45}
                                height={45}
                            />
                        </div>
                        <div className="dp"><p className="actual-dp">JS</p></div>
                        <div className="info">
                            <div className="name">John Smith</div>
                            <div className="email">john@acme.com</div>
                        </div>
>>>>>>> 93f1031b5fb1045ed2c506e6cb10375362b26c3d
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
