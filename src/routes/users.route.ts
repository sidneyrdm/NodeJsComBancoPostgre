import { ESRCH } from "constants";
import { Router, Request, Response, NextFunction } from "express";
import { report } from "process";
import db from "../db";
import userRepository from "../repositories/user.repository";
import { StatusCodes } from "http-status-codes";
import DataBaseError from "../models/errors/database.error.model";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();

    res.status(200).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByID(req.params.uuid);
        res.status(200).send({ user });

    } catch (error) {
        next(error);
    }
});

usersRoute.post('/users/', async (req: Request, res: Response, next: NextFunction) => {

    const newUser = req.body;

    const uuid = await userRepository.create(newUser);

    res.status(200).send(uuid);
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {

    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);

    res.status(200).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {

    await userRepository.remove(req.params.uuid);

    res.sendStatus(200);

});

export default usersRoute;