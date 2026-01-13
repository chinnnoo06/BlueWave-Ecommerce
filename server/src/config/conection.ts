import mongoose from 'mongoose'

export const connection = async () => {

    try{
        await mongoose.connect("mongodb://localhost:27017/blue_wave_db");
        console.log("Conectado correctamente a la base de datos blue_wave_db");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }

}