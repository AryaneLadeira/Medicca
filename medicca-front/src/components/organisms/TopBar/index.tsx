import { AppBar, Box, Toolbar } from '@mui/material';
import Logo from '../../atoms/Logo';
import ProfileAvatar from '../../atoms/ProfileAvatar';

function TopBar() {
  const user = {
    name: 'John Doe',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo withText={true} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ProfileAvatar avatar={user.avatar} name={user.name} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
