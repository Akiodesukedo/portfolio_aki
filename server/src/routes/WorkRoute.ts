import express from "express";
import * as workController from "../controllers/WorkController"

const router = express.Router({ mergeParams: true });

router.get('/', workController.getAllWorks);
router.get('/home', workController.getAllWorksForHome);
router.get('/:id', workController.getWorkById);
router.post('/', workController.createWork);

export default router;
