# Service

Every services defined here will be called via `app/api/[endpoint]`. The reason behind this is to seperate services to solely backend processing (database, redis).

There should be another client serves mapping the fetch to those endpoints but using same interface.

## Cache Service

- getKey
- checkKey
- setKey

## Database Service

- find
- insert
- update
- delete
- list

## Map Service
