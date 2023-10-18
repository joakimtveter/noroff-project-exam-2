import Box from "@mui/material/Box";
import {Button, CalendarCell, CalendarGrid, Heading, RangeCalendar} from 'react-aria-components';

type BookingCalendarProps = {
    bookings: any[]
}

export default function BookingCalendar(props: BookingCalendarProps) {
    const {bookings} = props;
    console.log('bookings: ', bookings);
  return (
    <RangeCalendar aria-label="Trip dates" style={{width: 'max-content'}}>
    <Box component='header' sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
    </Box>
    <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        <CalendarGrid>
            {(date) => <CalendarCell date={date} />}
        </CalendarGrid>
        <CalendarGrid offset={{ months: 1 }}>
            {(date) => <CalendarCell date={date} />}
        </CalendarGrid>
    </Box>
</RangeCalendar>
  )
}
