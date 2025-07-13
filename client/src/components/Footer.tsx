import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CtaBtn from "../atoms/CtaBtn"
import LineDivider from "../atoms/LineDivider"

type FooterProps = {
  imgUrl?: string
}

const Footer: React.FC<FooterProps> = ({ imgUrl }) => {
  // Change this in a way that let clicking each button opens a new browser with the link.
  // If possible show modal like "Jumping to this page. yes?" type of thing.

  // Also change the edition based on version from a database

  const [timeInfo, setTimeInfo] = useState<string>('')
  const location = useLocation()

  const updateTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Vancouver',
      timeZoneName: 'short'
    }

    const formatter = new Intl.DateTimeFormat('en-US', options)
    const formattedTime = formatter.format(now)

    const utcDifference = now.toLocaleTimeString('en-US', { timeZone: 'America/Vancouver', timeZoneName: 'short' }).includes('PDT') ? -7 : -8

    setTimeInfo(`${formattedTime} (UTC/GMT ${utcDifference})`)
  }

  useEffect(() => {
    updateTime()
  }, [location])

  const openGithub = () => {
    window.open("https://github.com/Akiodesukedo");
  }

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/akifumi-hayashi");
  }

  return (
    <div className="bg-black px-[20px] md:px-[40px] pt-[60px] pb-[40px] md:pt-[40px]">
      <div className='md:grid md:grid-cols-[380px_1fr] lg:grid-cols-[380px_1fr_1fr]'>
        <div className="flex items-center mb-[40px] md:grid md:grid-rows-2 md:pt-[24px] lg:col-start-1 lg:col-span-1">
          { imgUrl ?
              <img src={imgUrl} alt="Aki's face" />
            :
              <div className="h-[60px] min-w-[60px] w-[60px] rounded-full bg-neutral-300"></div>
          }
          <p className="text-white ml-[14px] mr-[10px] text-[30px] text-left">Let's Collaborate!</p>
        </div>
        <div className='lg:col-start-3 lg:col-span-1'>
          <CtaBtn btnMsg="Github" bgColor="black" borderColor="white" txtColor="white" passedFunc={openGithub}/>
          <CtaBtn btnMsg="LinkedIn" bgColor="black" borderColor="white" txtColor="white" passedFunc={openLinkedIn}/>
        </div>
      </div>
      <LineDivider color="white" mTop="50px"/>
      <div className='flex flex-nowrap justify-between'>
        <div>
          <p className="text-white text-[14px] text-left">Version:</p>
          <p className="text-white text-[14px] text-left">2025@edition</p>
        </div>
        <div>
          <p className="text-white text-[14px] text-left">Timezone:</p>
          <p className="text-white text-[14px] text-left">{ timeInfo }</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
