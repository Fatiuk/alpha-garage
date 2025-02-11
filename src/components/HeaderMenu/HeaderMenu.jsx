import * as React from 'react';
import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Divider,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmojiTransportationRoundedIcon from '@mui/icons-material/EmojiTransportationRounded';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

const HeaderMenu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
  };

  // Use auth selectors
  const { isLoggedIn } = useAuth();

  return (
    <>
      <EmojiTransportationRoundedIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: { md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          textTransform: 'uppercase',
        }}
      >
        Alpha garage
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            component={Link}
            to={'/contacts'}
            variant="text"
            color="info"
            size="small"
          >
            Наші послуги
          </Button>
          <Button
            component={Link}
            to={'/favorites'}
            variant="text"
            color="info"
            size="small"
          >
            Прайс ліст
          </Button>
          <Button
            component={Link}
            to={'/favorites'}
            variant="text"
            color="info"
            size="small"
          >
            Обране
          </Button>
        </Box>
      </Box>
      {!isLoggedIn ? (
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Button
            component={Link}
            to={'/login'}
            color="primary"
            variant="text"
            size="small"
          >
            Увійти
          </Button>
          <Button
            component={Link}
            to={'/registration'}
            color="primary"
            variant="contained"
            size="small"
          >
            Реєстрація
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              top: 'var(--template-frame-height, 0px)',
            },
          }}
        >
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <MenuItem component={Link} to={'/contacts'}>
              Наші послуги
            </MenuItem>
            <MenuItem component={Link} to={'/favorites'}>
              Прайс Ліст
            </MenuItem>
            <MenuItem component={Link} to={'/favorites'}>
              Обране
            </MenuItem>
            <Divider sx={{ my: 3 }} />
            {!isLoggedIn ? (
              <>
                <MenuItem>
                  <Button
                    component={Link}
                    to={'/registration'}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Зареєструватися
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={Link}
                    to={'/login'}
                    color="primary"
                    variant="outlined"
                    fullWidth
                  >
                    Авторизуватися
                  </Button>
                </MenuItem>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default HeaderMenu;
