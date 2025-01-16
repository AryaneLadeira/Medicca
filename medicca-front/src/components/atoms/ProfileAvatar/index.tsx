import { Avatar, Box, IconButton, Typography } from '@mui/material';
import './style.scss';


interface ProfileAvatarProps {
  name?: string;
  avatar: string;
}

function ProfileAvatar({ name, avatar }: ProfileAvatarProps) {
  return (
    <Box className="avatar-container">
      {name ? <Typography variant="body1">{name}</Typography> : ''}
      <IconButton>
        <Avatar src={avatar} />
      </IconButton>
    </Box>
  );
}

export default ProfileAvatar;
