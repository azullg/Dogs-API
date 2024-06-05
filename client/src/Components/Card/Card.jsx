import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css'
import heightimg from '../../img/Untitled-1-09.png'
import weightimg from '../../img/Untitled-1-08.png'

export default function Card({
  id,
  name,
  life_span,
  temperament,
  image,
  weight,
  height,
}) 


{

  return <div className={style.container} style={{backgroundImage: `url(${image})`}}>
    <div>
      <Link to={`/detail/${id}`}></Link>

    </div>
    <div className={style.button}>
      <img src={heightimg} alt="" className={style.imgs} />
      <p className={style.pstyle}>{height} cm</p>

    </div>
    <div className={style.button2}>
      <img src={weightimg} alt="" className={style.img2} />
      <p className={style.pstyle}>{weight} kg</p>

    </div>

    <p className={style.name}>
      {name}
    </p>
    </div>
  
}