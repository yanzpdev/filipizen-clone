import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: object;
  className?: string;
  layout?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

const ImageComponent:React.FC<ImageProps> = ({
    src,
    alt,
    width,
    height,
    style,
    className,
    layout,
    priority,
    unoptimized
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
      unoptimized={unoptimized}
    />
  )
}

export default ImageComponent