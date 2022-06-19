import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { paginate } from "../middlewares/validators";
import { Extras } from "../Models/Association";
import { createExtras, deleteExtras, findAllExtras, findOneExtras, updateExtras } from "../Services/ExtrasService";

const extrasController = Router();
extrasController.get("/all", (req: Request, res: Response) => {
    const size: any = req.query.size; // number of records per page, pageSize
    const page: any = req.query.page; // page number
    const options = paginate(page, size);
    findAllExtras(options)
        .then((extras: Array<Extras>) => {
            res.send(extras);
        })
        .catch((err: Error) => {
            res.json(err.message);
        });
});

extrasController.get("/:id", (req: Request, res: Response) => {
    const extrasId = req.params.id;

    findOneExtras(extrasId)
        .then((extras) => {
            if (extras) {
                return res.status(200).json({ extras_found: extras });
            } else
                return res.status(404).json({ errors: message.extras.error.not_found });
        })
        .catch((err: Error) => res.status(404).json(err.message));
});

extrasController.post("/", (req: Request, res: Response) => {
    const extrasField = req.body
    createExtras(extrasField)
        .then((extras) => {
            res.send({
                message: message.extras.success.created,
                extras: extras,
            });
        })
        .catch((err: Error) => {
            res.json({
                message: message.extras.error.not_created,
                error: err.message,
            });
        });
});
extrasController.patch("/:id", (req: Request, res: Response) => {
    updateExtras(req.body, req.params.id)
        .then((nbr) => {
            if (nbr[0])
                findOneExtras(req.params.id).then(
                    (extras) => {
                        res.status(200).send({
                            message: message.extras.success.updated,
                            updatedextras: extras
                        });
                    }
                ).catch()
            else
                res.status(401).send({
                    message: message.extras.error.not_updated,
                });
        })
        .catch((err: Error) => {
            res.status(404).json(err.message);
        });
});
extrasController.delete("/:id", (req: Request, res: Response) => {
    const extrasId = req.params.id;
    deleteExtras(extrasId)
        .then((nbr) => {
            if (nbr)
                res
                    .status(200)
                    .json({ message: message.extras.success.deleted, id: extrasId });
            else
                res.status(404).json({
                    message: message.extras.error.not_deleted,
                });
        })
        .catch((err: Error) => res.json({ error: err.message }));
});

export default extrasController