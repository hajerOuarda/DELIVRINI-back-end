import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { paginate } from "../middlewares/validators";
import { Ingredients } from "../Models/Association";
import { createIngredients, deleteIngredients, findAllIngredients, findOneIngredients, updateIngredients } from "../Services/IngredientsService";

const ingredientsController = Router();
ingredientsController.get("/all", (req: Request, res: Response) => {
    const size: any = req.query.size; // number of records per page, pageSize
    const page: any = req.query.page; // page number
    const options = paginate(page, size);
    findAllIngredients(options)
        .then((ingredientss: Array<Ingredients>) => {
            res.send(ingredientss);
        })
        .catch((err: Error) => {
            res.json(err.message);
        });
});

ingredientsController.get("/:id", (req: Request, res: Response) => {
    const ingredientsId = req.params.id;

    findOneIngredients(ingredientsId)
        .then((ingredients) => {
            if (ingredients) {
                return res.status(200).json({ ingredients_found: ingredients });
            } else
                return res.status(404).json({ errors: message.ingredients.error.not_found });
        })
        .catch((err: Error) => res.status(500).json(err.message));
});

ingredientsController.post("/", (req: Request, res: Response) => {
    const  ingredientsField=req.body
    createIngredients(ingredientsField)
        .then((ingredients) => {
            res.send({
                message: message.ingredients.success.created,
                ingredients: ingredients,
            });
        })
        .catch((err: Error) => {
            res.json({
                message: message.ingredients.error.not_created,
                error: err.message,
            });
        });
});
ingredientsController.patch("/:id", (req: Request, res: Response) => {
    updateIngredients(req.body, req.params.id)
        .then((nbr) => {
            if (nbr[0])
                findOneIngredients(req.params.id).then(
                    (ingredients) => {
                        res.status(200).send({
                            message: message.ingredients.success.updated,
                            updatedIngredients: ingredients
                        });
                    }
                ).catch()
            else
                res.status(401).send({
                    message: message.ingredients.error.not_updated,
                });
        })
        .catch((err: Error) => {
            res.status(500).json(err.message);
        });
});
ingredientsController.delete("/:id", (req: Request, res: Response) => {
    const ingredientsId = req.params.id;
    deleteIngredients(ingredientsId)
        .then((nbr) => {
            if (nbr)
                res
                    .status(200)
                    .json({ message: message.ingredients.success.deleted, id: ingredientsId });
            else
                res.status(404).json({
                    message: message.ingredients.error.not_deleted,
                });
        })
        .catch((err: Error) => res.json({ error: err.message }));
});

export default ingredientsController