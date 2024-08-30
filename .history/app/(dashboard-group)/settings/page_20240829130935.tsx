// app/settings/page.tsx
import Layout from '../layout';  // Ensure this path matches the actual file location
import MyProfile from './profile/page';  // Import the MyProfile component
import Purchase from './purchase/page';  // Import the Purchase component

export default function SettingsPage() {
    return (
        <Layout>
            <MyProfile />

            <Purchase />

        </Layout>
    );
}
