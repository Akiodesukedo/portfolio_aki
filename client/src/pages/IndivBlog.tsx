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
  const { isTransitioning } = usePageTransition();
  const hasFetched = useRef(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { triggerTransition } = usePageTransition();
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
          <h1>{blog.title}</h1>
          <div className="mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto">
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