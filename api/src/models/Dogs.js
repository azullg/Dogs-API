const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo

 
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dogs",
    {
      id: {
        type: DataTypes.UUID, //hace que sea único.
        allowNull: false, //campo requerido, no puede estar vacío.
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      }, //dentificador único de 128 bits que se utiliza para representar de forma única objetos o entidades dentro de una base de datos.
      image: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createBD: {
        //Todo lo que yo cree se crea con esta propiedad, es más eficiente. //Si el registro fue creado
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true } //Marcas de tiempo
  );
};
