# Event-App
A React Native app designed to allow users to explore live events happening in a city of their choosing 

![Mockup Image](./assets/gifs/1-14.gif)

🛑 *This project is a work in progress, but feel free to check out the progress made so far!* 

### Instructions for running project locally

Prerequisites:

- The [Expo CLI](https://docs.expo.dev/) must be installed on your system
- You must have access to the [SeatGeek API](https://seatgeek.com/build)

Steps:

1) Clone Repository
2) Install dependencies with `npm install` or `yarn`
3) Create a `.env` file with the following Key/Value pairs:
```
REACT_APP_SEATGEEK_CLIENT_ID=<YOUR_SEATGEEK_CLIENT_ID>
REACT_APP_SEATGEEK_CLIENT_SECRET=<YOUR_SEATGEEK_CLEINT_SECRET>
```
4) Run project with `yarn start` or `npm run start`
5) Follow instructions given in the terminal by the Expo CLI to access the application 


### Current Features

- A screen providing the ability to explore venues in the city of a users choosing. A screen for these venues and a list of events and their dates which will be happening at that venue. 

- This application pulls in event data from the [SeatGeek API](https://seatgeek.com/build). 
In order to utilize the API without a need for consulting its documentation, the [types for all possible query responses and all possible input parameters](https://github.com/mthomas100/Event-App/tree/master/types) were written. Creating these types was merely involved a Postman GET request to the various API endpoints and pasting of the JSON results obtained there into the [MakeTypes Generator](https://jvilk.com/MakeTypes/)

- A custom hook called [useSeatGeekQuery](https://github.com/mthomas100/Event-App/blob/master/hooks/useSeatGeekQuery.tsx) 
that takes the arguments of resource and params in order to query the API effectively. 

- Combining types for the API and the useSeatGeekQuery which allows for rapid and type safe building of the application while maximizing the potential out of the SeatGeek API.

- Infinite scroll (paginates through query after scrolling to the bottom of venue feed). *See logic for the implementation of this feature [here](https://github.com/mthomas100/Event-App/blob/master/components/VenuesList.tsx)*

### Future Features

- I plan to create a page for each venue. When it is clicked on, the user of the application will be able to browse events that are scheduled to happen at that venue. 
Each event in turn have its own page with information about the entertainer that is to play and a link to buy tickets for that event. 

- More tabs that utilize features of the SeatGeek API in addition to a "Home" tab. 
