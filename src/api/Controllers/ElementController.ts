import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { paginate } from "../middlewares/validators";
import { Element } from "../Models/Association";
import { createElement, deleteElement, findAllElement, findOneElement, updateElement } from "../Services/ElementService";

const elementController = Router();
elementController.get("/all", (req: Request, res: Response) => {
  const size: any = req.query.size; // number of records per page, pageSize
  const page: any = req.query.page; // page number
  const options = paginate(page, size);
  findAllElement(options)
    .then((meal: Array<Element>) => {
      res.send({ element_list: meal });
    })
    .catch((err: Error) => {
      res.json(err.message);
    });
});

elementController.get("/:id", (req: Request, res: Response) => {
  const elementId = req.params.id;

  findOneElement(elementId)
    .then((element) => {
      if (element) {
        return res.status(200).json({ element_found: element });
      } else
        return res.status(404).json({ errors: message.element.error.not_found });
    })
    .catch((err: Error) => res.status(500).json(err.message));
});

elementController.post("/", (req: Request, res: Response) => {
  createElement(req.body)
    .then((element) => {
      res.send({
        message: message.element.success.created,
        element: element,
      });
    })
    .catch((err: Error) => {
      res.json({
        message: message.element.error.not_created,
        error: err.message,
      });
    });
});
elementController.patch("/:id", (req: Request, res: Response) => {
  updateElement(req.body, req.params.id)
    .then((nbr) => {
      if (nbr[0])
        res.status(200).send({
          message: message.element.success.updated,
        });
      else
        res.status(401).send({
          message: message.element.error.not_updated,
        });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
elementController.delete("/:id", (req: Request, res: Response) => {
  const elementId = req.params.id;
  deleteElement(elementId)
    .then((nbr) => {
      if (nbr)
        res
          .status(200)
          .json({ message: message.element.success.deleted, id: elementId });
      else
        res.status(404).json({
          message: message.element.error.not_deleted,
        });
    })
    .catch((err: Error) => res.json({ error: err.message }));
});

export default elementController