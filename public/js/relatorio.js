const municipios = ["Bertioga", "Cubatão", "Guarujá", "Itanhaém", "Mongaguá", "Peruíbe", "Praia Grande", "Santos", "São Vicente"];
var ano = new Date().getFullYear();
var municipio_selecionado = "Bertioga";
let graficos = {};


// -------------------- Funções do relatório --------------------
let json = [];

async function pegarDadosDashboard() {

    for (let i = 0; i < municipios.length; i++) {
        const municipio = municipios[i];

        let totalCrimes = await carregarKpiTotalCrimesMunicipio(municipio);
        let percentualTrimestrePassado = await carregarKpiPercentualTrimestrePassado(municipio);
        let percentalUltimoMes = await carregarKpiPercentualUltimoMes(municipio);

        json.push({
            municipio: `${municipio.toString()}`,
            dados: {
                totalCrimes: `${totalCrimes}`,
                percentualTrimestrePassado: `${percentualTrimestrePassado}`,
                percentalUltimoMes: `${percentalUltimoMes}`
            }
        })
    }

    let jsonFinal = JSON.stringify({ municipios: json }, null, 2)

    // console.log("Json retornado pelo pegarDadosDashboard", jsonFinal);
    // alert(jsonFinal);

    return jsonFinal;
}

// async function normalizarMunicipios(json) {

//     console.log(">>> normalizarMunicipios FOI CHAMADA COM:", json);

//     if (json.municipios == undefined) {
//         console.error("ERRO: json.municipios NÃO existe!", json);
//         return [];
//     }

//     return json.municipios.map((item, index) => ({
//         id: index + 1,
//         nome: item.municipio,
//         crimes_mes: item.dados.totalCrimes,
//         trimestre_anterior: item.dados.percentualTrimestrePassado,
//         ultimo_mes: item.dados.percentalUltimoMes
//     }));
// }


