import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import ParaSection from "../components/ParaSection";
import WorkTop from "../components/WorkTop";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CtaBtn from "../atoms/CtaBtn";

type Work = {
  _id: string,
  title: string,
  year: string,
  projectImageUrl?: string,
  videoLoc: string,
  tags: string[],
  description: string,
  detailedDesc: string,
  techStackImageUrl: string,
  techStackExps: string[],
  contributionImageUrl: string,
  contributionExps: string[],
  btns: [{
    btnName: string,
    url: string
  }],
  screenImageUrl: string[]
}

const Individual: React.FC = ({}) => {
  const { id } = useParams();
  const fetchUrl = import.meta.env.VITE_BACKEND_URL;
  const {isOpen, setIsOpen} = useMenu();
  const [project, setProject] = useState<Work>();

  useEffect(() => {
    fetch(`${fetchUrl}/works/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProject(data);
      })
      .catch(err => console.error(err));
  }, [id])

  return (
    <div>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>
      <Header WebsiteName="Aki's Room" openMenu={() => setIsOpen(true)}/>
      {
        project == undefined ? <p>loading...</p> : 
        <div>
          {/* 🚨🚨🚨🚨 Change this video section so that the page shows a proper video 🚨🚨🚨🚨 */}
          <div className="m-[30px] md:mx-[60px] max-w-[1160px] xl:mx-auto">
            <video autoPlay loop muted playsInline className="w-full rounded-xl">
              <source src={project.videoLoc} type="video/mp4"/>
            </video>
          </div>

          <WorkTop 
            title={project.title}
            paragraph1={project.detailedDesc}
          />
          <ParaSection 
            title="Tech Stack" 
            imageUrl={project.techStackImageUrl}
            paragraph2={project.techStackExps[0] && project.techStackExps[0]}
            paragraph3={project.techStackExps[1] && project.techStackExps[1]}
            paragraph4={project.techStackExps[2] && project.techStackExps[2]}
            colDiv={true}
          />
          <ParaSection 
            title="Contribution"
            imageUrl={project.contributionImageUrl}
            paragraph1={project.contributionExps[0] && project.contributionExps[0]}
            paragraph2={project.contributionExps[1] && project.contributionExps[1]}
            paragraph3={project.contributionExps[2] && project.contributionExps[2]}
          />
          <div className="mx-[24px] mb-[60px] md:mx-[60px] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1160px] xl:mx-auto">
            <h3 className="text-[24px] font-medium text-left mb-[22px] sm:col-span-2 md:col-span-3 lg:col-span-4">
              Screenshots
            </h3>
            {
              project.screenImageUrl.map((url) => (
                <img
                  src={url}
                  className="w-full mb-[22px] px-[6px]"
                />
              ))
            }
          </div>
          <div className="mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto">
            <h3 className="text-[24px] font-medium text-left mb-[22px]">
              Links
            </h3>  
            {
              project.btns.map((btn) => (
                <CtaBtn 
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
          <Footer />
        </div>
      }
    </div>
  )
}

export default Individual
