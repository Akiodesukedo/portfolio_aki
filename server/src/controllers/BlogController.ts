import { Blog } from "../models/blogModel";
import { Request, Response } from "express";
import { validateBlogInput } from "../utils/validateBlogInput";

// Get all the blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
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

// Get related blog posts based on shared tags
export const getRelatedBlogs =async (req: Request, res: Response) => {
  try {
    const {slug, limit} = req.query

    const blogSlug = String(slug || "").trim()
    const blogNum = Number(limit) || 3

    if (!blogSlug) {
      res.status(400).json({ message: "Blog slug is required" })
      return
    }

    // Check current blog tags first
    const currentBlog = await Blog.findOne({ slug: blogSlug })

    if (!currentBlog) {
      res.status(404).json({ message: "Blog not found" })
      return
    }

    const currentTags = currentBlog.tags || []

    if (currentTags.length === 0) {
      res.status(200).json([])
      return
    }

    // Then look for blogs that have share the same tag
    const relatedBlogs = await Blog.find({
      _id: { $ne: currentBlog._id },
      tags: { $in: currentTags },
      published: true
    })
      .sort({ createdAt: -1 })
      .limit(blogNum)

    // Make the response cleaner
    const formattedBlogs = relatedBlogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      tags: blog.tags,
      description: blog.description,
      thumbnailImageUrl: blog.thumbnailImageUrl,
      createdAt: blog.createdAt,
      published: blog.published,
    }))

    res.status(200).json(formattedBlogs)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
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