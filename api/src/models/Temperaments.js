const { DataTypes } = require("sequelize");
// Exporto una funcion que define el modelo
// Luego la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "temperaments",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // no se permite establecer una valor null
      },
    },
    { timestamps: true }
  );
};
