import mongoose, { Schema } from "mongoose";

export interface InterfaceImages {
  p: string;
  format: string;
  progressive: string;
  width: string;
  height: string;
  quality: string;
  value?: string
}

const imagesSchema = new Schema<InterfaceImages>({
  p: { type: String },
  format: { type: String },
  progressive: { type: String },
  width: { type: String },
  height: { type: String },
  quality: { type: String },
});

export const Images = mongoose.model<InterfaceImages>("image", imagesSchema);
