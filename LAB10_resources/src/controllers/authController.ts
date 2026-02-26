import { Request, Response } from "express";
import { seedUsers } from "../data/seed";

export function login(req: Request, res: Response): void {
  const username = (req.body.username ?? "").toString().trim();
  const password = (req.body.password ?? "").toString();
  const user = seedUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.redirect("/?q=invalid");
    return;
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect("/todos");
}

export function logout(req: Request, res: Response): void {
  req.session.destroy(() => res.redirect("/"));
}
