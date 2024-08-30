// app/settings/page.tsx
import Layout from './Layout';  // Ensure this path matches the actual file location
import MyProfile from './profile/page';  // Import the MyProfile component
import Purchase from './purchase/page';  // Import the Purchase component

export default function SettingsPage() {
    return (
        <Layout>
            {/* Conditionally render MyProfile or Purchase based on the route */}
            {/* Replace these components with actual content or routing logic */}
            <div>
                <MyProfile />
                <p>This is the profile page</p>
            </div>
            <div>
                <Purchase />
                <p>Content for the purchase page goes here.</p>
            </div>
        </Layout>
    );
}
