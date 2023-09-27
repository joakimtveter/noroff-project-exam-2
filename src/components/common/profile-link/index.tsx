import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItem from '@/components/common/navigation-item';
type ProfileLinkProps = {
    children: React.ReactNode;
};

export default function ProfileLink(props: any) {
    const [loggedIn, setLoggedIn] = useState(true);

    return <li>{loggedIn ? <NavigationItem href='/profile' text='Profile' /> : <button>Login</button>}</li>;
}
