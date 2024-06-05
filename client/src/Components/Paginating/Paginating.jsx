import style from './Paginating.module.css'
export default function Paginating({dogsPerPage, allDogs, currentPage, paginado }){
    const pageNumbers = []; //declaro un arreglo vacio.

    for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
      pageNumbers.push(i + 1); //divide todos los personajes por la cantidad que yo quiero (8)
    }
  
    return <nav  className={style.container}> 
        <ul className={style.uls}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <div
                className={`number ${currentPage === number ? "active" : ""}`}
                key={number}
              >
                <a onClick={() => paginado(number)}>{number}</a>
              </div>
            ))}
        </ul>
      </nav>
}