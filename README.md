# City Explorer

## Introduction
This is a simple web application that allows users to explore a city and find nearby places of interest.

### Technologies
The application is built using the following technologies:
- Node.js
- Express
- [Geoapify Places API](https://www.geoapify.com/api-docs/places-api/)

## API Endpoints
The application exposes the following endpoints:

- `GET /api/supermarkets`: Fetches a list of supermarkets within a specified radius around a given latitude and longitude.
- `GET /api/entertainment`: Retrieves entertainment venues within a specified radius around provided latitude and longitude coordinates.
- `GET /api/parks`: Gets a list of parks within a certain radius of the provided latitude and longitude.
- `GET /api/restaurants`: Returns a list of restaurants, optionally filtered by categories and conditions, within a specified radius around given latitude and longitude.
- `POST /api/feedback`: Allows users to post feedback with their user information and comments.

### API Documentation
The API documentation is available [here](https://documenter.getpostman.com/view/13952131/2s9YsJBCY7)

## Running The Application
```sh
npm start
```

## Credits
This project was co-developed by [Cursor](https://github.com/getcursor/cursor) and [myself](https://github.com/Zubs).
