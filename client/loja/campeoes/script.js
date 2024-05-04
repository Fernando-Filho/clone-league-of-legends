function constroiURL() {
    let url = "http://localhost:8080/champ?size=200";
    let name = document.getElementById("input-search-champ").value;
    let filtersRole = [];
    for (let i = 0; i < 6; i++) {
        if (document.querySelectorAll(".input-checkbox")[i].checked) {
            filtersRole.push(
                document.querySelectorAll(".input-checkbox")[i].id
            );
        }
    }
    let sale = document.getElementById("sale");
    let sortingMethod = document.getElementById("select-sorting-method")
        .options[document.getElementById("select-sorting-method").selectedIndex]
        .value;
    if (name.length == 0 && filtersRole.length == 0 && !sale.checked) {
        url += `&sale=false&sort=${sortingMethod}`;
        console.log(url);
        return url;
    }
    url += "&";
    if (name.length != 0) {
        url += `name=${name}`;
    }
    if (filtersRole.length != 0) {
        if (name.length != 0) {
            url += "&";
        }
        let adicionados = 0;
        for (let i = 0; i < filtersRole.length; i++) {
            if (adicionados != 0) {
                url += ",";
            } else {
                url += `roles=`;
            }
            url += filtersRole[i];
            adicionados++;
        }
    }
    if (name.length != 0 || filtersRole.length != 0) {
        url += "&";
    }
    url += `sale=${sale.checked}`;
    url += `&sort=${sortingMethod}`;
    console.log(url);
    return url;
}

async function carregarChamps() {
    const dados = await fetch(constroiURL());
    const json = await dados.json();
    const data = await json.content;

    const divChamps = document.getElementById("grid-campeoes");
    divChamps.style.overflowY = "scroll";
    divChamps.innerHTML = "";
    data.forEach((champ) => {
        divChamps.innerHTML += `<div class="card">
                                    <img src="${champ.image}" width="240" height="240" alt="${champ.name}">
                                    <div class="card-info-bg">
                                        <p class=" text-capitalize">${champ.name}</p>
                                        <span id="precos-box">
                                            <p class="preco-rp">${champ.rpPrice}</p>
                                            <p class="preco-ea">${champ.eaPrice}</p>
                                        </span>
                                    </div>
                                </div>`;
    });
}

let elementsTriggerEventCheckbox =
    document.getElementsByClassName("input-checkbox");

for (let i = 0; i < elementsTriggerEventCheckbox.length; i++) {
    elementsTriggerEventCheckbox[i].addEventListener("click", carregarChamps);
}

document.getElementById("sale").addEventListener("click", carregarChamps);

let elementTriggerEventSelect = document.getElementById(
    "select-sorting-method"
);

elementTriggerEventSelect.addEventListener("change", carregarChamps);

let elementTriggerEventSearch = document.getElementById("input-search-champ");

elementTriggerEventSearch.addEventListener("input", carregarChamps);

window.addEventListener("load", carregarChamps());
