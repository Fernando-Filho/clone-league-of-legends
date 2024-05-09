const usuarioCadastrado = "user10";
const senhaCadastrada = "senhaforte55";
const txtUsuario = document.querySelector("#txtUsuario");
const txtSenha = document.querySelector("#txtSenha");
const btnLogin = document.querySelector(".btnLogin");
const form = document.querySelector("#login-form");

function spin() {
    form.innerHTML += `<div class="spin"><div heigth="40" weight="40" class="spinner-border" role="status"></div></div>`;
    setTimeout(() => {
        document.querySelector(".spin").style.visibility = "hidden";
    }, 1500);
}

function login() {
    const usuario = document.querySelector("#txtUsuario").value;
    const senha = document.querySelector("#txtSenha").value;

    spin();

    if (senha === senhaCadastrada && usuario === usuarioCadastrado) {
        setTimeout(() => {
            location.href = "/clone-league-of-legends/loading/";
        }, 1500);
    } else {
        const label = document.querySelectorAll(".form-input_box label");
        const input = document.querySelectorAll(".form-input_box input");

        label.forEach((lbl) => (lbl.style.color = "#e806cf"));
        input.forEach(
            (txt) =>
                (txt.style.cssText =
                    "border: 2px solid #fec7ff; background-color: #fde1ff")
        );

        form.innerHTML += `<span class="input_MensagemErro lh-sm font_LexendDeca">Suas credenciais de login não coincidem com uma conta em nosso sistema.</span>`;
    }
}

function verificaCampos() {
    const usuario = document.querySelector("#txtUsuario").value;
    const senha = document.querySelector("#txtSenha").value;

    console.log(usuario);
    if (!usuario || !senha) {
        ativaBotao();
    } else if (senha.length < 3 || usuario.length < 3) {
        ativaBotao();
    } else {
        btnLogin.classList.add("ativo");
        btnLogin.disabled = false;
    }
}

function ativaBotao() {
    btnLogin.disabled = true;
    btnLogin.classList.remove("ativo");
}

document.addEventListener("DOMContentLoaded", verificaCampos);
form.addEventListener("keyup", verificaCampos);
