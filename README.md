💰 Cash Flow (Projeto 0.0)

Um sistema simples e direto para controle financeiro pessoal, desenvolvido como o meu primeiro projeto prático para consolidar os fundamentos de desenvolvimento web (HTML, CSS e JavaScript Vanilla).

🎯 O Objetivo do Projeto

Este projeto marca a minha transição do "Tutorial Hell" para a construção ativa de software. O objetivo não é usar frameworks complexos, mas sim entender como as peças fundamentais da web interagem entre si, manipulando o DOM e trabalhando com o estado em memória.

✨ Funcionalidades

Cálculo de Saldo em Tempo Real: Atualiza automaticamente a diferença entre entradas e saídas.

Registro de Entradas (Receitas): Campo dedicado para adicionar valores positivos.

Registro de Saídas (Despesas): Campo dedicado para adicionar valores negativos.

Formatação de Moeda: Formatação automática dos valores para o padrão financeiro brasileiro (R$).

Persistência de Dados: Uso de localStorage para manter as informações gravadas no navegador mesmo após o refresh.

🛠️ Tecnologias Utilizadas

HTML5: Estruturação semântica da aplicação com uso de tabelas para a exibição organizada de dados.

CSS3: Estilização utilizando Flexbox para o posicionamento dos containers principais e seletores avançados para o design das tabelas.

JavaScript (Vanilla): Lógica de cálculo, persistência local, funções de alta ordem (map, reduce) e manipulação direta do DOM.

🗺️ Roadmap de Desenvolvimento Atualizado

Fase 1: MVP Funcional (Concluído) ✅

[x] Captura de valores numéricos simples.

[x] Cálculo de saldo e persistência básica com localStorage.

Fase 2: Estrutura de Dados e CRUD Básico (Próximo Passo) 🏗️

[ ] Unificação do Estado: Migrar de três listas (listaEntrada, listaSaida, listaTotal) para uma única listaTransacoes.

[ ] Refatoração do Objeto: Cada transação agora terá uma identidade completa:

id: Date.now() (para garantir que cada item seja único).

descricao: String (o que foi comprado/recebido).

valor: Number.

data: Date (campo obrigatório para o extrato).

tipo: "entrada" | "saida".

categoria: String (inicialmente vinda de uma lista fixa).

[ ] Função de Exclusão: Implementar a lógica de remover um item do array pelo ID e atualizar o localStorage.

[ ] Função de Edição: Permitir abrir os dados de um lançamento existente para alteração.

Fase 3: UI Dinâmica e Modais (A "Cara" do Mobills) 🎨

[ ] Cards Sobrepostos (Modais): Criar a camada de overlay (CSS) que aparece sobre a tela principal para cadastro.

[ ] Fluxo de Cadastro:

Botão "Novo Lançamento" que abre o modal.

Diferenciação visual entre formulário de entrada (verde) e saída (vermelho).

[ ] Extrato Único: Substituir as tabelas múltiplas por uma Tabela Única de Lançamentos, utilizando cores dinâmicas para diferenciar o que entra e o que sai.

[ ] Menu de Funções: Criar uma barra lateral ou menu superior para organizar as futuras seções do app.

Fase 4: Refinamento e Categorização 🏷️

[ ] Gestão de Categorias: Implementar um select com categorias pré-definidas (Alimentação, Lazer, Salário, Saúde, etc.).

[ ] Validações de Campo: Impedir o salvamento se a descrição estiver vazia ou o valor for zero.

[ ] Filtros de Lista: Poder visualizar apenas "Entradas" ou apenas "Saídas" no extrato único.

Fase 5: Status e Multi-contas (Visão de Futuro) 🚀

[ ] Controle de Fluxo: Adicionar campo "Pago/Recebido" (booleano) para controle de contas a pagar.

[ ] Origem de Recurso (Contas): Campo para definir se o dinheiro saiu da "Carteira", "Banco X" ou "Cartão de Crédito".

[ ] Gráficos: Integração com Canvas API para visualização visual dos gastos.

🚀 Como Executar

Como é um projeto puramente front-end estático, você não precisa instalar nada.

Faça o clone deste repositório:

git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)


Abra a pasta do projeto.

Dê um duplo clique no arquivo index.html para abri-lo no seu navegador (Chrome, Firefox, Edge, etc.).

🧠 O que aprendi

Manipulação do DOM: Uso intensivo de getElementById, innerText, innerHTML e manipulação de valores de input para refletir dados da memória na tela.

Conversão e Validação: Transformação de strings em números e tratamento de erros com Number(), parseFloat() e isNaN().

Persistência Local: Ciclo de vida dos dados utilizando JSON.stringify e JSON.parse junto à API do localStorage.

Lógica Funcional: Aplicação de métodos de array como map() para renderização dinâmica das linhas da tabela e reduce() para o cálculo acumulado dos saldos.

Organização de Código: Evolução na estrutura do projeto com a separação física de responsabilidades entre arquivos .html, .css e .js.

Desenvolvido com ☕ e dedicação durante os meus estudos de programação.
