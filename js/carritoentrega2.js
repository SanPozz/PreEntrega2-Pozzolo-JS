const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const btnVaciarCarrito = document.querySelector('.btn-vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito');

let productosCarrito = [];

cargadorEventListeners();

function cargadorEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    btnVaciarCarrito.addEventListener('click', () => {
        if (productosCarrito.length == 0) {
            Toastify({
                text: "El carrito ya esta vacio",
                duration: 2000
            }).showToast();
        } else {
            productosCarrito = []
            mostrarCarrito();
            Toastify({
                text: "Se ha vaciado el carrito",
                duration: 2000
            }).showToast();
        }

    })

    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        mostrarCarrito();
    })
}

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('btnAgregar')) {
        const producto = e.target.parentElement;

        leerDatosProducto(producto);
        Toastify({
            text: "El producto ha sido agregado al carrito",
            duration: 2000
        }).showToast();
    }
}

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
                console.log(productosCarrito);

                return producto;
                
            } else {
                console.log(productosCarrito);
                
                return producto;
        }
    })
        productosCarrito = [...productos];
    }  else {
        productosCarrito = [...productosCarrito, infoProducto];
    }


    mostrarCarrito();

}

function eliminarProducto(e) {
    if(e.target.classList.contains('eliminar-producto') ) {
        const productoId = e.target.getAttribute('data-id')
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        mostrarCarrito();
        Toastify({
            text: "El producto ha sido eliminado del carrito",
            duration: 2000
        }).showToast();
    }
}

function mostrarCarrito() {
    
    vaciarCarrito();

    productosCarrito.forEach(producto => {
        const nuevoDiv = document.createElement('div');
        nuevoDiv.innerHTML = `
            <div class="flex border-2 border-violet-800 rounded-lg bg-black">
            <img src="${producto.imagen}" class="rounded-lg" width="250px" height="250px" alt="">
            <div class="m-10 w-fit flex flex-col space-y-8">
                <div class="flex flex-col space-y-2">
                    <h4 class="title text-neutral-50 text-4xl">${producto.titulo}</h4>
                </div>
                <div>
                    <p class="price text-rose-800 text-3xl">${producto.precio}</p>
                    <p class="text-base text-neutral-50">Cantidad: ${producto.cantidad}</p>
                </div>
                <div>
                    <button id="btneliminar" type="submit" class="rounded-md eliminar-producto" data-id='${producto.id}'>Eliminar Producto</button>
                </div>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(nuevoDiv);
    });

    storageCarrito();

}

function storageCarrito() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function vaciarCarrito() {
    contenedorCarrito.innerHTML='';
}