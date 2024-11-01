## SightSee

SightSee is an application designed to enhance the travel experience by providing users with detailed information about various tourist attractions. It offers features such as filtering, sorting, user reviews, and content to help travelers plan their visits effectively.The application aims to make sightseeing more enjoyable and informative by leveraging modern web technologies.

## Hosted

The website is hosted at
[SightSee on NTNU](http://it2810-33.idi.ntnu.no/project2/) .

> **⚠ NB!!** 
</br>
>This is the only place you will be able to see the whole application!

## Developer Information
**Developed by:**
- Aurora Nergaard
- Lotte Kvalheim
- Mads Bårnes
- Sara Seeberg-Rommetvet


## Features

- **Filtering:** Easily filter categories to find exactly what you're looking for.
- **Search:** Quickly search for specific places or countries of interest.
- **Sorting:** Sort attractions alphabetically or by rating to find either the best- or worst-rated spots.
- **User Reviews:** Read insights from other travelers or contribute with your own experiences to help others.
- **Dark or Light Mode:** Switch between dark and light modes for a viewing experience that suits your preference.
- **Detailed Information:** Discover more about any location by either searching directly or exploring browse cards in the "Browse" section, then clicking "Discover More."

## How To Run

To run the application in development mode, follow these steps:

> **💡 Note** </br>
> You will not be able to start the backend server without access to our `.env` file. As a result, you can still run the frontend, but the application will display no data, and much of the functionality will be unavailable. This is a security measure to protect our database from unauthorized access or modifications.


1. **Clone the repository**:

    ```bash
    # SSH
    git clone git@git.ntnu.no:IT2810-H24/T33-Project-2.git

    # HTTPS
    git clone https://git.ntnu.no/IT2810-H24/T33-Project-2.git

    cd T33-Project-2
    ```

2. **Install dependencies**:

    ```bash
    npm i
    ```

3. **Start the backend development server**:
    ```bash
    npm run dev:backend
    ```

    Runs on [localhost:4000/graphql](localhost:4000/graphql)

4. **Open a `new ternimal` and start the frontend development server**:

    ```bash
    npm run dev:frontend
    ```

5. **Open your browser** and navigate to `http://localhost:3000` to see the application running.

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.


## How To Test

How to run the tests in development mode, follow these steps:
 1. Run both the backend and frontend, 
 see **step 3 and 4 under the "How To Run"** section
 2. **Open a `new ternimal` and run the e2e test**:
    ```bash
    npx cypress open
    ```


## Technology Used

- **React with TypeScript:** For building the frontend in a dynamic and type-safe way.
- **PostgreSQL:** A relational database for storing and managing our application data.
- **Apollo Server:** Serves as the GraphQL server for handling the API requests.
- **GraphQL:** Used to efficiently query and manage data between the frontend and backend.
- **shadcn/ui:** The component library used in the project to ensure for a consistent and visually appealing user interface.
