
// captural los elementos por su id
const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
// esto no se que es muy bien pero es para usar el template
const fragment = document.createDocumentFragment()

let tareas = {}

// EN EL CASO QUE TUVIERAS OBJETOS CREADOS DE TAREAS STATICAS PARA PINTARLAS en el dom
// document.addEventListener('DOMContentLoaded', () => {
//     pintarTareas();
// })
          //EVENTOS
//Capturar el evento de la tarea que quermeos eliminar o actualizar
listaTarea.addEventListener('click', e =>{
    btnAccion(e) //esto es una funcion que la logica esta abajo , la e detectar el btn que das click
})



//para detener la consecuencia del evento del cont padre(form) para detener la solicitud del get del form
//deteenr el comportamiento por defecto de los elementos
formulario.addEventListener('submit', e => {
    e.preventDefault()

    // maneras para capturar lo que tiene el elemento dentro 
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value);
    // console.log(input.value);
    // console.log(input.value);

    //crear el objeto tarea de forma dinamica
   setTarea(e)
})
//FUNCION PARA CREAR EL OBJETO TAREA
const setTarea = e => {
    //empujar el texto y mandarlo 
    //1 validar el form   
    if (input.value.trim() === '') {
        console.log('escribe una tarea');
        return //para el if
    }
    //crear un objeto tarea esto despues desaparece con el datenow para usarlo como id
    const tarea = {
        id: Date.now(),
        texto: input.value,//captura lo ue sea qie escribas en el input
        estado: false
    }
    //llamar a la coleccion de obj (tarea), destructurar el objeto y hacer una copia
    //tareas[tarea.id]= {...tareas}
    tareas[tarea.id] = tarea//empujar el objeto
    // console.log(tarea);

    //limpiar el valor escrito una vez enviado el form
    formulario.reset();
    input.focus();

    pintarTareas()
}
//FUNCION PARA PINTAR LAS TAREAS
const pintarTareas = () => {
    //pintar el div con el mensaje de no hay tareas pendientes

    if ( Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center">
        <p>No hay tareas Pendientes</p></div>
        `
        return//para que pare el ciclo
    }

    //para vaciar las tareas una vez cargadas 
    listaTarea.innerHTML = ''
    //  recorrer el objeto y pintar tarea
    Object.values(tareas).forEach(tarea => {
        // console.log(tarea);
        //cuando hay un template hay que hacer primero el clone texto viene del objeto tarea y un foreach
        const clone = template.cloneNode(true)
        //guarda el ocntenido de la propiedad texto del objeto en el parrafo y lo clona para pintarlo en el html
        clone.querySelector('p').textContent = tarea.texto

        //condicional para modificar la alerta cuadno cambia el estado de la tarea a true con el metodo replace de classList
        if (tarea.estado) {
            //cambair el alert de color
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
           //cambiar el icono a undo
            clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-rotate-left')
            //tachar la tarea
            clone.querySelector('p').style.textDecoration='line-through'
           
        }
 //para cambiar el estado de la tarea a true mediante su id a todos los botones que tengan la clase fas 
        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id//le agrega el data set a los botons
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id//le agrega el data set a los botons

//almacena la caedna de elementos html y luego almacena en el dom
        fragment.appendChild(clone)
    })
    console.log(listaTarea);
    listaTarea.appendChild(fragment)
}

//  funcion para la delegaacion de eventos para interactiuar con los botnes de elimin para cambiar el estado de la tarea que viene por defecto en false a true y poder trabajar con las tareas
  const btnAccion = e =>{
        
          if (e.target.classList.contains('fa-circle-check')) {
              //esto da por defaul true , ahora hay que cambiar el estado de la tarea, hay que acceder el id que se forma de forma dinamica
            // console.log(e.target.classList.contains('fa-circle-check'));
            // console.log(e.target.dataset.id);
             tareas[e.target.dataset.id].estado = true;
             pintarTareas();//llamar a la funcion
            
          }

          //trabajar con el boton de delete para bprrar la tarea mediante su id
           if (e.target.classList.contains('fa-circle-minus')) {
               delete tareas[e.target.dataset.id]
               pintarTareas();//lammar a la funcion
               //  console.log(tareas);
           }

           //acceder a a la clase del icono undo para cambiar el estado de la tarea a false para que elicono vuelva al check o como estaba antes
           if (e.target.classList.contains('fa-rotate-left')) {
            tareas[e.target.dataset.id].estado = false;
            pintarTareas();//llamar a la funcion
           }

          //evitar que otros eventos de addevelisent fuera del div o por ahi se activen 
          e.stopPropagation();
          
     } 





