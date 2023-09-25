type PictureProps = {
    src: string;
    alt: string;
};

export default function Picture(props: PictureProps) {
    const { src, alt } = props;

    return (
        <picture>
            <img src={src} alt={alt} />
        </picture>
    );
}
