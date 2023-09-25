import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div>Logo</div>
            <div>Nav</div>
            <div>Search</div>
            <div>Account</div>
        </header>
    );
}
