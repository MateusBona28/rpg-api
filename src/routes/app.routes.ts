import { Router } from "express";

export const appRouter = Router()

appRouter.get('/healthy', (req, res) => res.json({ message: 'healthy' }))