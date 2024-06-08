import Image from "next/image"

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
}

export const PostImage = ({ src, alt, className, style, width, height }: Props) => {
    return (
        <Image
            src={src || ''}
            width={width}
            height={height}
            alt={alt}
            className={className}
            style={style}

        />
    )
}
