import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Extras } from "../Models/Association";

async function findAllExtras(options: any): Promise<Extras[]> {
    return await Extras.findAll<Extras>({
        limit: parseInt(options.limit),
        offset: options.offset,
    });
}

async function findOneExtras(extrasId: string): Promise<Extras | null> {
    return await Extras.findByPk<Extras>(extrasId);
}

async function createExtras(params: any) {
    const element = params.element
    const extras = params.values
    extras.map((i: any) => i.fk_element = element)

    return await Extras.bulkCreate<Extras>(
        extras
    );
}

async function updateExtras(extras: any, id?: string) {
    const extrasId = id;
    const params = extras;

    const options: UpdateOptions = {
        where: { id: extrasId },
        limit: 1,
    };

    return await Extras.update(params, options);
}

async function deleteExtras(extras: string) {
    const options: DestroyOptions = {
        where: { id: extras },
        limit: 1,
    };

    return await Extras.destroy(options);
}

export {
    findAllExtras,
    findOneExtras,
    createExtras,
    updateExtras,
    deleteExtras
}