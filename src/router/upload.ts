import { Router, Request, Response } from "express";
import { outputFileSync } from "fs-extra";
import multer from "multer";
import path from 'path';
import { minify } from "@/imgProcess";
import { getFilename } from "@/utils/getFilename";
import { getFileExtension } from "@/utils/getFileExtention";

const upload = multer();

const router = Router();

router.post("/uploadImages", upload.single('file'), async (req: Request, res: Response) => {
  const filename = getFilename();
  const info = await minify(req.file?.buffer, filename);
  outputFileSync(path.resolve(`./upload/${filename}/original.${getFileExtension(req.file?.originalname)}`), req.file?.buffer || '')

  res.json(info);
});

export default router;
