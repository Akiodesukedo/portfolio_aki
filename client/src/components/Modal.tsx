import CtaBtn from "../atoms/CtaBtn";

type ModalProps = {
  modalMsg: string;
  onClose: () => void;
  onCta: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalMsg, onClose, onCta }) => {

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-[40px] rounded-lg max-w-[calc(100vw-40px)] text-center">
        <h3 className="text-[24px] font-bold mb-[16px] border-red">
          Interested in this project?
        </h3>
        <p className="mb-[16px]">
          { modalMsg }
        </p>
        <div className="flex gap-[12px] justify-center">
          <CtaBtn 
            btnMsg="Not now"
            borderColor="#747474"
            bgColor="bg-white"
            txtColor="text-black"
            marginTop="mt-[16px]"
            hoverBgColor="hover:bg-black"
            hovertxtColor="hover:text-white"
            passedFunc={onClose}
          />
          <CtaBtn 
            btnMsg="Check it!"
            borderColor="border-black"
            bgColor="bg-black"
            txtColor="text-white"
            marginTop="mt-[16px]"
            hoverBgColor='hover:bg-white'
            hovertxtColor="hover:text-black"
            passedFunc={onCta}
          />
        </div>

      </div>
    </div>
  )
}

export default Modal