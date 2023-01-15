let productosCarrito = JSON.parse(localStorage.getItem('carrito'));
let divImg = document.getElementById('divImg');
let divInfo = document.getElementById('infoProd')
for(let obj of productosCarrito){
    let nombre = document.createElement('h3')
    let precio = document.createElement('h4')
    let img = document.createElement('img')
    nombre.setAttribute('class','nombreProd')
    precio.setAttribute('class','precioProd')
    nombre.innerText = obj.nombre
    precio.innerText = obj.precio
    img.src = obj.imagen
    divInfo.appendChild(nombre)
    divInfo.appendChild(precio)
    divImg.appendChild(img)


}




{/* <div class="containerCarrito">
                <div class="cart">
                    <div class="productos">
                        <div class="producto">
                            <img src="/img/products/golden.png">
                            <div class="infoProducto">
                                <h3 class="nombreProd">Alimento Royal Canin Golden Retriever</h3>
                                <h4 class="precioProd">$2222</h4>
                                <h4 class="descuento">25%</h4>
                                <p class="cantidadProd">Cantidad: <input value="1" type="number" name="">
                                <p class="eliminarProd">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="eliminar">Eliminar</span>
                                </p>
                            </div>
                        </div>
                        <div class="producto">
                            <img src="/img/p1.jpg">
                            <div class="infoProducto">
                                <h3 class="nombreProd">Alimento Royal Canin Bulldog Frances</h3>
                                <h4 class="precioProd">$5,000</h4>
                                <h4 class="descuento">10%</h4>
                                <p class="cantidadProd">Cantidad: <input min="1" type="number" value="1" name="">
                                <p class="eliminarProd">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="eliminar">Eliminar</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="totalCart">
                        <p>
                            <span>Cantidad Productos</span>
                            <span id="cantProd">2</span>
                        </p>
                        <p>
                            <span>Precio Total</span>
                            <span id="precioTotal">$12,000</span>
                        </p>
                        <p>
                            <span>Ahorras</span>
                            <span id='ahorro'>$3,000</span>
                        </p>
                        <a href="#" id="botonCompra">Comprar</a>
                    </div>
                </div>
            </div> */}