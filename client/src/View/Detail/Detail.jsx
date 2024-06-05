import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import style from './Detail.module.css'
import img from '../../img/Untitled-1-07.png'

const Detail = () => {
  const { idRaza } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDetail()); // Limpia el estado del detalle
    dispatch(getDetail(idRaza)); // Obtiene el detalle del perro
  }, [dispatch, idRaza]);

  const dogs = useSelector((state) => state.detail);

  if (!dogs) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      <h1>{dogs.name}</h1>
        {dogs && (
          <div className={style.detailContainer}>
            <div >
            <img src={dogs.image && dogs.image.url} alt="" className={style.imgs}/>
            </div>
            <div>

            <p><strong>Life span:</strong> {dogs.life_span}</p>
            <p><strong>Temperament: </strong>{dogs.temperament}</p>
            <p><strong>Weight: </strong> {dogs.weight} kg</p>
            <p> <strong>Height: </strong>{dogs.height} cm</p>

            </div>

          </div>
        )}
        <Link to="/home">
          <img  src={img} className={style.imgback}/>
        </Link>
      </div>


  );
};

export default Detail;
