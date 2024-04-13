import { Images, InterfaceImages } from "./model";

export const addImages = (data: InterfaceImages) => {
  Images.collection.insertOne(data).then(() => console.log('wow'));
};
