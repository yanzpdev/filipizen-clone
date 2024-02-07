import { Container } from "@mui/material";
import { SxProps } from '@mui/system';

interface ContainerProps {
  className?: string; // for tailwind and css classes and ternary if else expressions
  classes?: object; // override or extend the styles applied to the component
  maxWidth?: any; // to set the container's max width
  children?: React.ReactNode; // contents of the component
  fixed?: boolean; // set container to be fluid or not
  disableGutters?: boolean; // to remove default mui container x-axis padding
  sx?: SxProps; // the system prop that allows defining system overrides as well as additional css styles
  component?: any; // the component used for the root node. either a string to use a html element or a component
}

const ContainerComponent: React.FC<ContainerProps> = ({ 
  className, 
  classes, 
  maxWidth, 
  children, 
  fixed, 
  disableGutters, 
  sx, 
  component 
}) => {
  return (
    <Container 
      className={className} 
      classes={classes} 
      maxWidth={maxWidth} 
      fixed={fixed} 
      disableGutters={disableGutters}
      sx={sx}
      component={component}
    >
      {children}
    </Container>
  );
};

export default ContainerComponent;
