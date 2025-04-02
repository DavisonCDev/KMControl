// app.js - Manipulação do frontend

// Função para preencher a tabela com os contratos recebidos da API Rest
async function obterContratos() {
    try {
        const response = await fetch('http://localhost:8081/api/contratos/ultimos');
        const data = await response.json();

        if (data && data.data) {
            preencherTabela(data.data);
        } else {
            console.error("Erro ao obter contratos");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

// Função para preencher a tabela com os dados
function preencherTabela(contratos) {
    const tabelaBody = document.querySelector("#contratos-table tbody");
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    contratos.forEach(contrato => {
        const row = document.createElement("tr");

        // Verifique as condições para mudar a cor da linha
        if (contrato.kmExcedido === false && contrato.fazerRevisao === false) {
            row.classList.add("green-row"); // Linha verde se ambos forem false
        } else if (contrato.kmExcedido === false && contrato.fazerRevisao === true) {
            row.classList.add("yellow-row"); // Linha amarela se fizerRevisao for true
        } else {
            row.classList.add("red-row"); // Linha vermelha se kmExcedido ou fazerRevisao for true
        }

        // Preencher a linha com os dados do contrato
        row.innerHTML = `
            <td>${contrato.numeroContrato}</td>
            <td>${contrato.placa}</td>
            <td>${contrato.modelo}</td>
            <td>${contrato.condutorResponsavel}</td>
            <td>${contrato.kmIdeal}</td>
            <td>${contrato.kmAtual}</td>
            <td>${contrato.dataVigencia}</td>
            <td>${contrato.observacoes}</td>
        `;

        tabelaBody.appendChild(row);
    });
}

// Função para exibir o formulário de adicionar contrato
document.getElementById("btn-add-contract").addEventListener("click", function() {
    document.getElementById("form-container").style.display = "flex";
});

// Função para esconder o formulário
document.getElementById("btn-cancel").addEventListener("click", function() {
    document.getElementById("form-container").style.display = "none";
});

// Função para adicionar um novo contrato
document.getElementById("form-add-contract").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const formData = new FormData(event.target);
    const contratoData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8081/api/contratos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contratoData)
        });
        const data = await response.json();

        if (response.ok) {
            alert('Contrato adicionado com sucesso');
            document.getElementById("form-container").style.display = "none";
            obterContratos();  // Atualiza a tabela
        } else {
            alert('Erro ao adicionar contrato: ' + data.message);
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
});

// Inicializa a tabela com os contratos ao carregar a página
obterContratos();

// Função para exibir o formulário de atualizar KM
document.getElementById("btn-update-km").addEventListener("click", function() {
    document.getElementById("form-update-km-container").style.display = "flex";
});

// Função para esconder o formulário de atualizar KM
document.getElementById("btn-cancel-update").addEventListener("click", function() {
    document.getElementById("form-update-km-container").style.display = "none";
});

// Função para atualizar o KM
document.getElementById("form-update-km").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const formData = new FormData(event.target);
    const updateData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8081/api/contratos/atualizar-km', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const data = await response.json();

        if (response.ok) {
            alert('KM atualizado com sucesso');
            document.getElementById("form-update-km-container").style.display = "none";
            obterContratos();  // Atualiza a tabela
        } else {
            alert('Erro ao atualizar KM: ' + data.message);
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
});

// Função para exibir o formulário de substituir veículo
document.getElementById("btn-substituir-veiculo").addEventListener("click", function() {
    document.getElementById("form-substituir-veiculo").style.display = "flex";
});

// Função para esconder o formulário de substituir veículo
document.getElementById("btn-cancel-substituir").addEventListener("click", function() {
    document.getElementById("form-substituir-veiculo").style.display = "none";
});

// Função para substituir o veículo
document.getElementById("form-substituir-veiculo-data").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const formData = new FormData(event.target);
    const substituicaoData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8081/api/contratos/substituirVeiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(substituicaoData)
        });
        const data = await response.json();

        if (response.ok) {
            alert('Veículo substituído com sucesso');
            document.getElementById("form-substituir-veiculo").style.display = "none";
            obterContratos();  // Atualiza a tabela
        } else {
            alert('Erro ao substituir veículo: ' + data.message);
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
});

// Função para exibir o formulário de fazer revisão
document.getElementById("btn-fazer-revisao").addEventListener("click", function() {
    document.getElementById("form-revisao-container").style.display = "flex";
});

// Função para esconder o formulário de revisão
document.getElementById("btn-cancel-revisao").addEventListener("click", function() {
    document.getElementById("form-revisao-container").style.display = "none";
});

// Função para enviar os dados de revisão
document.getElementById("form-fazer-revisao").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const formData = new FormData(event.target);
    const revisaoData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8081/api/contratos/fazer-revisao', {  // Substitua pela URL correta do seu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(revisaoData)
        });
        const data = await response.json();

        if (response.ok) {
            alert('Revisão realizada com sucesso');
            document.getElementById("form-revisao-container").style.display = "none";  // Fecha o formulário
            obterContratos();  // Atualiza a tabela
        } else {
            alert('Erro ao fazer revisão: ' + data.message);
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
});

// Função para exibir o formulário de apagar contrato
document.getElementById("btn-apagar-contrato").addEventListener("click", function() {
    document.getElementById("form-apagar-contrato").style.display = "flex";
});

