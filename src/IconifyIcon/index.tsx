'use client';
// ** Icon Imports
import {Icon, IconProps} from '@iconify/react';
import {SxProps, styled} from '@mui/material';

interface CustomIconProps {
  sx?: SxProps;
}

const StyledIcon = styled(Icon)<CustomIconProps>({});

const IconifyIcon = ({icon, ...rest}: IconProps & CustomIconProps) => {
  return <StyledIcon icon={icon} fontSize="1.375rem" {...rest} />;
};

export default IconifyIcon;
