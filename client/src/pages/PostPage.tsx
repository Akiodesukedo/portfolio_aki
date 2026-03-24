import { useState } from "react"
import CtaBtn from "../atoms/CtaBtn"

type BlogBlockType = "heading" | "paragraph" | "quote" | "image"

type BlogBlock = {
  type: BlogBlockType
  text?: string
  imageUrl?: string
  alt?: string
  caption?: string
}

type BtnItem = {
  btnName: string
  url: string
};

type PostType = "blog" | "work"

const PostPage:React.FC = () => {
  const fetchUrl = import.meta.env.VITE_BACKEND_URL;

  const [postType, setPostType] = useState<PostType>("blog")
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  // -------------------------------
  // Blog post state management
  // -------------------------------
  const [blogTitle, setBlogTitle] = useState<string>("")
  const [blogSlug, setBlogSlug] = useState<string>("")
  const [blogTags, setBlogTags] = useState<string>("")
  const [blogDescription, setBlogDescription] = useState<string>("")
  const [blogThumbnailImageUrl, setBlogThumbnailImageUrl] = useState<string>("")
  const [blogPublished, setBlogPublished] = useState<boolean>(false)
  const [blogBlocks, setBlogBlocks] = useState<BlogBlock[]>([
    { type: "heading", text: "" },
    { type: "paragraph", text: "" }
  ])
  const [blogButtons, setBlogButtons] = useState<BtnItem[]>([
    { btnName: "", url: "" }
  ])

  // -------------------------------
  // Work post state management
  // -------------------------------
  const [workTitle, setWorkTitle] = useState("");
  const [workYear, setWorkYear] = useState("");
  const [workTags, setWorkTags] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [workProjectImageUrl, setWorkProjectImageUrl] = useState("");
  const [workVideoLoc, setWorkVideoLoc] = useState("");
  const [workDetailedDesc, setWorkDetailedDesc] = useState("");
  const [workTechStackImageUrl, setWorkTechStackImageUrl] = useState("");
  const [workTechStackExps, setWorkTechStackExps] = useState("");
  const [workContributionImageUrl, setWorkContributionImageUrl] = useState("");
  const [workContributionExps, setWorkContributionExps] = useState("");
  const [workScreenImageUrl, setWorkScreenImageUrl] = useState("");
  const [workModalMsg, setWorkModalMsg] = useState("");
  const [workModalCtaUrl, setWorkModalCtaUrl] = useState("");
  const [workButtons, setWorkButtons] = useState<BtnItem[]>([
    { btnName: "", url: "" }
  ])

  const addBlogBlock = () => {
    setBlogBlocks((prev) => [...prev, { type: "heading", text: "" }])
  }

    // 🚨🚨🚨 Have to make a pop up to confirm delete to prevent accidental delete 🚨🚨🚨
  const removeBlogBlock = (index: number) => {
    setBlogBlocks((prev) => prev.filter((_, i) => i !== index ))
  }

  const updateBlogBlock = (
    index: number,
    field: keyof BlogBlock,
    value: string
  ) => {
    setBlogBlocks((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, [field]: value } : block
      )
    );
  };

  const addBlogButton = () => {
    setBlogButtons((prev) => [...prev, { btnName: "", url: "" }])
  }

  const removeBlogButton = (index: number) => {
    setBlogButtons((prep) => prep.filter((_, i) => i !== index))
  }

  const updateBlogButton = (
    index: number,
    field: keyof BtnItem,
    value: string
  ) => {
    setBlogButtons((prev) =>
      prev.map((button, i) =>
        i === index ? { ...button, [field]: value } : button
      )
    )
  }

  const addWorkButton = () => {
    setWorkButtons((prev) => [...prev, { btnName: "", url: "" }])
  }

  const removeWorkButton = (index: number) => {
    setWorkButtons((prep) => prep.filter((_, i) => i !== index))
  }

  const updateWorkButton = (
    index: number,
    field: keyof BtnItem,
    value: string
  ) => {
    setWorkButtons((prev) =>
      prev.map((button, i) =>
        i === index ? { ...button, [field]: value } : button
      )
    )
  }

  const parseCommaSeparated = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const parseLineSeparated = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const buildBlogContents = () => {
    return {
      title: blogTitle,
      slug: blogSlug,
      tags: parseCommaSeparated(blogTags),
      description: blogDescription,
      thumbnailImageUrl: blogThumbnailImageUrl,
      blocks: blogBlocks.map((block) => {
        if (block.type === "image") {
          return {
            type: block.type,
            imageUrl: block.imageUrl || "",
            alt: block.alt || "",
            caption: block.caption || ""
          };
        }

        return {
          type: block.type,
          text: block.text || ""
        };
      }),
      btns: blogButtons.filter((btn) => btn.btnName.trim() && btn.url.trim()),
      published: blogPublished
    };
  }

  const buildWorkContents = () => {
    return {
      title: workTitle,
      year: workYear,
      tags: parseCommaSeparated(workTags),
      description: workDescription,
      projectImageUrl: workProjectImageUrl,
      videoLoc: workVideoLoc,
      detailedDesc: workDetailedDesc,
      techStackImageUrl: workTechStackImageUrl,
      techStackExps: parseLineSeparated(workTechStackExps),
      contributionImageUrl: workContributionImageUrl,
      contributionExps: parseLineSeparated(workContributionExps),
      btns: workButtons.filter((btn) => btn.btnName.trim() && btn.url.trim()),
      screenImageUrl: parseLineSeparated(workScreenImageUrl),
      modalMsg: workModalMsg,
      modalCtaUrl: workModalCtaUrl
    };
  }

  const isBlogValid = () => {
    // Basic fields
    if (!blogTitle.trim()) return false;
    if (!blogSlug.trim()) return false;
    if (!blogDescription.trim()) return false;
    if (!blogThumbnailImageUrl.trim()) return false;
  
    // Tags
    if (parseCommaSeparated(blogTags).length === 0) return false;
  
    // Blocks
    if (blogBlocks.length === 0) return false;
  
    for (const block of blogBlocks) {
      if (!block.type) return false;
  
      if (block.type === "image") {
        if (!block.imageUrl?.trim()) return false;
        if (!block.alt?.trim()) return false;
        if (!block.caption?.trim()) return false;
      } else {
        if (!block.text?.trim()) return false;
      }
    }
  
    return true;
  };

  const isWorkValid = () => {
    if (!workTitle.trim()) return false;
    if (!workYear.trim()) return false;
    if (!workDescription.trim()) return false;
    if (!workProjectImageUrl.trim()) return false;
    if (!workVideoLoc.trim()) return false;
    if (!workDetailedDesc.trim()) return false;
    if (!workTechStackImageUrl.trim()) return false;
    if (!workContributionImageUrl.trim()) return false;
    if (!workModalMsg.trim()) return false;
    if (!workModalCtaUrl.trim()) return false;
  
    // Tags (comma separated input)
    if (parseCommaSeparated(workTags).length === 0) return false;
  
    // Arrays (line separated inputs)
    if (parseLineSeparated(workTechStackExps).length === 0) return false;
    if (parseLineSeparated(workContributionExps).length === 0) return false;
    if (parseLineSeparated(workScreenImageUrl).length === 0) return false;
  
    // Buttons
    if (workButtons.length === 0) return false;
  
    for (const btn of workButtons) {
      if (!btn.btnName.trim()) return false;
      if (!btn.url.trim()) return false;
    }
  
    return true;
  };

  const isFormValid =
  postType === "blog" ? isBlogValid() : isWorkValid();

  const resetBlogForm = () => {
    setBlogTitle("")
    setBlogSlug("")
    setBlogTags("")
    setBlogDescription("")
    setBlogThumbnailImageUrl("")
    setBlogPublished(true)
    setBlogBlocks([
      { type: "heading", text: "" },
      { type: "paragraph", text: "" }
    ])
    setBlogButtons([{ btnName: "", url: "" }])
  };

  const resetWorkForm = () => {
    setWorkTitle("")
    setWorkYear("")
    setWorkTags("")
    setWorkDescription("")
    setWorkProjectImageUrl("")
    setWorkVideoLoc("")
    setWorkDetailedDesc("")
    setWorkTechStackImageUrl("")
    setWorkTechStackExps("")
    setWorkContributionImageUrl("")
    setWorkContributionExps("")
    setWorkScreenImageUrl("")
    setWorkModalMsg("")
    setWorkModalCtaUrl("")
    setWorkButtons([{ btnName: "", url: "" }])
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const endpoint = postType === "blog" ? "/blogs" : "/works"
      const contents = postType === "blog" ? buildBlogContents() : buildWorkContents()
      console.log(contents)

      const res = await fetch(`${fetchUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contents)
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      if (res.ok) {
        setMessage(`${postType} posted successfully`);

        if (postType === "blog") {
          resetBlogForm();
        } else {
          resetWorkForm();
        }
      }
    } catch(err) {
      const error =
        err instanceof Error ? err.message : "Something went wrong";
      setMessage(error);
    } finally {
      setLoading(false);
    }

  }


  return (
    <div className="max-w-[1080px] mx-auto px-[24px] py-[48px]">
      <h1 className="text-3xl font-bold mb-[24px]">Post Page</h1>
      <div className="flex gap-[12px] mb-[32px]">
        <CtaBtn 
          type="button"
          btnMsg="Blog"
          borderColor="border-black"
          bgColor={postType === "blog" ? "bg-black" : "bg-white"}
          txtColor={postType === "blog" ? "text-white" : "text-black"}
          marginTop="mt-0"
          passedFunc={() => setPostType("blog")}
        />
        <CtaBtn 
          type="button"
          btnMsg="Work"
          borderColor="border-black"
          bgColor={postType === "work" ? "bg-black" : "bg-white"}
          txtColor={postType === "work" ? "text-white" : "text-black"}
          marginTop="mt-0"
          passedFunc={() => setPostType("work")}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
        {postType === "blog" && (
          <div>

            {/* ℹ️ Blog Info ℹ️ */}
            <section className="flex flex-col gap-[32px] text-left mt-[24px]">
              <h2 className="text-xl font-semibold">Blog Info</h2>
              <input
                type="text"
                placeholder="Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="slug-here (Has to be hyphenated)"
                value={blogSlug}
                onChange={(e) => setBlogSlug(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Tags (Comma seperated)"
                value={blogTags}
                onChange={(e) => setBlogTags(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <textarea
                placeholder="Description"
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                className="border rounded px-[12px] py-[8px] min-h-[100px]"
              />
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                value={blogThumbnailImageUrl}
                onChange={(e) => setBlogThumbnailImageUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <label className="flex items-center gap-[8px]">
                <input 
                  type="checkbox"
                  checked={blogPublished}
                  onChange={(e) => setBlogPublished(e.target.checked)}
                />
                Publish this post immediately once submitted
              </label>
            </section>

            {/* 🌉 Actual Blog Contents here 📝 */}
            <section className="mt-[24px]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Blog Blocks
                </h2>
                <CtaBtn 
                  type="button"
                  btnMsg="Add Block"
                  passedFunc={() => addBlogBlock()}
                  width="w-[300px]"
                  className="hover:bg-black hover:text-white"
                />
              </div>
              <div className="flex flex-col gap-[24px] mt-[24px]">
                {blogBlocks.map((block, index) => (
                  <div 
                    key={index}
                    className="bg-gray-200 rounded p-[24px] flex flex-col gap-[12px]"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        Block #{index + 1}
                      </p>
                      <CtaBtn 
                        type="button"
                        btnMsg="Remove Block"
                        passedFunc={() => removeBlogBlock(index)}
                        width="w-[300px]"
                        txtColor="text-red-600"
                        marginTop="mt-0"
                        className="border-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      />
                    </div>
                    <select
                      value={block.type}
                      onChange={(e) => {
                        updateBlogBlock(
                          index,
                          "type",
                          e.target.value as BlogBlockType
                        )
                      }}
                      className="border rounded px-[12px] py-[8px] bg-white"
                    >
                      <option value="heading">Heading</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="quote">Quote</option>
                      <option value="image">Image</option>
                    </select>
                    {block.type === "image" ? (
                      <div className="flex flex-col gap-[8px]">
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={block.imageUrl || ""}
                          onChange={(e) => updateBlogBlock(
                            index,
                            "imageUrl",
                            e.target.value
                          )}
                          className="border rounded px-[12px] py-[8px] bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Alt Text"
                          value={block.alt || ""}
                          onChange={(e) => updateBlogBlock(
                            index,
                            "alt",
                            e.target.value
                          )}
                          className="border rounded px-[12px] py-[8px] bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Image Caption"
                          value={block.caption || ""}
                          onChange={(e) => updateBlogBlock(
                            index,
                            "caption",
                            e.target.value
                          )}
                          className="border rounded px-[12px] py-[8px] bg-white"
                        />
                      </div>
                    ):(
                      <textarea 
                        placeholder="Text"
                        value={block.text}
                        onChange={(e) => updateBlogBlock(
                          index,
                          "text",
                          e.target.value
                        )}
                        className="border rounded px-[12px] py-[8px] min-h-[100px] bg-white"
                      />
                    )}
                  </div>
                ))}                
              </div>
            </section>

            {/* Button section */}
            <section >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Links if any
                </h2>
                <CtaBtn 
                  type="button"
                  btnMsg="Add Btn"
                  passedFunc={() => addBlogButton()}
                  width="w-[300px]"
                  className="hover:bg-black hover:text-white"
                />     
              </div>
              <div className="flex flex-col gap-[24px] mt-[24px]">
                {blogButtons.map((button, index) => (
                  <div 
                    key={index}
                    className="bg-gray-200 rounded p-[24px] flex flex-col gap-[12px]"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        Button #{index + 1}
                      </p>
                      <CtaBtn 
                        type="button"
                        btnMsg="Remove Button"
                        passedFunc={() => removeBlogButton(index)}
                        width="w-[300px]"
                        txtColor="text-red-600"
                        marginTop="mt-0"
                        className="border-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <input
                        type="text"
                        placeholder="Button Name"
                        value={button.btnName || ""}
                        onChange={(e) => updateBlogButton(
                          index,
                          "btnName",
                          e.target.value
                        )}
                        className="border rounded px-[12px] py-[8px] bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Button URL"
                        value={button.url || ""}
                        onChange={(e) => updateBlogButton(
                          index,
                          "url",
                          e.target.value
                        )}
                        className="border rounded px-[12px] py-[8px] bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {postType === "work" && (
          <div>
            {/* ℹ️ Work Info ℹ️ */}
            <section className="flex flex-col gap-[32px] text-left mt-[24px]">
              <h2 className="text-xl font-semibold">Work Contents</h2>
              <input
                type="text"
                placeholder="Title"
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Year"
                value={workYear}
                onChange={(e) => setWorkYear(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Tags (Comma seperated)"
                value={workTags}
                onChange={(e) => setWorkTags(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <textarea
                placeholder="Description"
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                className="border rounded px-[12px] py-[8px] min-h-[100px]"
              />
              <input
                type="text"
                placeholder="Project Image URL"
                value={workProjectImageUrl}
                onChange={(e) => setWorkProjectImageUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Video URL"
                value={workVideoLoc}
                onChange={(e) => setWorkVideoLoc(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <textarea
                placeholder="Detailed Description"
                value={workDetailedDesc}
                onChange={(e) => setWorkDetailedDesc(e.target.value)}
                className="border rounded px-[12px] py-[8px] min-h-[100px]"
              />
              <input
                type="text"
                placeholder="Tech Stack Image URL"
                value={workTechStackImageUrl}
                onChange={(e) => setWorkTechStackImageUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <textarea
                placeholder="Tech Stack Explanations (one per line)"
                value={workTechStackExps}
                onChange={(e) => setWorkTechStackExps(e.target.value)}
                className="border rounded px-[12px] py-[8px] min-h-[100px]"
              />
              <input
                type="text"
                placeholder="Contribution Image URL"
                value={workContributionImageUrl}
                onChange={(e) => setWorkContributionImageUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <textarea
                placeholder="Contribution Explanations (one per line)"
                value={workContributionExps}
                onChange={(e) => setWorkContributionExps(e.target.value)}
                className="border rounded px-[12px] py-[8px] min-h-[100px]"
              />
              <input
                type="text"
                placeholder="Screen Image URLs (one per line)"
                value={workScreenImageUrl}
                onChange={(e) => setWorkScreenImageUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Modal Message"
                value={workModalMsg}
                onChange={(e) => setWorkModalMsg(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
              <input
                type="text"
                placeholder="Modal CTA URL"
                value={workModalCtaUrl}
                onChange={(e) => setWorkModalCtaUrl(e.target.value)}
                className="border rounded px-[12px] py-[8px]"
              />
            </section>

            {/* Button section */}
            <section >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Links
                </h2>
                <CtaBtn 
                  type="button"
                  btnMsg="Add Btn"
                  passedFunc={() => addWorkButton()}
                  width="w-[300px]"
                  className="hover:bg-black hover:text-white"
                />     
              </div>
              <div className="flex flex-col gap-[24px] mt-[24px]">
                {workButtons.map((button, index) => (
                  <div 
                    key={index}
                    className="bg-gray-200 rounded p-[24px] flex flex-col gap-[12px]"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        Button #{index + 1}
                      </p>
                      <CtaBtn 
                        type="button"
                        btnMsg="Remove Button"
                        passedFunc={() => removeWorkButton(index)}
                        width="w-[300px]"
                        txtColor="text-red-600"
                        marginTop="mt-0"
                        className="border-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <input
                        type="text"
                        placeholder="Button Name"
                        value={button.btnName || ""}
                        onChange={(e) => updateWorkButton(
                          index,
                          "btnName",
                          e.target.value
                        )}
                        className="border rounded px-[12px] py-[8px] bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Button URL"
                        value={button.url || ""}
                        onChange={(e) => updateWorkButton(
                          index,
                          "url",
                          e.target.value
                        )}
                        className="border rounded px-[12px] py-[8px] bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading || !isFormValid}
          className="px-[24px] py-[16px] border-1 border-black bg-white hover:bg-black text-black hover:text-white rounded-4xl disabled:bg-black disabled:text-white disabled:opacity-50 duration-200 ease-in"
        >
          {loading ? "Posting..." : `Post ${postType}`}
        </button>
        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  )
}

export default PostPage