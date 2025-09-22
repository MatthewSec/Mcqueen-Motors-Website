
        // Dados dos veículos
        const veiculos = [
            {
                id: 'bmw-x6',
                titulo: 'BMW X6 2023',
                motor: '3.0 Turbo',
                cambio: 'Automático',
                cor: 'Preto',
                km: '15.000 km',
                preco: 485000,
                ano: 2023,
                imagem: '🚗'
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
                imagem: '🏎️'
            },
            {
                id: 'range-rover',
                titulo: 'Range Rover 2023',
                motor: '5.0 V8',
                cambio: 'Automático',
                cor: 'Branco',
                km: '12.000 km',
                preco: 650000,
                ano: 2023,
                imagem: '🚙'
            },
            {
                id: 'mercedes-gle',
                titulo: 'Mercedes-Benz GLE 2023',
                motor: '3.0 V6',
                cambio: 'Automático',
                cor: 'Prata',
                km: '20.000 km',
                preco: 420000,
                ano: 2023,
                imagem: '🚗'
            },
            {
                id: 'bmw-m3',
                titulo: 'BMW M3 2022',
                motor: '3.0 Twin Turbo',
                cambio: 'Manual',
                cor: 'Azul',
                km: '18.000 km',
                preco: 380000,
                ano: 2022,
                imagem: '🏎️'
            },
            {
                id: 'porsche-cayenne',
                titulo: 'Porsche Cayenne 2023',
                motor: '3.0 Turbo',
                cambio: 'Automático',
                cor: 'Cinza',
                km: '10.000 km',
                preco: 580000,
                ano: 2023,
                imagem: '🚙'
            }
        ];

        // Navegação
        function showSection(sectionId) {
            // Esconder todas as seções
            const sections = document.querySelectorAll('main > section');
            sections.forEach(section => {
                section.classList.add('hidden');
            });

            // Mostrar a seção desejada
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            // Carregar conteúdo específico da seção
            if (sectionId === 'estoque') {
                carregarEstoque();
            } else if (sectionId === 'simulador') {
                calcularFinanciamento();
            }

            // Fechar menu mobile se estiver aberto
            const nav = document.querySelector('.nav');
            nav.classList.remove('nav-open');
        }

        function showVehicleDetail(vehicleId) {
            const veiculo = veiculos.find(v => v.id === vehicleId);
            if (veiculo) {
                document.getElementById('veiculo-titulo').textContent = veiculo.titulo;
                document.getElementById('spec-motor').textContent = veiculo.motor;
                document.getElementById('spec-cambio').textContent = veiculo.cambio;
                document.getElementById('spec-cor').textContent = veiculo.cor;
                document.getElementById('spec-km').textContent = veiculo.km;
                document.getElementById('preco-veiculo').textContent = `R$ ${veiculo.preco.toLocaleString('pt-BR')}`;
                document.getElementById('main-image').textContent = veiculo.imagem;
            }
            showSection('veiculo-detalhes');
        }

        function carregarEstoque() {
            const grid = document.getElementById('veiculos-grid');
            grid.innerHTML = '';

            veiculos.forEach(veiculo => {
                const card = document.createElement('div');
                card.className = 'veiculo-card';
                card.innerHTML = `
                    <div class="veiculo-image">${veiculo.imagem}</div>
                    <div class="veiculo-info">
                        <h3>${veiculo.titulo}</h3>
                        <p class="veiculo-specs">${veiculo.motor} • ${veiculo.cambio} • ${veiculo.km}</p>
                        <div class="veiculo-preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</div>
                        <div class="veiculo-actions">
                            <button class="btn-outline" onclick="showVehicleDetail('${veiculo.id}')">Ver Detalhes</button>
                            <button class="btn-primary" onclick="showReservaForm()">Reservar</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function showSimulador(preco) {
            if (preco) {
                document.getElementById('preco-veiculo-sim').value = preco;
            }
            showSection('simulador');
            calcularFinanciamento();
        }

        function showReservaForm() {
            document.getElementById('reserva-form').classList.remove('hidden');
        }

        function hideReservaForm() {
            document.getElementById('reserva-form').classList.add('hidden');
        }

        function calcularFinanciamento() {
            const precoVeiculo = parseFloat(document.getElementById('preco-veiculo-sim').value) || 0;
            const entrada = parseFloat(document.getElementById('entrada').value) || 0;
            const parcelas = parseInt(document.getElementById('parcelas').value) || 36;
            const taxaAnual = parseFloat(document.getElementById('taxa').value) || 12;

            const valorFinanciado = precoVeiculo - entrada;
            const taxaMensal = taxaAnual / 100 / 12;

            let valorParcela = 0;
            if (taxaMensal > 0) {
                valorParcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / (Math.pow(1 + taxaMensal, parcelas) - 1);
            } else {
                valorParcela = valorFinanciado / parcelas;
            }

            const totalPago = entrada + (valorParcela * parcelas);

            // Atualizar resultados
            document.getElementById('valor-financiado').textContent = `R$ ${valorFinanciado.toLocaleString('pt-BR')}`;
            document.getElementById('valor-parcela').textContent = `R$ ${valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            document.getElementById('total-pago').textContent = `R$ ${totalPago.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

            // Desenhar gráfico
            desenharGrafico(entrada, valorFinanciado, valorParcela * parcelas - valorFinanciado);
        }

        function desenharGrafico(entrada, financiado, juros) {
            const canvas = document.getElementById('grafico-financiamento');
            const ctx = canvas.getContext('2d');

            // Limpar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const total = entrada + financiado + juros;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;

            // Ângulos para cada seção
            let currentAngle = -Math.PI / 2;
            const entradaAngle = (entrada / total) * 2 * Math.PI;
            const financiadoAngle = (financiado / total) * 2 * Math.PI;
            const jurosAngle = (juros / total) * 2 * Math.PI;

            // Entrada (Verde)
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + entradaAngle);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            currentAngle += entradaAngle;

            // Valor
        }
