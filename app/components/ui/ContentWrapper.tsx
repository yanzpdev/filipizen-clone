import { Ref } from 'react';

interface ContentWrapperProps {
  className?: string; // for tailwind and css classes and ternary if else expressions
  onClick?: () => void; // for click events and handling functions
  children?: React.ReactNode; // contents of the component
  ref?: Ref<HTMLDivElement>; // for dom referencing
  isSpan?: boolean;
  style?: object;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ 
  className, 
  onClick,
  children,
  ref,
  isSpan,
  style
}) => {
  return (
    <>
    {isSpan ? 
      <span 
        className={className} 
        onClick={onClick}
        ref={ref}
        style={style}
      >
        {children}
      </span>
    :
      <div 
        className={className} 
        onClick={onClick}
        ref={ref}
        style={style}
      >
        {children}
      </div>
    }
    </>
  );
};

export default ContentWrapper;
