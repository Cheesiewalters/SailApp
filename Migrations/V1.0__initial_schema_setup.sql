CREATE TABLE IF NOT EXISTS public.EventTypes(
    id          serial
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Roles(
    id          serial  
            primary key,
    Role        VARCHAR(2550)
);

CREATE TABLE IF NOT EXISTS public.Members(
    id          serial  
            primary key,
    name        VARCHAR(255),
    roleId      integer REFERENCES public.Roles (id)
);

CREATE TABLE IF NOT EXISTS public.Events(
    id          serial
            primary key,
    eventTypeId    integer REFERENCES public.EventTypes (id),
    startTime      TIMESTAMP,
    endDate        TIMESTAMP,
    name           VARCHAR(255),
    creatorId      integer REFERENCES public.Members (id),
    description    VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS Public.Teams(
    id          serial  
            primary key,
    name        VARCHAR(255)
);



CREATE TABLE IF NOT EXISTS public.TeamMembers(
    memberId      integer REFERENCES public.Members (id),
    teamId    integer REFERENCES public.Teams (id)
);

CREATE TABLE IF NOT EXISTS public.Class(
    id          serial
            primary key,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.BoatTypes(
    id          serial
            primary key,
    typeOfboat  VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.Boats(
    id          serial
            primary key,
    name        VARCHAR(256),
    typeId      integer REFERENCES public.BoatTypes (id),
    classId     integer REFERENCES public.Class (id),
    ownderId    integer NULL REFERENCES public.Members (id),
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
    raceId      integer REFERENCES public.Races (id),
    boatId      integer REFERENCES public.Boats (id),
    startTime   TIMESTAMP,
    finishTime  TIMESTAMP,
    position integer
);