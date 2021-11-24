# Domains:
## Boats
```/api/boat``` - Get all boats - filterable with query string i.e. /api/boat?handicap=10&ownerId=1

```GET /api/boats/:id ``` Returns a specific boat 
``` 
{
    Id = Type(Number) 
} 
```

```POST api/boats ``` Creates a new boat in the database
```
{
    JSON Body:
    {
        typeOfBoat : String
        classId: Number
        ownerId: Number
        teamId: Number (Can be NULL)
        handiCapRating: Double
    }
}
```

```PUT api/boats/:id ``` Updates an exisitng boat with the new body
```
{
    Path argument:
    {
        id: Number
    }

    JSON Body:
    {
        typeOfBoat : String
        classId: Number
        ownerId: Number
        teamId: Number (Can be NULL)
        handiCapRating: Double
    }
}
```

```DELETE api/boats/:id``` Deletes a specific boat
```
{
    Path argument:
    {
        id: Number
    }
}
```

## Races

```GET api/race ```  - Get all Races - filterable with query string i.e. /api/boat?classid=10&eventID=1

```GET api/race/:id ``` Returns a race with with a specific Id
```
{
    Id = Type(nummber) 
}
```

```POST api/race ``` Creates a new race in the databse
```
{
    JSON Body
    {
        eventid: Number
        startTime: timestamp
        classId: Number
    }
}
```

```PUT api/race/:id ``` Updates an existing race
```
{
    Query params
    {
        id: Number
    }

    JSON Body
    {
        eventid: Number
        startTime: timestamp
        classId: Number
    }
}
```

```DELETE api/race/:id``` Deletes a specific race
```
{
     Query params:
    {
        id: Number
    }
}
```

## RaceBoats

```GET api/race/:id/boat/:id ``` Returns specific races and boats and can be queried by Id.


```POST api/race/:id/boat/``` This will record the startTime, finishTime, position for a specific boat in a specific race 
```
{
    JSON Body
    {
        boatId: Number
        startTime: timestamp
        finishTime: timestamp
        position: Number
    }
}
```

```POST api/boat/:id/race/``` Registering a race for a specific boat
```
{
    JSON Body
    {
        raceId: Number
        startTime: timestamp
        finishTime: timestamp
        position: Number
    }
}
```

## Teams

```GET api/teams/``` Returns all teams

```GET api/teams/:id``` Returns the team name for the specified id
```
{
    id = Type(Number)
}
```

```POST api/teams```
```
{
    JSON Body
    {
        name: VARCHAR(255)
    }
}
```

```PUT api/teams/:id```
```
Query params
{
    id: Number
}

JSON Body
{
    name: VARCHAR(255)
}
```

```DELETE api/teams/:id``` Deletes a specific team
```
{
     Query params:
    {
        id: Number
    }
}
```

## Events

```GET api/events``` Returns all events from the database. Queriable by query string.

```GET api/events/:id``` Returns a specific event from the databse
```
Query params:
{
    id: Number
}
```

```PUT api/events/:Id ``` Updates the specified eventType
```
{
    Query params
    {
        Id = Type(nummber) 
    }

    JSON Body
    {
        eventTypeID: Number,
        startTime: timestamp,
        endDate: timestamp,
        name: VARHCHAR(255),
        creatorId: Number
        decription: VARCHAR(255)
    }
}
```

```DELETE api/events/:id``` Deletes a specific event
```
{
     Query params:
    {
        id: Number
    }
}
```

## EventTypes

```GET api/event/types``` Returns all eventTypes from the database

```POST api/event/type ``` Creates a new eventType
```
{
    JSON Body
    {
        name: VARCHAR(255)
    }
}
```

```PUT api/event/type/:eventId ``` Updates the specified eventType
```
{
    Query params
    {
        eventId = Type(nummber) 
    }

    JSON Body
    {
        name: VARCHAR(255)
    }
}
```

```DELETE api/event/type/:id``` Deletes a specific eventType
```
{
     Query params:
    {
        id: Number
    }
}
```

## Members

```GET api/members ``` Returns all the members from the databse

```GET api/members/:Id ``` Returns a specific member
```
{
    Id = Type(nummber) 
}
```

``` PUT api/members/:Id ``` Updates an exisitng member
```
{
      Query params
    {
        Id = Type(nummber) 
    }

    JSON Body
    {
        name: VARCHAR(255),
        roleId: number
    }
}
```

```POST api/members/ ``` Creates a new member
```
{
    JSON Body
    {
        name: VARCHAR(255),
        roleId: number
    }
}
```

```DELETE api/memnbers/:id``` Deletes a specific member
```
{
     Query params:
    {
        id: Number
    }
}
```