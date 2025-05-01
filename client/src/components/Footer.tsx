import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CtaBtn from "../atoms/CtaBtn"
import LineDivider from "../atoms/LineDivider"

type FooterProps = {
  imgUrl?: string,
  email: string,
  github: string,
  linkedIn: string
}

const Footer: React.FC<FooterProps> = ({ imgUrl, email, github, linkedIn }) => {
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

  return (
    <div className="bg-black px-[20px] pt-[60px] pb-[40px]">
      <div className="flex items-center mb-[40px]">
        { imgUrl ?
            <img src={imgUrl} alt="Aki's face" />
          :
            <div className="h-[60px] min-w-[60px] rounded-full bg-neutral-300"></div>
        }
        <p className="text-white ml-[14px] mr-[10px] text-[30px] text-left">Let's Collaborate!</p>
      </div>
      <CtaBtn btnMsg={email} bgColor="black" borderColor="white" txtColor="white" />
      <CtaBtn btnMsg={github} bgColor="black" borderColor="white" txtColor="white"/>
      <CtaBtn btnMsg={linkedIn} bgColor="black" borderColor="white" txtColor="white" />
      <LineDivider color="white" mTop="60px"/>
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
