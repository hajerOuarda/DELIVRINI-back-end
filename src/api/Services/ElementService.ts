import multer from "multer";
import path from "path";
import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Element } from "../Models/Association";

export interface ElementAttributs {
  name: string,
  description: string,
  image: string,
  price: string,
  restaurant: string,
  fk_Mealcategory: string,
}

async function findAllElement(options: any, restaurant: any): Promise<Element[]> {

  return await Element.findAll<Element>({
    where: {
      fk_restaurant: restaurant
    },
    limit: parseInt(options.limit),
    offset: options.offset,
  });

}

async function findOneElement(elementId: string): Promise<Element | null> {
  return await Element.findByPk<Element>(elementId);
}

async function createElement(element: any) {
  const params = element;
 
  return await Element.create<Element>({
    ...params,
    // fk_restaurant: params.restaurant,
  });
}

async function updateElement(element: any, id?: string) {
  const elementId = id;
  const params = element;

  const options: UpdateOptions = {
    where: { id: elementId },
    limit: 1,
  };

  return await Element.update(params, options);
}

async function deleteElement(element: string) {
  const options: DestroyOptions = {
    where: { id: element },
    limit: 1,
  };

  return await Element.destroy(options);
}


const storage = multer.diskStorage({
  destination(req, _file, cb) {
    const dir = '../images/';

    cb(null, path.join(__dirname, '../images/elements'))
  },
  filename(_req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage
}).single('image')

export {
  findAllElement,
  findOneElement,
  createElement,
  updateElement,
  deleteElement,
  upload, storage
}