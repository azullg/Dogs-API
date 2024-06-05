import { Link } from "react-router-dom";
import style from './Nav.module.css'

export default function nav (){

return <div className={style.container}>
    <div className={style.conleft}>
        <Link className={style.links} to = '/home'>Home</Link>
        <Link className={style.links} to = '/create'>Create</Link>

    </div>
    <div>
        <Link className={style.links} to = '/'>Exit</Link>
    </div>


    </div>
}

    