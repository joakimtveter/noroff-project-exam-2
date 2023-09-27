import { NavLink } from 'react-router-dom';

import styles from './navigation-item.module.css';

type NavigationItemsProps = {
    href: string;
    text: string;
};

export default function NavigationItem(props: NavigationItemsProps) {
    const { href = '#', text } = props;
    return (
        <li className={styles.item}>
            <NavLink to={href} className={styles.link}>
                {text}
            </NavLink>
        </li>
    );
}
