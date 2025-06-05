import express from "express";
import * as workController from "../controllers/WorkController"

const router = express.Router({ mergeParams: true });

router.get('/', workController.getAllWorks);
router.get('/works', workController.getAllWorksForWork);
router.get('/by-ids', workController.getWorksByIdsForHome);
router.get('/:id', workController.getWorkById);
router.post('/', workController.createWork);

export default router;
