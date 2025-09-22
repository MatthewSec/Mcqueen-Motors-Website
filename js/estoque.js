        // Funções de navegação entre seções
        function showSection(sectionName) {
            // Ocultar todas as seções
            document.getElementById('estoque').classList.add('hidden');
            document.getElementById('veiculo-detalhes').classList.add('hidden');

            // Mostrar a seção solicitada
            document.getElementById(sectionName).classList.remove('hidden');
        }

        // Função para mostrar detalhes do veículo
        function showVehicleDetails(vehicleId) {
            // Aqui você pode carregar os dados específicos do veículo
            // Por enquanto, apenas mudamos a seção
            showSection('veiculo-detalhes');
        }

        // Função para trocar imagem principal
        function changeMainImage(emoji) {
            document.getElementById('main-image').textContent = emoji;

            // Atualizar thumbnails ativas
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Funções placeholder para outras funcionalidades
        function showSimulador(preco) {
            alert(`Simulador de financiamento para o valor: R$ ${preco.toLocaleString('pt-BR')}`);
        }

        function showReservaForm() {
            alert('Formulário de reserva será exibido aqui');
        }

        // Filtros funcionais
        document.getElementById('filtro-marca').addEventListener('change', function() {
            filterVehicles();
        });

        document.getElementById('filtro-preco').addEventListener('change', function() {
            filterVehicles();
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
