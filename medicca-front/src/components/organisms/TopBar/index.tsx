import { AppBar, Box, Link, Toolbar } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import Logo from '../../atoms/Logo';
import ProfileAvatar from '../../atoms/ProfileAvatar';
import './style.scss';

function TopBar() {
  const { user } = useAuthContext();
  return (
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo withText={true} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <Link href={`/perfil/${user.specificId}`}>
              <ProfileAvatar
                avatar={'https://www.w3schools.com/howto/img_avatar.png'}
                name={user.name}
              />
            </Link>
          ) : (
            ''
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
