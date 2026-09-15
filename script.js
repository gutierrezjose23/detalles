// ========================================
// CARGA DEL CLIENTE DESDE LA URL
// Ejemplo: ?cliente=cliente01
// ========================================

(() => {

    const clientes =
        window.CLIENTES &&
        typeof window.CLIENTES === "object"
            ? window.CLIENTES
            : {};


    const configuracion =
        window.CONFIGURACION_DETALLES &&
        typeof window.CONFIGURACION_DETALLES === "object"
            ? window.CONFIGURACION_DETALLES
            : {};


    const idClienteValido =
        /^cliente(?:0[1-9]|1[0-9]|20)$/;


    const elementos = {
        experiencia: document.getElementById("experiencia"),
        estadoPreparando: document.getElementById("estadoPreparando"),
        floresFondo: document.getElementById("floresFondo"),
        petalos: document.getElementById("petalos"),
        boton: document.getElementById("abrirSorpresa"),
        sorpresa: document.getElementById("sorpresa"),
        nombrePersona: document.getElementById("nombrePersona"),
        mensajeCarta: document.getElementById("mensajeCarta"),
        botonWhatsapp: document.getElementById("botonWhatsapp"),
        musica: document.getElementById("musica"),
        nombreCancion: document.getElementById("nombreCancion"),
        galeriaFotos: document.getElementById("galeriaFotos")
    };


    const clienteDemostracion = {
        nombre: "Alguien especial",
        mensaje: `Tal vez las flores duren unos días,
pero hay detalles que pueden quedarse mucho más tiempo.

Por eso hoy no quería regalarte solamente flores amarillas.

Quería regalarte un pequeño recuerdo.

Algo que puedas abrir cuando quieras
y recordar que, en algún lugar,
alguien pensó en ti.

Feliz 21 de septiembre. 💛🌻`,
        whatsapp: "",
        musica: "",
        nombreCancion: "",
        imagen: "",
        imagenes: [],
        titulo: "Un detalle para ti 💛"
    };


    crearFloresFondo();


    const parametros =
        new URLSearchParams(window.location.search);

    const seSolicitoCliente =
        parametros.has("cliente");

    const cliente =
        obtenerClienteActivo(
            parametros.get("cliente")
        );


    // La URL principal conserva la demostración original.
    if (!seSolicitoCliente) {
        cargarCliente(clienteDemostracion);
        prepararSorpresa();
        return;
    }


    if (!cliente) {
        mostrarEstadoPreparando();
        return;
    }


    cargarCliente(cliente);
    prepararSorpresa();



    // ========================================
    // VALIDACIÓN DEL CLIENTE
    // ========================================

    function obtenerClienteActivo(id) {


        if (!id || !idClienteValido.test(id)) {
            return null;
        }


        const clienteSolicitado =
            clientes[id];


        const tieneDatosBasicos =
            clienteSolicitado &&
            tieneTexto(clienteSolicitado.nombre) &&
            tieneTexto(clienteSolicitado.mensaje);


        if (
            !clienteSolicitado ||
            clienteSolicitado.id !== id ||
            clienteSolicitado.activo !== true ||
            !tieneDatosBasicos
        ) {
            return null;
        }


        return clienteSolicitado;

    }


    function tieneTexto(valor) {

        return (
            typeof valor === "string" &&
            valor.trim().length > 0
        );

    }


    function texto(valor) {

        return typeof valor === "string"
            ? valor
            : "";

    }



    // ========================================
    // ESTADO DE ENLACE NO DISPONIBLE
    // ========================================

    function mostrarEstadoPreparando() {

        document.title =
            "Detalle en preparación 💛";


        if (elementos.experiencia) {
            elementos.experiencia.hidden = true;
        }


        if (elementos.estadoPreparando) {
            elementos.estadoPreparando.hidden = false;
        }

    }



    // ========================================
    // COLOCAR DATOS DEL CLIENTE
    // ========================================

    function cargarCliente(clienteActivo) {

        document.title =
            tieneTexto(clienteActivo.titulo)
                ? clienteActivo.titulo
                : "Un detalle para ti 💛";


        elementos.nombrePersona.textContent =
            texto(clienteActivo.nombre) + " 💛";


        elementos.mensajeCarta.textContent =
            texto(clienteActivo.mensaje);


        configurarWhatsapp(clienteActivo);
        configurarMusica(clienteActivo);
        cargarGaleria(clienteActivo);

    }


    function configurarWhatsapp(clienteActivo) {

        const whatsappDelCliente =
            texto(clienteActivo.whatsapp).trim();

        const whatsappGeneral =
            texto(configuracion.whatsappVentas).trim();

        const numero =
            (whatsappDelCliente || whatsappGeneral)
                .replace(/\D/g, "");


        if (!numero) {
            elementos.botonWhatsapp.hidden = true;
            elementos.botonWhatsapp.removeAttribute("href");
            return;
        }


        const textoWhatsapp =
            `Hola 👋 Vi el detalle digital para ${texto(clienteActivo.nombre)} 🌻💛

Quiero hacer una sorpresa personalizada.

¿Me cuentas qué opciones tienes disponibles?`;


        elementos.botonWhatsapp.href =
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(textoWhatsapp);


        elementos.botonWhatsapp.hidden = false;

    }


    function configurarMusica(clienteActivo) {

        const rutaMusica =
            texto(clienteActivo.musica).trim();

        const cancion =
            texto(clienteActivo.nombreCancion).trim();


        if (cancion) {
            elementos.nombreCancion.textContent =
                "♫ " + cancion;

            elementos.nombreCancion.hidden = false;
        } else {
            elementos.nombreCancion.hidden = true;
        }


        if (!rutaMusica) {
            elementos.musica.removeAttribute("src");
            elementos.musica.load();
            return;
        }


        elementos.musica.src =
            rutaMusica;

        elementos.musica.load();

    }


    function cargarGaleria(clienteActivo) {

        const rutas =
            obtenerRutasDeImagen(clienteActivo);


        elementos.galeriaFotos.replaceChildren();


        if (rutas.length === 0) {
            elementos.galeriaFotos.hidden = true;
            return;
        }


        const fragmento =
            document.createDocumentFragment();


        rutas.forEach((ruta, indice) => {

            const contenedor =
                document.createElement("figure");

            const imagen =
                document.createElement("img");


            imagen.src =
                ruta;

            imagen.alt =
                `Foto ${indice + 1} para ${texto(clienteActivo.nombre)}`;

            imagen.loading =
                "lazy";

            imagen.decoding =
                "async";


            imagen.addEventListener("error", () => {

                contenedor.remove();


                if (
                    elementos.galeriaFotos.children.length === 0
                ) {
                    elementos.galeriaFotos.hidden = true;
                }

            });


            contenedor.appendChild(imagen);
            fragmento.appendChild(contenedor);

        });


        elementos.galeriaFotos.appendChild(fragmento);
        elementos.galeriaFotos.hidden = false;

    }


    function obtenerRutasDeImagen(clienteActivo) {

        const adicionales =
            Array.isArray(clienteActivo.imagenes)
                ? clienteActivo.imagenes
                : [];


        const rutas = [
            clienteActivo.imagen,
            ...adicionales
        ]
            .map((ruta) => texto(ruta).trim())
            .filter(Boolean);


        return [
            ...new Set(rutas)
        ];

    }



    // ========================================
    // FLORES FLOTANDO
    // ========================================

    function crearFloresFondo() {

        if (!elementos.floresFondo) {
            return;
        }


        const tiposFlores = [
            "🌻",
            "🌼",
            "💛",
            "🌻",
            "🌼"
        ];


        for (let i = 0; i < 35; i++) {

            const flor =
                document.createElement("div");


            flor.className =
                "flor-fondo";

            flor.setAttribute(
                "aria-hidden",
                "true"
            );


            flor.textContent =
                tiposFlores[
                    Math.floor(
                        Math.random() *
                        tiposFlores.length
                    )
                ];


            flor.style.left =
                Math.random() * 100 + "%";


            flor.style.fontSize =
                Math.random() * 35 + 18 + "px";


            flor.style.animationDuration =
                Math.random() * 15 + 15 + "s";


            flor.style.animationDelay =
                -Math.random() * 20 + "s";


            elementos.floresFondo.appendChild(flor);

        }

    }



    // ========================================
    // ABRIR SORPRESA
    // ========================================

    function prepararSorpresa() {

        let abierto =
            false;


        elementos.boton.addEventListener("click", () => {

            if (abierto) {
                return;
            }


            abierto = true;

            elementos.boton.disabled =
                true;

            elementos.boton.setAttribute(
                "aria-expanded",
                "true"
            );


            explosionFlores();
            iniciarPetalos();
            iniciarMusica();


            setTimeout(() => {

                elementos.sorpresa.classList.add(
                    "mostrar"
                );


                elementos.sorpresa.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 900);

        });

    }



    // ========================================
    // EXPLOSIÓN DE FLORES
    // ========================================

    function explosionFlores() {

        const flores = [
            "🌻",
            "🌼",
            "💛"
        ];


        for (let i = 0; i < 45; i++) {

            const flor =
                document.createElement("div");


            flor.textContent =
                flores[
                    Math.floor(
                        Math.random() *
                        flores.length
                    )
                ];

            flor.setAttribute(
                "aria-hidden",
                "true"
            );


            flor.style.position =
                "fixed";

            flor.style.left =
                "50%";

            flor.style.top =
                "50%";

            flor.style.fontSize =
                Math.random() * 30 + 20 + "px";

            flor.style.zIndex =
                "999";

            flor.style.pointerEvents =
                "none";


            document.body.appendChild(flor);


            const x =
                (Math.random() - 0.5) *
                window.innerWidth;


            const y =
                (Math.random() - 0.5) *
                window.innerHeight;


            flor.animate(

                [

                    {
                        transform:
                            "translate(-50%, -50%) scale(0)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(${x}px, ${y}px) rotate(720deg) scale(1.4)`,

                        opacity: 0
                    }

                ],

                {

                    duration:
                        Math.random() * 1200 + 1500,

                    easing:
                        "ease-out"

                }

            );


            setTimeout(() => {

                flor.remove();

            }, 3000);

        }

    }



    // ========================================
    // LLUVIA DE FLORES
    // ========================================

    function iniciarPetalos() {

        const intervalo =
            setInterval(() => {

                crearPetalo();

            }, 180);


        // Detiene la lluvia después de 15 segundos.
        setTimeout(() => {

            clearInterval(intervalo);

        }, 15000);

    }


    function crearPetalo() {

        const petalo =
            document.createElement("div");


        const elementosPetalo = [
            "🌼",
            "💛",
            "🌻"
        ];


        petalo.className =
            "petalo";

        petalo.setAttribute(
            "aria-hidden",
            "true"
        );


        petalo.textContent =
            elementosPetalo[
                Math.floor(
                    Math.random() *
                    elementosPetalo.length
                )
            ];


        petalo.style.left =
            Math.random() * 100 + "%";


        petalo.style.fontSize =
            Math.random() * 18 + 12 + "px";


        petalo.style.animationDuration =
            Math.random() * 4 + 5 + "s";


        elementos.petalos.appendChild(petalo);


        setTimeout(() => {

            petalo.remove();

        }, 10000);

    }



    // ========================================
    // MÚSICA
    // ========================================

    function iniciarMusica() {

        const tieneMusica =
            elementos.musica &&
            elementos.musica.getAttribute("src");


        if (!tieneMusica) {
            return;
        }


        elementos.musica.volume =
            0.45;


        // Se ejecuta dentro del clic del usuario para respetar
        // las restricciones de reproducción automática del navegador.
        elementos.musica.play().catch(() => {

            // La sorpresa continúa normalmente si el navegador bloquea el audio.

        });

    }

})();
