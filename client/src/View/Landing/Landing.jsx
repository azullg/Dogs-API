import { Link } from "react-router-dom";
import style from './Landing.module.css'
import img from '../../img/Untitled-1 [Recovered]-13.png'

export default function Landing(){
   return <div className={style.container}>
 
    <div className={style.containerimg}>

    <img src="https://i.pinimg.com/originals/21/e2/98/21e2982f65a7b5b5a9a1b77ec87042e2.gif" alt=""  className={style.imgs}/>
    </div>
    <div>
    <Link to = '/home' className={style.link}> 
      <img src={img} alt=""  className={style.imgs2}/>
    </Link>

    </div>
   </div> 
}