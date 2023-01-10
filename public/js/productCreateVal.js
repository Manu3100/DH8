let a = document.getElementById("createForm");

a.addEventListener("submit", function(ev){
    
    ev.preventDefault();

    let b = document.getElementById('nomInput').value;
    if (b==""){
        alert('Completar el campo Nombre');
        return;
    }

    let c = document.getElementById('precioInput').value;
    if (c==""){
        alert('Completar el campo Precio');
        return;
    }

    let d = document.getElementById('descInput').value;
    if (d==""){
        alert('Completar el campo Descripcion');
        return;
    }

    let e = document.getElementById('fechaInput').value;
    if (e==""){
        alert('Completar el campo Fecha');
        return;
    }

    
    let f = document.getElementById('image').value;
    if (f==""){
        alert('Completar el campo Imagen');
        return;
    }

    a.submit()
})
