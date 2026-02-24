// Banco de dados das modalidades
const dadosModalidades = {
    'tjr-resgate': {
        titulo: "Resgate - TJR",
        descricao: "O robô deve percorrer um trajeto com obstáculos e salvar uma vítima em um ambiente que simula um desastre.",
        avaliacao: "Tempo total e precisão no salvamento."
    },
    'tjr-sumo': {
        titulo: "Sumô de Robôs",
        descricao: "Combate entre dois robôs autônomos dentro de um dojo.",
        avaliacao: "Vence quem retirar o oponente da área de combate."
    },
    'tjr-seguidor': {
        titulo: "Seguidor de Linha",
        descricao: "O robô deve completar um percurso marcado por uma linha no chão no menor tempo possível.",
        avaliacao: "Velocidade e manutenção do trajeto."
    },
    'obr-teorica': {
        titulo: "OBR - Modalidade Teórica",
        descricao: "Prova escrita sobre conceitos de robótica, física e lógica.",
        avaliacao: "Pontuação na prova nacional."
    },
    'obr-pratica': {
        titulo: "OBR - Modalidade Prática",
        descricao: "Desafio de resgate em arena com múltiplos níveis e obstáculos.",
        avaliacao: "Pontuação por progresso na pista e resgate da vítima."
    }
    // Adicione os outros IDs conforme necessário
};

function abrirInfoModalidade(id) {
    const modal = document.getElementById('modal-info');
    const conteudo = document.getElementById('conteudo-info');
    
    console.log("Tentando abrir modal para:", id); // Para você ver no console se clicou

    const info = dadosModalidades[id];

    if (info) {
        conteudo.innerHTML = `
            <h2 style="color: #f7b600; margin-bottom: 15px;">${info.titulo}</h2>
            <p style="margin-bottom: 10px;"><strong>O que é:</strong> ${info.descricao}</p>
            <p><strong>Como é avaliado:</strong> ${info.avaliacao}</p>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    } else {
        console.error("ID não encontrado no banco de dados:", id);
    }
}

function fecharModalInfo() {
    document.getElementById('modal-info').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}