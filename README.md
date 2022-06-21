
This app allows users to create sailing events for clubs and allows them to track the results of races within events

- Create new events
- Search events
- Add a boat to a club
- Add a boat to an event
- Add a boat to a race
- Record start / finsih time for races

The architecture of the project is :

 - Frontend - ReactJS
 - Backend - ExpressJS, prisma as an ORM to the database
 - Database - postressSQL

ERD for postrgress SQL database

[![ERD.png](https://i.postimg.cc/bJJQwJLF/ERD.png)](https://postimg.cc/xkwks9wK)


ERD
```mermaid
  erDiagram
          Event ||--|{ EventType : ofType
          Event ||--|{ Race : contains
          Event ||--|| User: contains
          User ||--|| Role: ofType
          Race ||--|{ RaceBoat : includes
          RaceBoat ||--|{ Boat: includes
          Boat ||--|{ Club : registered
          Boat ||--|| Class : registered
```

### Running locally

To run the project locally simply:

navigate to the root directory and run the following command:

```docker-compose up --build ```