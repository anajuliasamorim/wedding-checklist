
// Array que guarda as tarefas cadastradas e recupera as tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Índice da tarefa aberta no pop-up
let indiceSelecionado = -1;

// ELEMENTOS DO HTML
const formulario = document.querySelector("#form-tarefa");
const campoTarefa = document.querySelector("#nova-tarefa");
const listaPendentes = document.querySelector("#lista-pendentes");
const listaConcluidas = document.querySelector("#lista-concluidas");
const contadorPendentes = document.querySelector("#contador-pendentes");
const contadorConcluidas = document.querySelector("#contador-concluidas");
const btnDesfazer = document.querySelector("#btn-desfazer");

// Elementos do pop-up
const popup = document.querySelector("#popup");
const tituloPopup = document.querySelector("#titulo-popup");
const campoValor = document.querySelector("#valor");
const campoPessoa = document.querySelector("#pessoa");
const campoObservacoes = document.querySelector("#observacoes");
const btnSalvar = document.querySelector("#btn-salvar");
const btnFechar = document.querySelector("#btn-fechar");

// Elementos do cronograma
const campoData = document.querySelector("#data-casamento");
const listaCronograma = document.querySelector("#lista-cronograma");


// Função que salva as tarefas no navegador
function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}

// ADICIONAR TAREFAS
function adicionarTarefa(nome) {
    // Verifica se o nome está vazio
    if (nome.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // Cria o objeto da tarefa
    const tarefa = {
        nome: nome.trim(),
        concluida: false,
        valor: "",
        pessoa: "",
        observacoes: ""
    };

    // Adiciona no final do array
    tarefas.push(tarefa);

    // Atualiza a tela
    mostrarTarefas();
}

// Evento do formulário
formulario.addEventListener("submit", function (evento) {
    // Impede que a página recarregue
    evento.preventDefault();
    // Cadastra a tarefa
    adicionarTarefa(campoTarefa.value);
    campoTarefa.value = "";
});

// POP-UP DAS TAREFAS

// Abre as informações da tarefa
function abrirPopup(indice) {
    indiceSelecionado = indice;
    // Busca a tarefa
    const tarefa = tarefas[indice];
    // Preenche os campos
    tituloPopup.textContent = tarefa.nome;
    campoValor.value = tarefa.valor;
    campoPessoa.value = tarefa.pessoa;
    campoObservacoes.value = tarefa.observacoes;
    popup.style.display = "flex";
}

function fecharPopup() {
    popup.style.display = "none";
    indiceSelecionado = -1;
}

// Salva as informações
btnSalvar.addEventListener("click", function () {
    if (indiceSelecionado === -1) {
        return;
    }
    // Busca a tarefa selecionada
    const tarefa = tarefas[indiceSelecionado];
    // Salva os valores digitados
    tarefa.valor = campoValor.value;
    tarefa.pessoa = campoPessoa.value;
    tarefa.observacoes = campoObservacoes.value;
    salvarTarefas();
    alert("Informações salvas!");
    fecharPopup();
});

// Botão fechar
btnFechar.addEventListener("click", function () {
    fecharPopup();
});


// MOSTRAR TAREFAS

function mostrarTarefas() {

    // Salva as informações atualizadas
    salvarTarefas();

    // Limpa as listas antes de atualizar
    listaPendentes.innerHTML = "";
    listaConcluidas.innerHTML = "";

    let pendentes = 0;
    let concluidas = 0;

    // Percorre o array
    tarefas.forEach(function (tarefa, indice) {

        const item = document.createElement("li");

        // Cria o checkbox
        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = tarefa.concluida;

        // Cria o texto
        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;
        texto.className = "nome-tarefa";
        texto.title = "Clique para ver os detalhes";

        // Cria o botão de excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "X";
        btnExcluir.className = "btn-excluir";

        // Abre o pop-up
        texto.addEventListener("click", function () {
            abrirPopup(indice);
        });

        // Marca como concluída
        check.addEventListener("change", function () {
            tarefa.concluida = check.checked;
            mostrarTarefas();
        });

        // Exclui a tarefa
        btnExcluir.addEventListener("click", function () {
            // Remove pelo índice
            tarefas.splice(indice, 1);
            mostrarTarefas();
        });

        // Adiciona os elementos a lista
        item.appendChild(check);
        item.appendChild(texto);
        item.appendChild(btnExcluir);

        // Verifica o status da tarefa
        if (tarefa.concluida) {
            texto.className = "nome-tarefa concluida";
            listaConcluidas.appendChild(item);
            concluidas++;
        } else {
            listaPendentes.appendChild(item);
            pendentes++;
        }
    });
    // Atualiza os contadores
    contadorPendentes.textContent = pendentes;
    contadorConcluidas.textContent = concluidas;
}

// DESFAZER ÚLTIMA TAREFA

btnDesfazer.addEventListener("click", function () {
    if (tarefas.length > 0) {
        // Remove o último elemento
        tarefas.pop();
        mostrarTarefas();
    } else {
        alert("Não existem tarefas para remover!");
    }
});


// CRONOGRAMA DO CASAMENTO

// Array com etapas fixas
const cronograma = [
    {
        titulo: "12 meses antes",
        meses: 12,
        tarefas: [
            "Definir o orçamento",
            "Fazer a lista inicial de convidados",
            "Escolher a data e o local",
            "Pesquisar fornecedores"
        ]
    },

    {
        titulo: "9 meses antes",
        meses: 9,
        tarefas: [
            "Contratar buffet",
            "Contratar fotógrafo",
            "Pesquisar decoração",
            "Escolher os padrinhos"
        ]
    },

    {
        titulo: "6 meses antes",
        meses: 6,
        tarefas: [
            "Escolher vestido e traje",
            "Comprar as alianças",
            "Organizar os convites",
            "Definir músicas da cerimônia"
        ]
    },

    {
        titulo: "3 meses antes",
        meses: 3,
        tarefas: [
            "Enviar os convites",
            "Confirmar fornecedores",
            "Escolher o bolo",
            "Organizar a cerimônia"
        ]
    },

    {
        titulo: "1 mês antes",
        meses: 1,
        tarefas: [
            "Confirmar presença dos convidados",
            "Fazer prova do vestido",
            "Conferir os contratos",
            "Revisar os últimos detalhes"
        ]
    },

    {
        titulo: "1 semana antes",
        dias: 7,
        tarefas: [
            "Confirmar horários",
            "Separar alianças e acessórios",
            "Conferir pagamentos",
            "Descansar para o grande dia"
        ]
    },

    {
        titulo: "Depois do casamento",
        diasDepois: 1,
        tarefas: [
            "Agradecer aos convidados",
            "Organizar fotos e vídeos",
            "Conferir pagamentos pendentes",
            "Guardar lembranças"
        ]
    }

];

// CALCULAR DATA DE CADA ETAPA


function calcularData(data, etapa) {
    // Divide a data
    const partes = data.split("-");
    const ano = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);
    // Cria a data do casamento
    let resultado = new Date(ano, mes, dia);
    // Ajuste os meses 
    if (etapa.meses) {
        resultado.setDate(1);
        resultado.setMonth(
            resultado.getMonth() - etapa.meses
        );
        const ultimoDia = new Date(
            resultado.getFullYear(),
            resultado.getMonth() + 1,
            0
        ).getDate();
        resultado.setDate(Math.min(dia, ultimoDia));
    }
    // Ajusta os dias
    if (etapa.dias) {
        resultado.setDate(
            resultado.getDate() - etapa.dias
        );
    }
    // Ajusta dias após o casamento
    if (etapa.diasDepois) {
        resultado.setDate(
            resultado.getDate() + etapa.diasDepois
        );
    }
    return resultado.toLocaleDateString("pt-BR");
}