async function pegarDadosRelatorio(id) {
    let dados = await fetch(`/relatorios/pegarDadosConsulta/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
        .then(json => {
            return json[0].consulta.municipios.map(m => m.dados);
        })

        .catch(function (erro) {
            console.log(erro);
        });

    console.log("Dados ", dados);
    return dados;
}

pegarDadosRelatorio(2);

function gerarCardsMunicipios(lista) {
    console.log("gerarCardsMunicipios", lista)

    const container = document.getElementById("container-municipios");

    lista.municipios.forEach(m => {

        const card = document.createElement("div");
        card.classList.add("card-municipio");

        card.innerHTML = `
            <h3 class="titulo-municipio">${String(m.municipio)}</h3>

            <table>
                <tr>
                    <th>Crimes ocorridos no mês</th>
                    <td>${m.dados.totalCrimes}</td>
                </tr>

                <tr>
                    <th>Alteração no Índice de Criminalidade (Trimestre ano anterior)</th>
                    <td>${m.dados.percentualTrimestrePassado}</td>
                </tr>

                <tr>
                    <th>Alteração no Índice de Criminalidade (Último Mês)</th>
                    <td>${m.dados.percentalUltimoMes}</td>
                </tr>
            </table>

            <div class="grafico1 grafico">
                <canvas id="graficoCrimes-${m.index + 1}"></canvas>
            </div>

            <div class="atividade-policial">
                <canvas id="atividade-policial-${m.index + 1}" width="490" height="125"></canvas>
            </div>

            <div class="page-break"></div>
        `;

        container.appendChild(card);

        criarGraficoCrimes(m.index + 1);
        criarGraficoAtividadePolicial(m.index + 1);

        carregarGraficoDistribuicaoCrimesMunicipio(m.municipio)
        carregarGraficoAtividadePolicial(m.municipio)
    });
}

function cadastrarRelatorio(titulo_relatorio, consulta, fk_Usuario) {
    fetch(`/relatorios/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tituloServer: titulo_relatorio,
            consultaServer: consulta,
            fkUsuarioServer: fk_Usuario
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                alert("Relatório cadastrado com sucesso!");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro do relatório!";
            }

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

async function gerarRelatorio() {
    let consulta = await pegarDadosDashboard();
    cadastrarRelatorio("Relatório de criminalidade - ", consulta, 1);
}

// -------------------- Exportar relatório --------------------
function gerarPDF() {
    const element = document.getElementById("conteudo");

    const data = new Date();
    const nome_arquivo = `relatorio criminalidade baixada santista ${data.getDay()}-${data.getMonth()}-${data.getFullYear()} - ${data.getHours()}-${data.getMinutes()}.pdf`

    const opt = {
        margin: 10,
        filename: nome_arquivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
}







// -------------------- Funções da Dashboard --------------------
function exibirKPISEGraficos() {
    municipios.forEach()
}







// KPI de percentual de alteração no índice de criminalidade no trimestre passado
async function carregarKpiPercentualTrimestrePassado(municipio) {
    let alteracao = await fetch(`/dashboard/percentualTrimestrePassado/${municipios.indexOf(municipio) + 1}/${new Date().getFullYear()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(function (resposta) {


        if (resposta.ok) {
            return resposta.json()

                .then(json => {

                    const mes_atual = new Date().getMonth()
                    if (mes_atual >= 1 && mes_atual <= 3) {

                        if (Number.isNaN(parseFloat(json[0].primeiro).toFixed(1))) {
                            return parseFloat(json[0].primeiro).toFixed(1) + "%";
                        } else {
                            return "0%"
                        }

                    } else if (mes_atual >= 4 && mes_atual <= 6) {

                        if (Number.isNaN(parseFloat(json[0].segundo).toFixed(1))) {
                            return parseFloat(json[0].segundo).toFixed(1) + "%";
                        } else {
                            return "0%";
                        }

                    } else if (mes_atual >= 7 && mes_atual <= 9) {
                        if (Number.isNaN(parseFloat(json[0].terceiro).toFixed(1))) {
                            return parseFloat(json[0].terceiro).toFixed(1) + "%";
                        } else {
                            return "0%";
                        }
                    } else {
                        if (Number.isNaN(parseFloat(json[0].quarto).toFixed(1))) {
                            return parseFloat(json[0].quarto).toFixed(1) + "%";
                        } else {
                            return "0%";
                        }
                    }

                });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

    return alteracao;
}

async function carregarKpiPercentualUltimoMes(municipio) {
    let percentual = await fetch(`/dashboard/percentualUltimoMes/${municipios.indexOf(municipio) + 1}/${new Date().getFullYear()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(function (resposta) {


        if (resposta.ok) {
            return resposta.json().then(json => {
                //console.log("aqui");
                //console.log(json[0]["porcentagem"]);

                if (json[0]["atual"] > json[0]["passado"]) {
                    return "+" + parseFloat(json[0]["porcentagem"]).toFixed(1) + "%"
                } else if (!Number.isNaN(parseFloat(json[0]["porcentagem"]).toFixed(1))) {
                    return "0%"
                }
                else {
                    return parseFloat(json[0]["porcentagem"]).toFixed(1) + "%"
                }
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

    return percentual;
}

// var valorPrimeiroTrimestre = false;
// function selecionarPrimeiroTrimestre() {
//     if (valorPrimeiroTrimestre) {
//         document.getElementById("trimestre1").style.color = 'rgba(255, 255, 255, 0.805)';
//         valorPrimeiroTrimestre = false
//     } else {
//         document.getElementById("trimestre1").style.color = 'white';
//         valorPrimeiroTrimestre = true
//     }
// }

// var valorSegundoTrimestre = false;
// function selecionarSegundoTrimestre() {
//     if (valorSegundoTrimestre) {
//         document.getElementById("trimestre2").style.color = 'rgba(255, 255, 255, 0.805)';
//         valorSegundoTrimestre = false
//     } else {
//         document.getElementById("trimestre2").style.color = 'white';
//         valorSegundoTrimestre = true
//     }
// }

// var valorTerceiroTrimestre = false;
// function selecionarTerceiroTrimestre() {
//     if (valorTerceiroTrimestre) {
//         document.getElementById("trimestre3").style.color = 'rgba(255, 255, 255, 0.805)';
//         valorTerceiroTrimestre = false
//     } else {
//         document.getElementById("trimestre3").style.color = 'white';
//         valorTerceiroTrimestre = true
//     }
// }


// Carrega todas KPI's, tabela e gráficos
// carregarTotalCrimes()
// carregarKpiTotalCrimesMunicipio()
async function carregarTudo() {
    var jsonFinal = await pegarDadosDashboard()
    // var jsonFinal = await pegarDadosRelatorio()

    carregarPercentualCrimes()



    carregarTabela()

    gerarCardsMunicipios(JSON.parse(jsonFinal));
}

carregarTudo();



// Função para trocar o valor de municipio selecionado
// function selecionarMunicipio() {
//     var indice_municipio = document.getElementById("select-municipio").value
//     municipio_selecionado = municipios[indice_municipio]
//     document.getElementById("nomeMunicipioKPI").textContent = municipio_selecionado;
//     carregarKpiTotalCrimesMunicipio()
//     carregarGraficoDistribuicaoCrimesMunicipio()
//     carregarGraficoAtividadePolicial()
// }

// Função para trocar o valor de ano selecionado
// function selecionarAno() {
//     var valor_ano = document.getElementById("select-ano").value
//     ano = valor_ano
//     carregarKpiTotalCrimesMunicipio()
//     carregarTabela()
//     carregarGraficoDistribuicaoCrimesMunicipio()
//     carregarPercentualCrimes()
//     carregarGraficoAtividadePolicial()

// }

// KPI de total de crimes em toda Baixada Santista
async function carregarTotalCrimes() {
    // Carregar total de Crimes

    let crimes = await fetch("/dashboard/totalCrimes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).then(json => {
        return parseInt(json["sum(qtd_ocorrencias)"])

    }).catch(function (erro) {
        console.log(erro);
    });

    return crimes;
}

// KPI de total de crimes do município selecionado
async function carregarKpiTotalCrimesMunicipio(municipio) {
    // Total de crimes no município
    let dados = await fetch(`/dashboard/totalCrimesMunicipio/${municipios.indexOf(municipio) + 1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).then(json => {
        return json["sum(qtd_ocorrencias)"]
    })

        .catch(function (erro) {
            console.log(erro);
        });

    return dados;
}

// Tabela de crimes
function carregarTabela() {
    fetch(`/dashboard/totalCrimesTodosMunicipios/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {
                console.log(json[0]);

                var valores_municipio = []
                document.getElementById("corpo-tabela").innerHTML = ""
                json.forEach((municipio) => {

                    const nome_municipio = municipio.nome_municipio
                    const total_crimes = municipio["sum(o.qtd_ocorrencias)"];
                    const score = 10
                    var status
                    var seta
                    if (score >= 7) {
                        status = "<span style='color:rgb(0,128,0)'>Seguro</span>"
                        seta = "<img src='./images/seta-up.png' class='imgSeta'/>"
                    } else if (score >= 5) {
                        status = "<span style='color:rgb(225, 225, 5)'>Moderado</span>"
                        seta = "<img src='./images/seta-mid.png' class='imgSeta'/>"
                    } else {
                        status = "<span style='color:red'>Inseguro</red>"
                        seta = "<img src='./images/seta-down.png' class='imgSeta'/>"
                    }
                    valores_municipio.push([`<tr class="linha-tabela"><td class="valor-tabela">${seta}</td><td class="valor-tabela">${nome_municipio}</td><td class="valor-tabela">${score}</td><td class="valor-tabela">${total_crimes}</td><td class="valor-tabela">${status}</td></tr>`, score])
                })
                document.getElementById("titulo-tabela").innerHTML = `Ranking de Segurança dos Municípios (${ano})`
                valores_municipio.sort((a, b) => b[1] - a[1]).forEach((municipio) => document.getElementById("corpo-tabela").innerHTML += municipio[0])

            });

        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

// Preenche o nome do usuário na navbar
// if (sessionStorage.NOME_USUARIO) {
//     document.getElementById('b_usuario').innerHTML = sessionStorage.NOME_USUARIO;
// }
var idUsuario = Number(sessionStorage.ID_USUARIO);

// function exibirRelatorios() {
//     document.getElementById("fundo").style.display = "flex";
//     document.getElementById("relatorios").style.display = "block";
// }

// document.getElementById("close-icon").addEventListener("click", function () {
//     document.getElementById("fundo").style.display = "none";
// });

// Funções de filtro (exibirMunicipios, selecionarMunicipio, etc.) removidas do script
// pois os elementos não existem mais no HTML.


//Gráfico de distribuição de crimes por município
var valoresDistribuicaoCrimes = []
function carregarGraficoDistribuicaoCrimesMunicipio(municipio) {
    valoresDistribuicaoCrimes = []
    fetch(`/dashboard/distribuicaoCrimes/${municipios.indexOf(municipio) + 1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                for (let i = 0; i < 4; i++) {
                    valoresDistribuicaoCrimes.push(json[i].total_ocorrencias)
                }
                graficoTotalCrimes.data.datasets[0].data = valoresDistribuicaoCrimes;
                graficoTotalCrimes.options.plugins.title.text = `Distribuição dos Crimes por Tipo em ${municipio} (${ano})`
                graficoTotalCrimes.update();
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

// // Gera o gráfico de distribuição de crimes do município selecionado
function criarGraficoCrimes(id) {
    if (graficos[id]) {
        graficos[id].destroy();
    }
    const graficoTotalCrimes = new Chart(document.getElementById(`graficoCrimes-${id}`), {
        type: 'bar',
        data: {
            labels: [
                'Contra a Vida',
                'Agressões Físicas',
                'Sexuais',
                'Contra o Patrimônio'
            ],
            datasets: [{
                label: 'Número de Ocorrências',
                data: valoresDistribuicaoCrimes,
                backgroundColor: [
                    '#FFD8A8',
                    '#FFC078',
                    '#FFA94D',
                    '#FF922B'
                ],
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: '#eee'
                    },

                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Distribuição dos Crimes por Tipo em ${municipio_selecionado} (${ano})`,
                    color: 'black',
                    font: {
                        size: 14,
                        family: 'poppins',
                        weight: 450,
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` ${context.parsed.x} casos`;
                        }
                    }
                }
            }
        }
    });
}
// // Gráfico de percentual de criminalidade por município
var valoresPercentualCrimes = []
function carregarPercentualCrimes() {
    valoresPercentualCrimes = []
    fetch(`/dashboard/percentualCrimes/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                json.forEach((municipio) => {
                    valoresPercentualCrimes.push(parseFloat(municipio.porcentagem).toFixed(2))
                })
                for (let i = 0; i < 9; i++) {
                    graficoPercentualMunicipios.data.datasets[i].data = [valoresPercentualCrimes[i]]
                }
                graficoPercentualMunicipios.options.plugins.title.text = `Percentual dos Crimes por Município (${ano})`
                console.log("aqui");
                console.log(valoresPercentualCrimes);
                graficoPercentualMunicipios.update()
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

const graficoPercentualMunicipios = new Chart(document.getElementById('graficoPercentualMunicipios').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [
            {
                label: 'Bertioga',
                data: [valoresPercentualCrimes[0]],
                backgroundColor: '#4e79a7',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Cubatão',
                data: [valoresPercentualCrimes[1]],
                backgroundColor: '#f28e2b',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Guarujá',
                data: [valoresPercentualCrimes[2]],
                backgroundColor: '#e15759',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Itanhaém',
                data: [valoresPercentualCrimes[3]],
                backgroundColor: '#76b7b2',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Mongaguá',
                data: [valoresPercentualCrimes[4]],
                backgroundColor: '#59a14f',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Peruíbe',
                data: [valoresPercentualCrimes[5]],
                backgroundColor: '#edc948',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Praia Grande',
                data: [valoresPercentualCrimes[6]],
                backgroundColor: '#b07aa1',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'Santos',
                data: [valoresPercentualCrimes[7]],
                backgroundColor: '#ff9da7',
                borderWidth: 1.5,
                borderColor: '#fff',
            },
            {
                label: 'São Vicente',
                data: [valoresPercentualCrimes[0]],
                backgroundColor: '#9c755f',
                borderWidth: 1.5,
                borderColor: '#fff',
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    },
                    font: {
                        family: 'Poppins'
                    }
                },
                grid: {
                    color: '#eee'
                }
            },
            y: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Poppins'
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: `Percentual dos Crimes por Município (${ano})`,
                color: '#000',
                font: {
                    family: 'Poppins',
                    size: 14,
                    weight: 500
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Poppins',
                        size: 11
                    },
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    }
                }
            }
        }
    }
});



// Gráfico de Atividade Policial
var valoresCrimes = []
var valoresAtividadePolicial = []

function carregarGraficoAtividadePolicial(municipio) {
    valoresCrimes = []
    valoresAtividadePolicial = []
    fetch(`/dashboard/crimesAtividadePolicial/${municipios.indexOf(municipio) + 1}/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                json.forEach((mes) => {
                    if (mes.tipo_ocorrencia == "Crime") {
                        valoresCrimes.push(mes.total_crimes)
                    } else if (mes.tipo_ocorrencia == "Produtividade Policial") {
                        valoresAtividadePolicial.push(mes.total_crimes)
                    }
                })
                console.log(valoresAtividadePolicial);
                console.log(valoresCrimes);

                graficoAtividadePolicial.data.datasets[0].data = valoresAtividadePolicial
                graficoAtividadePolicial.data.datasets[1].data = valoresCrimes
                graficoAtividadePolicial.update()

            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function criarGraficoAtividadePolicial(id) {
    if (graficos[id]) {
        graficos[id].destroy();
    }
    const graficoAtividadePolicial = new Chart(document.getElementById(`atividade-policial-${id}`).getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Atividade Policial',
                borderWidth: 1.3,
                data: valoresAtividadePolicial,
                borderColor: 'blue',
                backgroundColor: 'transparent',
                tension: 0.3,
            },
            {
                label: 'Crimes',
                borderWidth: 1.3,
                data: valoresCrimes,
                borderColor: 'orange',
                backgroundColor: 'transparent',
                tension: 0.3
            }]
        },
        plugins: [{
            id: 'tituloEsquerda',
            beforeDraw(chart) {
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = '16px Poppins';
                ctx.textAlign = 'left';
                ctx.fillText(`Crimes por Produtividade Policial em ${municipio_selecionado} - ${ano}`, chart.chartArea.left - 15, chart.chartArea.top - 40);
                ctx.restore();
            }
        }],
        options: {
            layout: {
                padding: {
                    top: 30,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        padding: 10
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}