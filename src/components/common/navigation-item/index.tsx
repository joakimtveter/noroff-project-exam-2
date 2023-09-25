import { Link } from 'react-router-dom';

type NavigationItemsProps = {
    href: string;
    text: string;
};

export default function NavigationItem(props: NavigationItemsProps) {
    const { href = '#', text } = props;
    return (
        <li>
            <Link to={href}>{text}</Link>
        </li>
    );
}
