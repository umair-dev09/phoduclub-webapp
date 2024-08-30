'use client';
import SettingsLayout from './page'; // Import the SettingsLayout component
import MyProfile from './profile/page'; // Import the MyProfile component
// Import the Purchase component

export default function Page() {
    return (
        <SettingsLayout>
            <MyProfile /> {/* Render MyProfile component or other content here */}
            {/* Or */}
            {/* <Purchase /> */}
        </SettingsLayout>
    );
}
