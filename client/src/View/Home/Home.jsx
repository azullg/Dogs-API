import Paginating from "../../Components/Paginating/Paginating"
import SearchBar from '../../Components/SearchBar/SearchBar' 
import Filters from "../../Components/Filters/Filters";
import Gallery from '../../Components/Gallery/Gallery'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import style from './Home.module.css'


export default function Home(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [filteredDogs, setFilteredDogs] = useState(allDogs);
    const [sortType, setSortType] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [temperamentFilter, setTemperamentFilter] = useState("");
    const [showBackToTop, setShowBackToTop] = useState(false);
  
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    useEffect(() => {
      dispatch(getAllDogs());
    }, [dispatch]);
  
    useEffect(() => {
      setFilteredDogs(allDogs);
    }, [allDogs]);
  
    const handleSortChange = (e) => {
      //Estado que incluye opciones de ordenamiento
  
      setSortType(e.target.value);
    };
  
    const handleFilterChange = (e) => {
      setFilterType(e.target.value);
    };
  
    const handleTemperamentFilterChange = (e) => {
      setTemperamentFilter(e.target.value);
    };
  
    useEffect(() => {
      let sortedDogs = [...filteredDogs]; //Filtros y orden funcionan combinados.
  
      if (sortType === "asc") {
        sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortType === "desc") {
        sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortType === "weight") {
        sortedDogs.sort((a, b) => {
          const weightA = parseFloat(a.weight);
          const weightB = parseFloat(b.weight);
          return weightA - weightB;
        });
      } else if (sortType === "height") {
        sortedDogs.sort((a, b) => {
          const heightA = parseFloat(a.height);
          const heightB = parseFloat(b.height);
          return heightA - heightB;
        });
      }
  
      setFilteredDogs(sortedDogs);
    }, [sortType]);
  
    useEffect(() => {
      let filteredDogs = [...allDogs];
  
      if (filterType === "api") {
        filteredDogs = allDogs.filter((dog) => !dog.createBD);
      } else if (filterType === "created") {
        filteredDogs = allDogs.filter((dog) => dog.createBD);
      }
  
      if (temperamentFilter !== "") {
        filteredDogs = filteredDogs.filter((dog) =>
          dog.temperament?.split(", ").includes(temperamentFilter)
        );
      }
  
      setFilteredDogs(filteredDogs);
    }, [filterType, temperamentFilter, allDogs]);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredDogs.length / dogsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll); //boton scroll aparece abajo
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  


    return <div className={style.container}>
     {/* <Gallery/>*/} 
<div>
       <SearchBar/>
     
</div>

              <Filters
                sortType={sortType}
                filterType={filterType}
                temperamentFilter={temperamentFilter}
                handleSortChange={handleSortChange}
                handleFilterChange={handleFilterChange}
                handleTemperamentFilterChange={handleTemperamentFilterChange}
                allDogs={allDogs}
              />

       <Paginating/>
        
      <div >
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`number ${currentPage === number ? `${style.paginandoAct}` : `${style.paginando}`}`}
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        ))}

        
      </div>
      
<div className={style.cards} >
        {currentDogs.map((el) => (<div>
           <Link to={"/home/" + el.id} key={el.id}>
               <Card 
               key={el.id}
               id={el.id} 
               name={el.name} 
               types={el.types} 
               image={el.image.url} 
               weight={el.weight} 
               height={el.height}
               attack={el.attack} />
           </Link>
       </div>
        ))}
      </div>

      

<div className={style.appbutton}>
  <p>Application created by Azul Leonardini</p>
</div>
     
    </div>
}