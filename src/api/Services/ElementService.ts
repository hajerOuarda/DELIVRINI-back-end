import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Element } from "../Models/Association";

async function findAllElement(options: any, restaurant:any): Promise<Element[]> {
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
    fk_restaurant: params.restaurant,
    fk_Mealcategory: params.mealCategory

  });
}

async function updateElement(element: Element, id?: string) {
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

export {
  findAllElement,
  findOneElement,
  createElement,
  updateElement,
  deleteElement
}