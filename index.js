const commander = require('commander');
const ofertaImagemUtils = require('./ofertaImagemUtils')

commander
  .version('1.0.0', '-v, --version')
  .option('-l, --list', 'String é um array')
  .option('-c, --cabecalho', 'Colocar Cabecalho')
  .option('-i, --ofertaItem <ofertaItem>', 'Objeto de Oferta Item em Base64')
  .option('-s, --ofertaServico <ofertaServico>', 'Objeto de Oferta Servico em Base64')
  .parse(process.argv);

let data = null

if(commander.ofertaItem) {
  data = commander.ofertaItem
} else {
  data = commander.ofertaServico
}

let buff = Buffer.from(data, 'base64')
let json = buff.toString('ascii')

let obj = JSON.parse(json)

let retorno = null

if(commander.list) {
  retorno = async () => await ofertaImagemUtils.gerarImagemHtmlItens(obj, commander.cabecalho)
} else {
  retorno = async () => await ofertaImagemUtils.gerarImagemHtmlItem(obj, commander.cabecalho)
}

retorno().then(result => console.log(result))
