import { Venue } from '@/types/venue.ts'

interface BookingBase {
    dateFrom: string
    dateTo: string
    guests: number
}
export interface CreateBooking extends BookingBase {
    venueId: string
}

export interface Booking extends BookingBase {
    id: string
    created: string
    updated: string
}
export interface BookingWithVenue extends Booking {
    venue: Venue
}

export interface UpdateBooking {
    bookingId: string
    body: BookingBase
}
