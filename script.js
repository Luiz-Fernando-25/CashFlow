const entradaSalvos = localStorage.getItem("listaEntrada");
const saidaSalvos = localStorage.getItem("listaSaida");
const totalSalvos = localStorage.getItem("listaTotal");
const listaEntrada = entradaSalvos ? JSON.parse(entradaSalvos) : [];
const listaSaida = saidaSalvos ? JSON.parse(saidaSalvos) : [];
const listaTotal = totalSalvos ? JSON.parse(totalSalvos) : [];

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function reset() {
  localStorage.clear();
}

function addEntrada() {
  const input = document.getElementById("entrada");
  const valor = Number(input.value);

  if (valor > 0) {
    listaEntrada.push(valor);
    listaTotal.push(valor);
    atualizarTela();
  }
}

function addSaida() {
  const input = document.getElementById("saida");
  const valor = Number(input.value);

  if (valor > 0) {
    listaSaida.push(valor);
    listaTotal.push(-valor);
    atualizarTela();
  }
}

function atualizarTela() {
  localStorage.setItem("listaEntrada", JSON.stringify(listaEntrada));
  localStorage.setItem("listaSaida", JSON.stringify(listaSaida));
  localStorage.setItem("listaTotal", JSON.stringify(listaTotal));
  atualizarEntradas();
  atualizarSaidas();
  atualizarTotal();
}

function atualizarEntradas() {
  const tabelaEntrada = document.getElementById("tEntrada");
  const totalEntrada = document.getElementById("totalEntrada");

  tabelaEntrada.innerHTML = listaEntrada
    .map((item) => {
      const valorFormatado = formatarMoeda(item);
      return `<tr><td>${valorFormatado}</td></tr>`;
    })
    .join("");

  const somaTotal = listaEntrada.reduce((acumulador, numeroTotal) => {
    return acumulador + Number(numeroTotal);
  }, 0);

  totalEntrada.innerText = formatarMoeda(somaTotal);
}

function atualizarSaidas() {
  const tabelaSaida = document.getElementById("tSaida");
  const totalSaida = document.getElementById("totalSaida");

  tabelaSaida.innerHTML = listaSaida
    .map((item) => {
      const valorFormatado = formatarMoeda(item);
      return `<tr><td>${valorFormatado}</td></tr>`;
    })
    .join("");

  const somaTotal = listaSaida.reduce((acumulador, numeroTotal) => {
    return acumulador + Number(numeroTotal);
  }, 0);

  totalSaida.innerText = formatarMoeda(somaTotal);
}

function atualizarTotal() {
  const tabelaTotal = document.getElementById("tLancamentos");
  const totalLancamento = document.getElementById("totalLancamento");

  tabelaTotal.innerHTML = listaTotal
    .map((item) => {
      const classCor = item > 0 ? "positivo" : item < 0 ? "negativo" : "";

      const valorFormatado = formatarMoeda(item);
      return `<tr><td class="${classCor}" >${valorFormatado}</td></tr>`;
    })
    .join("");

  const somaTotal = listaTotal.reduce((acumulador, numeroTotal) => {
    return acumulador + Number(numeroTotal);
  }, 0);

  totalLancamento.innerText = formatarMoeda(somaTotal);
}

atualizarTela();
