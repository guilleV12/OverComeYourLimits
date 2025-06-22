import { renderTabla } from "./carrito/carrito.js";
import { manejoForm } from "./contacto/validarForm.js";
import { cargarInfoProducto, crearImgProdDetalles, agregarProducto } from "./verProducto/verDetallesProd.js";
//SCRIPT DE PRODUCTOS en index
let productos = [];

//funcion crear elementos
const crearImg = (src,title,alt,clase) => {
    let imgNueva = document.createElement('img');
    imgNueva.src = src;
    imgNueva.title = title;
    imgNueva.alt = alt;
    imgNueva.className = clase;

    return imgNueva;
}

//crear btn ver
const crearBtn = (prodid, clase, contenido) => {
    let btnNuevo = document.createElement('button');
    btnNuevo.className = clase;
    btnNuevo.textContent = contenido;
    btnNuevo.setAttribute('prodid',prodid);

    return btnNuevo;
}

//guardar producto a ver en local storage, para recuperar info en producto
function guardarProductoVer(producto) {
    localStorage.setItem('ProductoVer',JSON.stringify(producto));
}

//Objeto producto
class Producto {
    constructor(obj){
        this.id = obj.id;
        this.src = obj.src;
        this.nombre = obj.producto;
        this.precio = obj.precio;
        this.detalles = obj.detalles;
    }
}

//Arreglos de productos
//productos destacados (solo 9)
const cargarProductos = async (array) => {
    try {
        const response = await fetch('./DB/productos.json');
        const data = await response.json();        
        productos = data[array];
    } catch (error) {
        console.log(error);
    }
}

//Crear e insertar productos destacados
export async function renderProductos(contenedor,array) {
    let destacados = document.querySelector(contenedor); //espacio vacio en html
    let fragmentoDestacados = document.createDocumentFragment(); //fragmento con la info de productos destacados

    if (destacados){
        for (let i = 0; i < 3; i++) {

            let rowDestacados = document.createElement('div'); //creacion de filas
            rowDestacados.className = 'row-destacados';

            fragmentoDestacados.appendChild(rowDestacados);

            let contadorProds = i * 3; //manejo de posiciones en array de productos destacados

            for (let e = contadorProds; e < (contadorProds + 3); e++) {

                //desestructuracion del producto                
                await cargarProductos(array);
                let objProducto = new Producto(productos[e]);
                let {id,src,nombre,precio} =  objProducto;

                let producto = document.createElement('div'); //creacion de containers con productos con atributo 'prodid' para facilitar su manejo en js
                producto.className = 'articulo-destacado-container';

                let fragmentoProducto = document.createDocumentFragment(); //fragmento de productos
                let imgProducto = crearImg(src,`Comprar ${nombre}`,nombre,'articulo-destacado');
                let h3Producto = document.createElement('h3');
                h3Producto.textContent = nombre;
                let h4Producto = document.createElement('h4');
                h4Producto.textContent = `$${precio}`;
                let enlaceProducto = document.createElement('a');
                enlaceProducto.href = `${contenedor !== '.destacados' ? '../' : ''}pages/producto.html`;
                let btnComprar = crearBtn(id,'btnComprar','Ver +');
                enlaceProducto.appendChild(btnComprar);

                btnComprar.addEventListener('click',()=>{
                    guardarProductoVer(objProducto);
                });

                fragmentoProducto.appendChild(imgProducto);
                fragmentoProducto.appendChild(h3Producto);
                fragmentoProducto.appendChild(h4Producto);
                fragmentoProducto.appendChild(enlaceProducto);
                producto.appendChild(fragmentoProducto); //insertar fragmento de producto en un container
                rowDestacados.appendChild(producto);//insertar producto en fila
            }
        }

        destacados.appendChild(fragmentoDestacados); //insertar fragmento con productos destacados en el container destacados
    }
}

export function cargarScripts(src,modulo) {
    let script = document.createElement('script');
    script.src = src;
    modulo && (script.type = 'module');
    document.body.appendChild(script);
}

//actualizar indicador carrito asincronicamente
export const mostrarIndicadorCarrito = async() => {
    let carritoIndicador = document.querySelector('.carritoIndicador');

    try {    
        let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
        
        carro && ( carro.length > 0 ? (carritoIndicador.textContent = carro.length) : (carritoIndicador.textContent = '') );
    } catch (error) {
        console.log(error);   
    }
}

export const cambiarContentPage = async (url) => {
    const mainResponse = await fetch(url);
    const mainData = await mainResponse.text();
    document.querySelector('.page-content').innerHTML = mainData;
}

export function manejarEnlaces() {
    document.querySelectorAll('a').forEach(link => {  
        link.addEventListener('click',async (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            if (href.includes('contacto')) {
                await cambiarContentPage('./pages/contacto.html')
                manejoForm()
            } else if (href.includes('index')) {
                await cambiarContentPage('./pages/home.html')
                await renderProductos('.destacados','arrayProductosDestacados');
                manejarEnlaces();
            } else if (href.includes('producto')) {
                await cambiarContentPage('./pages/producto.html')
                crearImgProdDetalles();
                cargarInfoProducto();
                agregarProducto();
            } else if (href.includes('carrito')) {
                await cambiarContentPage('./pages/carrito.html')
                renderTabla()
            } else if (href.includes('accesorios')) {
                await cambiarContentPage('./pages/soloProductos.html')
                await renderProductos('.productos-soloProds','arrayAccesorios')
                manejarEnlaces()
            } else if (href.includes('ropa')) {
                await cambiarContentPage('./pages/soloProductos.html')
                await renderProductos('.productos-soloProds','arrayRopa')
                manejarEnlaces()
            }
        })
    })
}