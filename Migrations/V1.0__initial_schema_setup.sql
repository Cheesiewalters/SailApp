CREATE TABLE IF NOT EXISTS public.EventTypes(
    id          serial
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Clubs(
    id          serial  
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Role(
    id          serial  
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.User(
    id          serial  
                primary key,
    email   VARCHAR(255),
    password   VARCHAR(255),
    roleId       integer REFERENCES public.Role (id),
);

CREATE TABLE IF NOT EXISTS public.Events(
    id          serial
            primary key,
    eventTypeId    integer REFERENCES public.EventTypes (id),
    startTime      TIMESTAMP,
    endDate        TIMESTAMP,
    name           VARCHAR(255),
    clubId      integer REFERENCES public.Clubs (id),
    description    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Class(
    id          serial
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Boats(
    id          serial
            primary key,
    name        VARCHAR(255),
    sailNo      VARCHAR(255),
    classId     integer REFERENCES public.Class (id),
    clubId      integer REFERENCES public.Clubs (id),
);

CREATE TABLE IF NOT EXISTS public.Races(
    id          serial  
            primary key,
    eventId     integer REFERENCES public.Events (id),
    startTime   TIMESTAMP,
    classId     integer REFERENCES public.Class (id)
);

CREATE TABLE IF NOT EXISTS public.RaceBoats(
    id          serial primary key,
    raceId      integer REFERENCES public.Races (id),
    boatId      integer REFERENCES public.Boats (id),
    startTime   TIMESTAMP,
    finishTime  TIMESTAMP,
    position integer
);