import { Router, Request, Response } from "express";
import { outputFileSync } from "fs-extra";
import multer from "multer";
import path from 'path';
import axios from "axios";
import { getFilename } from "@/utils/getFilename";
import { getFileExtension } from "@/utils/getFileExtention";

const upload = multer();

const router = Router();

router.get("/image", async (req: Request, res: Response) => {
  const { p, format, progressive, width, height, quality, crop } = req.query;
  try {
    // 외부 이미지의 URL을 정의
    const imageURL = `http://localhost:5000/${p}`;

    // `axios`를 사용하여 외부 이미지 다운로드
    const response = await axios.get(imageURL, {
        responseType: 'arraybuffer' // 바이너리 데이터를 받기 위해 responseType 설정
    });
    // Content-Type 헤더를 설정
    res.set('Content-Type', response.headers['content-type']);
    // 다운로드한 이미지를 클라이언트에 전송
    res.send(Buffer.from(response.data));
} catch (error) {
    console.error('외부 이미지 다운로드 중 오류가 발생했습니다:', error);
    res.status(500).send('외부 이미지 다운로드 중 오류가 발생했습니다.');
}
  // res.type("jpeg")
  // outputFileSync(path.resolve(origin), req.file?.buffer || '')
  // res.sendFile(path.resolve('upload/20240413/97a61d405b/original.png'));
});

router.post("/uploadImages2", upload.single('file'), async (req: Request, res: Response) => {
  const filename = getFilename();
  const origin = `./upload/${filename}/original.${getFileExtension(req.file?.originalname)}`
  outputFileSync(path.resolve(origin), req.file?.buffer || '')
  res.json({ origin });
});

export default router;
