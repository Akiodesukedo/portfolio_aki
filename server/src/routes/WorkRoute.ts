import express from "express";
import * as workController from "../controllers/WorkController"
import { verifyAuth } from "../middleware/verifyAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router({ mergeParams: true });

// Public endpoints
router.get('/', workController.getAllWorks);
router.get('/works', workController.getAllWorksForWork);
router.get('/by-ids', workController.getWorksByIdsForHome);
router.get('/:id', workController.getWorkById);

// Protected endpoints
router.post('/', verifyAuth, requireAdmin, workController.createWork);

export default router;
