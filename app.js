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
const fotoPerfil = document.querySelector(`#fotoPerfil`);
const nombrePerfil = document.querySelector(`#nombrePerfil`)
const listaTweets = document.querySelector(`#listaTweets`)
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
    constructor(imagen, nombre, email, password) {
        this.imagen = imagen
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

//registrarse
registrar.addEventListener("click", () => {
    login.remove()
    const nuevoUsuario = new Usuario(imagenSubida, nombreU.value, emailU.value, passwordU.value)
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario))
    usuarios.push(nuevoUsuario)
    homePage()
})
const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario"))
//inicio
function homePage() {
    login.remove()
    home.style.visibility = " visible";
    //nombre
    usuarios.forEach(usuario => {
        const nombrePerfil = document.createElement(`p`)
        nombrePerfil.innerText = (usuarioRegistrado.nombre)
        fotoPerfil.style.backgroundImage.src = (usuarioRegistrado.imagen)
    })
}


//iniciar sesion
ingresar.addEventListener("click", () => {

    if (emailU.value != usuarioRegistrado.email && passwordU.value != usuarioRegistrado.password) {
        mostrarError("Por favor regístrese")
    } else if (emailU.value === usuarioRegistrado.email && passwordU.value === usuarioRegistrado.password) {
        homePage()
    } else {
        mostrarError("Alguno de los datos ingresados es incorrecto")
    }
    console.log(usuarioRegistrado)
})


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

//tweet
let tweets = [];
console.log(tweets)
send.addEventListener("click", () => {
    console.log("click")
    const tweet = document.querySelector(`#tweet`).value
    if (tweet == "") {
        mostrarError("Escribe un mensaje")

    } else {
        tweets.push(tweet)
    }
    limpiarHTML()
    mostrarTweets()
})

function mostrarTweets() {
    tweets.forEach(tweet => {
        const divTweet = document.createElement(`div`)
        listaTweets.append(divTweet)
        const textoTweet = document.createElement(`p`)
        textoTweet.innerHTML=(`${usuarioRegistrado.nombre}  hace un momento: ${tweet}`)
        textoTweet.classList.add("liTweet")
        divTweet.append(textoTweet)
        const borrar = document.createElement(`button`)
        borrar.innerText=("X")
        divTweet.append(borrar)   
        borrar.addEventListener("click",()=>{
            divTweet.remove()
        })
    })

}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}