//login
const login = document.querySelector(`#login`);
const emailU = document.querySelector(`#email`);
const nombreU = document.querySelector(`#nombre`);
const passwordU = document.querySelector(`#password`);
const ingresar = document.querySelector(`#ingresar`);
const registrar = document.querySelector(`#registrar`);
const imagen = document.querySelector(`#imagen`);
let imagenSubida = "";
//home
const home = document.querySelector(`#home`);
const infoUsuario = document.querySelector(`#infoUsuario`)
const fotoPerfil = document.querySelector(`#fotoPerfil`).src = imagen.src;
const nombrePerfil = document.querySelector(`#nombrePerfil`)
let usuarios = [];
console.log(usuarios)

//subir imagen de perfil
imagen.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagenSubida = reader.result;
        document.querySelector("#fotoPerfil").style.backgroundImage = `url(${imagenSubida})`;
    });
    reader.readAsDataURL(this.files[0]);
});


class Usuario {
    constructor(nombre, email, password) {
        this.nombre = nombre,
            this.email = email,
            this.password = password
    }
};

//validar inputs
function validarInput(e) {
    if (e.target.value.length <= 0) {
        mostrarError("Todos los campos son obligatorios")
    }
}

nombreU.addEventListener("blur", validarInput)
emailU.addEventListener("blur", validarInput)
passwordU.addEventListener("blur", validarInput)

registrar.addEventListener("click", () => {
    login.remove()
    const nuevoUsuario = new Usuario(nombreU.value, emailU.value, passwordU.value)
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario))
    usuarios.push(nuevoUsuario)
    homePage()
})

function homePage() {
    login.remove()
    home.style.visibility = " visible";
    //foto perfil
    if (fotoPerfil.src !== "iniciar-sesion.png") {
        fotoPerfil.src = imagen.src
    } else {
        fotoPerfil.src = "iniciar-sesion.png"
    }
    //nombre
    usuarios.forEach(usuario => {
        const nombreUsuario = document.createElement(`p`)
        nombrePerfil.innerText = (usuario.nombre)
    })
}





//iniciar sesion
ingresar.addEventListener("click", () => {
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario")) || mostrarError("Por favor regístrese")
    if (emailU.value === usuarioRegistrado.email && passwordU.value === usuarioRegistrado.password) {
        homePage()
    } else {
        mostrarError("Alguno de los datos ingresados es incorrecto")
    }   
})

console.log(usuarioRegistrado)

//error
function mostrarError(mensaje) {
    const error = document.createElement(`p`);
    error.innerText = mensaje;
    error.classList.add("error")
    login.append(error)
    setTimeout(() => {
        error.remove()
    }, 3000)
}