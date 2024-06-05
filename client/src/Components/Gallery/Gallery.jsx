import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import Style from './Gallery.module.css'
import img1 from '../../img/Untitled-1-01.png'
import img2 from '../../img/Untitled-1-02.png'
import img3 from '../../img/Untitled-1-03.png'



const images = [
  {
    original: img1,
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
 
  {
    original: img2,
    thumbnail: img2,
  },
  {
    original: img3,
    thumbnail: img3,
  },
];

export default function(){


    return <div className={Style.conteiner}>
      
        <ImageGallery
       
        items={images} 
        showPlayButton = {false} 
        showFullscreenButton = {false} 
        showThumbnails={false} 
        showNav={false} 
        showBullets={true} 
        autoPlay = {true}
        slideInterval={2000} 
        slideDuration={2000}/>
        </div>


}
