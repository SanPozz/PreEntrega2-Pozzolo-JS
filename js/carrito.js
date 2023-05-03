const carrito = [];

class Item{
    constructor(nombre, precio, categoria, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.descripcion = descripcion
    }
}

// Me gustaria hacer una interfaz para ingresar objetos a través de la aplicacion web
// Esta funcion agrega productos al carrito de compras
agregarItemCarrito = () => {
    let nombre = prompt('Ingresar nombre del Producto')
    let precio = parseInt(prompt('Ingresar precio del Producto'))
    let categoria = prompt('Ingresar categoria del Producto')
    let descripcion = prompt('Ingresar una breve descripcion del Producto')
    producto = new Item(nombre, precio, categoria, descripcion)
    carrito.push(producto)
}

agregarItemCarrito();
agregarItemCarrito();
// console.log(carrito);


// Me gustaria hacer una interfaz para eliminar objetos a través de la aplicacion web
// Elimina el elemento del carrito que elijas segun el indice
eliminarItemCarrito = (index) => {
    carrito.splice(index,1);
}
// console.log(carrito);


// Funcion para calcular el precio total de los productos del carrito
// totalCarrito = () => { 
//     let total = 0;
//     for (let index = 0; index < carrito.length; index++) {
//         let [, {precio}] = carrito;
//         total += parseInt(precio);
//     }
//     console.log(total);
//     // return total

// }
totalCarrito = () => { 
    let total = 0;
    for (let index = 0; index < carrito.length; index++) {
        const { precio } = carrito[index];
        total += parseInt(precio);
    }
    console.log(total);
    //return total;
}

totalCarrito();


// Funcion para vaciar el carrito por completo
vaciarCarrito = () => {
    carrito.splice(0, carrito.length);
}

/*
let productos

class Item{
    constructor(nombre, precio, categoria, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.descripcion = descripcion
    }
}

const carrito = {
    productos: [],

    agregarItemCarrito: () => {
        let nombre = prompt('Ingresar nombre del Producto')
        let precio = parseInt(prompt('Ingresar precio del Producto'))
        let categoria = prompt('Ingresar categoria del Producto')
        let descripcion = prompt('Ingresar una breve descripcion del Producto')
        let producto = new Item(nombre, precio, categoria, descripcion)
        carrito.productos.push(producto)
    },

    totalCarrito: () => { 
        let total = 0;
        for (let index = 0; index < carrito.productos.length; index++) {
            const [indexProducto, producto] = [index, carrito.productos[index]];
            total += parseInt(producto.precio);
            
        }
        console.log(total);
        // return total;
    },

    eliminarItemCarrito: (index) => {
        carrito.productos.splice(index,1);
    },
    
    mostrarCarrito: () => {
        console.log(carrito.productos)
    }
}

carrito.agregarItemCarrito();
carrito.agregarItemCarrito();
// carrito.mostrarCarrito();
// carrito.totalCarrito();
carrito.eliminarItemCarrito(1);
carrito.mostrarCarrito();
*/