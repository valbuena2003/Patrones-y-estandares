(() => {
    const btnAumentar = document.querySelector("#aumentarFuente");
    const btnDisminuir = document.querySelector("#disminuirFuente");
    const btnContraste = document.querySelector("#contraste");

    let tamañoBaseRem = 1; // Tamaño base de la fuente en rem (1rem = 16px por defecto)
    let contrasteActivo = false;

    // Función para aplicar el tamaño de fuente a la raíz del documento (elemento html)
    const aplicarTamañoFuente = () => {
        document.documentElement.style.fontSize = `${tamañoBaseRem}rem`;
    };

    // Aplicar el tamaño de fuente inicial al cargar la página
    aplicarTamañoFuente();

    if (btnAumentar && btnDisminuir && btnContraste) {
        btnAumentar.addEventListener("click", () => {
            if (tamañoBaseRem < 1.5) { // Límite superior para el aumento (ej. 1.5rem = 24px)
                tamañoBaseRem += 0.1; // Aumentar en 0.1rem
                aplicarTamañoFuente();
            }
        });

        btnDisminuir.addEventListener("click", () => {
            if (tamañoBaseRem > 0.7) { // Límite inferior para la disminución (ej. 0.7rem = 11.2px)
                tamañoBaseRem -= 0.1; // Disminuir en 0.1rem
                aplicarTamañoFuente();
            }
        });

        btnContraste.addEventListener("click", () => {
            contrasteActivo = !contrasteActivo;
            document.body.classList.toggle("modo-contraste", contrasteActivo);
        });
    }
})();
