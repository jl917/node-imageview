import { outputFileSync } from "fs-extra";
import sharp from "sharp";
import path from "path";
import { nanoid } from "@/utils/getFilename";
import { InterfaceImages } from "@/db/model";

type FormatType = "jpeg" | "png";

const extensionMap: any = {
  ".jpg": ".jpg",
  ".jpeg": ".jpg",
  ".png": ".png",
};

export const customProcess = async (buffer: Buffer | undefined, query: InterfaceImages): Promise<string> => {
  const ext = extensionMap[path.extname(query.p)];

  let value = `${path.dirname(query.p)}/${nanoid()}${ext}`;
  // 변환 저장
  await processImage(buffer, query).then((imageBuffer) => {
    outputFileSync(path.resolve(value), imageBuffer || "");
  });

  return value;
};

const processImage = async (buffer: Buffer | undefined, query: InterfaceImages): Promise<Buffer> => {
  let formatType: FormatType = "jpeg";
  let options = {};
  let resizeOptions: any = [
    query.width ? parseInt(query.width, 10) : null,
    query.height ? parseInt(query.height, 10) : null,
    {
      fit: query.width && query.height ? "fill" : "contain",
    },
  ];

  if (query.format === "jpg" || query.format === "jpeg") {
    formatType = "jpeg";
    options = {
      mozjpeg: true,
      optimiseScans: true,
    };
  }
  if (query.format === "png") {
    formatType = "png";
    options = {};
  }

  options = {
    ...options,
    progressive: query.progressive === 'true' ? true : false,
    quality: query.quality ? parseInt(query.quality, 10) || 80 : 80,
  };

  return sharp(buffer)
    [formatType](options)
    .resize(...resizeOptions)
    .toBuffer()
};
