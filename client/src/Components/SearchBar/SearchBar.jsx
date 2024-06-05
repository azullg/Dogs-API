import React, { useState } from "react";
import style from './SearchBar.module.css';
import img1 from '../../../src/img/Untitled-1-05.png'
import img2 from '../../../src/img/Untitled-1-06.png'
import img3 from '../../../src/img/Untitled-1-07.png'


import { useDispatch } from "react-redux";
import { searchDog,getAllDogs } from "../../Redux/Actions/actions";
import { useEffect } from "react";

export default function(){

    const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchDog(searchTerm));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };
  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

    return <div className={style.container}>
        <input
        className={style.inputs}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by breed name "
      />
       {searchTerm && (
        <button className={style.button}  onClick={handleClear}>
           <img src={img3} alt="" className={style.img}/>
        </button>
      )}
      <button className={style.button}  onClick={handleSearch}>
        <img src={img1} alt="" className={style.img}/>
      </button>

      <button  className={style.button} onClick={() => dispatch(getAllDogs())}>
      <img src={img2} alt="" className={style.img}/>

        </button>
    </div>
}