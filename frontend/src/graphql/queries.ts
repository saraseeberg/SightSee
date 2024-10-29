import { gql } from '@apollo/client';

export const GET_ALL_DESTINATIONS = gql`
    query {
        getAllDestinations {
            id
            title
            country
            region
            image
            description
            rating
            categories
        }
    }
    `;