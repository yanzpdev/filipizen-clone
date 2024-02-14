import { Button } from "@mui/material";

interface ButtonProps {
  className?: string; // for tailwind and css classes and ternary if else expressions
  children?: React.ReactNode; // contents of the component
  disabled?: boolean; // boolean value to enable/disable button
  href?: string; // for routing/redirecting
  variant?: 'text' | 'outlined' | 'contained'; // prestyled css button variants
  onClick?: () => void; // for click events and handling functions
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'; // prestyled css button colors
  size?: 'small' | 'medium' | 'large'; // prestyled css button sizes
  startIcon?: any; // for svg icons
  style?: object; // override styling with vanilla css
  disableFocusRipple?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  sx?: object;
  component?: any;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ 
  className, 
  children, 
  disabled,
  href,
  variant,
  onClick,
  color,
  size,
  startIcon,
  style,
  disableFocusRipple,
  disableElevation,
  disableRipple,
  disableTouchRipple,
  sx,
  component,
  target
}) => {
  return (
    <Button 
      className={className}
      disabled={disabled}
      href={href}
      variant={variant}
      onClick={onClick}
      color={color}
      size={size}
      startIcon={startIcon}
      style={style}
      disableFocusRipple={disableFocusRipple}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      disableTouchRipple={disableTouchRipple}
      sx={sx}
      component={component}
      target={target}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
