let bc = document.getElementById("botComprar")

bc.addEventListener('click',function(){
    let nombre = document.getElementById("product-title");
    let precio = document.getElementById("precio");
    let productoNuevo = {nombre: nombre, precio: precio};
    let productos = JSON.parse(localStorage.getItem('carrito'));
    let suma = productos.push(productoNuevo);

    localStorage.setItem('carrito', JSON.stringify(suma))
    console.log(productos)
})
