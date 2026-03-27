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
  thumbnailImageUrl?: string;

  blocks: BlogContentBlock[];

  btns?: BlogButton[];

  createdAt?: string;
  modifiedAt?: string;
  published?: boolean;
}

const IndivBlog:React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const [blog, setBlog] = useState<Blog>();
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
            <div className="flex flex-col md:flex-row flex-nowrap justify-between my-[40px]">
              <div className="flex flex-nowrap">
                {blog.tags.map((tag, index) => {
                  return blog.tags.length - 1 === index ? (
                    <p key={tag} className="text-gray-600">
                      { tag }
                    </p>
                  ) :
                  (
                    <p key={tag} className="text-gray-600">
                      { tag } / &thinsp
                    </p>
                  )
                })}
              </div>
              <div className="flex flex-nowrap gap-[16px]">
                <div 
                  className="border-1 pt-[10px] pr-[10px] pb-[8px] pl-[8px] rounded-3xl"
                  onClick={() => handleShare()}
                >
                  <img 
                    src="/images/share.webp"
                    alt="Click to share this content"
                    className="w-[20px] h-[20px]"
                  />
                </div>              
                <div 
                  className="border-1 pt-[9px] pr-[9px] pb-[9px] pl-[9px] rounded-3xl"
                  onClick={() => triggerTransition("/blogs") }
                >
                  <img 
                    src="/images/close.webp"
                    alt="Close this post and back to blogs page"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-left mb-[16px]">{blog.title}</h1>
            <p className="text-gray-600">Posted on: {formatDate(blog.createdAt)}</p>
            <div className="flex flex-col gap-[24px] mb-[60px]">
              {blog.blocks.map((block, index) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2
                        key={index}
                        className="text-[28px] md:text-[32px] font-semibold text-left mt-[20px]"
                      >
                        {block.text}
                      </h2>
                    );

                  case "paragraph":
                    return (
                      <p
                        key={index}
                        className="text-left text-[17px] leading-[1.9] text-neutral-800"
                      >
                        {block.text}
                      </p>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-neutral-400 pl-[16px] italic text-left text-[18px] text-neutral-700"
                      >
                        {block.text}
                      </blockquote>
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
            <h3 className="text-[24px] font-medium text-left mb-[22px]">
              Links
            </h3>  
            {
              blog.btns && blog.btns.map((btn) => (
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
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default IndivBlog