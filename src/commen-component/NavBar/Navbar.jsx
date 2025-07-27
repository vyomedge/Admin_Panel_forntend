import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkIcon from '@mui/icons-material/Work';
import { Outlet } from 'react-router-dom';

const NAVIGATION = [
  // {
  //   kind: 'header',
  //   title: 'Main items',
  // },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'blog',
    title: 'Blog',
    icon: <AutoStoriesIcon />,
  },
  {
    segment: 'portfolio',
    title: 'Portfolio',
    icon: <WorkIcon />,

  },
  {
    segment: 'services',
    title: 'Services',
    icon: <DashboardIcon />
  },
  // {
  //   kind: 'divider',
  // },
  // {
  //   kind: 'header',
  //   title: 'Analytics',
  // },
  // {
  //   segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: 'sales',
  //       title: 'Sales',
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: 'traffic',
  //       title: 'Traffic',
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: 'integrations',
  //   title: 'Integrations',
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Navbar(props) {
  const { window } = props;
  const [session, setSession] = React.useState({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);
  const demoWindow = window !== undefined ? window() : undefined;

return (
    <DemoProvider window={demoWindow}>
      <AppProvider sx={{ width: '100vw' , height: '100vh' }}
        branding={{
          logo: <img src="./companylogo.png" alt="MUI logo" />,
          title: 'Admin panel',
          homeUrl: '/dashboard',
        }}
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout sx={{ width: '100%', height: '100%', p:3,flexGlow:1  }}>
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}



export default Navbar;


