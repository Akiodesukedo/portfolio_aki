import mongoose from "mongoose";

// This is the schema for block that contains one of those enums (para, image, heading, or quote)
// Example on Frontend side
// {
//   type: "paragraph",
//   text: "This is the paragraph text"
// }
// {
//   type: "image",
//   imageUrl: "/images/blogs/my-image.webp",
//   alt: "Screenshot of the dashboard",
//   caption: "Initial dashboard concept"
// }
const blogBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["paragraph", "image", "heading", "quote"]
    },
    text: { type: String },
    imageUrl: { type: String },
    alt: { type: String },
    caption: { type: String }
  },
  { _id: false }
);

// And this is the actual blog schema
const blogSchema = new mongoose.Schema(
  {
    // Info for list page
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    thumbnailImageUrl: { type: String },

    // Detailed page content
    blocks: [blogBlockSchema],

    // Optional buttons
    btns: [
      {
        btnName: { type: String },
        url: { type: String }
      }
    ],

    published: { type:Boolean }
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);