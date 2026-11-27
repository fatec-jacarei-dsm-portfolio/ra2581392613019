/* =========================================================
   Portfólio — Henrique Gussao Camargo
   JavaScript mínimo: navegação suave e foco acessível.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    configurarNavegacao();
});


/* ---------------------------------------------------------
   Navegação por âncoras
   --------------------------------------------------------- */

function configurarNavegacao() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const destino = link.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const alvo = document.querySelector(destino);

            if (!alvo) {
                return;
            }

            event.preventDefault();

            alvo.scrollIntoView({ behavior: "smooth", block: "start" });

            // Leva o foco para a seção, para leitores de tela e teclado.
            if (!alvo.hasAttribute("tabindex")) {
                alvo.setAttribute("tabindex", "-1");
            }

            alvo.focus({ preventScroll: true });

            if (history.replaceState) {
                history.replaceState(null, "", destino);
            }
        });
    });
}
