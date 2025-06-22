//VARIABLES GLOBALES
//importar elementos y funciones para modificar/recargar cuando se compra o elimina un prod
import { mostrarIndicadorCarrito } from "../funciones.js";
import { renderTabla } from "./carrito.js";

//FUNCIONES DE LIBRERIAS
//toast para notificar accion de prods
const toast = (compra) => {
    Toastify({
        text: compra == true ? 'Compra realizada!' : 'Producto/s eliminado/s',
        duration: 2000,
        gravity: 'top',
        position: 'center',
        }).showToast();
}

//alerta accion
const alerta = (titulo,url,texto,alt,posicion,compra) => {
    Swal.fire({
        title: titulo,
        text: texto,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        imageWidth: 250,
        imageHeight: 300,
        imageUrl: `../${url}`,
        imageAlt: alt,
    }).then((result) => {
        if (result.isConfirmed){
            posicion != -1 ? borrarProd(posicion) : borrarTodoProd();
            mostrarIndicadorCarrito();
            toast(compra);
        }
    })
}

//FUNCIONES PARA BORRAR PRODUCTOS EN COMPRA O ELIMINAR
//borrar un producto del carrito
function borrarProd(posicion) {
    let filasProds = document.querySelectorAll('.fila-prods');
    let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

    try {
        carro.splice(posicion,1);
        localStorage.setItem('carrito',JSON.stringify(carro));
        filasProds.forEach(element => {
            element.remove();
        });
    } catch (error) {
        console.log(error);
    } finally {
        renderTabla();
        asignarEventosBotones();
    }
}

//borrar todos los productos del carrito
function borrarTodoProd(){
    let filasProds = document.querySelectorAll('.fila-prods');

    try {
        localStorage.removeItem('carrito');
        filasProds.forEach(element => {
            element.remove();
        });
    } catch (error) {
        console.log(error);
    } finally {
        renderTabla();
        asignarEventosBotones();
    }
    
}

//comprar un producto
function comprarProducto(idProd,posicion) {
    let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    let producto = carro.find(prod=>  prod.id == idProd );

    alerta('Confirmar compra',producto.src,`Desea comprar: ${producto.nombre} por $${producto.precio}?`,`${producto.nombre} a comprar`,posicion,true);
}

//comprar todos los productos
function comprarTodo(){
    let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    let precioTotal = carro.reduce((acc,prod) => acc + prod.precio, 0,);
    
    alerta('Confirmar compra','assets/images/comprarTodo.png',`Desea realizar la compra por $${precioTotal}?`,`productos de carrito a comprar`, -1,true);
}

//ASIGNACION DE FUNCIONES A LOS BOTONES
export function asignarEventosBotones() {
    let btnComprar = document.querySelectorAll('.comprar-elemento');
    let btnEliminar = document.querySelectorAll('.eliminar-carrito');
    let btnComprarTodo = document.querySelector('.comprar-todo');
    let btnEliminarTodo = document.querySelector('.vaciar-carrito');
    let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

    btnComprar.forEach(btn => {
        btn.addEventListener('click', () => {
            comprarProducto(btn.getAttribute('idprod'), btn.getAttribute('carritoPos'));
        });
    });

    btnEliminar.forEach(btn => {
        let producto = carro.find(prod => prod.id == btn.getAttribute('idprod'));
        btn.addEventListener('click', () => {
            alerta('', producto.src, `Desea eliminar el producto ${producto.nombre} del carrito?`, `productos de carrito a eliminar`, btn.getAttribute('carritoPos'),false);
        });
    });

    if (btnComprarTodo) {
        btnComprarTodo.addEventListener('click', () => {
            comprarTodo();
        });
    }

    if (btnEliminarTodo) {
        btnEliminarTodo.addEventListener('click', () => {
            alerta('', 'assets/images/comprarTodo.png', `Desea eliminar todos los productos del carrito?`, `productos de carrito a eliminar`, -1,false);
        });
    }
}