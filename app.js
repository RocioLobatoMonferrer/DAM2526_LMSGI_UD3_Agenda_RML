/* ==========================================================
   1) REFERENCIAS AL DOM 
   ========================================================== */


// Formulario
const formContacto = document.querySelector("#formContacto");
// Inputs
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
// Botones
const btnAddTel = document.querySelector("#btnAddTel");
const btnGuardarContacto = document.querySelector("#btnGContacto");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const btnLimpiar = document.querySelector("#btnLimpiar");
// Listas
const listaTel = document.querySelector("#listaTel");
const listaContacto = document.querySelector("#listaContacto")
// Mensaje
const mensaje = document.querySelector("#msg");


/* ==========================================================
   2) VARIABLES GLOBALES  
   ========================================================== */


let telefonos = [];
let agenda = cargarContactos();


/* ==========================================================
   3) INICIALIZACIÓN (eventos)
   ========================================================== */


function init() {
    formContacto.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    btnAddTel.addEventListener("click", () => {
        if(!validadTelefono()) {
            return;
        }
        agregarTelefono();
        pintarListaTelfs();
    });
    btnGuardarContacto.addEventListener("click", function(event) {
        event.preventDefault();
        if(!validad()) {
            return;
        }
        insertarContacto();
        render();
    });
    btnLimpiar.addEventListener("click", () => {
        limpiar();
    });
    btnBorrarTodo.addEventListener("click", () => {
        confirm("¿Estás seguro?") ? borrarAgenda() : "";
    });

    render();
}

init();


/* ==========================================================
   4) VALIDACIONES DE DATOS 
   ========================================================== */


function validad(){
   if (!inpNombre.checkValidity()) {
        inpNombre.reportValidity();
        return false;
    }

    if (!inpApellidos.checkValidity()) {
        inpApellidos.reportValidity();
        return false;
    }
    if (listaTel.children.length == 0){
        return false;
    }
    
    return true;
}

function validadTelefono() {
    if (!inpTelNumero.checkValidity()){
        inpTelNumero.reportValidity();
        return false;
    }
    if (inpTelNumero.value == "") {
        alert("Añade al menos un teléfono.");
        return false;
    }
    return true;
}


/* ==========================================================
   5) TELEFONOS 
   ========================================================== */


function agregarTelefono(){
    telefonos.push(inpTelNumero.value);
    inpTelNumero.value = ""; 
    pintarListaTelfs();
}


/* ==========================================================
   6) CONTACTOS PARA GUARDAR EN LA AGENDA 
   ========================================================== */


function crearContacto() {
    const contacto = {
        id: crearId(),
        nombre: inpNombre.value,
        apellidos: inpApellidos.value,
        telefonos: [...telefonos]
    };
    
    return contacto;
}

function insertarContacto() {
    const contacto = crearContacto();
    if(!contacto) {
        return null;
    } else {
        agenda.push(contacto);
        localStorage.setItem("agenda", JSON.stringify(agenda));
        telefonos = [];
        inpNombre.value = "";
        inpApellidos.value = "";
        inpTelNumero.value = "";
        pintarListaTelfs();
    }
}

function crearId() {
    let id = 0;
    for(let i = 0; i < agenda.length; i++) {
        if(agenda[i].id > id) {
            id = agenda[i].id;
        }
    }
    return id+1;
}


/* ==========================================================
   7) FUNCIONES DE CARGA7ELIMINACIÓN DE DATOS (localStorage)
   ========================================================== */


function cargarContactos() {
  const raw = localStorage.getItem("agenda");

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    alert.error("JSON inválido:", error);
    return [];
  }
}

function borrarContacto(indice) {
    if(!confirm("¿Estás seguro?")) {
        return false;
    }
    agenda.splice(indice, 1); // Elimina en la posición i solo un elemento del array (1)
    localStorage.setItem("agenda", JSON.stringify(agenda));
    render();
}

function borrarAgenda() {
    agenda = [];
    localStorage.removeItem("agenda");
    render();
}


/* ==========================================================
   8) FUNCIONES DE PINTADO/LIMPIAR
   ========================================================== */


function pintarListaTelfs() {
    listaTel.textContent = "";
    for(let i = 0; i < telefonos.length; i++) {
        const li = document.createElement("li");
        li.textContent = telefonos[i];
        listaTel.appendChild(li);
    }
}

function pintarContacto() {
    listaContacto.textContent = "";
    for(let i = 0; i < agenda.length; i++) {
        const li = document.createElement("li");
        const borrar = document.createElement("button");
        const div = document.createElement("div");

        borrar.textContent = "Borrar";
        li.innerHTML = `Id: ${agenda[i].id}<br>
        Nombre: ${agenda[i].nombre}<br>
        Apellidos: ${agenda[i].apellidos}<br>
        Telefonos: ${agenda[i].telefonos.join(", ")}<br>`;

        listaContacto.appendChild(div);
        div.appendChild(li);
        div.appendChild(borrar);

        borrar.addEventListener("click", () => borrarContacto(i));
    }
}

function limpiar() {
    listaTel.textContent = "";
    telefonos = [];
    inpNombre.value = "";
    inpApellidos.value = "";
    inpTelNumero.value = "";
    pintarLista();
}

function render(){
    pintarListaTelfs();
    pintarContacto();
}

