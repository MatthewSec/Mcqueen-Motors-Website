    // Dados dos veículos do estoque (adicione ou edite conforme necessário)
    const veiculosEstoque = [
        {
            id: 'bmw-x6-2023',
            marca: 'bmw',
            titulo: 'BMW X6 2023',
            motor: '3.0 Turbo',
            cambio: 'Automático',
            km: '15.000 km',
            preco: 485000,
            imagem: '../imagens/Bmw.png',
            descricao: 'Motor 3.0 Turbo • Automático • 15.000 km'
        },
        {
            id: 'porsche-911-2023',
            marca: 'porsche',
            titulo: 'Porsche 911 Carrera 2023',
            motor: '3.0 Biturbo',
            cambio: 'Automático',
            km: '8.500 km',
            preco: 750000,
            imagem: '../imagens/vermelho911.png',
            descricao: 'Motor 3.0 Biturbo • Automático • 8.500 km'
        },
        {
            id: 'mercedes-c63-2022',
            marca: 'mercedes',
            titulo: 'Mercedes-AMG C63 2022',
            motor: '4.0 V8 Biturbo',
            cambio: 'Automático',
            km: '22.000 km',
            preco: 320000,
            imagem: '../imagens/mercedes.png',
            descricao: 'Motor 4.0 V8 Biturbo • Automático • 22.000 km'
        },
        {
            id: 'range-rover-2023',
            marca: 'land-rover',
            titulo: 'Range Rover Vogue 2023',
            motor: '3.0 Turbo Diesel',
            cambio: 'Automático de 8 marchas',
            km: '12.000 km',
            preco: 980000,
            imagem: '../imagens/range-rover.png',
            descricao: 'Motor 3.0 Turbo Diesel • Automático de 8 marchas • 12.000 km • Cor Preta'

        },
        {
            id: 'lamborghini-urus-2023',
            marca: 'lamborghini',
            titulo: 'Lamborghini Urus 2023',
            motor: '4.0 V8 Biturbo',
            cambio: 'Automático de 8 marchas',
            km: '5.200 km',
            preco: 1850000,
            imagem: '../imagens/Urus.png',
            descricao: 'Motor 4.0 V8 Biturbo • Automático de 8 marchas • 5.200 km'
        },
        {
            id: 'ford-mustang-2023',
            marca: 'ford',
            titulo: 'Ford Mustang 2023',
            motor: '5.0 V8',
            cambio: 'Automático',
            km: '30.000 km',
            preco: 210000,
            imagem: '../imagens/mustang.png',
            descricao: 'Motor 5.0 V8 • Automático • 30.000 km'
        }
    ];

    // Renderiza os cards dos veículos
    function renderVeiculos() {
        const grid = document.getElementById('veiculos-grid');
        grid.innerHTML = '';
        veiculosEstoque.forEach(veiculo => {
            const card = document.createElement('div');
            card.className = 'veiculo-card';
            card.setAttribute('data-marca', veiculo.marca);
            card.setAttribute('data-preco', veiculo.preco);
            card.onclick = () => showVehicleDetails(veiculo.id);
            card.innerHTML = `
                <div class="veiculo-image">
                    <img src="${veiculo.imagem}" alt="${veiculo.titulo}">
                </div>
                <div class="veiculo-info">
                    <h3>${veiculo.titulo}</h3>
                    <p>${veiculo.descricao}</p>
                    <div class="veiculo-preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</div>
                    <div class="veiculo-actions">
                        <a href="../outras-paginas/financiamento.html"><button class="btn-primary" onclick="event.stopPropagation();">Simular</button></a>
                        <button class="btn-secondary" onclick="event.stopPropagation(); showReservaForm()">Reservar</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Mostra a seção de detalhes do veículo selecionado
    function showVehicleDetails(vehicleId) {
        const veiculo = veiculosEstoque.find(v => v.id === vehicleId);
        if (!veiculo) return;

        showSection('veiculo-detalhes');
        document.getElementById('veiculo-titulo').textContent = veiculo.titulo;
        document.getElementById('veiculo-descricao').textContent = veiculo.descricao;
        document.getElementById('veiculo-preco').textContent = `R$ ${veiculo.preco.toLocaleString('pt-BR')}`;
        const mainImage = document.getElementById('main-image');
        mainImage.innerHTML = `<img src="${veiculo.imagem}" alt="${veiculo.titulo}" style="width:100%;max-width:400px;border-radius:16px;">`;
    }

    // Volta para o estoque
    function voltarAoEstoque() {
        showSection('estoque');
    }

    // Troca de seção
    function showSection(sectionName) {
        document.getElementById('estoque').classList.add('hidden');
        document.getElementById('veiculo-detalhes').classList.add('hidden');
        document.getElementById(sectionName).classList.remove('hidden');
    }

    // Placeholder para simulador
    function showSimulador(preco) {
        alert(`Simulador de financiamento para o valor: R$ ${preco ? Number(preco).toLocaleString('pt-BR') : ''}`);
    }

    // Placeholder para reserva
    function showReservaForm() {
        alert('Formulário de reserva será exibido aqui');
    }

    // Filtros funcionais
    document.addEventListener('DOMContentLoaded', function() {
        renderVeiculos();
        document.getElementById('filtro-marca').addEventListener('change', filterVehicles);
        document.getElementById('filtro-preco').addEventListener('change', filterVehicles);
    });

    function filterVehicles() {
        const marcaFilter = document.getElementById('filtro-marca').value;
        const precoFilter = document.getElementById('filtro-preco').value;
        const cards = document.querySelectorAll('.veiculo-card');

        cards.forEach(card => {
            let showCard = true;

            // Filtro por marca
            if (marcaFilter && card.getAttribute('data-marca') !== marcaFilter) {
                showCard = false;
            }

            // Filtro por preço
            if (precoFilter && showCard) {
                const preco = parseInt(card.getAttribute('data-preco'));
                switch(precoFilter) {
                    case '0-200000':
                        if (preco > 200000) showCard = false;
                        break;
                    case '200000-500000':
                        if (preco <= 200000 || preco > 500000) showCard = false;
                        break;
                    case '500000+':
                        if (preco <= 500000) showCard = false;
                        break;
                }
            }

            card.style.display = showCard ? 'block' : 'none';
        });
    }