// MOSTRAR CRONOGRAMA

function mostrarCronograma() {
    // Limpa a lista ordenada
    listaCronograma.innerHTML = "";
    // Verifica se a data foi preenchida
    if (campoData.value === "") {
        return;
    }
    // Percorre todas as etapas
    cronograma.forEach(function (etapa) {
        // Cria um li para a etapa
        const itemEtapa = document.createElement("li");
        itemEtapa.className = "etapa";
        // Cria o título
        const titulo = document.createElement("h3");
        titulo.textContent = etapa.titulo;
        // Cria a data
        const data = document.createElement("p");
        data.className = "data-etapa";
        data.textContent = "A partir de: " +
            calcularData(campoData.value, etapa);
        // Cria um ul para as atividades
        const lista = document.createElement("ul");
        // Percorre as atividades
        etapa.tarefas.forEach(function (atividade) {
            // Cria um li para cada atividade
            const item = document.createElement("li");
            item.textContent = atividade;
            // Adiciona o li ao ul
            lista.appendChild(item);
        });
        // Adiciona os elementos à etapa
        itemEtapa.appendChild(titulo);
        itemEtapa.appendChild(data);
        itemEtapa.appendChild(lista);
        // Adiciona a etapa ao ol
        listaCronograma.appendChild(itemEtapa);
    });
}

// Recupera a data salva anteriormente
campoData.value = localStorage.getItem("dataCasamento") || "";

// Quando a data mudar, salva no navegador
campoData.addEventListener("change", function() {

    localStorage.setItem("dataCasamento", campoData.value);

    mostrarCronograma();
});

mostrarTarefas();
mostrarCronograma();
