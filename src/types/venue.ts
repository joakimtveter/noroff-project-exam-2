export type VenueMeta = {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
};

export type Location = {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
};

interface Owner {
    name: string;
    email: string;
    avatar: string;
}

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: 0;
    created: string;
    updated: string;
}

export interface CreateVenue {
    name: string;
    description: string;
    media: string[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: VenueMeta;
    location: Location;
}

export interface Venue extends CreateVenue {
    id: string;
    created: string;
    updated: string;
}

export interface VenueWithOwner extends Venue {
    owner: Owner;
}

export interface VenueWithBookings extends Venue {
    bookings: Booking[];
}

export interface VenueDetailed extends VenueWithOwner, VenueWithBookings {}
