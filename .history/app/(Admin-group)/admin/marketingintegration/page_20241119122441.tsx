import { Tabs, Badge } from 'antd';
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";

function MarketIntegration() {
    return (
        <div className="p-8">
            <Tabs
                defaultActiveKey="Messenger"
                tabBarStyle={{ color: '#9012FF' }} // Style for inactive tabs
                items={[
                    {
                        key: 'Messenger',
                        label: <span style={{ color: '#9012FF', fontWeight: '500' }}>Messenger</span>,
                        children: <Messenger />,
                    },
                    {
                        key: 'Coupons',
                        label: (
                            <span style={{ fontWeight: '500', color: '#9012FF' }}>
                                Coupons
                                <Badge
                                    count={10}
                                    style={{
                                        marginLeft: '8px',
                                        backgroundColor: '#9012FF',
                                        color: '#FFFFFF',
                                    }}
                                />
                            </span>
                        ),
                        children: <Coupons />,
                    },
                ]}
            />
        </div>
    );
}

export default MarketIntegration;
