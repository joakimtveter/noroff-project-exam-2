import { Badge, Rating, Stack, Tooltip, Typography } from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined'

interface VenueInfoProps {
    wifi: boolean
    pets: boolean
    rating: number
    breakfast: boolean
    parking: boolean
    maxGuests: number
}
export default function VenueInfo(props: VenueInfoProps): ReactComponent {
    const { wifi, pets, breakfast, parking, maxGuests, rating } = props
    return (
        <Stack spacing={3} direction={'row'} alignItems={'center'} paddingBlock={2} marginBlock={2}>
            <Stack spacing={1} direction={'row'} alignItems="center">
                <Rating name="read-only" value={rating} readOnly />
                <Typography>{rating}</Typography>
            </Stack>
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
    )
}
