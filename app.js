/**
 * FORMULARIO
 */
const formContacto = document.querySelector("#formContacto");
/**
 * INPUTS
 */
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
/**
 * BOTONES
 */
const btnAddTel = document.querySelector("#btnAddTel");
const btnGuardarContacto = document.querySelector("#btnGContacto");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const btnLimpiar = document.querySelector("#btnLimpiar");
/**
 * LISTA
 */
const listaTel = document.querySelector("#listaTel");
const listaContacto = document.querySelector("#listaContacto")
/**
 * MENSAJE
 */
const mensaje = document.querySelector("#msg");

/**
 * VARIABLES GLOBALES
 */
let telefonos = [];
let agenda = cargarContactos();

/**
 * FUNCIONES
 */
function init() {
    formContacto.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    btnAddTel.addEventListener("click", () => {
        if(!validadTelefono()) {
            return;
        }
        agregarTelefono();
        pintarLista();
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

function agregarTelefono(){
    telefonos.push(inpTelNumero.value);
    inpTelNumero.value = ""; 
    pintarLista();
}

function pintarLista() {
    listaTel.textContent = "";
    for(let i = 0; i < telefonos.length; i++) {
        const li = document.createElement("li");
        li.textContent = telefonos[i];
        listaTel.appendChild(li);
    }
}

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
        pintarLista();
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

        borrar.addEventListener("click", () => borrarContacto(div));
    }
}

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

function borrarContacto(div) {
    if(!confirm("¿Estás seguro?")) {
        return false;
    }
    div.remove();
}

function borrarAgenda() {
    agenda = [];
    localStorage.removeItem("agenda");
    render();
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
    pintarLista();
    pintarContacto();
}

