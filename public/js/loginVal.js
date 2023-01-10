let a = document.getElementById("loginForm");

a.addEventListener("submit", function(ev){
    
    ev.preventDefault();

    let b = document.getElementById('emailInput').value;
    if (b==""){
        alert('Completar el campo Email');
        return;
    }

    let c = document.getElementById('passInput').value;
    if (c==""){
        alert('Completar el campo Contraseña');
        return;
    }

    a.submit()
})