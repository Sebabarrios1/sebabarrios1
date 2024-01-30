let nombrepag = document.getElementById("nombrepag");
nombrepag.innerHTML = "Pompo Ceramica";
let subnombre = document.getElementById("subnombre");
subnombre.innerHTML = "produccion independiente de ceramica."

let presentacion = document.getElementById("presentacion");



function guardarNombreApellido() {
  let nombre = document.getElementById('inputNombre').value;
  let apellido = document.getElementById('inputApellido').value;
  
  if (sessionStorage.getItem('nombre') && sessionStorage.getItem('apellido')) {
    let nombreAlmacenado = sessionStorage.getItem('nombre');
    let apellidoAlmacenado = sessionStorage.getItem('apellido');

    setTimeout(function() {
      presentacion.innerHTML ='Hola ' + nombreAlmacenado + ' ' + apellidoAlmacenado + '! Que gusto verte de nuevo. <br>Continua bajando para poder realizar tu pedido.';
    }, 1500);
  } else if(nombre === "" || apellido === ""){
    presentacion.innerHTML = `Debe ingresar su nombre y apellido`;
  } else {
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('apellido', apellido);

    
    setTimeout(function() {
      presentacion.innerHTML = 'Hola ' + nombre + ' ' + apellido + '! Gracias por ingresar tu información.';
    }, 1500);
  }
}


let botonEnviar = document.getElementById("botonEnviar");
botonEnviar.addEventListener("click", guardarNombreApellido);



let productos = document.getElementById("productos"); 
productos.innerHTML = "Listado de productos";


const lista_producto =[
  {id: 1, nombre: "Taza Pompo",
  precio: 4000}, 
  {id: 2, nombre: "Cenicero Flor",
  precio: 4500}, 
  {id: 3, nombre: "Porta Sahumerio",
  precio: 3500}
];


let listado = document.getElementById("listado");

for (let i = 0; i < lista_producto.length; i++) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `${i + 1}. ${lista_producto[i].nombre} $${lista_producto[i].precio}`;

  const button = document.createElement("button");
  button.className = "btn btn-primary";
  button.innerText = "Comprar";
   
 
  button.onclick = function () {
    const saved = localStorage.getItem("carrito");
    const carrito = saved ? JSON.parse(saved) : [];
    carrito.push(lista_producto[i]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    llamarcarrito();
    
  };

  listItem.appendChild(button);
  listado.appendChild(listItem);
};


function llamarcarrito(){
let carrito_lista = document.getElementById("carrito");
carrito_lista.innerHTML=""
const saved = localStorage.getItem("carrito");
const carrito = saved ? JSON.parse(saved) : [];

let total = 0;

for (let i = 0; i < carrito.length; i++) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `${i + 1}. ${carrito[i].nombre} $${carrito[i].precio}`
  total += carrito[i].precio
  carrito_lista.appendChild(listItem);
}
let totalprod = document.getElementById("total");
totalprod.innerHTML = " valor total: $"+ total;  
};


let eliminarCarrito = document.getElementById("eliminar");
eliminarCarrito.addEventListener("click", () => {
    const carrito = [];  
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    llamarcarrito();  
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El carrito ha sido eliminado.",
      showConfirmButton: false,
      timer: 1500
    });
});

function procesarPago() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
      const exitoEnPago = Math.random() < 0.8; 
      if (exitoEnPago) {
        resolve("Compra exitosa.");
      } else {
        reject("Error en la compra, intente nuevamente.");
      }
    }, 1500); 
  });
}


let botonPagar = document.getElementById("botonPagar");
botonPagar.addEventListener("click", () => {
    procesarPago()
    .then((mensaje) => {       
            Swal.fire({
              position: "center",
              icon: "success",
              title: "¡Gracias por su compra!\n" + mensaje,
              showConfirmButton: false,
              timer: 2500
            })
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un problema con el pago:\n" + error,
        showConfirmButton: false,
        timer: 3500
      })
    
    });
});