/* =========================================================
   Portfólio — Henrique Gussao Camargo
   JavaScript mínimo: navegação suave, foco acessível e
   montagem das fotos do estande.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    configurarNavegacao();
    montarFotosDoEstande();
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


/* ---------------------------------------------------------
   Fotos do estande

   As imagens ficam em docs/assets/feira-tecnologia/.
   A galeria só monta a figura quando o arquivo existe: assim
   não aparece imagem quebrada enquanto as fotos não sobem.
   Basta salvar os arquivos com os nomes abaixo.
   --------------------------------------------------------- */

const FOTOS_DO_ESTANDE = [
    {
        arquivo: "estande-01.jpg",
        alt: "Visitantes interagindo com o jogo no estande do EcoPulse",
        legenda: "Visitantes interagindo com o jogo no estande."
    },
    {
        arquivo: "estande-02.jpg",
        alt: "Equipe DEVassos durante a Feira de Tecnologia",
        legenda: "Equipe DEVassos durante a Feira de Tecnologia."
    },
    {
        arquivo: "estande-03.jpg",
        alt: "Tela do jogo EcoPulse Desafio em execução no estande",
        legenda: "O jogo rodando na tela 2, ao lado do dashboard."
    }
];

function montarFotosDoEstande() {
    const galeria = document.querySelector("#galeria-feira");
    const aviso = document.querySelector("#fotos-pendentes");

    if (!galeria) {
        return;
    }

    const base = "assets/feira-tecnologia/";

    FOTOS_DO_ESTANDE.forEach((foto) => {
        const figura = document.createElement("figure");
        const imagem = document.createElement("img");
        const legenda = document.createElement("figcaption");

        figura.className = "photo-item";
        figura.hidden = true;

        imagem.src = base + foto.arquivo;
        imagem.alt = foto.alt;
        imagem.width = 800;
        imagem.height = 600;
        imagem.loading = "lazy";

        legenda.textContent = foto.legenda;

        imagem.addEventListener("load", () => {
            figura.hidden = false;

            if (aviso) {
                aviso.hidden = true;
            }
        });

        imagem.addEventListener("error", () => {
            figura.remove();

            if (aviso && galeria.children.length === 0) {
                aviso.hidden = false;
            }
        });

        figura.append(imagem, legenda);
        galeria.append(figura);
    });
}
