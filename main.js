document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");
    const loginForm = document.getElementById("loginForm");
    const registroDiv = document.getElementById("registro");
    const loginDiv = document.getElementById("login");
    const iniciaSesionLink = document.getElementById("iniciaSesionLink");
    const registrateLink = document.getElementById("registrateLink");
    const loginMensajeError = document.getElementById("loginMensajeError");

    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const registroUsuario = document.getElementById("registroUsuario").value;
        const registroContraseña = document.getElementById("registroContraseña").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ usuario: registroUsuario, contraseña: registroContraseña });
        localStorage.setItem("users", JSON.stringify(users));

        registroDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginUsuario = document.getElementById("loginUsuario").value;
        const loginContraseña = document.getElementById("loginContraseña").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.usuario === loginUsuario && u.contraseña === loginContraseña);

        if (user) {
            window.location.href = "page.html";
        } else {
            loginMensajeError.textContent = "Usuario o contraseña incorrectos. Por favor, intenta nuevamente.";
            loginMensajeError.style.display = "block";
        }
    });

    iniciaSesionLink.addEventListener("click", function (event) {
        event.preventDefault();
        registroDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    registrateLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginDiv.style.display = "none";
        registroDiv.style.display = "block";
    });

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
        registroDiv.style.display = "none";
        loginDiv.style.display = "block";
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    let vehiculos;
    await fetch('./vehiculos.json')
        .then(response => response.json())
        .then(data => {
            vehiculos = data;

        });

    const contenedorVehiculos = document.querySelector(".contenedor-tarjetas");
    const busqueda = document.getElementById("busqueda");

    function generarTarjetas() {
        contenedorVehiculos.innerHTML = '';

        const terminodeBusqueda = busqueda.value.toLowerCase();

        vehiculos.forEach(vehiculo => {
            const card = document.createElement("div");
            card.classList.add("tarjetas");
            card.innerHTML = `
                <a href="${vehiculo.imagen}" class="glightbox">
                <img src="${vehiculo.imagen}" alt="${vehiculo.nombre}">
                </a>
                <h3>${vehiculo.nombre}</h3>
                <p>Precio de renta: Q. ${vehiculo.precio} al día</p>
            `;

            if (!terminodeBusqueda || vehiculo.nombre.toLowerCase().includes(terminodeBusqueda)) {
                contenedorVehiculos.appendChild(card);
            }
        });
        const lightbox = GLightbox()
    }

    generarTarjetas();

    busqueda.addEventListener("input", generarTarjetas);

    const seleccionarVehiculo = document.getElementById("seleccionarvehiculo");
    const dias = document.getElementById("dias");
    const cotizarboton = document.getElementById("cotizarboton");
    const resultado = document.getElementById("resultado");

    mostrarCotizaciones();

    cotizarboton.addEventListener("click", calcularCostoTotal);

    function mostrarCotizaciones() {
        const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
        const cotizacionesDiv = document.getElementById("cotizaciones");
        cotizacionesDiv.innerHTML = "";

        cotizaciones.forEach(cotizacion => {
            const cotizacionItem = document.createElement("div");
            cotizacionItem.classList.add("cotizacion-item");
            cotizacionItem.textContent = cotizacion.cotizacion;
            cotizacionesDiv.appendChild(cotizacionItem);
        });
    }

    function calcularCostoTotal() {
        const seleccionarPrecio = parseFloat(seleccionarVehiculo.value);
        const diasSeleccionados = parseInt(dias.value, 10);

        if (!isNaN(seleccionarPrecio) && !isNaN(diasSeleccionados)) {
            const nombreVehiculo = seleccionarVehiculo.options[seleccionarVehiculo.selectedIndex].text;
            const costoTotal = seleccionarPrecio * diasSeleccionados;
            const cotizacionText = `La cotización de ${nombreVehiculo} por ${diasSeleccionados} días es de: Q. ${costoTotal}`;

            const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
            cotizaciones.push({ cotizacion: cotizacionText });
            localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

            mostrarCotizaciones();

            resultado.textContent = cotizacionText;
        } else {
            resultado.textContent = "Por favor, selecciona un vehículo y los días de alquiler.";
        }
    }
});

cotizarboton.addEventListener("click", mostrarPopup);

function mostrarPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 5000);
}



