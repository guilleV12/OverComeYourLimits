import { mostrarIndicadorCarrito, renderProductos, manejarEnlaces, cambiarContentPage } from "./funciones.js";
import { cargarScripts } from "./funciones.js";

try {
    //cargar head
    const headResponse = await fetch('./pages/layout/head.html');
    const headData = await headResponse.text();
    document.querySelector('head').innerHTML = headData;

    //header
    const headerResponse = await fetch('./pages/layout/header.html');
    const headerData = await headerResponse.text();
    document.querySelector('header').innerHTML = headerData;
    mostrarIndicadorCarrito();//iniciar indicador de productos en carrito

    //main
    await cambiarContentPage('./pages/home.html');

    //render prods
    await renderProductos('.destacados','arrayProductosDestacados');

    //manejar cambio de pagina
    manejarEnlaces();

    //footer
    const footerResponse = await fetch('./pages/layout/footer.html');
    const footerData = await footerResponse.text();
    document.querySelector('footer').innerHTML = footerData;

    // Cargar scripts despues de los estilos y elementos de pagina
    cargarScripts('https://cdn.jsdelivr.net/npm/sweetalert2@11');
    cargarScripts('https://cdn.jsdelivr.net/npm/toastify-js');
} catch (error) {
    console.log(error);
} finally {
    //mostrar pagina una vez que todo este cargado
    document.body.style.visibility = 'visible';
}