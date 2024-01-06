# Service

Every services defined here will be called via `app/api/[endpoint]`. The reason behind this is to seperate services to solely backend processing (database, redis).

There should be another client serves mapping the fetch to those endpoints but using same interface.

## Cache Service

The Cache Service provides methods for managing cache in the application. It includes the following methods:

- `getKey(key: string)`: Retrieves the value of a given key from the cache.
- `checkKey(key: string)`: Checks if a given key exists in the cache.
- `setKey(key: string, value: any)`: Sets a value for a given key in the cache.

## Database Service

The Database Service provides methods for interacting with the database. It includes the following methods:

- `find(query: object)`: Finds documents in the database that match the given query.
- `insert(document: object)`: Inserts a new document into the database.
- `update(query: object, update: object)`: Updates documents in the database that match the given query.
- `delete(query: object)`: Deletes documents from the database that match the given query.
- `list()`: Lists all documents in the database.

## Map Service

The Map Service provides methods for interacting with the map. It includes the following methods:

### Map Place Service

- `getPlaceId(placeName: string, apiKey: string)`: Gets the place ID from the Google Maps API.
- `getPlaceDetails(placeId: string, apiKey: string, languageCode: 'en' | 'ja')`: Gets the place details from the Google Maps API.
- `getPlacePhoto(photoReference: string, apiKey: string)`: Gets the place photo from the Google Maps API.

### Map Restaurant Service

- `getRestaurantData(lat: number, lng: number, apiKey: string)`: Gets the restaurant data from the Google Maps API.

### Map Route Service

- `getDistanceMatrixData(originPlaceId: string, destinationPlaceId: string, apiKey: string)`: Gets the distance matrix data from the Google Maps API.
