import { outputFileSync } from "fs-extra";
import sharp from "sharp";
import path from "path";

export interface IMinifyInfo {
	detail: string;
	resize400: string;
}

const DEFAULT_OPTION_JPEG: sharp.JpegOptions = {
  mozjpeg: true,
  progressive: true,
  quality: 80,
  optimiseScans: true,
};

const DEFAULT_OPTION_PNG: sharp.PngOptions = {
  progressive: true,
  quality: 80,
};

export const minify = async (buffer: Buffer | undefined, filename: string): Promise<IMinifyInfo> => {
  const info: IMinifyInfo = {
    detail: `upload/${filename}/detail.jpg`,
    resize400: `upload/${filename}/resize.jpg`,
  };
  // 변환 저장
  const detailBuffer = await processDetail(buffer).then((detailBuffer) => {
    outputFileSync(path.resolve(info.detail), detailBuffer || "");
    return detailBuffer;
  });
  // 리사이징
  processResize400(detailBuffer).then((resizeBuffer) => {
    outputFileSync(path.resolve(info.resize400), resizeBuffer || "");
  });

	return info;
};

const processDetail = async (buffer: Buffer | undefined): Promise<Buffer> => {
  return sharp(buffer).jpeg(DEFAULT_OPTION_JPEG).toBuffer();
};

const processResize400 = async (
  buffer: Buffer | undefined
): Promise<Buffer> => {
  return sharp(buffer).resize({ width: 400, height: 400 }).toBuffer();
};
