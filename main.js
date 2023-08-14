document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("logueo");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("contraseña").value;

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("contraseña", contraseña);

        window.location.href = "page.html";
    });
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

    cotizarboton.addEventListener("click", calculateTotalCost);

    function calculateTotalCost() {
        const seleccionarPrecio = parseFloat(seleccionarVehiculo.value);
        const diasSeleccionados = parseInt(dias.value, 10);

        if (!isNaN(seleccionarPrecio) && !isNaN(diasSeleccionados)) {
            const totalCost = seleccionarPrecio * diasSeleccionados;
            const cotizacionText = `La cotización de renta de este vehículo por ${diasSeleccionados} días es de: Q. ${totalCost}`;
            resultado.textContent = cotizacionText;
        } else {
            resultado.textContent = "Por favor, selecciona un vehículo y los días de alquiler.";
        }
    }
});



