//Declaro la varible car como si fuera de tipo clase (que es la que hemos creado en el fichero car.ts)
let car: Car;

/*Declaro una constante para poder habilitar/deshabilitar el botónd e crear coche */
const btnCreateCar:any = document.getElementById("btnCreateCar");

/*Declaro una constante para poder habilitar/deshabilitar el botón de añadir rueda */
const btnCreateWheel:any = document.getElementById("btnCreateWheel");

/*Declaro una constante para el div del furmulario de ruedas para poder mostrar este formulario en la función createCar */
const wheelsDiv:any = document.getElementById("wheelsDiv");

/*Declaramos la constante carForm que recogerá la información de todos los campos del formulario principal (el del coche). 
Para que se rellene, primero se ha de cargar el código HTML, por lo que debemos poner el script antes de la etiqueta 
de cierre del body. Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar de alta todo*/
const carForm:any = document.getElementById("idCarForm");

/*Declaramos la constante wheelForm que recogerá la información de todos los campos del formulario secundario (el del  
las ruedas). Para que se rellene, primero se ha de cargar el código HTML, por lo que debemos poner el script antes de 
la etiqueta de cierre del body. Se usará para el evento onblur y para hacer un reset del formulario al acabar de dar 
de alta todo*/
const wheelForm:any = document.getElementById("idWheelsForm");

/*Declaramos la constante divPrintInfo para poder mostrar y ocultar la información del coche*/
const divPrintInfo:any = document.getElementById("idDivPrintInfo");

/*Declaramos estas variables como globales ya que las usaremos en varios sitios*/
let plate: HTMLInputElement = <HTMLInputElement>document.getElementById("idPlate");
let brand: HTMLInputElement = <HTMLInputElement>document.getElementById("idBrand");
let color: HTMLInputElement = <HTMLInputElement>document.getElementById("idColor");
 
function createCar(){
    let errorCounter:number = validateCarInfo(plate, brand, color);

    if (errorCounter == 0) {
        /*Creo el objeto coche */
        car = new Car(plate.value.toUpperCase(), brand.value, color.value);

        /*Muevo las variables para que se "pinten" en pantalla */
        let showPlate: any = document.getElementById("showPlate").innerHTML = ("Plate: " + plate.value);
        let showBrand: any = document.getElementById("showBrand").innerHTML = ("Brand: " + brand.value);
        let showColor: any = document.getElementById("showColor").innerHTML = ("Color: " + color.value);

                  
        /*Deshabilito los campos del formulario de coches y el botón para que no se pueda crear otro coche hasta
        que no se hayan añadido las ruedas. Una vez que haya añadido las ruedas, volveré a esconder el formulario 
        ruedas y habilitaré los campos y el botón del formulario de coches*/
        plate.disabled = true;
        brand.disabled = true;
        color.disabled = true;
        btnCreateCar.disabled = true;
      
        
        /*Si las validaciones al crear el coche son correctas, mostraré el formulario para añadir las ruedas. */
        wheelsDiv.classList.remove("d-none"); 
    }   
}

/*Aunque el enunciado del ejercicio dice que sólo se validará que la matrícula tenga un formato determinado,
nosotros validaremos que además, todos los campos de este formulario vengan informados */
function validateCarInfo(plate: HTMLInputElement, brand: HTMLInputElement, color: HTMLInputElement){
    let errorCounter:number = 0;

    let errorPlate: HTMLElement = <HTMLElement>document.getElementById("errorPlate");
    let errorBrand: HTMLElement = <HTMLElement>document.getElementById("errorBrand");
    let errorColor: HTMLElement = <HTMLElement>document.getElementById("errorColor");

    if (plate.value == "") {
        plate.classList.add("is-invalid");
        errorPlate.textContent = "Plate is required";
        errorCounter++;
    } else if (!validatePlate(plate)) {
        plate.classList.add("is-invalid");
        errorPlate.textContent = "Invalid plate format. The correct one is 0000XXX";
        errorCounter++;
    }

    if (brand.value == "") {
        brand.classList.add("is-invalid");
        errorBrand.textContent = "Brand is required";
        errorCounter++;
    }

    if (color.value == "") {
        color.classList.add("is-invalid");
        errorColor.textContent = "Color is required";
        errorCounter++;
    }

    return errorCounter;
}
 
