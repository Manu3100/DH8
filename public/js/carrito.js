let bc = document.getElementById("botComprar")

bc.addEventListener('click',function(){
    let nombre = document.getElementById("product-title").innerText;
    let precio = document.getElementById("precio").innerText;
    let img = document.getElementById('imgProd').src;
    let productoNuevo = {nombre: nombre, precio: precio, imagen: img};
    let productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(productosCarrito == undefined || productosCarrito == null){
       productosCarrito = [] 
    }  
    productosCarrito.push(productoNuevo)
    
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    alert('Producto agregado')
})
