import express from "express";
import * as blogController from "../controllers/BlogController"
import { verifyAuth } from "../middleware/verifyAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router({ mergeParams: true });

// Public endpoints
router.get('/', blogController.getAllBlogs);
router.get('/by-slugs', blogController.getMultipleBlogsBySlugs);
router.get('/:slug', blogController.getBlogBySlug);

// Protected endpoints
router.post('/', verifyAuth, requireAdmin, blogController.createBlog);

export default router;