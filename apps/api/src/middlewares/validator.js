import { validationResult } from "express-validator";

export function validationError(req, res, next) {
    try {
      const errors = validationResult(req);
      // console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(401).json({
          msg: errors.array({ onlyFirstError: true })[0].msg,
        });
      }
  
      return next();
    } catch (error) {
      res.status(500).json({
        msg: "validation error :" + error.message,
      });
    }
  }