interface Owner {
    name: string;
    email: string;
    avatar: string;
}

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

export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
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

export const initialVenue: VenueDetailed = {
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
        wifi: false,
        pets: false,
        parking: false,
        breakfast: false,
    },
    owner: {
        name: '',
        email: '',
        avatar: '',
    },
    id: '',
    created: '',
    updated: '',
    location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: 0,
        lng: 0,
    },
    bookings: [],
};
