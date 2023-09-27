import styles from './navigation.module.css';

type NavigationProps = {
    children: React.ReactNode;
};

export default function Navigation(props: NavigationProps) {
    const { children } = props;
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>{children}</ul>
        </nav>
    );
}
