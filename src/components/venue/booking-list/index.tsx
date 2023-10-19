import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "@/assets/venue-placeholder.svg"

import { Booking } from "@/types/venue";
import { dateToReadableFormat } from "@/utils/date/dateToReadableFormat";

type BookingListProps = {
    bookings: Booking[];
};

const testData =  [
    {
      "id": "6d5915ea-14eb-476f-b435-0f3b4cf1f8ec",
      "dateFrom": "2023-11-22T14:03:00.000Z",
      "dateTo": "2023-11-24T14:03:00.000Z",
      "guests": 1,
      "created": "2023-10-02T13:04:05.536Z",
      "updated": "2023-10-02T13:04:05.536Z",
      "venue": {
        "id": "a6531833-2e59-43c2-b595-875fd2afa651",
        "name": "Zen Wedding Location",
        "description": "An amazing wedding location ",
        "media": [
          "https://www.lamudi.com.ph/journal/wp-content/uploads/2015/07/Great-Wedding-Venues-Around-the-Philippines-696x457.jpg"
        ],
        "price": 4999,
        "maxGuests": 49,
        "rating": 0,
        "created": "2023-09-14T14:20:19.365Z",
        "updated": "2023-10-01T20:02:21.961Z",
        "meta": {
          "wifi": true,
          "parking": true,
          "breakfast": true,
          "pets": false
        },
        "location": {
          "address": "Wedding st 91",
          "city": "Oslo",
          "zip": "0963",
          "country": "Norway",
          "continent": "Unknown",
          "lat": 0,
          "lng": 0
        }
      }
    },
    {
        "id": "6d5915ea-14eb-476f-b435-0f3b4cf1f8ec",
        "dateFrom": "2023-11-22T14:03:00.000Z",
        "dateTo": "2023-11-24T14:03:00.000Z",
        "guests": 10,
        "created": "2023-10-02T13:04:05.536Z",
        "updated": "2023-10-02T13:04:05.536Z",
        "venue": {
          "id": "a6531833-2e59-43c2-b595-875fd2afa651",
          "name": "Zen Wedding Location",
          "description": "An amazing wedding location ",
          "media": [],
          "price": 4999,
          "maxGuests": 49,
          "rating": 0,
          "created": "2023-09-14T14:20:19.365Z",
          "updated": "2023-10-01T20:02:21.961Z",
          "meta": {
            "wifi": true,
            "parking": true,
            "breakfast": true,
            "pets": false
          },
          "location": {
            "address": "Wedding st 91",
            "city": "Oslo",
            "zip": "0963",
            "country": "Norway",
            "continent": "Unknown",
            "lat": 0,
            "lng": 0
          }
        }
      }
]

export default function BookingList(props: BookingListProps) {
    const { bookings } = props;

  return (
    <List dense={false} sx={{maxWidth:'500px'}}>
        {testData.map((booking) => (
        <ListItem
            key={booking.id}
            secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
            }
        >
            <ListItemAvatar>
            <Avatar>
                <img src={booking.venue.media[0] || Placeholder } alt='' />
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={`${booking.venue.name} - ${booking.guests} ${booking.guests > 1 ? 'Guests' : 'Guest'}`}
            secondary={`${dateToReadableFormat(new Date(booking.dateFrom))} - ${dateToReadableFormat(new Date(booking.dateTo))}`}
            />
        </ListItem>
            ))}
  </List>
)}
