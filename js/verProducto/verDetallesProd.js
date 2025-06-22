import { mostrarIndicadorCarrito } from "../funciones.js";

//Manejo de pagina de ver + de un producto
//variables de pagina ver producto
let producto = JSON.parse(localStorage.getItem('ProductoVer'));

//toast
const toast = (texto) => {
    Toastify({
        text: texto,
        duration: 2000,
        gravity: 'top',
        position: 'center',
        }).showToast();
}

//crear img de producto
export function crearImgProdDetalles() {
    let productoDetallesImg = document.querySelector('.productoDetalles-img-container');
    let fragmento = document.createDocumentFragment();
    let img = document.createElement('img');
    let producto = JSON.parse(localStorage.getItem('ProductoVer'));

    img.src = `../${producto.src}`;
    img.alt = producto.nombre;
    img.className = 'imgProdVer';

    fragmento.appendChild(img);
    productoDetallesImg.appendChild(fragmento);
}

//cargar info de producto
export function cargarInfoProducto() {
    let {nombre, detalles, precio} = JSON.parse(localStorage.getItem('ProductoVer'));
    let title = document.querySelector('.productoDetalles-descripcion-title');

    if (title){
        title.textContent = nombre;

        let info = document.querySelector('.productoDetalles-descripcion-info');
        info.textContent = detalles;

        let precioEl = document.querySelector('.productoDetalles-descripcion-precio');
        precioEl.textContent = `$ ${precio}`;
    }
}

//agregar un producto al carrito de compras, creando si no existe o agregando si ya existe
export function agregarProducto() {
    let agregarBtn = document.querySelector('.productoDetalles-descripcion-comprar');
    let producto = JSON.parse(localStorage.getItem('ProductoVer'));

    agregarBtn.addEventListener('click',()=>{
        let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : undefined;

        if (carrito) {
            carrito.push(producto);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        } else {
            let arreglo = [producto];
            localStorage.setItem('carrito',JSON.stringify(arreglo));
        }
        //notificar producto agregado al carro
        toast('Producto agregado al carrito');
        //actualizar indicador carrito asincronicamente
        mostrarIndicadorCarrito();
    })
}
