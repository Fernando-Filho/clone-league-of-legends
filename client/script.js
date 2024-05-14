const header = document.querySelector(".header");
const listaClasses = header.classList;
var conteudoGeral = document.querySelector(".inicio_outroCeu");
var botaoInicio = document.querySelector(".botao-inicio").classList;
var botaoLoja = document.querySelector(".botao-loja").classList;

const devs = [
    {
        nome: "Mirella Naspolini",
        github: "https://github.com/mirellanaspolini",
        linkedin: "https://www.linkedin.com/in/mirellanaspolini-12768322b/",
    },
    {
        nome: "Vinícius Porto",
        github: "https://github.com/ViniPorto",
        linkedin: "https://www.linkedin.com/in/vinicius-porto-9a1996209/",
    },
];

const printDevs = (lista) => {
    lista.forEach((dev) => {
        document.querySelector(
            ".carousel-desenvolvedores_redesSociais"
        ).innerHTML += `<div class="text-center w-50">
            <h3 class="fs-5 mb-1">${dev.nome}</h3>
            <a class="fs-3" href="${dev.github}" target="_blank">
                <i style="margin-right: 6px;" class="fab fa fa-github" aria-hidden="true"></i>
            </a>
            <a class="fs-3" href="${dev.linkedin}" target="_blank">
                <i class="fab fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
        </div>`;
    });
};

function abrir_inicio() {
    header.innerHTML = `
    <nav>
        <ul class="d-flex gap-4 text-uppercase">
            <li class="desabilitado">visão geral</li>
            <li style="cursor: pointer;">outro céu</li>
            <li class="desabilitado">cblol esports</li>
            <li class="desabilitado">notas de atualização</li>
        </ul>
        </nav>`;
    listaClasses.add("header-inicio");
    listaClasses.remove("header-destaques");
    listaClasses.remove("header-campeoes");

    conteudoGeral.innerHTML = `<div id="carrossel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carrossel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carrossel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    </div>
    <div class="carousel-inner carrossel-outroCeu">
        <!-- PRIMEIRO -->
        <div class="carousel-item active">
            <div class="background-blur text-white">
                <p class="carousel-paragrafo_direitos">Este é um projeto apenas para fins educacionais. Foi criado apenas para testar nossas habilidades Front/Back-End. Todos os direitos autorais e identidade da marca pertencem a Riot Games.</p>
            </div>
        </div>
        <!-- SEGUNDO -->
        <div class="carousel-item devs text-center w-50">
            <div class="background-blur text-white">
                <h2 class="fs-3 mb-3 fw-bold text-uppercase">Desenvolvido por:</h2>
                <div class="carousel-desenvolvedores_redesSociais"></div>
            </div>
        </div>
    </div>
    </div>
    <img src="https://live.staticflickr.com/65535/52280173860_fbdca2d4ee_h.jpg" width="800" height="510" alt="wallpaper">`;

    printDevs(devs);

    botaoInicio.add("ativo");
    botaoLoja.remove("ativo");
}

function abrir_loja() {
    textoNav();

    listaClasses.add("header-destaques");
    listaClasses.remove("header-inicio");
    listaClasses.remove("header-campeoes");

    exibeConteudo("destaques");

    botaoInicio.remove("ativo");
    botaoLoja.add("ativo");
}

function abrir_loja_campeoes() {
    textoNav();

    listaClasses.add("header-campeoes");
    listaClasses.remove("header-destaques");
    listaClasses.remove("header-inicio");

    exibeConteudo("campeoes");
}

async function carregarSocial() {
    const dados = await fetch("./json/social.json");
    const json = await dados.json();
    const wrapper = document.querySelector(".social-pastas_wrapper");

    const printaAmigos = (lista, pasta) => {
        Object.entries(lista).forEach(([key, value]) => {
            wrapper.querySelector(`#${pasta} ul`).innerHTML += `                
            <li class="pastas-invocador_wrapper">
            <img width="36" class="pastas-invocador_icone" src=${
                value.img
            } alt="Ícone do invocador">
            <div>
            <p class="pastas-invocador_nome" style="color: #929994;">${
                value.name
            }</p>
        <p class="status ${statusCor(value.status)}">${value.status}</p>
                    </div>
                </li>`;
        });
    };

    json.forEach((pasta) => {
        for (const [key, value] of Object.entries(pasta)) {
            const nomepasta = key.replace(/ /g, "-");

            wrapper.innerHTML += `
                 <button class="btn text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#${nomepasta}">${key} (${value.length}/${value.length})</button>
            <div class="collapse multi-collapse show" id="${nomepasta}">
                    <ul></ul>
                </div>`;

            printaAmigos(value, nomepasta);
        }
    });
}

const textoNav = () => {
    header.innerHTML = `<nav>
        <ul class="d-flex gap-4 text-uppercase">
           <li style="cursor: pointer;" onclick="abrir_loja()">destaques</li>
        <li style="cursor: pointer;" onclick="abrir_loja_campeoes()">campeões</li>
            <li class="desabilitado">skins</li>
            <li class="desabilitado">tft</li>
            <li class="desabilitado">espólios</li>
            <li class="desabilitado">acessórios</li>
        </ul>
    </nav>
    <div class="d-flex gap-3 header-destaques-botoes">
        <button class="desabilitado text-uppercase">Compre RP</button>
        <button class="desabilitado"><img src="./img/loja/presentes-icone.svg" alt="Dar presente"></button>
        <button class="desabilitado"><img src="./img/loja/configuracoes-icone.svg" alt="Configurações"></button>
    </div>`;
};

const statusCor = (value) => {
    if (value === "Em partida" || value === "Seleção de Campeões")
        return "em-partida";
    else if (value === "Online") return "online";
    else if (value === "Lol+") return "lol-plus";
    else if (value === "Criando partida de TFT") return "ausente";
    else return "offline";
};

const exibeConteudo = (pagina) => {
    conteudoGeral.innerHTML = `<object style="height: 100%; width: 100%;" type="text/html" data="./loja/${pagina}/index.html"></object>`;
};

printDevs(devs);

carregarSocial();
