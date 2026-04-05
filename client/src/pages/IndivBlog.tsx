import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { useMenu } from "../context/MenuContext";
import { useEffect, useRef, useState } from "react";
import { usePageTransition } from "../context/PageTransitionContext";
import { motion, Variants } from "motion/react"
import TopMessage from "../components/TopMessage";
import CtaBtn from "../atoms/CtaBtn";
import Footer from "../components/Footer";
import LineDivider from "../atoms/LineDivider";
import BlogCard from "../molecules/BlogCard";

type BlogHeadingBlock = {
  type: "heading";
  text: string;
};

type BlogParagraphBlock = {
  type: "paragraph";
  text: string;
};

type BlogQuoteBlock = {
  type: "quote";
  text: string;
};

type BlogCodeBlock = {
  type: "code",
  text: string,
}

type BlogImageBlock = {
  type: "image";
  imageUrl: string;
  alt?: string;
  caption?: string;
};

type BlogContentBlock =
  | BlogHeadingBlock
  | BlogParagraphBlock
  | BlogQuoteBlock
  | BlogCodeBlock
  | BlogImageBlock;

type BlogButton = {
  btnName: string;
  url: string;
};

type Blog = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  thumbnailImageUrl: string;

  blocks: BlogContentBlock[];

  btns?: BlogButton[];

  createdAt?: string;
  published?: boolean;
}

type RelatedBlog = {
  _id: string,
  title: string,
  slug: string,
  tags: string[],
  description: string,
  thumbnailImageUrl: string,
  createdAt: string;
  published: boolean;
}

