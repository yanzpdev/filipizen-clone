import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: object;
  className?: string;
  layout?: string;
  priority?: boolean;
}

const ImageComponent:React.FC<ImageProps> = ({
    src,
    alt,
    width,
    height,
    style,
    className,
    layout,
    priority
}) => {
  return (
    <Image 
      src={src} 
      alt={alt}    
      width={width}
      height={height}
      style={style}
      className={className}
      layout={layout}
      priority={priority}
    />
  )
}

export default ImageComponent