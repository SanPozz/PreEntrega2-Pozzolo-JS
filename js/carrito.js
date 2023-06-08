const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito');
const totalCarrito = document.querySelector('#total-carrito');
const divVaciarCarrito = document.querySelector('#boton-vaciar');

fetch('../json/productos.json')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let html = '';
        data.forEach(producto => {
            html += `
            <div class="card border-2 border-violet-800 rounded-lg">
                <img src="${producto.imgURL}" alt="">
                <h4 class="title">${producto.title}</h4>
                <p class="price text-rose-800">$${producto.price}</p>
                <button class="btnAgregar" type="submit" data-id="${producto.id}">Agregar al Carrito</button>
            </div>
            `
        });
        listaProductos.innerHTML = html;
    });

let productosCarrito = [];

cargadorEventListeners();

function cargadorEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        mostrarCarrito();
    });

    window.addEventListener('beforeunload', () => {
        const carritoVacio = productosCarrito.length === 0;
        if (carritoVacio) {
            localStorage.removeItem('carrito');
        }
    });

};

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('btnAgregar')) {
        const producto = e.target.parentElement;
        // console.log(producto);
        leerDatosProducto(producto);
        Toastify({
            text: "El producto ha sido agregado al carrito",
            duration: 2000
        }).showToast();
    }
};

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.price').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoProducto);


    if( productosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
        const productos = productosCarrito.map( producto => {
            if( producto.id === infoProducto.id ) {
                producto.cantidad++;
                // console.log(productosCarrito);

                return producto;
                
            } else {
                // console.log(productosCarrito);
                
                return producto;
        }
    })
        productosCarrito = [...productos];
    }  else {
        productosCarrito = [...productosCarrito, infoProducto];
    }


    mostrarCarrito();

};

function eliminarProducto(e) {
    if(e.target.classList.contains('eliminar-producto') ) {
        const productoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        mostrarCarrito();
        Toastify({
            text: "El producto ha sido eliminado del carrito",
            duration: 2000
        }).showToast();
    }
};

function mostrarCarrito() {
    
    vaciarCarrito();

    productosCarrito.forEach(producto => {
        const nuevoDiv = document.createElement('div');
        nuevoDiv.innerHTML = `
        <div class="flex justify-center pt-10">
            <div class="flex border-2 border-violet-800 rounded-lg bg-black w-3/5">
                <img src="${producto.imagen}" class="bg-white rounded-lg" width="250px" height="250px" alt="">
                <div class="m-10 w-fit flex flex-col space-y-8">
                    <div class="flex flex-col space-y-2">
                        <h4 class="title text-neutral-50 text-4xl">${producto.titulo}</h4>
                    </div>
                    <div>
                        <p class="price text-rose-800 text-3xl">${producto.precio}</p>
                        <p class="text-base text-neutral-50">Cantidad: ${producto.cantidad}</p> 
                        <button type="submit" class="btn-sumar rounded-md bg-white border-violet-800 h-10 w-10">+</button> 
                        <button type="submit" class="btn-restar rounded-md bg-white border-violet-800 h-10 w-10">-</button>
                        <div>
                            
                        </div>
                    </div>
                    <div>
                        <button id="btneliminar" type="submit" class="rounded-md eliminar-producto" data-id='${producto.id}'>Eliminar Producto</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        const btnSumar = nuevoDiv.querySelector('.btn-sumar');
        const btnRestar = nuevoDiv.querySelector('.btn-restar');

        btnSumar.addEventListener('click', () => {
            aumentarCantidad(producto.id);
        });

        btnRestar.addEventListener('click', () => {
            disminuirCantidad(producto.id);
        });

        contenedorCarrito.appendChild(nuevoDiv);
        mostrarTotalCarrito(productosCarrito);
        storageCarrito();

})};

function mostrarTotalCarrito(productos) {

    if (productos.length > 0) {
        let total = 0;
        productos.forEach(producto => {
            const precio = producto.precio;
            const cantidad = producto.cantidad;
            precioSinPeso = eliminarSimboloPeso(precio);
            numParseado = parseInt(precioSinPeso);
            total += numParseado * cantidad;
    });

    totalCarrito.innerHTML = `
    <div class="flex justify-center pt-10">
        <div class="h-40 w-80 border-2 border-violet-800 rounded-lg bg-white">
            <h5 class="text-rose-800 p-10 pt-16 text-2xl">Precio Total: $${total}</h5>        
        </div>
    </div>
    `;

    divVaciarCarrito.innerHTML = `
    <button type="submit" class="bg-white h-20 w-80 text-lg m-8 rounded-md border-2 border-violet-800 btn-vaciar-carrito">Vaciar Carrito</button>
    
    `;

    const btnVaciarCarrito = document.querySelector('.btn-vaciar-carrito');

    btnVaciarCarrito.addEventListener('click', () => {
        if (productosCarrito.length == 0) {
            Toastify({
                text: "El carrito ya esta vacio",
                duration: 2000
            }).showToast();
        } else {
            productosCarrito = [];
            mostrarCarrito();
            Toastify({
                text: "Se ha vaciado el carrito",
                duration: 2000
            }).showToast();
        }

    })

    } else {
        totalCarrito.innerHTML = ``;
        divVaciarCarrito.innerHTML = ``;
    }
};

function storageCarrito() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
};

function vaciarCarrito() {
    contenedorCarrito.innerHTML='';
    mostrarTotalCarrito(productosCarrito)
};

function eliminarSimboloPeso(texto) {
    const textoSinPeso = texto.replace(/\$/g, "");
    return textoSinPeso;
};

function aumentarCantidad(id) {
    productosCarrito = productosCarrito.map(producto => {
        if (producto.id === id) {
            producto.cantidad++;
        }
        return producto;
    });

    mostrarCarrito();
};


function disminuirCantidad(id) {
    productosCarrito = productosCarrito.map(producto => {
        if (producto.id === id) {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                return null; 
            }
        }
        return producto;
    }).filter(producto => producto !== null);

    mostrarCarrito();
}