/*Con este función validamos mediante una expresión regular, que el formato de la matrícula se componga de cuatro
números, seguidos de tres letras que podrán ser puestas tanto en mayúsculas como en minúsculas porque nosotros lo
cambiaremos a mayúsculas todo*/
function validatePlate(plate: HTMLInputElement): boolean{
    var regex = /^[0-9]{4}[a-zA-Z]{3}$/;
    return regex.test(plate.value) ? true : false;
}


function createWheels(){
    let errorCounter:number = 0;
    let i: number;
    let someDiameterError: boolean = false;

    /* Validamos que el diámetro de las cuatro ruedas esté informado y tiene las dimensiones correctas */
    for (i=1; i<=4; i++ ) {
        let diameter: HTMLInputElement = <HTMLInputElement>document.getElementById("idWheelDiam"+[i]);
        errorCounter = validateWheelsInfo(diameter, i);
        if (errorCounter > 0 && someDiameterError == false){
            someDiameterError = true;
        }
    }

    /* Si no hay ningún error en la validación del diámetro, daremos de alta las ruedas en el coche */
    if (someDiameterError == false){
        for (i = 1; i<=4; i++) {
            let diameter:   HTMLInputElement = <HTMLInputElement>document.getElementById("idWheelDiam"+[i]);
            let brandWheel: HTMLInputElement = <HTMLInputElement>document.getElementById("idWheelBranch"+[i]);
            
            let wheel:Wheel = new Wheel(Number(diameter.value), brandWheel.value);
                        
            car.addWheel(wheel);     

            /*Deshabilito el botón de añadir ruedas para que no puedan añadir más de 4 ruedas por coche */
            btnCreateWheel.disabled = true;

            /*Muevo las variables para que se "pinten" en pantalla */
            let showDiameter:   any = document.getElementById("showDiameter" + [i]).innerHTML = ("Diameter: " + Number(diameter.value));
            let showBrandWheel: any = document.getElementById("showBrand" + [i]).innerHTML    = ("Brand wheel: " + brandWheel.value);
        } 
    
        /*Si todo es correcto, mostraremos la información por pantalla*/
        console.log(car);
         
        divPrintInfo.classList.remove("d-none"); 
    }
}


/* En esta función solo validamos que el campo diameter esté informado y su valor sea > 0.4 y < 2*/
function validateWheelsInfo(diameter:any, i:number){
    let errorCounter:number = 0;
         
    let errorDiametre: HTMLElement = <HTMLElement>document.getElementById("errorwheelDiam"+[i]);
            
    if (diameter.value == "") {
        diameter.classList.add("is-invalid");
        errorDiametre.textContent = "Diameter is required";
        errorCounter++;
    } else if (diameter.value <= 0.4 || diameter.value >= 2) {
        diameter.classList.add("is-invalid");
        errorDiametre.textContent = "Invalid diameter. The correct is > 0.4 and < 2 cm";
        errorCounter++;
    }
    
    return errorCounter;
}

function hideInfo() {
    /*Habilitamos los campos del formulario principal */
    plate.disabled = false;
    brand.disabled = false;
    color.disabled = false;
    btnCreateCar.disabled = false;

    /*Habilitamos el botón del formulario secuendario */
    btnCreateWheel.disabled = false;


    /* Limpiamos los dos formularios */
    carForm.reset();
    wheelForm.reset();

    /*Escondemos de nuevo el formulario de las ruedas */
    wheelsDiv.classList.add("d-none");

    /*Escondemos la información del vehículo que acabamos de crear */
    divPrintInfo.classList.add("d-none");
}


/*Con el if, comprobamos si existe el objeto carForm. Si existe, creamos el evento blur que es el que tiene lugar 
cuando se aleja el foco de un campo */
if (carForm){
    carForm.addEventListener('blur', (event:any) => {
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
}


/*Con el if, comprobamos si existe el objeto wheelForm. Si existe, creamos el evento blur que es el que tiene lugar 
cuando se aleja el foco de un campo.
Este código es igual que el anterior pero para el formulario de las ruedas. Habría que mirar cómo reutilizar 
este trozo de código. Quizá declarando una variable auxiliar que guarde el nombre del objeto que es lo único que
cambia*/
if (wheelForm){
    wheelForm.addEventListener('blur', (event:any) => {
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
}





