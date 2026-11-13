
// Array que guarda as tarefas cadastradas e recupera as tarefas salvas no navegador
let tarefas = [];

try {
    const dadosSalvos = JSON.parse(localStorage.getItem("tarefas"));
    if (Array.isArray(dadosSalvos)) {
        tarefas = dadosSalvos;
    }
} catch (erro) {
    console.error("Não foi possível ler as tarefas salvas:", erro);
}

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

// Identifica o conteúdo principal da página
const conteudoPrincipal = document.querySelector("main");

// Elementos do pop-up
const popup = document.querySelector("#popup");
const tituloPopup = document.querySelector("#titulo-popup");
const campoValor = document.querySelector("#valor");
const campoPessoa = document.querySelector("#pessoa");
const campoObservacoes = document.querySelector("#observacoes");
const btnSalvar = document.querySelector("#btn-salvar");
const btnFechar = document.querySelector("#btn-fechar");

// Guarda o botão que abriu o pop-up
let botaoAnterior = null;

// Elementos do cronograma
const campoData = document.querySelector("#data-casamento");
const listaCronograma = document.querySelector("#lista-cronograma");
const mensagemStatus = document.querySelector("#mensagem-status");

// Comunica operações a quem utiliza leitor de tela.
function anunciar(mensagem) {
    mensagemStatus.textContent = "";
    requestAnimationFrame(function () {
        mensagemStatus.textContent = mensagem;
    });
}

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

    salvarTarefas();
    mostrarTarefas();
    anunciar("Tarefa adicionada: " + tarefa.nome);

}

// Evento do formulário
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nome = campoTarefa.value.trim();
    if (nome === "") {
        anunciar("Digite uma tarefa antes de adicionar.");
        campoTarefa.focus();
        return;
    }

    adicionarTarefa(nome);
    campoTarefa.value = "";
});

// POP-UP DAS TAREFAS

// Abre as informações da tarefa
function abrirPopup(indice, botao) {
    indiceSelecionado = indice;
    const tarefa = tarefas[indice];
    if (!tarefa) return;

    botaoAnterior = botao;

    tituloPopup.textContent = "Informações da tarefa: " + tarefa.nome;
    campoValor.value = tarefa.valor;
    campoPessoa.value = tarefa.pessoa;
    campoObservacoes.value = tarefa.observacoes;
    popup.hidden = false;
    conteudoPrincipal.inert = true;

    // Direciona o foco ao primeiro campo.
    campoValor.focus();
}


// Fecha o pop-up e restaura o foco
function fecharPopup() {
    popup.hidden = true;

    // Libera a interação com a página principal
    conteudoPrincipal.inert = false;
    indiceSelecionado = -1;

    // Devolve o foco ao botão que abriu o pop-up
    if (botaoAnterior && botaoAnterior.isConnected) {
        botaoAnterior.focus();
    }

    botaoAnterior = null;
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
    fecharPopup();
    anunciar("Informações da tarefa salvas com sucesso!");
});

// Botão fechar
btnFechar.addEventListener("click", function () {
    fecharPopup();
});

// Mantém a navegação dentro do pop-up.
popup.addEventListener("keydown", function (evento) {
    // Fecha o pop-up ao pressionar Esc.
    if (evento.key === "Escape") {
        evento.preventDefault();
        fecharPopup();
        return;
    }

    if (evento.key !== "Tab") return;
    const controles = Array.from(
        popup.querySelectorAll("input, textarea, button")
    ).filter(function (elemento) {
        return !elemento.disabled && !elemento.hidden;
    });

    const primeiro = controles[0];
    const ultimo = controles[controles.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
    }
});


// MOSTRAR TAREFAS

