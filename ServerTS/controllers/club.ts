import { Request, Response } from "express";
import { ClubService } from "../services";
const okStatus = 200;

async function getAllClubs(req: Request, res: Response) {
  const Clubs = await ClubService.getClubs();
  if (!Clubs || Clubs.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(Clubs);
}

async function postClub(req: Request, res: Response) {
  const newClub = await ClubService.createClub(req.body);
  res.status(okStatus).json({
    newClub,
  });
}

async function deleteClubController(req: Request, res: Response) {
  await ClubService.deleteClub(Number(req.params.id));

  return res.sendStatus(204);
}

async function updateClubController(req: Request, res: Response) {
  const updatedClub = await ClubService.updateClub(
    req.body,
    Number(req.params.id)
  );
  res.sendStatus(204);
}

async function getClubByIDController(req: Request, res: Response) {
  const club = await ClubService.getClubById(Number(req.params.id));
  res.status(okStatus).json(club);
}

export {
  getAllClubs,
  postClub,
  deleteClubController,
  updateClubController,
  getClubByIDController,
};
