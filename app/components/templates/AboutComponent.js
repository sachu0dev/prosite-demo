import { setButtonText, setMainText, setSubText } from "@/redux/websiteSlice";
import { useDispatch } from "react-redux";

export default function AboutComponent({props}) {

  const dispatch = useDispatch();

  const handleMainChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setMainText(newHeading));
  };
  const handleSubChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setSubText(newHeading));
  };

  const handleButtonChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setButtonText(newHeading));
  };
  return (
    <div id="about" className="w-[60%] h-[60vh] flex items-center justify-start">
      <div className="p-5">
        <h1
          className="text-3xl font-bold bg-transparent border-none outline-none w-full text-center mb-2 resize-none overflow-hidden"
          contentEditable
          onBlur={handleMainChange}
          suppressContentEditableWarning
          aria-label="Heading"
        >{props?.mainText}</h1>
        <p
          className="text-xl bg-transparent border-none outline-none w-full text-center mb-8 resize-none overflow-hidden"
          contentEditable
          onBlur={handleSubChange}
          suppressContentEditableWarning
          aria-label="subHeading"
        >{props?.subText}</p>
        <button className="bg-white text-gray-700 py-2 px-4"
        contentEditable
        onBlur={handleButtonChange}
        suppressContentEditableWarning
        aria-label="button">
          {props?.buttonText}
        </button>
      </div>
    </div>
  );
}
