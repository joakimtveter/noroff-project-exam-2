import Navigation from '@/components/common/navigation';
import NavigationItem from '@/components/common/navigation-item';
import ProfileLink from '@/components/common/profile-link';
import Search from '@/components/common/search';
import Container from '@/components/common/container';
import Logo from '@/components/common/logo';

import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Container type='full'>
                <Navigation>
                    <Logo />
                    <NavigationItem href='/venues' text='Find a venue' />
                    <ProfileLink />
                    <Search />
                </Navigation>
            </Container>
        </header>
    );
}
