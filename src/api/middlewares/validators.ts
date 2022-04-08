import { NextFunction, Request, Response } from "express";

/** Fields validator middleware */
const checkEmptyObject = (object: any, key: string) => {
  if (!object[key] || !Object.keys(object[key]).length) {
     throw new Error(`Empty object`);
  }
};

const requireFields = (location: any, fields: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      checkEmptyObject(req, location);
      const missing = [];
      for (const key of fields) {
        if (
          (<any>req)[location][key] === undefined ||
          !(<any>req)[location][key]
        )
          missing.push(key);
      }

      if (missing.length)
        throw new Error(`Missing or empty field(s): ${missing.join(", ")}`);
      next();
    } catch (err: any) {
      next(err.message);
    }
  };
};
const requireBodyFields = (fields: any) => requireFields("body", fields);
const requireQueryFields = (fields: any) => requireFields("query", fields);

/** pagination function */
const paginate = (page: any, size: any) => {
   const limit = size;
  const offset = limit * (parseInt(page) - 1);

  return {
    offset: offset,
    limit: size,
  };
};
export { requireBodyFields, requireQueryFields, paginate };
