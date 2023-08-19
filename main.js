document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById("registroForm");
    const loginForm = document.getElementById("loginForm");
    const registroDiv = document.getElementById("registro");
    const loginDiv = document.getElementById("login");
    const iniciaSesionLink = document.getElementById("iniciaSesionLink");
    const registrateLink = document.getElementById("registrateLink");
    const loginMensajeError = document.getElementById("loginMensajeError");

    registroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const registroUsuario = document.getElementById("registroUsuario").value;
        const registroContraseña = document.getElementById("registroContraseña").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ usuario: registroUsuario, contraseña: registroContraseña });
        localStorage.setItem("users", JSON.stringify(users));

        registroDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    loginForm.addEventListener("submit", function(event) {
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

    iniciaSesionLink.addEventListener("click", function(event) {
        event.preventDefault();
        registroDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    registrateLink.addEventListener("click", function(event) {
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

document.addEventListener("DOMContentLoaded", function() {
    let vehiculos = localStorage.getItem("vehiculos");
    if (!vehiculos) {
        vehiculos = [
            { nombre: "Kia Picanto", precio: 300 },
            { nombre: "Volkswagen Polo", precio: 325 },
            { nombre: "Hyundai Accent", precio: 335 },
            { nombre: "Suzuki Swift", precio: 350 },
            { nombre: "Toyota Yaris", precio: 390 },
            { nombre: "Toyota Corolla", precio: 400 },
            { nombre: "Kia Forte", precio: 410 },
            { nombre: "Volkswagen Virtus", precio: 450 },
            { nombre: "Ford Ranger", precio: 500 },
            { nombre: "Toyota Tacoma", precio: 500 },
            { nombre: "Toyota RAV4", precio: 520 },
            { nombre: "Mitsubishi Challenger", precio: 550 }
        ];
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    } else {
        vehiculos = JSON.parse(vehiculos);
    }

    const contenedorVehiculos = document.querySelector(".contenedor-tarjetas");
    const busqueda = document.getElementById("busqueda");

    function generarTarjetas() {
        contenedorVehiculos.innerHTML = '';

        const terminodeBusqueda = busqueda.value.toLowerCase();

        vehiculos.forEach(vehiculo => {
            const card = document.createElement("div");
            card.classList.add("tarjetas");
            card.innerHTML = `
                <h3>${vehiculo.nombre}</h3>
                <p>Precio de renta: Q. ${vehiculo.precio} al día</p>
            `;
            
            if (!terminodeBusqueda || vehiculo.nombre.toLowerCase().includes(terminodeBusqueda)) {
                contenedorVehiculos.appendChild(card);
            }
        });
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