// Função para esconder o formulário de apagar contrato
document.getElementById("btn-cancel-apagar").addEventListener("click", function() {
    document.getElementById("form-apagar-contrato").style.display = "none";
});

// Função para apagar o contrato
document.getElementById("form-apagar-contrato-data").addEventListener("submit", async function(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const formData = new FormData(event.target);
    const contratoDeleteData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8081/api/contratos', {
            method: 'DELETE', // Usando o método DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contratoDeleteData)
        });
        const data = await response.json();

        if (response.ok) {
            alert('Contrato apagado com sucesso');
            document.getElementById("form-apagar-contrato").style.display = "none";
            obterContratos();  // Atualiza a tabela após a exclusão
        } else {
            alert('Erro ao apagar contrato: ' + data.message);
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
});

let currentPage = 1; // A página inicial começa de 1
const rowsPerPage = 10;  // Número máximo de linhas por página
let totalPages = 1;      // Armazena o número total de páginas

// Função para abrir o modal e buscar os contratos
async function abrirModalHistorico() {
    const modalHistorico = document.getElementById('modal-historico');
    const modalBotoes = document.getElementById('modal-botoes');
    const btnFechar = document.getElementById('btn-close-modal');
    const tabelaBody = document.getElementById('historico-tabela-body');
    const pageNumber = document.getElementById('page-number');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Exibe os modais
    modalHistorico.style.display = 'flex';
    modalBotoes.style.display = 'flex';

    // Exibe o botão Fechar e os botões de navegação
    btnFechar.style.display = 'block';

    try {
        // Realiza a requisição à API com parâmetros de paginação
        const response = await fetch(`http://localhost:8081/api/contratos?page=${currentPage - 1}&size=${rowsPerPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Verifica se a resposta é válida
        if (response.ok && data.data) {
            // Atualiza o total de páginas
            totalPages = data.data.totalPages;

            // Preenche a tabela com os contratos recebidos
            tabelaBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

            data.data.content.forEach(contrato => {
                const row = document.createElement('tr');
                row.innerHTML = ` 
                    <td>${contrato.id}</td>
                    <td>${contrato.condutorPrincipal}</td>
                    <td>${contrato.condutorResponsavel}</td>
                    <td>${contrato.dataAtual}</td>
                    <td>${contrato.dataRegistro}</td>
                    <td>${contrato.dataVigencia}</td>
                    <td>${contrato.dataSubstituicao || 'N/A'}</td>
                    <td>${contrato.diarias}</td>
                    <td>${contrato.franquiaKm}</td>
                    <td>${contrato.kmAtual}</td>
                    <td>${contrato.kmInicial}</td>
                    <td>${contrato.locadora}</td>
                    <td>${contrato.marca}</td>
                    <td>${contrato.modelo}</td>
                    <td>${contrato.numeroContrato}</td>
                    <td>${contrato.osCliente}</td>
                    <td>${contrato.placa}</td>
                    <td>${contrato.valorAluguel}</td>
                    <td>${contrato.fazerRevisao ? 'Sim' : 'Não'}</td>
                    <td>${contrato.kmExcedido ? 'Sim' : 'Não'}</td>
                    <td>${contrato.kmIdeal}</td>
                    <td>${contrato.kmSemana}</td>
                    <td>${contrato.kmMediaMensal}</td>
                    <td>${contrato.qtMesesVeic}</td>
                    <td>${contrato.qtMesesCont}</td>
                    <td>${contrato.saldoKm}</td>
                    <td>${contrato.acumuladoMes}</td>
                    <td>${contrato.entregaPropData || 'N/A'}</td>
                    <td>${contrato.contadorRevisao}</td>
                    <td>${contrato.observacoes}</td>
                `;
                tabelaBody.appendChild(row);
            });

            // Atualiza a numeração da página
            pageNumber.textContent = `Página ${currentPage}`;

            // Desabilita o botão "Anterior" se estiver na primeira página
            prevButton.disabled = currentPage === 1;

            // Desabilita o botão "Próxima" se estiver na última página
            nextButton.disabled = currentPage === totalPages;
        } else {
            alert('Erro ao carregar contratos.');
        }
    } catch (error) {
        console.error('Erro ao buscar contratos:', error);
        alert('Erro ao buscar contratos.');
    }
}

// Função para fechar o modal
function fecharModalHistorico() {
    const modalHistorico = document.getElementById('modal-historico');
    const modalBotoes = document.getElementById('modal-botoes');
    const btnFechar = document.getElementById('btn-close-modal');

    // Oculta os modais e o botão Fechar
    modalHistorico.style.display = 'none';
    modalBotoes.style.display = 'none';
    btnFechar.style.display = 'none';
}

// Evento de clique para abrir o modal de histórico
document.getElementById('btn-historico').addEventListener('click', abrirModalHistorico);

// Evento de clique para fechar o modal
document.getElementById('btn-close-modal').addEventListener('click', fecharModalHistorico);

// Navegação de página (anterior e próxima)
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;  // Decrementa a página
        abrirModalHistorico();  // Recarrega a tabela
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;  // Incrementa a página
        abrirModalHistorico();  // Recarrega a tabela
    }
});

