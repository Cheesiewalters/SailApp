import { Request, Response } from "express";
import { BoatService } from "../services";

async function getAllClasses(req: Request, res: Response) {
  const classes = await BoatService.getAllClasses();
  const noContent = !classes || classes.length < 1;
  if (noContent) return res.sendStatus(204);
  return res.status(200).json(classes);
}

async function getBoats(req: Request, res: Response) {
  const boats = await BoatService.getBoats();
  const noContent = !boats || boats.length < 1;
  if (noContent) return res.sendStatus(204);
  return res.status(200).json(boats);
}

async function getBoatById(req: Request, res: Response) {
  const { id } = req.params;

  const boat = await BoatService.getBoatsById(Number(id));
  const noContent = !boat || boat.length < 1;
  if (noContent) return res.sendStatus(204);
  return res.status(200).json(boat);
}

async function postBoat(req: Request, res: Response) {
  const boat = await BoatService.saveBoat(req.body);
  return res.status(204).json(boat);
}

async function updateBoat(req: Request, res: Response) {
  const boat = await BoatService.updateBoat(req.body, Number(req.params.id));
  return res.status(200).json(boat);
}

async function deleteBoat(req: Request, res: Response) {
  const { id } = req.params;
  await BoatService.removeBoat(Number(id));
  return res.status(204);
}

export {
  getAllClasses,
  getBoats,
  getBoatById,
  postBoat,
  updateBoat,
  deleteBoat,
};
