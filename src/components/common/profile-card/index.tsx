import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar, Card, CardActionArea, CardHeader } from '@mui/material'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface ProfileCardProps {
    name: string
    avatar: string
    email: string
}

export default function ProfileCard(props: ProfileCardProps): ReactElement {
    const { name, avatar, email } = props
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    const handleClick = (): void => {
        if (!isLoggedIn) return
        navigate(`/profile/${name}`)
    }

    return (
        <Card sx={{ maxWidth: 600, marginBlock: 3 }}>
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
    )
}
