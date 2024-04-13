import { Images, InterfaceImages } from "./model";

export const addImages = (data: InterfaceImages) => {
  return Images.collection.insertOne(data);
};

export const findImages = (data: InterfaceImages) => {
  return Images.collection.findOne(data);
};
