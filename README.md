## Table of Contents

1. [SightSee](#sightsee)
2. [Hosted](#hosted)
3. [Developer Information](#developer-information)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [How To Run](#how-to-run)
7. [How To Test](#how-to-test)
8. [Design and Technology Choices](#design-and-technology-choices)

## SightSee

SightSee is an application designed to enhance the travel experience by providing users with detailed information about various tourist attractions. It offers features such as filtering, sorting, user reviews, and content to help travelers plan their visits effectively.The application aims to make sightseeing more enjoyable and informative by leveraging modern web technologies.

## Hosted

The website is hosted at
[SightSee on NTNU](http://it2810-33.idi.ntnu.no/project2/) .

> **⚠ NB!!** > </br>
> This is the only place you will be able to see the whole application!

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

## Folder Structure

To help navigate the codebase, here’s a quick overview of the main folders and their purpose:

- **/backend** - Contains backend-specific code for the application.

  - **/src** - Holds the core server files.
    - **/models** - Defines the data models used in the database (e.g., destination, user, review).
    - **/resolvers** - Contains GraphQL resolver functions that handle API requests and perform operations on the data models.

- **/cypress** - Contains end-to-end (e2e) test setup and test files.

  - **/e2e** - Houses specific e2e test files for different parts of the application, ensuring functionality is tested.

- **/frontend** - Contains all frontend-specific code and assets.
  - **/public** - Static assets accessible from the root URL.
  - **/src** - Holds the main application code for the frontend.
    - **/assets** - Contains images for the carousel.
    - **/components** - Reusable UI components for building various parts of the interface.
    - **/graphql** - Contains frontend GraphQL queries.
    - **/layouts** - Shared layout components for organizing the app structure across different pages.
    - **/lib** - Utility functions and helper code that support various features of the app.
    - **/pages** - Page-level components corresponding to each route in the application (e.g., Home, Browse, Profile).

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

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## How To Test

### End to end tests

How to run the tests in development mode, follow these steps:

1.  Run both the backend and frontend,
    see **step 3 and 4 under the "How To Run"** section
2.  **Open a `new terminal` and run the e2e test**:

    ```bash
    npx cypress open
    ```

### Components tests

Open a terminal and navigate to the frontend file:

```bash
    cd frontend
```

Then run the tests from there:

```bash
    npm run test
```

## Design and Technology Choices

SightSee was developed to provide a smooth, interactive experience for users seeking information about tourist attractions. Below is an overview of the design and technology choices that drive the app's functionality and user experience.

### Frontend

- **React with TypeScript:** React enables dynamic, component-based interfaces that are efficient and scalable. TypeScript adds type safety, which reduces bugs and improves reliability in the code.
- **shadcn/ui:** This UI component library provides a cohesive and visually appealing interface across the app, maintaining a consistent design language throughout.
- **Dark/Light Mode:** A dark/light mode option allows users to switch display modes, enhancing usability in different lighting environments and providing a personalized experience.

### Backend

- **Apollo Server and GraphQL:** Apollo Server with GraphQL enables efficient data fetching, allowing only necessary data to be requested. This minimizes load times and reduces bandwidth usage, improving app performance.
- **PostgreSQL:** PostgreSQL is used as the relational database for managing structured data and handling complex queries. It stores essential information such as user reviews and destination details.

### Functionality

- **Filtering, Sorting, and Search:** These features are implemented to allow users to easily filter, sort, and search for destinations based on their interests.
- **User Reviews and Ratings:** Users can read and submit reviews, contributing to a more interactive experience. Reviews are stored in PostgreSQL and managed through Appolo server and GraphQL, ensuring efficient data handling.
- **Responsive Design:** The frontend adapts to different screen sizes, allowing the application to work seamlessly on both desktop and mobile devices.

### Testing and Quality Assurance

- **Cypress:** Cypress is used for end-to-end testing to validate key features, including search, filtering, and navigation. This framework simulates user interactions to verify that the application performs as expected across various scenarios.

### Overall Design Choices

The application is designed to offer a clear, intuitive, and visually appealing experience that prioritizes usability. We focused on reducing visual clutter while maintaining a modern, cohesive design. By using **shadcn/ui** as the component library, we ensured a consistent look across the entire application, with all components sharing a unified style for a seamless user experience.

Additionally, we prioritized accessibility by ensuring sufficient color contrast and selecting color palettes that accommodate users with color blindness, enhancing inclusivity for all users.
