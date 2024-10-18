import { gql } from "apollo-server-express";

type User = {
    id: number;
    name: string;
    username: string;
    hashedpassword: string;
    reviews?: number[];
    favorites?: number[];
}



const UserDB = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        hashedpassword: String!
        reviews: [ID]
        favorites: [ID]
    }

    type Query {
        users(ids: [ID]): [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, username: String!, hashedpassword: String!): User
        updateUser(id: ID!, name: String, username: String, hashedpassword: String): User
        deleteUser(id: ID!): User
    }


`


export {User, UserDB};
