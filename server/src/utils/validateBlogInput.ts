type BlogBlock = {
  type: "paragraph" | "image" | "heading" | "code" | "quote";
  text?: string;
  imageUrl?: string;
  alt?: string;
  caption?: string;
};

type BlogBtn = {
  btnName?: string;
  url?: string;
};

type BlogInput = {
  title?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  thumbnailImageUrl?: string;
  blocks?: BlogBlock[];
  btns?: BlogBtn[];
  published?: boolean;
};

export const validateBlogInput = (body: BlogInput): string | null => {
  if (!body.title?.trim()) return "Title is required";
  if (!body.slug?.trim()) return "Slug is required";
  if (!body.description?.trim()) return "Description is required";
  if (!body.thumbnailImageUrl?.trim()) return "Thumbnail image URL is required";

  if (!Array.isArray(body.tags) || body.tags.length === 0) {
    return "At least one tag is required";
  }

  if (!Array.isArray(body.blocks) || body.blocks.length === 0) {
    return "At least one block is required";
  }

  for (const block of body.blocks) {
    if (!block.type) return "Each block must have a type";

    if (
      !["paragraph", "image", "heading", "code", "quote"].includes(block.type)
    ) {
      return `Invalid block type: ${block.type}`;
    }

    if (block.type === "image") {
      if (!block.imageUrl?.trim()) {
        return "Image blocks must have imageUrl";
      }
    } else {
      if (!block.text?.trim()) {
        return `${block.type} blocks must have text`;
      }
    }
  }

  if (body.btns) {
    if (!Array.isArray(body.btns)) return "Buttons must be an array";

    for (const btn of body.btns) {
      if (!btn.btnName?.trim()) return "Each button must have btnName";
      if (!btn.url?.trim()) return "Each button must have url";
    }
  }

  return null;
};