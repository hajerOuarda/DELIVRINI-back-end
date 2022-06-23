import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Ingredients } from "../Models/Association";

async function findAllIngredients(options: any, element: string): Promise<Ingredients[]> {
    return await Ingredients.findAll<Ingredients>({
        where: {
            fk_element: element
        },
        limit: parseInt(options.limit),
        offset: options.offset,
    });
}

async function findOneIngredients(IngredientsId: string): Promise<Ingredients | null> {
    return await Ingredients.findByPk<Ingredients>(IngredientsId);
}

async function createIngredients(ingredients: any) {
    const params = ingredients;
    return await Ingredients.create<Ingredients>(
        {
            ...ingredients,
            fk_element: params.element
        }
    );
}

async function updateIngredients(ingredients: Ingredients, id?: string) {
    const ingredientsId = id;
    const params = ingredients;

    const options: UpdateOptions = {
        where: { id: ingredientsId },
        limit: 1,
    };

    return await Ingredients.update(params, options);
}

async function deleteIngredients(ingredients: string) {
    const options: DestroyOptions = {
        where: { id: ingredients },
        limit: 1,
    };

    return await Ingredients.destroy(options);
}

export {
    findAllIngredients,
    findOneIngredients,
    createIngredients,
    updateIngredients,
    deleteIngredients
}