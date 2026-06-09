// ===== CONFIGURAÇÃO DO QUIZ =====
// Banco de perguntas sobre meio ambiente e coleta seletiva
const perguntas = [
    {
        texto: "Qual é a cor da lixeira para descartar plástico?",
        alternativas: ["Azul", "Vermelho", "Verde", "Amarelo"],
        correta: 1 // índice 1 = Vermelho
    },
    {
        texto: "O que é coleta seletiva?",
        alternativas: [
            "Juntar todo o lixo no mesmo saco",
            "Separar os resíduos recicláveis dos orgânicos",
            "Queimar o lixo para economizar espaço",
            "Jogar o lixo em rios"
        ],
        correta: 1
    },
    {
        texto: "Qual material leva mais de 400 anos para se decompor no meio ambiente?",
        alternativas: ["Papel", "Vidro", "Plástico", "Restos de comida"],
        correta: 2
    },
    {
        texto: "O que a agricultura sustentável busca equilibrar?",
        alternativas: [
            "Produção de alimentos e preservação ambiental",
            "Uso de agrotóxicos sem limite",
            "Desmatamento de florestas",
            "Consumo de água sem controle"
        ],
        correta: 0
    },
    {
        texto: "Onde devemos descartar pilhas e baterias usadas?",
        alternativas: [
            "Lixeira comum",
            "Rio mais próximo",
            "Pontos de coleta especiais (eletrônicos)",
            "Enterrar no quintal"
        ],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;
let quizFinalizado = false;

// Elementos do DOM
const perguntaArea = document.getElementById("pergunta-area");
const alternativasArea = document.getElementById("alternativas-area");
const feedbackArea = document.getElementById("feedback-area");
const proximoBtn = document.getElementById("proximoBtn");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const pontuacaoArea = document.getElementById("pontuacao-area");

// Função para carregar a pergunta atual
function carregarPergunta() {
    if (quizFinalizado) return;
    
    const pergunta = perguntas[perguntaAtual];
    perguntaArea.innerHTML = pergunta.texto;
    
    // Limpar alternativas antigas
    alternativasArea.innerHTML = "";
    respostaSelecionada = null;
    
    // Criar alternativas
    pergunta.alternativas.forEach((alt, index) => {
        const divAlt = document.createElement("div");
        divAlt.classList.add("alternativa");
        divAlt.innerHTML = alt;
        divAlt.dataset.index = index;
        
        // Evento de clique para selecionar alternativa
        divAlt.addEventListener("click", () => {
            if (quizFinalizado) return;
            // Remove classe 'selecionada' de todas
            document.querySelectorAll(".alternativa").forEach(el => {
                el.classList.remove("selecionada");
            });
            // Adiciona na clicada
            divAlt.classList.add("selecionada");
            respostaSelecionada = index;
        });
        
        alternativasArea.appendChild(divAlt);
    });
    
    // Limpar feedback e esconder botão próximo? (deixamos visível)
    feedbackArea.innerHTML = "";
    feedbackArea.className = "feedback";
}

// Função para verificar resposta e avançar (usada no botão próximo)
function verificarResposta() {
    if (quizFinalizado) {
        return;
    }
    
    if (respostaSelecionada === null) {
        feedbackArea.innerHTML = "⚠️ Selecione uma alternativa antes de continuar!";
        feedbackArea.className = "feedback erro";
        return;
    }
    
    const pergunta = perguntas[perguntaAtual];
    const isCorreto = (respostaSelecionada === pergunta.correta);
    
    if (isCorreto) {
        pontuacao++;
        feedbackArea.innerHTML = "✅ Correto! Muito bem!";
        feedbackArea.className = "feedback correto";
    } else {
        const respostaCorretaTexto = pergunta.alternativas[pergunta.correta];
        feedbackArea.innerHTML = `❌ Errado! A resposta correta é: ${respostaCorretaTexto}.`;
        feedbackArea.className = "feedback errado";
    }
    
    // Atualizar pontuação na tela
    pontuacaoArea.innerHTML = `Pontuação: ${pontuacao} / ${perguntas.length}`;
    
    // Avançar para próxima pergunta ou finalizar
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
}

// Finalizar o quiz
function finalizarQuiz() {
    quizFinalizado = true;
    perguntaArea.innerHTML = "🎉 Quiz finalizado! 🎉";
    alternativasArea.innerHTML = "";
    feedbackArea.innerHTML = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    feedbackArea.className = "feedback correto";
    proximoBtn.style.display = "none";
    reiniciarBtn.style.display = "inline-block";
}

// Reiniciar o quiz
function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respostaSelecionada = null;
    quizFinalizado = false;
    pontuacaoArea.innerHTML = `Pontuação: 0 / ${perguntas.length}`;
    proximoBtn.style.display = "inline-block";
    reiniciarBtn.style.display = "none";
    carregarPergunta();
}

// Eventos dos botões
proximoBtn.addEventListener("click", verificarResposta);
reiniciarBtn.addEventListener("click", reiniciarQuiz);

// Iniciar quiz
carregarPergunta();

// ===== FUNCIONALIDADES DE ACESSIBILIDADE =====
// Menu acessibilidade (abrir/fechar)
const botaoAcessibilidade = document.getElementById("botaoAcessibilidade");
const menuAcessibilidade = document.getElementById("menuAcessibilidade");

botaoAcessibilidade.addEventListener("click", (e) => {
    e.stopPropagation();
    menuAcessibilidade.classList.toggle("mostrar");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
    if (!botaoAcessibilidade.contains(e.target)) {
        menuAcessibilidade.classList.remove("mostrar");
    }
});

// Aumentar fonte
const aumentarFonteBtn = document.getElementById("aumentarFonte");
let tamanhoFonte = 16; // valor padrão em px

aumentarFonteBtn.addEventListener("click", () => {
    let htmlAtual = parseFloat(getComputedStyle(document.body).fontSize);
    if (htmlAtual < 28) {
        document.body.style.fontSize = (htmlAtual + 2) + "px";
    }
});

// Diminuir fonte
const diminuirFonteBtn = document.getElementById("diminuirFonte");
diminuirFonteBtn.addEventListener("click", () => {
    let htmlAtual = parseFloat(getComputedStyle(document.body).fontSize);
    if (htmlAtual > 12) {
        document.body.style.fontSize = (htmlAtual - 2) + "px";
    }
});

// Alto Contraste
const altoContrasteBtn = document.getElementById("altoContraste");
altoContrasteBtn.addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
});
