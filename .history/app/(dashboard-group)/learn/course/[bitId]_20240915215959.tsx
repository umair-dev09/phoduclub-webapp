import { useRouter } from 'next/router';

export default function Course() {
    const router = useRouter();
    const { BitId } = router.query; // Get BitId from the dynamic route

    const getContentForBitId = (BitId: string | string[] | undefined) => {
        switch (BitId) {
            case '1':
                return (
                    <div> hello Everyone </div>
                );
            case '2':
                return 'This is the content for Bit ID 2';
            case '3':
                return 'This is the content for Bit ID 3';
            default:
                return 'This Bit ID does not have specific content.';
        }
    };

    return (
        <div>
            {getContentForBitId(BitId)}
        </div>
    );
}
