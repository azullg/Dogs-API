import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import img1 from '../../img/Untitled-1-10.png'
import img2 from '../../img/Untitled-1-11.png'
import img3 from '../../img/Untitled-1-12.png'
 
import { postDogs, getTemperaments } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux"; //Despacho acciones.
import style from './CreateDog.module.css'
import img from '../../img/DeWatermark.ai_1716326083264.png'
function validate(input) {
    //Validaciones
    let errors = {};
    if (!input.name) {
      errors.name = "Need a name";
    }
    if (!input.image) {
      errors.image = "Need an image URL";
    }
    if (!input.height) {
      errors.height = "Need a height";
    }
    if (!input.weight) {
      errors.weight = "Need a weight";
    }
    if (!input.life_span) {
      errors.life_span = "Need a life span";
    }
    return errors;
  }
  
  function sortTemperaments(temperaments) {
    return temperaments.sort((a, b) => a.name.localeCompare(b.name)); //Ordené los temp del select abcedario
  }


  
  export default function DogsCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) =>
      sortTemperaments(state.temperaments)
    );



    const [errors, setErrors] = useState({}); //almacena errores de validaciones del formu.
    const [input, setInput] = useState({
      //almacena valores.
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });


    const [newTemperament, setNewTemperament] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false); //Alerta que no completó
    const [showConfirmation, setShowConfirmation] = useState(false); // Alerta de confirmación
  
    useEffect(() => {
      dispatch(getTemperaments());
    }, [dispatch]);
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      setShowAlert(false); // Oculta el mensaje de error general
    }
  
    function handleTemperamentChange(e) {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setInput({
        ...input,
        temperament: selectedOptions,
      });
    }
  
    function handleAddTemperament() {
      if (newTemperament) {
        setInput({
          ...input,
          temperament: [...input.temperament, newTemperament],
        });
        setNewTemperament("");
      }
    }
  
    function handleDelete(el) {
      setInput({
        ...input,
        temperament: input.temperament.filter((temp) => temp !== el),
      });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      const errors = validate(input);
      setErrors(errors);
      setSubmitted(true);
  
      if (
        Object.keys(errors).length === 0 &&
        input.name &&
        input.image &&
        input.height &&
        input.weight &&
        input.life_span
      ) {
        const updatedInput = {
          ...input,
          temperament: input.temperament.join(","),
        };
        dispatch(postDogs(updatedInput));
        setShowConfirmation(true); // Mostra confirmación
        // Restablece el formulario
        setInput({
          name: "",
          height: "",
          weight: "",
          life_span: "",
          image: "",
          temperament: [],
        });
        setNewTemperament("");
        setSubmitted(false);
        setErrors({});
      } else {
        setShowAlert(true);
      }
    }
  
    return (

      <div className={style.containerGeneral}>
      <div>
        <img src={img} alt="" className={style.imgs} />
      </div>
        
      <div className={style.containerForm}>
        <h1 className={style.title}>Create a new breed!</h1>
          
        <form onSubmit={handleSubmit} className={style.form}>
       
            <div className={style.containerdivs}>
              <label  className={style.labels}>Name: </label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                className={style.inputs}
                />
              {errors.name && <p className={style.errors}>{errors.name}</p>}
            </div>

            <div  className={style.containerdivs}>
              <label  className={style.labels}>Image: </label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                className={style.inputs}
                />
              {submitted && errors.image && (
                <p className={style.errors}>{errors.image}</p>
              )}
            </div>

            <div  className={style.containerdivs}>
              <label  className={style.labels}>Weight: </label>
              <input
                type="number"
                min='1'
                max='100'
                value={input.weight}
                name="weight"
                onChange={handleChange}
                className={style.inputsNumber}
                />
                    <label className={style.labelsDes}> kg</label>
            </div>

            <div  className={style.containerdivs}>
              <label  className={style.labels}>Height: </label>
              <input
               type="number"
               min='1'
               max='100'
                value={input.height}
                name="height"
                onChange={handleChange}
                className={style.inputsNumber}
                />
                 <label className={style.labelsDes}> m</label>
            </div>

            <div  className={style.containerdivs} >
              <label  className={style.labels}>Life Span: </label>
              <input
                type="number"
                min='1'
                max='100'
                value={input.life_span}
                name="life_span"
                onChange={handleChange}
                className={style.inputsNumber}
                />
                <label  className={style.labelsDes}> years</label>
            </div>
   

            <div  className={style.containerdivs}>
              <input
                type="text"
                value={newTemperament}
                onChange={(e) => setNewTemperament(e.target.value)}
                className={style.inputs}
              />

              <button type="button" onClick={handleAddTemperament}
              className={style.buttons}>

              <img src={img1} alt=""  className={style.img}/>
              </button>
              <div>

         
              {input.temperament.map((el) => (
                <div key={el} className={style.temperament}>
                  <p className={style.temperamentText}>{el}</p>
                  <button className={style.buttons} onClick={() => handleDelete(el)}>
                  <img src={img3} alt=""  className={style.img}/>
                  </button>
                </div>
              ))}
              </div>  
              
              </div>



           


            <label  className={style.labels}>Temperaments: </label>
            <select
            className={style.selcts}
              multiple
              value={input.temperament}
              onChange={handleTemperamentChange}
              >

              {temperaments.map((temp) => (
                <option key={temp.name} value={temp.name}>
                  {temp.name}
                </option>
              ))}
            </select>

            {showAlert && Object.keys(errors).length > 0 && (
              <p className={style.errors}>Please fill out all required fields.</p>
            )}
            {showConfirmation && (
              <p className={style.confirm}>Dog created successfully!</p>
            )}
            <button  className={style.buttons} type="submit">
            <img src={img2} alt=""  className={style.img3}/>
            </button>
          </form>
        </div>
            </div>   
    );
  }
  