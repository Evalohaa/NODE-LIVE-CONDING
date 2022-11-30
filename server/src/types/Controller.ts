import { Request, Response } from "express";

interface IController {
  [k: string]: (Arg0: Request, Arg1: Response) => void;
}
 export default IController;
