// Cotizador

// Constructor para seguro

class Seguro{
    constructor(marca,anio,tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro(){
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
    
        let cantidad;
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
    
        // Leer año
        const diferencia = new Date().getFullYear() - this.anio;
    
        // Cada año de diferencia hay que reducir 3% el valor del seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
    
        /* 
            Si el seguro es básico se multiplica por 30%
            Si el seguro es completo se multiplica por 50%
        */
    
        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        }else{
            cantidad *= 1.50;
        }
        return(cantidad);
    
    }
}
// Todo lo que se muestra
class Interfaz{
    // Mostrar mensaje
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div');
    
        if(tipo === 'error'){
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }
    
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div,document.querySelector('.form-group'));
    
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        },3000);
    }

    // Imprime el resultado de la cotizacion
    mostrarResultado(seguro,total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        // Crear div
        const div = document.createElement('div');
        // Insertar la informacion
        div.innerHTML = `
            <p class= 'header'>Tu resumen:</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>total: $ ${total}</p>
        `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        },3000);
    }
}


// Events Listeners 
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    // Leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    // Nos retorna el valor seleccionado de un option
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    // Leer el año
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    

    // Leer el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no esten vacíos 
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo','error');
    }else{
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        // Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);

        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        // Mostrar el resultado
        interfaz.mostrarResultado(seguro,cantidad);
        interfaz.mostrarMensaje('Cotizando...','exito');
    }

}); 

const max = new Date().getFullYear()
const min = max - 20;

const selectAnios = document.getElementById('anio');
for(let i = max; i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
