async function carregarCards() {
    const dados = await fetch("./json/mais-populares.json");
    const json = await dados.json();
    const grid = document.querySelector(".destaques-grid");
    json.forEach((item) => {
        grid.innerHTML += `<div class="card" data-percPromocao=${
            item.promotion[0] === true ? parseInt(item.promotion[1] * 100) : ""
        } data-promocao="true">
            <img
                src=${item.img} width="240" height="240" alt="" />
            <div class="card-sombraTitulo position-absolute d-flex align-items-center justify-content-end flex-column">
                <p class="text-capitalize card-campeao_nome">${item.name}</p>
                <span id="card-precos">
                    ${printaPreco(item)}
                </span>
            </div>
        </div>`;
    });
}

const printaPreco = (item) => {
    if (item.price[2]) {
        return "<p>adquirido</p>";
    }
    if (item.price[1]) {
        return `<p class="card-precos_rp">${item.price[0]}</p> 
                <p class="card-precos_ea">${item.price[1]}</p>`;
    }
    return `<p class="card-precos_rp">${item.price[0]}</p>`;
};

carregarCards();
