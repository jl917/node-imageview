import { addImages } from "@/db/action";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/22", (req: Request, res: Response) => {
  // addImages({original: 'hello', s400x400: 'world'})
  res.send("Typescript + Node.js + Express Serv22er2");
});

export default router;
