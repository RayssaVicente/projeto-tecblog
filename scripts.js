// Função para carregar as postagens (Página Inicial)
async function carregarPostagens() {
    const container = document.getElementById('container-postagens');
    
    try {
        const resposta = await fetch('posts.json');
        const postagens = await resposta.json();

        container.innerHTML = "";

        postagens.forEach((post, index) => {
            const postElemento = document.createElement('div');
            postElemento.className = 'postagem';
            
            // ATENÇÃO: Mudamos de post.imagem para post.imagem_principal
            postElemento.innerHTML = `
                <h2>${post.titulo}</h2>
                <span class="data-postagem">postado ${post.data}</span>
                <img width="100%" src="${post.imagem_principal}" alt="${post.titulo}">
                <p>${post.sobre_breve}</p>
                <a href="javascript:void(0)" onclick="abrirLeituraCompleta(${index})">Leia mais</a>
            `;
            
            container.appendChild(postElemento);
        });

        window.todasPostagens = postagens;

    } catch (erro) {
        console.error("Erro ao carregar postagens:", erro);
    }
}

// Função para abrir o modal com o conteúdo completo (Estilo Matéria)
function abrirLeituraCompleta(index) {
    const post = window.todasPostagens[index];
    const modal = document.getElementById('modal-leitura');
    const conteudo = document.getElementById('conteudo-modal');

    // Função auxiliar para decidir se renderiza <img> ou <video>
    function renderizarMidia(url, cssClass = "") {
        const extensaoVideo = ['.mp4', '.webm', '.ogg'];
        const eVideo = extensaoVideo.some(ext => url.toLowerCase().endsWith(ext));

        if (eVideo) {
            return `<video src="${url}" controls class="${cssClass}" style="width:100%; border-radius:8px; margin-bottom:10px;"></video>`;
        } else {
            return `<img src="${url}" alt="Mídia da galeria" class="${cssClass}">`;
        }
    }

    // Processa a foto grande e a galeria lateral
    const destaqueHTML = renderizarMidia(post.fotos_galeria[0], "foto-grande-materia-img");
    
    const galeriaLateralHTML = post.fotos_galeria.slice(1).map(url => `
        <div class="item-galeria-lateral">
            ${renderizarMidia(url)}
        </div>
    `).join('');

    conteudo.innerHTML = `
        <div class="materia-container">
            <header class="materia-header">
                <h1>${post.titulo}</h1>
                <p class="subtitulo">${post.sobre_breve}</p>
                <div class="meta-info">
                    <span>postado ${post.data}</span> | <span>Equipe Olimpo</span>
                </div>
            </header>

            <div class="materia-corpo">
                <div class="coluna-texto">
                    <p><strong>Objetivo:</strong> ${post.objetivo}</p>
                    <p>${post.conteudo_completo}</p>
                    
                    <div class="foto-grande-materia">
                        ${destaqueHTML}
                    </div>
                    <p style="margin-top: 20px;">${post.conteudo_complementar}</p>
                </div>
                
                <div class="coluna-fotos">
                    ${galeriaLateralHTML}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function fecharModal() {
    document.getElementById('modal-leitura').style.display = 'none';
    document.body.style.overflow = 'auto'; // Devolve o scroll
}


// Executa a função assim que a página carrega
window.onload = carregarPostagens;