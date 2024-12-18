let products = [];
fetch("../js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        if (contenedorCamisetas) {
            cargarCamisetas(...data);
        }
        else if (contenedorShorts) {
            cargarShorts(...data);
        } else (contenedorTodos)
        cargarTodos(...data);
    })
            
            
const contenedorCamisetas = document.getElementById("contenedorCamisetas");
const contenedorShorts = document.getElementById("contenedorShort");
const contenedorTodos = document.getElementById("contenedorTodos");
let btnAgregar = document.querySelectorAll(".producto-agregar");
let numerito = document.querySelector("#numCarrito");


document.addEventListener("DOMContentLoaded", () => {

    // if (contenedorCamisetas) {
    //     cargarCamisetas();
    //     actualizarNumerito();
    //     }
    // else if (contenedorShorts) {
    //     cargarShorts();
    //     actualizarNumerito();
    //     } else if (contenedorTodos)
    //     cargarTodos();
        actualizarNumerito();

}
);
//camisetas
function cargarCamisetas() {
    const camisetas = products.filter(producto => producto.category === "camisetas");

    contenedorCamisetas.innerHTML = "";

    camisetas.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card", "col-md-4");

        div.innerHTML = `
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: $${producto.price}</li>
            </ul>
            <div class="card-body">
                <button id="${producto.id}"  class="btn btn-primary producto-agregar">Agregar</button>
            </div>
        `;
        contenedorCamisetas.appendChild(div);
    });
    actualizarBtnAgregar();
}
//shorts
function cargarShorts() {

    const shorts = products.filter(producto => producto.category === "short");

    contenedorShorts.innerHTML = "";
    shorts.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card", "col-md-4");

        div.innerHTML = `
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: $${producto.price}</li>
            </ul>
            <div class="card-body">
                <button id="${producto.id}"  class="btn btn-primary producto-agregar">Agregar</button>
            </div>
        `;
        contenedorShorts.appendChild(div);
    });
    actualizarBtnAgregar();

}

//todos los productos
function cargarTodos() {

    products.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card", "col-md-4");
        div.innerHTML = `
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: $${producto.price}</li>
            </ul>
            <div class="card-body">
                <button id="${producto.id}" class="btn btn-primary producto-agregar">Agregar</button>
            </div>
        `;
        contenedorTodos.appendChild(div);
    });
    actualizarBtnAgregar();
}

function actualizarBtnAgregar() {
    btnAgregar = document.querySelectorAll(".producto-agregar");
    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//const productosEnCarrito = [];



function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado ",
        duration: 1500,
        destination: "./carrito.html",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, rgba(215, 231, 39),rgba(7, 30, 132))",
          margin: "1rem",
          borderRadius: "1rem",
          textTransform: "upperCase",
          fontSize: ".85rem"
         
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = Number(e.currentTarget.id);
    const productoAgregado = products.find(producto => producto.id === idBoton);
    //some=> para saber si existe dentro del array
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito ();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito (){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
