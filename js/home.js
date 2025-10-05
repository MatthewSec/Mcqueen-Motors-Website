const veiculos = [
    {
        id: 'mercedes-c63-2022',
        marca: 'mercedes',
        titulo: 'Mercedes-AMG C63 2022',
        motor: '4.0 V8 Biturbo',
        cambio: 'Automático',
        km: '22.000 km',
        preco: 320000,
        ano: 2022,
        cor: 'Preto',
        imagem: '../imagens/mercedes.png',
        descricao: 'Motor 4.0 V8 Biturbo • Automático • 22.000 km'
    },
    {
        id: 'porsche-911',
        titulo: 'Porsche 911 2022',
        motor: '3.8 Turbo',
        cambio: 'Manual',
        cor: 'Vermelho',
        km: '8.500 km',
        preco: 720000,
        ano: 2022,
        imagem: '../imagens/vermelho911.png'
    },
    {
        id: 'ford-mustang-2023',
        marca: 'ford',
        titulo: 'Ford Mustang 2023',
        motor: '5.0 V8',
        cambio: 'Automático',
        km: '30.000 km',
        preco: 210000,
        ano: 2023,
        cor: 'Vermelho',
        imagem: '../imagens/mustang.png',
        descricao: 'Motor 5.0 V8 • Automático • 30.000 km'
    }
];

// Renderiza os cards dos veículos na seção de destaques
document.addEventListener('DOMContentLoaded', function() {
    const destaquesGrid = document.querySelector('.destaques-grid');
    if (destaquesGrid) {
        destaquesGrid.innerHTML = veiculos.map((v, idx) => `
            <div class="destaque-card">
                <img src="${v.imagem}" alt="${v.titulo}" class="destaque-img">
                <h3>${v.titulo}</h3>
                <div class="car-details">
                    <span><strong>Ano:</strong> ${v.ano}</span><br>
                    <span><strong>Motor:</strong> ${v.motor}</span><br>
                    <span><strong>Câmbio:</strong> ${v.cambio}</span><br>
                    <span><strong>Cor:</strong> ${v.cor}</span><br>
                    <span><strong>KM:</strong> ${v.km}</span>
                </div>
                <div class="price">R$ ${v.preco.toLocaleString('pt-BR')}</div>
                <button class="btn-outline" data-veiculo-idx="${idx}">Ver Detalhes</button>
            </div>
        `).join('');
    }

    // Cria o modal de detalhes se não existir
    if (!document.getElementById('detalhe-veiculo-modal')) {
        const modal = document.createElement('div');
        modal.id = 'detalhe-veiculo-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="detalhe-modal-bg"></div>
            <div class="detalhe-modal-card">
                <button class="fechar-modal" title="Fechar">&times;</button>
                <div class="detalhe-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Fechar ao clicar no X ou no fundo
        modal.querySelector('.fechar-modal').onclick = fecharDetalhesVeiculo;
        modal.querySelector('.detalhe-modal-bg').onclick = fecharDetalhesVeiculo;
    }

    // Adiciona evento aos botões "Ver Detalhes"
    document.querySelectorAll('.btn-outline[data-veiculo-idx]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const idx = parseInt(this.getAttribute('data-veiculo-idx'));
            mostrarDetalhesVeiculo(idx);
        });
    });
});

// Função para mostrar detalhes do veículo
function mostrarDetalhesVeiculo(idx) {
    const v = veiculos[idx];
    const modal = document.getElementById('detalhe-veiculo-modal');
    const content = modal.querySelector('.detalhe-modal-content');
    content.innerHTML = `
        <img src="${v.imagem}" alt="${v.titulo}" style="width:100%;max-width:320px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);margin-bottom:18px;">
        <h2 style="margin-bottom:8px;">${v.titulo}</h2>
        <ul style="list-style:none;padding:0;font-size:1.08rem;">
            <li><strong>Ano:</strong> ${v.ano}</li>
            <li><strong>Motor:</strong> ${v.motor}</li>
            <li><strong>Câmbio:</strong> ${v.cambio}</li>
            <li><strong>Cor:</strong> ${v.cor}</li>
            <li><strong>Quilometragem:</strong> ${v.km}</li>
            <li><strong>Preço:</strong> R$ ${v.preco.toLocaleString('pt-BR')}</li>
        </ul>
    `;
    modal.style.display = 'flex';
}

// Função para fechar o card de detalhes
function fecharDetalhesVeiculo() {
    const modal = document.getElementById('detalhe-veiculo-modal');
    if (modal) modal.style.display = 'none';
}