function mostrarTarefas() {

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

        // Identifica o checkbox para leitores de tela
        check.dataset.indice = indice;
        check.setAttribute(
            "aria-label",
            (tarefa.concluida
                ? "Marcar como pendente: "
                : "Marcar como concluída: ") + tarefa.nome
        );

        // Cria um botão com o nome da tarefa
        const texto = document.createElement("button");

        texto.type = "button";
        texto.textContent = tarefa.nome;
        texto.className = "nome-tarefa";
        texto.dataset.indice = indice;

        // Identifica a ação para leitores de tela
        texto.setAttribute(
            "aria-label",
            (tarefa.concluida
                ? "Marcar como pendente: "
                : "Marcar como concluída: ") + tarefa.nome
        );


        // Alterna a conclusão ao clicar no nome
        texto.addEventListener("click", function () {

            // Inverte o estado da tarefa
            tarefa.concluida = !tarefa.concluida;

            // Salva e atualiza as listas
            salvarTarefas();
            mostrarTarefas();

            // Recupera o foco no nome da tarefa
            const novoTexto = document.querySelector(
                '.nome-tarefa[data-indice="' + indice + '"]'
            );

            if (novoTexto) {
                novoTexto.focus();
            }

            // Comunica a alteração ao leitor de tela
            anunciar(
                tarefa.concluida
                    ? "Tarefa concluída: " + tarefa.nome
                    : "Tarefa pendente: " + tarefa.nome
            );
        });

        // Cria o botão de editar
        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "✎";
        btnEditar.className = "btn-editar";
        btnEditar.dataset.indice = indice;

        // Identifica o botão para leitores de tela
        btnEditar.setAttribute(
            "aria-label",
            "Editar informações da tarefa: " + tarefa.nome
        );

        // Abre o pop-up ao clicar no lápis
        btnEditar.addEventListener("click", function () {
            abrirPopup(indice, btnEditar);
        });

        // Cria o botão de excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        // Ícone de lixeira branco
        btnExcluir.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false">
        <path d="M3 6h18"/>
        <path d="M8 6V4h8v2"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 10v7"/>
        <path d="M14 10v7"/> </svg> `;
        btnExcluir.className = "btn-excluir";

        btnExcluir.setAttribute(
            "aria-label",
            "Excluir tarefa: " + tarefa.nome
        );

        // Marca ou desmarca uma tarefa
        check.addEventListener("change", function () {
            tarefa.concluida = check.checked;

            salvarTarefas();
            mostrarTarefas();

            // Recupera o foco após reconstruir as listas
            const novoCheck = document.querySelector(
                'input[type="checkbox"][data-indice="' + indice + '"]'
            );
            if (novoCheck) {
                novoCheck.focus();
            }
            anunciar(
                tarefa.concluida
                    ? "Tarefa concluída: " + tarefa.nome
                    : "Tarefa pendente: " + tarefa.nome
            );
        });


        // Solicita confirmação antes de excluir uma tarefa
        btnExcluir.addEventListener("click", function () {

            const confirmarExclusao = window.confirm(
                'Tem certeza de que deseja excluir a tarefa "' +
                tarefa.nome + '"?'
            );

            // Se o usuário cancelar, não exclui a tarefa
            if (!confirmarExclusao) {
                return;
            }
            const nomeRemovido = tarefa.nome;

            // Exclui a tarefa confirmada
            tarefas.splice(indice, 1);

            // Salva e atualiza as listas
            salvarTarefas();
            mostrarTarefas();

            // Recupera o foco após a exclusão
            const indiceSeguinte = Math.min(
                indice,
                tarefas.length - 1
            );

            const proximo = document.querySelector(
                '.btn-editar[data-indice="' + indiceSeguinte + '"]'
            );

            if (proximo) {
                proximo.focus();
            } else {
                campoTarefa.focus();
            }
            anunciar("Tarefa excluída: " + nomeRemovido);
        });

        // Adiciona os elementos a lista
        item.appendChild(check);
        item.appendChild(texto);
        item.appendChild(btnEditar);
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
        const removida = tarefas.pop();
        salvarTarefas();
        mostrarTarefas();
        anunciar("Última tarefa removida: " + removida.nome);
    } else {
        anunciar("Não existem tarefas para remover!");
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
    // // Limpa o cronograma antes de apresentar as etapas
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
        // Adiciona a etapa à lista do cronograma
        listaCronograma.appendChild(itemEtapa);
    });
}

// Recupera a data salva anteriormente
campoData.value = localStorage.getItem("dataCasamento") || "";

// Quando a data mudar, salva no navegador
campoData.addEventListener("change", function () {

    localStorage.setItem("dataCasamento", campoData.value);

    mostrarCronograma();
});

mostrarTarefas();
mostrarCronograma();
