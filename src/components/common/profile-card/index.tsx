import { RootState } from '@/store';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
    name: string;
    avatar: string;
    email: string;
}

export default function ProfileCard(props: ProfileCardProps) {
    const { name, avatar, email } = props;
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const handleClick = () => {
        if (!isLoggedIn) return;
        navigate(`/profile/${name}`);
    };
    return (
        <Card sx={{ maxWidth: 500, marginBlock: 3 }}>
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    avatar={
                        <Avatar src={avatar} alt={name} sx={{ bgcolor: 'secondary.light' }}>
                            {name[0].toUpperCase()}
                        </Avatar>                       
                    }
                    title={name}
                    subheader={email}
                />
            </CardActionArea>
        </Card>
    );
}
