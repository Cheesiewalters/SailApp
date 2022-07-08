import { Request, Response } from "express";
import { RaceService } from "../services";

const okStatus = 200;

async function getAllRaces(req: Request, res: Response) {
  const race = await RaceService.getRaces();
  if (!race || race.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(race);
}

async function getRaceByID(req: Request, res: Response) {
  const race = await RaceService.getRaceID(Number(req.params.id));
  if (!race || race.length === 0) return res.sendStatus(204);
  res.status(okStatus).json({ race });
}

async function postRace(req: Request, res: Response) {
  const newRace = await RaceService.createRace(req.body);
  res.status(okStatus).json({
    newRace,
  });
}

async function deleteRace(req: Request, res: Response) {
  await RaceService.removeRace(Number(req.params.id));
  res.status(okStatus).json({
    message: `Successfully deleted race with id: ${req.params.id}`,
  });
}

async function updateRace(req: Request, res: Response) {
  const updatedRace = await RaceService.updateRaces(
    req.body,
    Number(req.params.id)
  );
  res.status(okStatus).json({
    updatedRace,
  });
}

async function postRaceBoats(req: Request, res: Response) {
  await RaceService.createRaceBoat(req.body, Number(req.params.id));
  res.status(okStatus).json({
    message: `Successfully created boat:${req.body.boatId} for race:${req.params.id} `,
  });
}

async function getAllRaceBoatsByID(req: Request, res: Response) {
  const boats = await RaceService.getRaceBoat(Number(req.params.id));
  if (!boats || boats.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(boats);
}

async function deleteAllRaceBoatsById(req: Request, res: Response) {
  await RaceService.deleteRaceBoatsByID(Number(req.params.id2));
  res.status(okStatus).json({
    message: `Successfully deleted race boat with id: ${req.params.id}`,
  });
}

async function updateRaceBoatByBoatId(req: Request, res: Response) {
  const updatedRace = await RaceService.updateRaceBoat(
    req.body,
    Number(req.params.id)
  );

  res.status(okStatus).json({
    message: "Succesfully updated raceBoat",
  });
}

async function getRaceBoatByBoatId(req: Request, res: Response) {
  const boat = await RaceService.getRaceBoatByBoat(
    Number(req.params.id),
    Number(req.params.id2)
  );
  res.status(okStatus).json(boat);
}

export {
  getAllRaces,
  postRace,
  deleteRace,
  updateRace,
  getRaceByID,
  postRaceBoats,
  getAllRaceBoatsByID,
  deleteAllRaceBoatsById,
  updateRaceBoatByBoatId,
  getRaceBoatByBoatId,
};
