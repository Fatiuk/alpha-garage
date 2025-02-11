import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, Container } from '@mui/material';
import HeaderMenu from 'components/HeaderMenu/HeaderMenu';
import HeaderProfile from 'components/HeaderProfile/HeaderProfile';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <HeaderMenu />
          <HeaderProfile />
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
