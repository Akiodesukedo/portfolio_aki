import express from "express";
import * as blogController from "../controllers/BlogController"

const router = express.Router({ mergeParams: true });

router.get('/', blogController.getAllBlogs);
router.get('/by-slugs', blogController.getMultipleBlogsBySlugs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', blogController.createBlog);

export default router;