import styles from './container.module.css';

type ContainerProps = {
    type?: 'full' | 'content';
    children?: React.ReactNode;
};

export default function Container(props: ContainerProps) {
    const { type = 'content', children } = props;
    return <div className={`${type === 'full' ? styles.max : styles.content} ${styles.container}`}>{children}</div>;
}
