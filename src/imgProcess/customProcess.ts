import { outputFileSync } from "fs-extra";
import shart from "sharp";
import path from "path";
import { getFilename, nanoid } from "@/utils/getFilename";
import { InterfaceImages } from "@/db/model";
import { getFileExtension } from "@/utils/getFileExtention";

const DEFAULT_OPTION_JPEG: shart.JpegOptions = {
  mozjpeg: true,
  progressive: true,
  quality: 80,
  optimiseScans: true,
};

// export interface InterfaceImages {
//   p: string;
//   format: string;
//   progressive: string;
//   width: string;
//   height: string;
//   quality: string;
//   crop: string;
// }

const extensionMap: any = {
  '.jpg': ".jpg",
  '.jpeg': ".jpg",
  '.png': ".png",
};

export const customProcess = async (buffer: Buffer | undefined, query: InterfaceImages): Promise<string> => {
  const ext = extensionMap[path.extname(query.p)];
  console.log(path.dirname(query.p));
  let value = `${path.dirname(query.p)}/${nanoid()}${ext}`;
  // 변환 저장
  await processImage(buffer).then((imageBuffer) => {
    outputFileSync(path.resolve(value), imageBuffer || "");
  });

  return value;
};

const processImage = async (buffer: Buffer | undefined): Promise<Buffer> => {
  return shart(buffer).jpeg(DEFAULT_OPTION_JPEG).toBuffer();
};
