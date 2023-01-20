let a = document.getElementById("serviceForm");

a.addEventListener("submit", function(ev){
    
    ev.preventDefault();

    let b = document.getElementById('nomInput').value;
    if (b==""){
        alert('Completar el campo Nombre');
        return;
    }

    let c = document.getElementById('apeInput').value;
    if (c==""){
        alert('Completar el campo Apellido');
        return;
    }

    let d = document.getElementById('emailInput').value;
    if (d==""){
        alert('Completar el campo Email');
        return;
    }

    let e = document.getElementById('fechaInput').value;
    if (e==""){
        alert('Completar el campo Fecha');
        return;
    }

    a.submit()
    alert('Turno Agendado!')
})
