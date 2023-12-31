import { ReactElement } from 'react'
import { Badge, Rating, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined'

interface VenueInfoProps {
    wifi: boolean
    pets: boolean
    rating: 0 | 1 | 2 | 3 | 4 | 5
    breakfast: boolean
    parking: boolean
    maxGuests: number
}
export default function VenueInfo(props: VenueInfoProps): ReactElement {
    const { wifi, pets, breakfast, parking, maxGuests, rating } = props
    const theme = useTheme()
    return (
        <Stack spacing={3} direction={{xs: 'column', md: 'row'}} alignItems={'center'} paddingBlock={2} marginBlockEnd={1}>
            <Stack spacing={1} direction={'row'} alignItems="center">
                <Rating size="large" value={rating} readOnly style={{ color: theme.palette.primary.main }} />
                <Typography>{rating}</Typography>
            </Stack>
            <Stack spacing={3} direction={'row'}>
                <Tooltip title={`Maximum ${maxGuests} guests`}>
                    <Badge badgeContent={maxGuests} color="primary">
                        <PeopleOutlinedIcon />
                    </Badge>
                </Tooltip>
                {wifi && (
                    <Tooltip title={'Has Wifi'}>
                        <WifiOutlinedIcon />
                    </Tooltip>
                )}
                {pets && (
                    <Tooltip title={'Pets allowed'}>
                        <PetsOutlinedIcon />
                    </Tooltip>
                )}
                {parking && (
                    <Tooltip title={'Parking available'}>
                        <LocalParkingOutlinedIcon />
                    </Tooltip>
                )}
                {breakfast && (
                    <Tooltip title={'Breakfast included'}>
                        <BakeryDiningOutlinedIcon />
                    </Tooltip>
                )}
            </Stack>
        </Stack>
    )
}
