# SightSee 🌍

_Link to our website:_ <https://git.ntnu.no/IT2810-H24/T33-Project-2/>

> **⚠ NB** </br>
> Make sure you are connected to NTNU eduroam Wi-Fi og VPN

## Table of Contents

1. [SightSee](#sightsee)
2. [Developer Information](#developer-information)
3. [Design Choices](#design-choices)
4. [Technologies](#technologies)
5. [Testing](#testing)
6. [How To Run](#how-to-run)
7. [How To Test](#how-to-test)

## SightSee

SightSee is an application designed to enhance the travel experience by providing users with detailed information about various tourist attractions. Here you can browse through attractions, sort by categories, read and write reviews, and save your favorite destinations. The application aims to make sightseeing more enjoyable and informative by leveraging modern web technologies.

### The application and its different pages are explained in the following walkthrough

#### LandingPage

The first page the user is met by after opening the application. It features a carousel showcasing popular destinations and a section for discovering new places.

![Homepage image] ()

#### BrowsePage

The main page where a variety of tourist attractions are displayed. It is possible to filter on different categories and countries, and sort by name or rating. By clicking on a BrowseCard the user can see more detailes about the attraction and from there navigate to the DestinationPage of the clicked attraction.

![Browsepage image] ()

#### DestinationPage

This page provides detailed information about a specific tourist attraction, including user reviews. Logged-in users can also write reviews and save the destination to their favorites.

![Destinationpage image] ()

#### LoginPage

The page where users can log in to their accounts. If the user does not have an account, they can register to create one.

![Loginpage image] ()

#### My Account

The users profile page where they can view and manage their personal information, reviews and saved destinations. Users can edit

## Developer Information

**Developed by:**

- Aurora Nergaard
- Lotte Kvalheim
- Mads Bårnes
- Sara Seeberg-Rommetvet

## Design Choices

### Choice of data

We have filled our database with data from various sources on tourist attractions. This includes information such as attraction names, descriptions, and images. Additionally, we generated users and some reviews with ratings for each attraction. Since this data was partly randomized, there may be some inconsistencies between review text and rating (e.g., a high review with a negative comment), but they do not impack the core functionality of the application.

### Choices related to search, filtering and sorting

We implemented comprehensive search, filtering, and sorting functionalities to enhance user experience. Users can search for destinations by text similarity, filter results by categories and countries, and sort them by various criteria such as rating and alphabetical order. These features ensures that users can easily find and organize the information they need, making the application more user-friendly and efficient.

### Choices related to sustainability

We have made several design choices to ensure the sustainability of our application:

#### Efficient data transfer

We minimize data transfer by optimizing our API calls and using pagination for large datasets. This reduces the amount of data sent over the network, conserving bandwidth and reducing energy consumption.

#### Debounce
We implemented a debounce functionality in our search bar in order to improve both performance and sustainability. By delaying the API calls until the user has paused typing, we are able to minimize unnecessary requests, which reduces the server load.

#### Lazy loading

We implemented lazy loading for images and other media content. This means that images are only loaded when they are about to enter the viewport, reducing unnecessary data transfer.

#### Color choices

Our color palette is designet to be visually appealing and energy-efficient, particulary for devices with OLED screens where darker colors consume less power. We also support dark mode to further reduce energy consumption on such devices.

### Choices related to accessibility

To ensure our application is accessible to all usesrs, we have implemented several key measures. Firstly, we have incorporated ARIA labels to improve support for screen readers. This helps users with visuals impairments navigate the application ore effectivelt. Our color palette was designed with inclusivity in mind. It is optimized for users with different types of color blindness, ensuring all visual elements remain clear and visible, confirmed by our Lighthouse tests. Additionally, we prioritized keyboard navigation by making all interactive elements accessible through tabulation.

### Choices related to responsive design

We have prioritized responsive design to ensure a seamless experience across devices and screen sizes. By leveraging CSS Grid and Flexbox, our layout adapt dynamically to different screens, while media queries finetune styles like font sizes and margins for optimal readability. Responsive images adjust to device resolution, enhancing load times and visual quality.

### Choices related to global state management

### Choices related to reproducible code

To ensure others can easily understand and run the project as intended, we have focused on creating reproducible and well-documented code. This README provides detailed information about the application, including instructions for installation and running, testing procedures, and overview of the technology stack, and explanations of key design choices. Throughout the codebase, we have added descriptive comments to clairify their purpose and functionality.

## Technologies

### Frontend

**React with TypeScript:** React enables dynamic, component-based interfaces that are efficient and scalable. TypeScript adds type safety, which reduces bugs and improves reliability in the code.

**shadcn:** This UI component library provides a cohesive and visually appealing interface across the app, maintaining a consistent design language throughout.

### Backend

**Apollo Server and GraphQL:**
Apollo Server with GraphQL enables efficient data fetching, allowing only necessary data to be requested. This minimizes load times and reduces bandwidth usage, improving app performance.

**PostgreSQL:**
PostgreSQL is used as the relational database for managing structured data and handling complex queries. It stores essential information such as user reviews and destination details.

## Testing

**Cypress** Cypress is used for end-to-end testing to validate key features, including search, filtering, and navigation. This framework simulates user interactions to verify that the application performs as expected across various scenarios.

**Unit tests**

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

1. Run both the backend and frontend,
    see **step 3 and 4 under the "How To Run"** section
2. **Open a `new terminal` and run the e2e test**:

    ```bash
    npm run cypress:open
    ```

3. Pick the E2E option on the right side

   ![Pick the E2E option](frontend/src/assets/images/landing_page_e2e.webp )

4. Click Chrome option

   ![Click the Chrome option](frontend/src/assets/images/choose_browser.webp)
5. Pick the `routing.cy.ts` option to start the e2e test

    ![Click the routing.cy.ts](frontend/src/assets/images/navigate_to_routing.webp)

### Components tests

Open a terminal and navigate to the frontend file:

```bash
    cd frontend
```

Then run the tests from there:

```bash
    npm run test
```
