let transacoesSalvas = [];

const anoFiltro = document.getElementById("btnAno");
const mesFiltro = document.getElementById("btnMes");

function atualizaLocal(novaTransacao) {
  transacoesSalvas.push(novaTransacao);

  localStorage.setItem("extrato", JSON.stringify(transacoesSalvas));
}

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function reset() {
  localStorage.clear();
}

const form = document.getElementById("transacaoForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valorBruto = document.getElementById("valor").value;

  const valorNumerico = parseFloat(
    valorBruto.replace(/[^\d,]/g, "").replace(",", "."),
  );

  let dataPreenchida = document.getElementById("data").value;

  if (!dataPreenchida) {
    const hoje = new Date();
    dataPreenchida = hoje.toISOString().split("T")[0];
  }

  const novaTransacao = {
    id: Date.now(),
    descricao: document.getElementById("descricao").value,
    valor: valorNumerico,
    data: dataPreenchida,
    tipo: document.getElementById("tipo").value,
    categoria: document.getElementById("categoria").value,
  };
  atualizaLocal(novaTransacao);

  form.reset();

  atualizarTela();
  alert("Transação salva com sucesso!");
});

function atualizarTela() {
  const tabelaEntrada = document.getElementById("tEntrada");
  const totalEntrada = document.getElementById("totalEntrada");
  const tabelaSaida = document.getElementById("tSaida");
  const totalSaida = document.getElementById("totalSaida");
  const tabelaLancamento = document.getElementById("tLancamento");
  const totalLancamento = document.getElementById("totalLancamento");
  const listaAtual = transacoesSalvas.filter(filtrarAno).filter(filtrarMes);

  const linhasTabelaEntrada = gerarLinhasTabela(
    listaAtual.filter((item) => item.tipo === "entrada"),
  );
  const resultadoEntrada = somaTotal(
    listaAtual.filter((item) => item.tipo === "entrada"),
  );

  const linhasTabelaSaida = gerarLinhasTabela(
    listaAtual.filter((item) => item.tipo === "saida"),
  );
  const resultadoSaida = somaTotal(
    listaAtual.filter((item) => item.tipo === "saida"),
  );

  const linhasTabelaTotal = gerarLinhasTabela(listaAtual);
  const resultadoTotal = somaTotal(listaAtual);

  tabelaEntrada.innerHTML = linhasTabelaEntrada;
  totalEntrada.innerText = formatarMoeda(resultadoEntrada);
  tabelaSaida.innerHTML = linhasTabelaSaida;
  totalSaida.innerText = formatarMoeda(resultadoSaida);
  tabelaLancamento.innerHTML = linhasTabelaTotal;
  totalLancamento.innerText = formatarMoeda(resultadoTotal);
}

function somaTotal(lista) {
  return lista.reduce((acumulador, objetoAtual) => {
    return acumulador + Number(objetoAtual.valor);
  }, 0);
}

function gerarLinhasTabela(lista) {
  return (
    `<li class="tCabecalho"><span>Descrição</span><span>Valor</span></li>` +
    lista
      .map((item) => {
        const valorFormatado = formatarMoeda(item.valor);
        const classCor = item.tipo;

        return `
      
    <li class="${classCor}">
      <div><span>${item.descricao}</span></div>
      <div>
        <span>${formatarData(item)}</span>
        <span>${item.categoria}</span>
      </div>
      <div class="tAcao">
        <span>${valorFormatado}</span>
        <td><button onclick="removerItem(${item.id})" class="btn-fechar">&times</button></td>
      </div>
      </li>
  `;
      })
      .join("")
  );
}

function removerItem(idParaRemover) {
  transacoesSalvas = transacoesSalvas.filter(
    (item) => item.id !== idParaRemover,
  );
  localStorage.setItem("extrato", JSON.stringify(transacoesSalvas));
  atualizarTela();
}

function mascaraMoeda(input) {
  let valor = input.value;

  valor = valor.replace(/\D/g, "");

  valor = (valor / 100).toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  input.value = valor;
}

function filtrarMes(item) {
  const dataObj = new Date(item.data);
  return dataObj.getMonth() === Number(mesCentro);
}

function filtrarAno(item) {
  const dataObj = new Date(item.data);
  return dataObj.getFullYear() === Number(anoCentro);
}

function formatarData(item) {
  const dataObj = new Date(item.data);
  return `${dataObj.getDate() + 1}/${dataObj.getMonth() + 1}`;
}

function atualizarFiltro() {
  const hoje = new Date(Date.now());
  const mesHoje = `${hoje.getMonth()}`;
  const anoHoje = `${hoje.getFullYear()}`;
  mesFiltro.dataset.mes = mesHoje;
  mesFiltro.innerText = convertMes(mesHoje);
  anoFiltro.innerText = anoHoje;
}

function convertMes(valor) {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outrubro",
    "Novembro",
    "Dezembro",
  ];

  return meses[valor];
}

atualizarFiltro();
const menuFiltroAno = document.querySelector("#cabecalhoAno");
const menuFiltroMes = document.querySelector("#cabecalhoMes");
let anoCentro = anoFiltro.innerText;
let mesCentro = mesFiltro.dataset.mes;

function renderizarBotoesAno(anoFoco) {
  menuFiltroAno.innerHTML = "";

  const offsets = [-2, -1, 0, 1, 2];

  offsets.forEach((offset) => {
    const ano = parseInt(anoFoco) + offset;
    const btn = document.createElement("button");
    btn.innerText = ano;
    btn.dataset.ano = ano;

    if (offset == 0) {
      btn.style.fontWeight = "bold";
      btn.style.backgroundColor = "#4ec2db";
    }

    menuFiltroAno.appendChild(btn);
  });
}

function renderizarBotoesMes(mesFoco) {
  menuFiltroMes.innerHTML = "";

  const offsets = [-2, -1, 0, 1, 2];

  offsets.forEach((offset) => {
    const mes = (parseInt(mesFoco) + offset + 12) % 12;
    const btn = document.createElement("button");
    btn.innerText = convertMes(mes);
    btn.dataset.mes = mes;

    if (offset == 0) {
      btn.style.fontWeight = "bold";
      btn.style.backgroundColor = "#4ec2db";
    }

    menuFiltroMes.appendChild(btn);
  });
}

menuFiltroAno.addEventListener("click", (event) => {
  const elemento = event.target;
  if (elemento.tagName === "BUTTON") {
    const anoSelecionado = parseInt(elemento.dataset.ano);
    console.log(anoSelecionado);
    anoCentro = anoSelecionado;
    renderizarBotoesAno(anoSelecionado);
    atualizarTela();
  }
});

menuFiltroMes.addEventListener("click", (event) => {
  const elemento = event.target;
  if (elemento.tagName === "BUTTON") {
    const mesSelecionado = parseInt(elemento.dataset.mes);
    mesCentro = mesSelecionado;
    renderizarBotoesMes(mesSelecionado);
    atualizarTela();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  transacoesSalvas = JSON.parse(localStorage.getItem("extrato")) || [];
  atualizarFiltro();
  atualizarTela();
  renderizarBotoesAno(anoCentro);
  renderizarBotoesMes(mesCentro);
});
