import { useParams } from 'react-router-dom';

import Container from '@/components/common/container';
import Layout from '@/components/layout/standard-layout';

export default function homePage() {
    const { profileName } = useParams();

    if (profileName) {
        // fetch profile
    } else {
        // fetch current user profile
    }

    return (
        <>
            <Layout>
                <Container>
                    <h1> Profile {profileName}</h1>
                </Container>
            </Layout>
        </>
    );
}
