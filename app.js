require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad:');

                //Buscar lugares
                const lugares = await busquedas.ciudad(termino);

                //Seleccionar lugar
                const id = await listarLugares(lugares);

                const lugarSeleccionado = lugares.find( l => l.id === id );

                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                
                console.log('\n Informacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Long:', lugarSeleccionado.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Clima:', clima.desc);
                break;    
            
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar,i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;    
        
        }

        await pausa();

    } while (opt !== 0);
}

main();