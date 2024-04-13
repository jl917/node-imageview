import mongoose, { Schema } from "mongoose";

export interface InterfaceImages {
  original: string;
  s400x400: string;
}

const imagesSchema = new Schema<InterfaceImages>({
  original: { type: String },
  s400x400: { type: String },
});

export const Images = mongoose.model<InterfaceImages>("image", imagesSchema);
