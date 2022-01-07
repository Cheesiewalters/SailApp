CREATE TABLE IF NOT EXISTS public.EventTypes(
    id          serial
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Clubs(
    id          serial  
            primary key,
    name        VARCHAR(2550)
);

CREATE TABLE IF NOT EXISTS public.Members(
    id          serial  
                primary key,
    firstName   VARCHAR(255),
    lastName   VARCHAR(255),
    email       VARCHAR(255),
    password    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Club_Member(
    id          serial  
            primary key,
    clubId      integer REFERENCES public.Clubs (id),
    memberId    integer REFERENCES public.Members (id)
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


CREATE TABLE IF NOT EXISTS Public.Teams(
    id          serial  
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.TeamMembers(
    id          serial 
            primary key,
    memberId      integer REFERENCES public.Members (id),
    teamId    integer REFERENCES public.Teams (id)
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
    teamId      integer NULL REFERENCES public.Teams (id)
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