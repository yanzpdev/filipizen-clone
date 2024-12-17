import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type ButtonProps = {
  component?: any;
  target?: '_blank' | '_self' | '_parent' | '_top' | string; // specifies how to open the link (for `href`)
  endIconPosition?: 'start' | 'end'; // allows customizing the position of the end icon
  loading?: boolean; // if true, the button will show a loading state (useful for async actions)
  loadingIndicator?: React.ReactNode; // custom loading indicator (if loading is true)
} & MuiButtonProps;

const Button: React.FC<ButtonProps> = ({ 
  className, 
  children, 
  disabled,
  href,
  variant,
  onClick,
  color,
  size,
  startIcon,
  endIcon,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  style,
  disableFocusRipple,
  disableElevation,
  disableRipple,
  disableTouchRipple,
  sx,
  component,
  target,
  tabIndex,
  loading,
  loadingIndicator,
}) => {
  return (
    <MuiButton 
      className={className}
      disabled={disabled || loading}
      href={href}
      variant={variant}
      onClick={onClick}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon && !loading ? endIcon : null}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      disableFocusRipple={disableFocusRipple}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      disableTouchRipple={disableTouchRipple}
      sx={sx}
      component={component}
      target={target}
      tabIndex={tabIndex}
    >
      {loading ? loadingIndicator : children}
    </MuiButton>
  );
};

export default Button;
