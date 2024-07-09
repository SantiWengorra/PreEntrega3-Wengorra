let ArrayUsuarios = [];
let tabla = [];
let login = false;

let btnInicio = document.getElementById('btnLogin');
btnInicio.addEventListener('click', alertLogin);

function alertLogin() {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        html:   '<h2 class="tituloAlert">INICIAR SESION</h2>' +
                '<form class="form">'+
                '<input type="text" placeholder="Nombre" id="nombre">' +
                '<input type="password" placeholder="Contraseña" id="password">' +
                '<button class="btn" id="loginBtn">Confirmar</button>'+
                '</form>',
        showConfirmButton: false,
    });

    document.getElementById('loginBtn').addEventListener('click', function(event) {
        event.preventDefault();
        let nombre = document.getElementById('nombre').value;
        let password = document.getElementById('password').value;
        
        let recuperado = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];
        function busqueda(objUsuario) {
            return objUsuario.nombre === nombre && objUsuario.password === password;
        }
        let resultadoFind = recuperado.find(busqueda)

        console.log("resultadoFind: " + resultadoFind);

        if (resultadoFind == null) {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Usuario No Encontrado",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        }else {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Bienvenido!",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        login = true;
        }
    });
}

let btnRegistro = document.getElementById('btnRegistro');
btnRegistro.addEventListener('click', alertRegistro);

function alertRegistro() {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        html:   '<h2 class="tituloAlert">Registrarse</h2>' +
                '<form class="form">'+
                '<input type="text" placeholder="Nombre" id="nombre">' +
                '<input type="password" placeholder="Contraseña" id="password">' +
                '<input type="email" placeholder="Mail" id="email">' +
                '<button class="btn" id="registroBtn">Confirmar</button>'+
                '</form>',
        showConfirmButton: false
    });

    document.getElementById('registroBtn').addEventListener('click', function(event) {
        event.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;

        if (nombre === "" || password === "" || email === "") {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Todos los campos son obligatorios",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
            return;
        }else {

        let recuperado = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];

        let usuarioExistente = recuperado.some(function(objUsuario) {
            return objUsuario.nombre === nombre && objUsuario.password === password && objUsuario.email === email;
        });

        if (usuarioExistente == true) {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Usuario ya registrado",
                text: "Inicie sesión para acceder",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        }else {

        let usuario = {nombre: nombre, password: password, email: email}
        recuperado.push(usuario);
        localStorage.setItem("UsuariosRegistrados", JSON.stringify(recuperado));
        Swal.fire({
            background:"#424242",
            color:"#ebeae8",
            title: "Usuario registrado correctamente",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#4caf50"
        })
        }
}})}

function borrarColumna(e) {
    let identificador = e.target.dataset.id;
    console.log("ELEMENTO ELIMINADO - Identificador: ", identificador);

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
    
    let resultadoJson = JSON.parse(localStorage.getItem("columnasLiga")) || [];

    let resultadoFiltrado = resultadoJson.filter(function(resultado) {
        return resultado.identificador !== identificador;
    });

    localStorage.setItem("columnasLiga", JSON.stringify(resultadoFiltrado));
}

let btnCrear = document.getElementById("btnCrear");
btnCrear.addEventListener("click", crearTabla);

function crearTabla() {
    if (login == true) {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        html:  `<h2 class="tituloAlert">Ingrese Los Resultados</h2>
                <form class="form">
                    <div>
                        <input type="text" placeholder="Equipo 1" id="team1">
                        <input type="number" placeholder="Puntos Equipo 1" id="puntos1">
                    </div>
                    <div>
                        <input type="text" placeholder="Equipo 2" id="team2">
                        <input type="number" placeholder="Puntos Equipo 2" id="puntos2">
                    </div>
                    <div>
                        <label for="time">Hora:</label>
                        <input type="time" id="hora">
                    </div>
                    <button class="btn" id="agregarBtn">Agregar Resultado</button>
                </form>`,
        showConfirmButton: false,
    });

    document.getElementById('agregarBtn').addEventListener('click', function(event) {
        event.preventDefault();
        let id = Math.random().toString(16).substr(2);
        let team1 = document.getElementById('team1').value;
        let puntos1 = document.getElementById('puntos1').value;
        let team2 = document.getElementById('team2').value;
        let puntos2 = document.getElementById('puntos2').value;
        let hora = document.getElementById('hora').value;
        
        if (team1 === "" || puntos1 === "" || team2 === "" || puntos2 === "" || hora === "") {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Todos los campos son obligatorios",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
            return;
        }else {

        let resultadoJson = JSON.parse(localStorage.getItem("columnasLiga")) || [];

        let resultado = {identificador: id, hora: hora, team1: team1, puntos1: puntos1, puntos2: puntos2, team2: team2};
        resultadoJson.push(resultado);
        localStorage.setItem("columnasLiga", JSON.stringify(resultadoJson));

        let tbody = document.getElementById("tbody");

        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${resultado.hora}</td>
                          <td>${resultado.team1}</td>
                          <td>${resultado.puntos1}</td>
                          <td>${resultado.puntos2}</td>
                          <td>${resultado.team2}</td>
                          <td><button class="btnBorrar" data-id="${resultado.identificador}">BORRAR</button></td>`;
        tbody.appendChild(fila);
        Swal.close();

        let btnBorrar = document.querySelectorAll(".btnBorrar");
 
        for(let btn of btnBorrar){
 
         btn.addEventListener("click", borrarColumna);
        }   
    }
});
}else {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        title: "Debe Iniciar Sesión",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4caf50"
    })
}
}

function inicioPagina() {
    let tabla = document.getElementById("tbody");
    let recuperado = JSON.parse(localStorage.getItem("columnasLiga")) || [];
    recuperado.forEach(function(resultado) {
        let fila = document.createElement('tr');
        fila.innerHTML = `<td>${resultado.hora}</td>
                          <td>${resultado.team1}</td>
                          <td>${resultado.puntos1}</td>
                          <td>${resultado.puntos2}</td>
                          <td>${resultado.team2}</td>
                          <td><button class="btnBorrar" data-id="${resultado.identificador}">BORRAR</button></td>`;
        tabla.appendChild(fila);
    });

    tabla.querySelectorAll(".btnBorrar").forEach(btn => {
        btn.addEventListener("click", borrarColumna);
    });
    return;
}

inicioPagina();
