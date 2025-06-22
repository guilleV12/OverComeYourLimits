//FUNCIONES PARA MOSTRAR, CREAR Y RECARGAR TABLA DE CARRITO
import { asignarEventosBotones } from "./manejarProdCarrito.js";

//crear tabla 
export function renderTabla(){
    let fragmento = document.createDocumentFragment();
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let listaCarrito = document.querySelector('.lista-carrito');
    let carro = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

    listaCarrito.innerHTML = `
        <h1>Carrito de compras</h1>
            <table>
                <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th></th>
                </tr>        
            </table>`;
    
    if (carro.length > 0) {
        listaCarrito.innerHTML +=`<button class="comprar-todo">Comprar todo</button>
                                  <button class="vaciar-carrito">Vaciar carrito</button>`;
        let posicion = 0;
        carro.forEach(producto => {
            let fragmento = document.createDocumentFragment();
            let {nombre,precio,src,id} = producto;
            fragmento.appendChild(crearTr(src,precio,nombre,id,posicion));
            document.querySelector('table').appendChild(fragmento);
            posicion ++;
        });
        asignarEventosBotones()//reasignar funciones a botones nuevos 
    } else {
        td.colSpan = 4;
        td.id = 'carrito-vacio-txt';
        td.textContent = 'El carrito esta vacio.';
        tr.appendChild(td);
        fragmento.appendChild(tr);
        document.querySelector('table').appendChild(fragmento);
    }
}

//Funcion para crear td's de una row correspondiente a un producto en el carrito
function crearTr(src,precio,nombre,id,posicion) {
    let tr = document.createElement('tr');
    tr.className = 'fila-prods';
    let tdProducto = document.createElement('td');
    tdProducto.innerHTML = `<img src='../${src}'></img>`;
    tr.appendChild(tdProducto);  
    let tdNombre = document.createElement('td');
    tdNombre.textContent = nombre;
    let tdPrecio = document.createElement('td');
    tdPrecio.textContent = `$${precio}`;
    let tdComprar = document.createElement('td');
    tdComprar.innerHTML = `<button class='comprar-elemento' idprod='${id}' carritoPos='${posicion}'>Comprar</button><button class='eliminar-carrito' idprod='${id}' carritoPos='${posicion}'>Eliminar</button>`;
    tr.appendChild(tdProducto);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdComprar);
    return tr;
}