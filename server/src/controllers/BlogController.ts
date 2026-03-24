import { Blog } from "../models/blogModel";
import { Request, Response } from "express";
import { validateBlogInput } from "../utils/validateBlogInput";

// Get all the blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error"});
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      res.status(404).json({ message: "Not found" })
      return
    };
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get multiple blog posts based on slugs
export const getMultipleBlogsBySlugs = async (req: Request, res: Response) => {
  try{
    const { slugs } = req.query;

    const rawSlugs = Array.isArray(slugs) ? slugs : [slugs];
    const slugArray = rawSlugs.map((slug) => String(slug).trim());
    const validSlugs = slugArray.filter((slug) => slug.length > 0);

    if (validSlugs.length === 0 ) {
      res.status(400).json({ message: "No valid IDs provided." });
      return
    }

    const blogs = await Blog.find({ slug: { $in: validSlugs } });

    const blogsBySlugs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      tags: blog.tags,
      description: blog.description,
      thumbnailImageUrl: blog.thumbnailImageUrl,
      createdAt: blog.createdAt,
      published: blog.published
    }));

    res.status(200).json(blogsBySlugs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const validationError = validateBlogInput(req.body)

    if (validationError) {
      res.status(400).json({message: validationError})
      return
    }

    const existingSlug = await Blog.findOne({ slug: req.body.slug })
    if (existingSlug) {
      res.status(400).json({ message: "The slug is already used. Use a different slug" });
      return;
    }

    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data" });
  }
};