# Detalles personalizados

Este proyecto usa una sola página para atender hasta 20 detalles distintos. No necesitas duplicar `index.html`, `style.css` ni `script.js`.

Cada detalle se abre con una dirección como esta:

```text
https://tu-sitio.vercel.app/?cliente=cliente01
```

La URL principal, sin `?cliente=`, muestra la demostración general de la página. Los enlaces con un cliente específico muestran su detalle o la pantalla de preparación si aún no está activo.

## Estructura

```text
detalles/
├── index.html
├── style.css
├── script.js
├── data/
│   └── clientes.js       Datos de los 20 clientes
├── assets/
│   ├── audio/            Canciones en formato .mp3
│   └── images/           Fotos de los detalles
└── README.md
```

## El único archivo que editarás para cada pedido

Abre `data/clientes.js`. Allí están listos `cliente01` hasta `cliente20`.

Para activar un espacio, busca por ejemplo `cliente01`, cambia `activo` a `true` y completa los datos:

```js
cliente01: {
  id: "cliente01",
  activo: true,
  nombre: "Andrea Nicole",
  mensaje: `Gracias por hacer mis días más bonitos.

Feliz 21 de septiembre 💛🌻`,
  whatsapp: "",
  musica: "assets/audio/cliente01.mp3",
  nombreCancion: "Nuestra canción",
  imagen: "assets/images/cliente01-portada.jpg",
  imagenes: [
    "assets/images/cliente01-01.jpg",
    "assets/images/cliente01-02.jpg"
  ],
  titulo: "Un detalle para Andrea 💛"
}
```

No debes tocar los otros archivos para crear ese pedido.

## Qué significa cada dato

- `id`: déjalo igual al nombre del bloque, por ejemplo `cliente01`.
- `activo`: usa `true` para publicar el detalle o `false` para dejarlo en preparación.
- `nombre`: nombre de la persona que recibirá la sorpresa.
- `mensaje`: texto de la carta. Puedes escribirlo en varias líneas usando las comillas invertidas que ves en el ejemplo.
- `whatsapp`: contacto especial para ese cliente, si alguna vez lo necesitas. Déjalo vacío para usar tu WhatsApp general.
- `musica`: ruta de la canción. Si queda vacía, la sorpresa funciona sin audio.
- `nombreCancion`: texto que se muestra bajo el nombre de la persona. Es opcional.
- `imagen`: una foto principal opcional.
- `imagenes`: fotos adicionales opcionales. Déjalo como `[]` si no usarás galería.
- `titulo`: título que aparecerá en la pestaña del navegador. Es opcional.

## Dónde guardar canciones y fotos

- Guarda los audios en `assets/audio/`, por ejemplo `assets/audio/cliente01.mp3`.
- Guarda las fotos en `assets/images/`, por ejemplo `assets/images/cliente01-01.jpg`.
- Copia la ruta exacta al campo correspondiente de `data/clientes.js`.

La música se intenta reproducir cuando la persona toca **“Descubrir la sorpresa”**. Así se respetan las restricciones de audio de los navegadores.

## Tu WhatsApp para recibir pedidos

Tu número general ya quedó configurado en `data/clientes.js`:

```js
whatsappVentas: "51934613286"
```

Es tu número `934 613 286` con el código de Perú (`51`) que WhatsApp necesita. Por eso, al dejar `whatsapp: ""` dentro de un cliente, el botón **“Quiero crear mi sorpresa”** te escribirá a ti automáticamente.

## Enlaces que enviarás

| Cliente | Enlace |
| --- | --- |
| Cliente 01 | `https://tu-sitio.vercel.app/?cliente=cliente01` |
| Cliente 02 | `https://tu-sitio.vercel.app/?cliente=cliente02` |
| Cliente 07 | `https://tu-sitio.vercel.app/?cliente=cliente07` |
| Cliente 20 | `https://tu-sitio.vercel.app/?cliente=cliente20` |

Si el cliente no existe, está desactivado o no tiene nombre y mensaje, se mostrará la pantalla: **“Este detalle todavía se está preparando 💛”**.

## Crear un nuevo pedido

1. Elige un espacio libre, por ejemplo `cliente07`.
2. Coloca las fotos en `assets/images/` y la canción en `assets/audio/` si las usarás.
3. Abre `data/clientes.js`.
4. Busca `cliente07`.
5. Cambia `activo: false` por `activo: true`.
6. Completa nombre, mensaje, WhatsApp y las rutas de los archivos.
7. Guarda los cambios.
8. Envía los cambios a GitHub con `git push`.
9. Vercel publicará la actualización automáticamente.
10. Envía `https://tu-sitio.vercel.app/?cliente=cliente07`.

Para desactivar un detalle, cambia solamente `activo: true` por `activo: false`.

## Importante sobre privacidad

Esta es una página estática: los enlaces con `?cliente=cliente01` sirven para organizar y compartir cada detalle, pero no son una contraseña ni protegen información confidencial. Si necesitas privacidad real, acceso con contraseña o enlaces imposibles de consultar desde el código público, se requerirá un sistema con autenticación y un servidor.
