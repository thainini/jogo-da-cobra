document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastroForm");
    const loginForm = document.getElementById("loginForm");
    const mensagem = document.getElementById("mensagem");

    
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

            if (!nome || !email || !senha || !confirmarSenha) {
                mensagem.textContent = "Preencha todos os campos!";
                mensagem.style.color = "red";
                return;
            }

            if (senha !== confirmarSenha) {
                mensagem.textContent = "As senhas não coincidem!";
                mensagem.style.color = "red";
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioExistente = usuarios.find(u => u.email === email);
            if (usuarioExistente) {
                mensagem.textContent = "Este e-mail já está cadastrado!";
                mensagem.style.color = "red";
                return;
            }

            usuarios.push({ nome, email, senha });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            mensagem.textContent = "Cadastro realizado com sucesso!";
            mensagem.style.color = "green";

           
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        });
    }

    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

            if (!usuarioEncontrado) {
                mensagem.textContent = "E-mail ou senha incorretos!";
                mensagem.style.color = "red";
                return;
            }

            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.style.color = "green";

            
            setTimeout(() => {
                window.location.href = "jogo.html"; 
            }, 800);
        });
    }
});