const IndivBlog:React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const [blog, setBlog] = useState<Blog>();
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const { triggerTransition, isTransitioning } = usePageTransition();
  const hasFetched = useRef(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const {isOpen, setIsOpen} = useMenu();

  useEffect(() => {
    if (!isTransitioning && !hasFetched.current) {
      hasFetched.current = true;
    
      fetch(`${fetchUrl}/blogs/${slug}`)
      .then(async res => {
        if (!res.ok) {
          setIsValid(false);
          return null;
        }

        const data = await res.json();
        setIsValid(true);
        console.log(data)
        setBlog(data);
      })
      .catch(err => {
        console.error(err);
        setIsValid(false);
      })
    }

    if (isTransitioning) {
      hasFetched.current = false;
    }
  }, [slug, isTransitioning])

  const fetchRelatedBlogs = async (slug: string) => {
    try {
      const res = await fetch(`${fetchUrl}/blogs/related?slug=${slug}&limit=3`)

      if (!res.ok) {
        throw new Error("Failed to fetch related blogs")
      }

      const data = await res.json()
      console.log(data)
      setRelatedBlogs(data);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!blog?.slug) {
      return
    }
    fetchRelatedBlogs(blog.slug);
  }, [blog?.slug])

  const dotLoading: Variants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const formatDate = (rawDate: string | undefined) => {
    if (rawDate == undefined) {
      return
    }

    const rawCreatedData = new Date(rawDate)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: "short",
      day: "numeric"
    }
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(rawCreatedData);

    return formattedDate
  }

  const handleShare = async () => {
    const shareData = {
      title: blog?.title,
      text: blog?.description,
      url: window.location.href
    };
  
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
  
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  if (isValid === false) {
    return (
      <div>
        <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
        <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
        <div className="p-[24px] sm:py-[64px]">
          <TopMessage line1="Oops! The blog you're" line2="looking for doesn't exist."/>
          <CtaBtn 
            btnMsg="Check Other Blogs" 
            passedFunc={() => triggerTransition('/blogs')}
            borderColor="#747474"
            bgColor="bg-white"
            txtColor="text-black"
            marginTop="mt-[64px]"
            hoverBgColor="hover:bg-black"
            hovertxtColor="hover:text-white"
          />
        </div>
        <Footer />
      </div>      
    )
  }

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      {
        blog == undefined ? 
        <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex justify-center items-center gap-[20px] my-[80px] md:my-[160px]"
        >
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
          <motion.div className="w-[20px] h-[20px] rounded-2xl bg-black will-change-transform" variants={dotLoading} />
        </motion.div>
        : 
        <div>
          {blog.thumbnailImageUrl && (
            <img
              src={blog.thumbnailImageUrl}
              alt={blog.title}
              className="object-cover h-[120px] md:h-[200px] w-full self-center mb-[32px]"
            />
          )}
          <div className="mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto">
            <div className="flex flex-row gap-[20px] md:gap-0 flex-nowrap justify-between items-center my-[40px]">
              <div className="flex flex-wrap flex-1 md:flex-nowrap items-center">
                <img 
                  src="/images/stack.webp"
                  alt="Decorative icon"
                  className="hidden md:block w-[20px] mr-[10px]"
                />
                {blog.tags.map((tag, index) => {
                  return blog.tags.length - 1 === index ? (
                    <p key={tag} className="text-gray-600 text-[14px]">
                      { tag }
                    </p>
                  ) :
                  (
                    <p key={tag} className="text-gray-600 text-[14px]">
                      { tag } /&thinsp;
                    </p>
                  )
                })}
              </div>
              <div className="flex flex-nowrap gap-[16px]">
                <div 
                  className="border-2 border-gray-400 pt-[12px] pr-[12px] pb-[10px] pl-[10px] rounded-3xl opacity-60 hover:border-gray-800 hover:opacity-100 duration-500 ease-in-out"
                  onClick={() => handleShare()}
                >
                  <img 
                    src="/images/share.webp"
                    alt="Click to share this content"
                    className="w-[16px] h-[16px]"
                  />
                </div>              
                <div 
                  className="border-2 border-gray-400 pt-[13px] pr-[13px] pb-[13px] pl-[13px] rounded-3xl opacity-60 hover:border-gray-800 hover:opacity-100 duration-500 ease-in-out"
                  onClick={() => triggerTransition("/blogs") }
                >
                  <img 
                    src="/images/close.webp"
                    alt="Close this post and back to blogs page"
                    className="w-[12px] h-[12px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[40px] mt-[60px] mb-[50px] md:grid md:grid-cols-[3fr_4fr] md:gap-[80px] md:items-center">
              <div className="flex flex-col">
                <h1 className="font-bold text-left mb-[12px] text-[32px] md:text-[36px] leading-[40px]">{blog.title}</h1>
                <p className="text-gray-600 text-left text-[14px]"> Posted on: {formatDate(blog.createdAt)}</p>
              </div>
              <p className="hidden md:block text-left text-[14px] text-neutral-800">
                {blog.description}
              </p>
            </div>
            <LineDivider color="border-gray-300"/>
            <div className="flex flex-col gap-[20px] mt-[20px] mb-[60px]">
              {blog.blocks.map((block, index) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2
                        key={index}
                        className="text-[24px] md:text-[28px] font-semibold text-left mt-[40px]"
                      >
                        {block.text}
                      </h2>
                    );

                  case "paragraph":
                    return (
                      <p
                        key={index}
                        className="text-left text-[14px] whitespace-pre-line text-neutral-800"
                      >
                        {block.text}
                      </p>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-neutral-400 pl-[16px] my-[8px] italic text-left  whitespace-pre-line text-[18px] text-neutral-700"
                      >
                        {block.text}
                      </blockquote>
                    );

                  case "code":
                    return (
                      <pre
                        key={index}
                        className="bg-neutral-900 text-neutral-100 text-[13px] p-[16px] text-left rounded-xl overflow-x-auto font-mono whitespace-pre"
                      >
                        <code>{block.text}</code>
                      </pre>
                    );

                  case "image":
                    return (
                      <figure key={index} className="w-full">
                        <img
                          src={block.imageUrl}
                          alt={block.alt || "Blog image"}
                          className="w-full rounded-xl"
                        />
                        {block.caption && (
                          <figcaption className="text-[14px] text-neutral-500 mt-[8px] text-center">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );

                  default:
                    return null;
                }
              })}
            </div>
            {/* Blog page doesn't necessarily need btns. So it's optional */}
            {blog.btns && blog.btns?.length !== 0 && (
              <h3 className="text-[24px] md:text-[28px] font-semibold text-left mb-[22px]">
                Links
              </h3>  
            )}
            {
              blog.btns && blog.btns?.length !== 0 && blog.btns.map((btn) => (
                <CtaBtn 
                  key={btn.btnName}
                  btnMsg={btn.btnName}
                  passedFunc={() => window.open(btn.url)}
                  borderColor="#747474"
                  bgColor="bg-white"
                  txtColor="text-black"
                  marginTop="mt-[16px]"
                  hoverBgColor="hover:bg-black"
                  hovertxtColor="hover:text-white"

                />
              ))
            } 
            <h3 className="text-[24px] md:text-[28px] font-semibold text-left mb-[30px] mt-[50px]">
              Related Posts
            </h3>
            {relatedBlogs.length > 0 ?
              <div className="pb-[10px] md:pb-[60px] max-w-[1160px] xl:mx-auto md:grid md:grid-cols-2 md:gap-[48px] lg:grid-cols-3 lg:gap-[64px]">
                {relatedBlogs.map((blog) => {
                  return blog.published && 
                    (
                      <div key={blog._id}>
                        <BlogCard blogData={blog}/>
                      </div>
                    )
                })}
              </div>
            :
              <div>
                <p>
                  Oops, there is no related posts with this post 😬
                </p>
                <CtaBtn 
                  btnMsg="Check other blog posts"
                  passedFunc={() => triggerTransition("/blogs")}
                  borderColor="#747474"
                  bgColor="bg-white"
                  txtColor="text-black"
                  marginTop="mt-[16px]"
                  hoverBgColor="hover:bg-black"
                  hovertxtColor="hover:text-white"
                />
              </div>
            }

          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default IndivBlog