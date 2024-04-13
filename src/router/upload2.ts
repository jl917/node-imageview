import { Router, Request, Response } from "express";
import { outputFileSync } from "fs-extra";
import multer from "multer";
import path from "path";
import { AxiosResponse } from "axios";
import { getFilename } from "@/utils/getFilename";
import { getFileExtension } from "@/utils/getFileExtention";
import { addImages, findImages } from "@/db/action";
import { InterfaceImages } from "@/db/model";
import { customProcess } from "@/imgProcess/customProcess";
import { getImageResponse } from "@/utils/getImageResponse";

const upload = multer();

const router = Router();

router.get("/image", async (req: Request, res: Response) => {
  const query = {
    p: req.query.p || "",
    format: req.query.format || "",
    progressive: req.query.progressive || "",
    width: req.query.width || "",
    height: req.query.height || "",
    quality: req.query.quality || "",
    crop: req.query.crop || "",
  } as InterfaceImages;

  let imgPath: any = await findImages(query);

  try {
    if (!imgPath) {
      const { data } = await getImageResponse(query.p);
      const value = await customProcess(data, query);
      const { acknowledged } = await addImages({ ...query, value });
      if (acknowledged) {
        imgPath = { ...query, value };
      }
    }

    const { headers, data }: AxiosResponse<Buffer> = await getImageResponse(imgPath.value || imgPath.p);
    console.log(headers);
    res.set("Content-Type", headers["content-type"]);
    res.send(Buffer.from(data));
  } catch (error) {
    res.status(500).send("존재하지 않는 이미지 입니다.");
  }
});

router.post("/uploadImages2", upload.single("file"), async (req: Request, res: Response) => {
  const filename = getFilename();
  const origin = `./upload/${filename}/original.${getFileExtension(req.file?.originalname)}`;
  outputFileSync(path.resolve(origin), req.file?.buffer || "");
  res.json({ origin });
});

export default router;
