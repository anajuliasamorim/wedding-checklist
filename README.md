# 💍 Checklist do Sim

### Organize cada detalhe do seu grande dia!

O **Checklist do Sim** é uma aplicação web desenvolvida para auxiliar no planejamento e na organização de casamentos, permitindo cadastrar tarefas, acompanhar atividades concluídas, registrar informações importantes e consultar um cronograma de preparativos.

O projeto foi desenvolvido como atividade acadêmica do curso **Descomplica**, com o objetivo de aplicar conhecimentos de **HTML5, CSS3 e JavaScript puro**, sem utilização de frameworks ou bibliotecas externas.

---

## Sobre o projeto

Organizar um casamento envolve diversas etapas, como contratar fornecedores, definir o orçamento, preparar convites e acompanhar prazos.

Pensando nisso, o Checklist do Sim reúne funcionalidades simples para facilitar o acompanhamento dessas atividades em uma interface intuitiva e com identidade visual inspirada no universo dos casamentos.

## Funcionalidades

- **Cadastro de tarefas:** permite adicionar novas atividades ao checklist.
- **Controle de conclusão:** utiliza checkboxes para marcar tarefas como concluídas ou pendentes.
- **Exclusão de tarefas:** permite remover atividades individualmente.
- **Desfazer último cadastro:** remove a última tarefa do array.
- **Detalhes das tarefas:** disponibiliza uma janela pop-up para registrar valores, nomes de pessoas ou empresas e observações.
- **Armazenamento local:** utiliza `localStorage` para preservar tarefas e informações no navegador.
- **Data do casamento:** permite informar a data do evento.
- **Cronograma automático:** calcula datas de referência para os preparativos em diferentes períodos.
- **Layout responsivo:** adapta a apresentação para diferentes tamanhos de tela.

## Cronograma de preparativos

Ao informar a data do casamento, o sistema apresenta atividades organizadas nas seguintes etapas:

| Etapa | Exemplos de atividades |
|---|---|
| 12 meses antes | Definir orçamento, lista de convidados e local |
| 9 meses antes | Pesquisar e contratar fornecedores |
| 6 meses antes | Escolher trajes, alianças e organizar convites |
| 3 meses antes | Enviar convites e confirmar fornecedores |
| 1 mês antes | Confirmar presenças e revisar contratos |
| 1 semana antes | Conferir horários, acessórios e pagamentos |
| Depois do casamento | Agradecer convidados e organizar lembranças |

As atividades do cronograma são apresentadas como orientações. O usuário pode cadastrar suas próprias tarefas separadamente.

## Tecnologias utilizadas

**HTML5**

- Estrutura semântica da página.
- Formulários e campos de entrada.
- Listas ordenadas e não ordenadas.
- Botões e elementos de interação.

**CSS3**

- Estilização da interface.
- Organização e centralização dos elementos.
- Cores, espaçamentos e bordas arredondadas.
- Imagem de fundo e layout responsivo.

**JavaScript**

- Manipulação do DOM.
- Arrays e objetos.
- Funções e estruturas condicionais.
- Eventos com `addEventListener()`.
- Métodos `push()`, `pop()`, `splice()` e `forEach()`.
- Manipulação de datas com `Date()`.
- Armazenamento de informações com `localStorage`.

## Estrutura do projeto

```text
wedding-checklist/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── img/
    ├── casamento.jpg
    └── fundo.jpg
```

## Acessar o site

O projeto também pode ser disponibilizado pelo GitHub Pages:

**[Acessar Checklist do Sim](https://anajuliasamorim.github.io/wedding-checklist/)**

## Armazenamento das informações

As tarefas cadastradas, seus detalhes e a data do casamento são armazenados utilizando a API `localStorage` do navegador.

Isso permite manter as informações após atualizar ou fechar a página, desde que os dados locais do site sejam preservados.

**Limitação:** as informações não são sincronizadas automaticamente entre diferentes navegadores ou dispositivos. O projeto não utiliza banco de dados ou autenticação.

## Objetivo acadêmico

O desenvolvimento deste projeto teve como finalidade praticar os fundamentos de desenvolvimento web, especialmente:

- Estruturação de páginas com HTML.
- Aplicação de estilos com CSS.
- Manipulação de arrays e objetos.
- Criação e utilização de funções.
- Implementação de eventos.
- Manipulação dinâmica de elementos HTML.
- Desenvolvimento de funcionalidades interativas.
- Persistência local de informações.

O projeto também permitiu compreender a integração entre HTML, CSS e JavaScript na construção de uma aplicação funcional.

## Possíveis melhorias futuras

- Implementação de categorias para as tarefas.
- Controle de orçamento total do casamento.
- Indicadores visuais de progresso.
- Autenticação de usuários.
- Sincronização das tarefas entre dispositivos.
- Compartilhamento do checklist entre os noivos.

---

## Autoria

**Ana Júlia**
**Giuliana Correa**
**Iara Soares**


Projeto acadêmico desenvolvido para aplicação prática dos conhecimentos adquiridos no curso Descomplica.

**Desenvolvido com HTML, CSS e JavaScript puro.**