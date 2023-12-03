import "./index.css"
import default_image from "../Assets/default_image.jpeg"
import { useRef, useState } from "react"

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/")
  let inputRef=useRef(null);
  const [loading, setLoading] = useState(false)

const ImageGenerator=async()=>{
  if(inputRef.current.value==="")return 0;
  
  setLoading(true);
  
  const API_KEY = "API_KEY";
  
  const response=await fetch("https://api.openai.com/v1/images/generations",
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:
      "Bearer " + API_KEY,
      "User-Agent":"Chrome"
    },
    body:JSON.stringify({
      prompt:`${inputRef.current.value}`,
      n:1,
      size:"1024x1024",
    }),
  }
  );
  let data = await response.json();
  let data_array = data.data;
  setImage_url(data_array[0].url);
  setLoading(false);
}

  return (
    <div className="image-generator">
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
        <div><img src={image_url==="/"?default_image:image_url} alt="AI generated image"/></div>
      <div>
        <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text":"display-none"}>Generating...</div>
      </div>
      </div>
      <div className="search-box"><input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see"/>
      <div className="img-generate" onClick={()=>{ImageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}
export default ImageGenerator
