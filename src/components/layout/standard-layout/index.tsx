import Header from '@/components/common/header';

export default function StandardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <div>Footer</div>
        </>
    );
}
