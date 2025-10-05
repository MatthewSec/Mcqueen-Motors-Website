// financiamento.js

let grafico;

document.addEventListener("DOMContentLoaded", () => {
    const precoInput = document.getElementById("preco-veiculo-sim");
    const entradaInput = document.getElementById("entrada");
    const parcelasSelect = document.getElementById("parcelas");
    const taxaInput = document.getElementById("taxa");
    const carroSelect = document.createElement("select");

    // Cria seletor de carros
    carroSelect.id = "carro-select";
    carroSelect.innerHTML = `
        <option value="">Selecione um carro</option>
        <option value="485000">BMW X6 2023</option>
        <option value="750000">Porsche 911 2023</option>
        <option value="650000">Range Rover 2023</option>
        <option value="320000">Mercedes-AMG C63 2022</option>
    `;
    precoInput.parentElement.insertAdjacentElement("beforebegin", carroSelect);

    carroSelect.addEventListener("change", () => {
        precoInput.value = carroSelect.value;
        calcularFinanciamento();
    });

    [precoInput, entradaInput, parcelasSelect, taxaInput].forEach(el => {
        el.addEventListener("input", calcularFinanciamento);
    });

    calcularFinanciamento();
});

function calcularFinanciamento() {
    const preco = parseFloat(document.getElementById("preco-veiculo-sim").value) || 0;
    const entrada = parseFloat(document.getElementById("entrada").value) || 0;
    const parcelas = parseInt(document.getElementById("parcelas").value) || 12;
    const taxaAnual = parseFloat(document.getElementById("taxa").value) || 0;

    const taxaMensal = taxaAnual / 12 / 100;
    const valorFinanciado = preco - entrada;

    // Fórmula de financiamento: PMT = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
    const parcela = taxaMensal === 0
        ? valorFinanciado / parcelas
        : valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / (Math.pow(1 + taxaMensal, parcelas) - 1);

    const totalPago = parcela * parcelas;
    const totalJuros = totalPago - valorFinanciado;

    // Atualiza campos
    document.getElementById("valor-veiculo-display").textContent = formatar(preco);
    document.getElementById("entrada-display").textContent = formatar(entrada);
    document.getElementById("valor-financiado").textContent = formatar(valorFinanciado);
    document.getElementById("valor-parcela").textContent = formatar(parcela);
    document.getElementById("total-juros").textContent = formatar(totalJuros);
    document.getElementById("total-pagar").textContent = formatar(totalPago);
    document.getElementById("percentual-entrada").textContent = `${((entrada / preco) * 100).toFixed(1)}%`;
    document.getElementById("taxa-mensal").textContent = `${(taxaMensal * 100).toFixed(2)}%`;
    document.getElementById("taxa-mensal-display").textContent = `${(taxaMensal * 100).toFixed(2)}%`;

    atualizarGrafico(valorFinanciado, totalJuros);
}

function formatar(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarGrafico(principal, juros) {
    const ctx = document.getElementById("grafico-financiamento").getContext("2d");
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Valor Financiado", "Juros"],
            datasets: [{
                data: [principal, juros],
                backgroundColor: ["#1e40af", "#f87171"]
            }]
        },
        options: {
            plugins: {
                legend: { position: "bottom" },
                tooltip: { callbacks: { label: ctx => `${ctx.label}: ${formatar(ctx.raw)}` } }
            }
        }
    });
}
