import selfImg from '../assets/imgs/self_img.jpg'

type LandingProps = {
}

const Landing: React.FC<LandingProps> = ({}) => {
  return (
    <div className="h-screen bg-amber-200 w-full">
      <img 
        src={selfImg}
        alt="Aki presenting"
        className="object-cover h-full"
      />
      <div className='absolute inset-0 bg-neutral-700 opacity-70'></div>
      
    </div>
  )
}

export default Landing
