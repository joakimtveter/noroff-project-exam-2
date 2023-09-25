import { Venue } from '@/types/venue';
import styles from './venue-card.module.css';
import { Link } from 'react-router-dom';

export default function VenueCard(props: Venue) {
    return (
        <li className={styles.card}>
            <img src={props?.media[0]} alt='' className={styles.image} />
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p>Price per night: ${props.price}</p>
            <p>{props.maxGuests}</p>
            <Link to={`/venues/${props.id}`}>View</Link>
        </li>
    );
}
