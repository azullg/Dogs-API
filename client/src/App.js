import './App.css';
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './View/Home/Home'
import Landing from './View/Landing/Landing'
import Detail from './View/Detail/Detail'
import CreateDog from './View/CreateDog/CreateDog'
import Nav from './Components/Nav/Nav'

function App() {
const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/' ? <Nav/> : undefined}
 
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='home' element={<Home/>}/>  
        <Route path= "/home/:idRaza"element={<Detail/>}/>
        <Route path='create' element={<CreateDog/>}/>
      </Routes> 

    </div>
  );
}

export default App;
