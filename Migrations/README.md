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