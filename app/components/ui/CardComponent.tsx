import { Card, Typography } from "@mui/material";

interface ButtonProps {
  className?: string; // for tailwind and css classes and ternary if else expressions
  children?: React.ReactNode; // contents of the component
  disabled?: boolean; // boolean value to enable/disable button
  href?: string; // for routing/redirecting
  variant?: 'text' | 'outlined' | 'contained'; // prestyled css button variants
  onClick?: () => void; // for click events and handling functions
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'; // prestyled css button colors
  size: 'small' | 'medium' | 'large'; // prestyled css button sizes
  startIcon: any; // for svg icons
}

const CardComponent: React.FC<ButtonProps> = ({ 
  className, 
  children, 
}) => {
  return (
    <Card 
      className={className}
    >
      {children}
    </Card>
  );
};

export default CardComponent;
