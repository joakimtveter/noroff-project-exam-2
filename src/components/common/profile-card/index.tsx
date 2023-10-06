import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
    name: string;
    avatar: string;
    email: string;
}

export default function ProfileCard(props: ProfileCardProps) {
    const { name, avatar, email } = props;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/profile/${name}`);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    avatar={
                        <Avatar src={avatar} sx={{ bgcolor: 'hotpink' }}>
                            R
                        </Avatar>
                    }
                    title={name}
                    subheader={email}
                />
            </CardActionArea>
        </Card>
    );
}
