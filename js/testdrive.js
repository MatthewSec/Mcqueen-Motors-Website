        const carrosEstoque = [
            {
                id: "bmw-x6-2023",
                nome: "BMW X6",
                versao: "xDrive 40i",
                ano: 2023
            },
            {
                id: "porsche-911-2022",
                nome: "Porsche 911",
                versao: "Carrera S",
                ano: 2022
            },
            {
                id: "range-rover-2023",
                nome: "Range Rover",
                versao: "Vogue SE",
                ano: 2023
            }
        ];


        const selectCarro = document.getElementById('carro');
        carrosEstoque.forEach((carro) => {
            const opt = document.createElement('option');
            opt.value = carro.id;
            opt.textContent = `${carro.nome} ${carro.versao} (${carro.ano})`;
            selectCarro.appendChild(opt);
        });


        const telInput = document.getElementById('telefone');
        telInput.addEventListener('input', function(e) {
            let v = this.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0,11);
            if (v.length > 0) v = '(' + v;
            if (v.length > 3) v = v.slice(0,3) + ') ' + v.slice(3);
            if (v.length > 10) v = v.slice(0,10) + '-' + v.slice(10);
            else if (v.length > 6) v = v.slice(0,9) + '-' + v.slice(9);
            this.value = v;
        });


        const dataInput = document.getElementById('data');
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        const mm = String(hoje.getMonth()+1).padStart(2,'0');
        const dd = String(hoje.getDate()).padStart(2,'0');
        dataInput.min = `${yyyy}-${mm}-${dd}`;


        const form = document.getElementById('testdrive-form');
        const successMsg = document.getElementById('success-message');

        form.addEventListener('submit', function(e) {
            e.preventDefault();


            let valid = true;

            const nome = form.nome.value.trim();
            if(nome.length < 3) {
                valid = false;
                form.nome.style.borderColor = 'var(--primary)';
            } else {
                form.nome.style.borderColor = '';
            }

            const email = form.email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                valid = false;
                form.email.style.borderColor = 'var(--primary)';
            } else {
                form.email.style.borderColor = '';
            }

            const tel = form.telefone.value.replace(/\D/g,'');
            if(tel.length < 10 || tel.length > 11) {
                valid = false;
                form.telefone.style.borderColor = 'var(--primary)';
            } else {
                form.telefone.style.borderColor = '';
            }

            if(!form.data.value) {
                valid = false;
                form.data.style.borderColor = 'var(--primary)';
            } else {
                form.data.style.borderColor = '';
            }

            if(!form.hora.value) {
                valid = false;
                form.hora.style.borderColor = 'var(--primary)';
            } else {
                form.hora.style.borderColor = '';
            }

            if(!form.carro.value) {
                valid = false;
                form.carro.style.borderColor = 'var(--primary)';
            } else {
                form.carro.style.borderColor = '';
            }

            const contato = form.querySelector('input[name="contato"]:checked');
            if(!contato) {
                valid = false;
                document.querySelectorAll('.contact-pref input').forEach(inp => {
                    inp.parentElement.style.color = 'var(--primary)';
                });
            } else {
                document.querySelectorAll('.contact-pref input').forEach(inp => {
                    inp.parentElement.style.color = '';
                });
            }

            if(!valid) return;

            
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        });
