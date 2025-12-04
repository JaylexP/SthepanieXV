/* script.js */

// Función para index.html (Bienvenida)
function ingresar(conMusica) {
    if (conMusica) {
        window.location.href = "invitacion.html?music=true";
    } else {
        window.location.href = "invitacion.html?music=false";
    }
}

// Función auxiliar para pausar/reproducir música desde el icono flotante
function toggleMusic() {
    const audio = document.getElementById('musica-fondo');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Lógica principal
window.onload = function() {
    
    // 1. Manejo de Música
    if (window.location.pathname.includes("invitacion.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const playMusic = urlParams.get('music');
        const audio = document.getElementById('musica-fondo');

        if (playMusic === 'true' && audio) {
            audio.play().catch(error => {
                console.log("Autoplay bloqueado, se requiere interacción usuario.");
            });
        }

        // 2. Manejo del Reloj Cuenta Regresiva
        // CAMBIA ESTA FECHA POR LA FECHA REAL DE LOS XV
        // Formato: "Mes Dia, Año Hora:Minuto:Segundo"
        const fechaXV = new Date("June 15, 2025 18:00:00").getTime();

        const x = setInterval(function() {
            const ahora = new Date().getTime();
            const distancia = fechaXV - ahora;

            // Cálculos de tiempo
            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            // Mostrar en el HTML
            const elDias = document.getElementById("dias");
            const elHoras = document.getElementById("horas");
            const elMin = document.getElementById("minutos");
            const elSeg = document.getElementById("segundos");

            // Verificamos que los elementos existan antes de escribir
            if(elDias && elHoras && elMin && elSeg) {
                elDias.innerText = dias;
                elHoras.innerText = horas;
                elMin.innerText = minutos;
                elSeg.innerText = segundos;
            }

            // Si la cuenta termina
            if (distancia < 0) {
                clearInterval(x);
                if(elDias) document.getElementById("dias").innerHTML = "00";
                // Aquí podrías poner un mensaje de "¡Llegó el día!"
            }
        }, 1000);
        
    }
      function abrirModal(id) {
        document.getElementById(id).style.display = "flex";
    }
    function cerrarModal(id) {
        document.getElementById(id).style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    // --- FUNCIONES PARA ENVIAR A WHATSAPP ---

  // --- FUNCIONALIDAD WHATSAPP ---

    // 1. Enviar Fotos
    function enviarFotosWhatsApp() {
        var numeroTelefono = "+50586224571";
        var mensaje = "¡Hola! 👋 Aquí te envío las fotos y videos que tomé en el evento. 📸✨";
        
        var url = "https://wa.me/" + numeroTelefono + "?text=" + encodeURIComponent(mensaje);
        window.open(url, '_blank');
        
        cerrarModal('modalFotos');
    }

    // 2. Enviar Confirmación
    function enviarConfirmacionWhatsApp() {
        var nombre = document.getElementById("inputNombreInvitado").value;
        var extra = document.getElementById("inputMensajeExtra").value;

        if(nombre.trim() === "") {
            alert("Por favor escribe tu nombre para confirmar.");
            return;
        }

        var numeroTelefono = "50586224571";
        var mensaje = "¡Hola! Quiero confirmar mi asistencia a tus XV Años. \n\nSoy: " + nombre;
        
        if(extra.trim() !== "") {
            mensaje += "\nNota: " + extra;
        }

        var url = "https://wa.me/" + numeroTelefono + "?text=" + encodeURIComponent(mensaje);
        window.open(url, '_blank');
        
        cerrarModal('modalConfirmacion');
    }

    // --- CONTROL DE MODALES ---
    function abrirModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function cerrarModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    // --- FUNCIÓN PARA CONFIRMAR ASISTENCIA (WhatsApp) ---
    function enviarConfirmacionWhatsApp() {
        var nombre = document.getElementById("inputNombreInvitado").value;
        var extra = document.getElementById("inputMensajeExtra").value;

        if(nombre.trim() === "") {
            alert("Por favor escribe tu nombre para confirmar.");
            return;
        }

        var numeroTelefono = "50586224571";
        var mensaje = "¡Hola! Quiero confirmar mi asistencia a tus XV Años. \n\nSoy: " + nombre;
        
        if(extra.trim() !== "") {
            mensaje += "\nNota: " + extra;
        }

        var url = "https://wa.me/" + numeroTelefono + "?text=" + encodeURIComponent(mensaje);
        window.open(url, '_blank');
        
        cerrarModal('modalConfirmacion');
    }

    // --- CONTROL DE VENTANAS (MODALES) ---
 // --- FUNCIÓN PARA CONFIRMAR ASISTENCIA ---
    function enviarConfirmacion() {
        // 1. Buscamos las cajas de texto por su ID exacto
        var campoNombre = document.getElementById("nombreInvitado");
        var campoMensaje = document.getElementById("mensajeExtra");
        
        // 2. Sacamos el valor (lo que escribió la persona)
        var nombre = campoNombre.value;
        var mensajeExtra = campoMensaje.value;

        // 3. Verificamos que haya escrito el nombre
        if (nombre.trim() === "") {
            alert("⚠️ Por favor, escribe tu nombre antes de enviar.");
            return; // Detenemos la función aquí si no hay nombre
        }

        // 4. Preparamos el mensaje para WhatsApp
        var numeroTelefono = "50586224571";
        var textoFinal = "¡Hola! 👋 Quiero confirmar mi asistencia a tus XV Años.\n\n👤 Nombre: " + nombre;
        
        if (mensajeExtra.trim() !== "") {
            textoFinal += "\n📝 Nota: " + mensajeExtra;
        }

        // 5. Creamos el link y lo abrimos
        // Usamos encodeURIComponent para que los espacios y tildes funcionen bien
        var url = "https://wa.me/" + numeroTelefono + "?text=" + encodeURIComponent(textoFinal);
        
        // Abrimos WhatsApp
        window.open(url, '_blank');
        
        // Cerramos la ventana modal
        cerrarModal('modalConfirmacion');
    }
};