const puppeteer = require("puppeteer");
const utils = require('./utils')

const OFERTA_ITENS = `<div style="width:610px; font-family: 'Open Sans', sans-serif;" id="pnPai">
    <div>
        #CABECALHO
    </div>
    <div>
        #ITENS
    </div>
</div>`

const OFERTA_CABECALHO = `<div style="display: flex">
    <div style="flex: 1">
        #IMAGEM_CABECALHO
    </div>
</div>`

const OFERTA_ITEM = `
#CABECALHO
<div style="display: flex; justify-content: space-between; padding-top: 5px;">
    <div style="margin-left: 5px;">
        <img src="#IMAGEM_ITEM" style="border-radius: 5px" width="250" alt="">
    </div>
    <div style="padding-left: 15px;">
        <div style="width: 340px">
            <span style="font-weight: bold;font-size:20px">#NOME_ITEM</span>
            <br/>
            <span>Cod: #COD_ITEM</span>
            <br />
            <br />
            <label style="font-size: 14px; margin-left: 5px;">
                <strike>
                    <small>De: </small>
                    <strong>#VALOR_ITEM_OLD</strong>
                </strike>
            </label>
        </div>
        <div style="width: 340px; height: 90px">
            <div style="width: 100%; height: 110px; background: url(#IMAGEM_VALOR); background-repeat: no-repeat;">
                <div style="display: flex">
                    <div style="width: 200px">
                        <div style="color: white; padding-top: 30px; padding-right: 0px; padding-left: 7px; padding-bottom: 15px;">
                            <label style="font-size: 24px; font-weight: bold;">#VALOR_ITEM_NEW</label>
                        </div>
                    </div>
                    <div style="width: 200px">
                        <div style="color: white; padding-top: 64px; padding-right: 0px; padding-bottom: 7px; padding-left: 93px;">
                            <label style="font-size: 18px; font-weight: bold;">#PERCENTUAL_DESCONTO</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
#APLICABILIDADE`

    

const OFERTA_ITEM_APLICABILIDADE = `
<div>
    <div style="width:580px; text-align:left;font-size:16px ;background: #EFEFEF;border-radius:3px;padding-top: 1px ; padding-bottom:1px;padding-left: 15px;padding-right:15px;margin-top: 20px;">
        <p>
            <small><strong>Modelos: </strong><label style="text-transform: lowercase">#APLICABILIDADE_ITEM</label></small>
        </p>
    </div>
</div>`



const OFERTA_SERVICOS = `<table style="font-family: 'Open Sans', sans-serif;">
    <tr>
        <td class="column" valign="top" style="font-family: Open Sans, Verdana,Geneva, sans-serif; color:#414141;">
            <table style="font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <h2>Serviços</h2>
                    </td>
                </tr>#SERVICOS
            </table>
        </td>
    </tr>
</table>`

const OFERTA_SERVICO = `<tr>
    <table style="width: 600px">
        <tr>
            <td style="padding-left: 10px;">
                <table width="600" height="auto" style="border-top: 0px solid #414141; border-bottom: 0px solid #414141; margin-top: 10px;">
                    <tbody>
                        <tr>
                            <td style="width: 60px;">
                                <img src="#IMAGEM_ICON_SERVICO" width="50">
                            </td>
                            <td>
                                <span style="font-weight: bold;font-size:20px">#NOME_SERVICO</span>
                                <br/>
                                <span>Cod: #COD_SERVICO</span>
                                <br />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table width="600" height="auto" style="border-top: 1px solid #414141; border-bottom: 1px solid #414141; margin-top: 10px; padding-bottom: 10px;">
                    <tbody>
                        <tr>
                            <td style="font-size: 14px; margin-left: 5px; font-weight: bold; padding-top: 5px;">DE</td>
                            <td style="font-size: 14px; margin-left: 5px; font-weight: bold; padding-top: 5px;">DESCONTO</td>
                            <td style="font-size: 14px; margin-left: 5px; font-weight: bold; padding-top: 5px;">POR</td>
                        </tr>
                        <tr>
                            <td style="font-size: 18px; margin-left: 5px; padding-bottom: 0px;">
                                <strike><small>#VALOR_SERVICO_OLD</small></strike>
                            </td>
                            <td style="font-size: 18px; margin-left: 5px; padding-bottom: 0px; font-weight: bold; color: red;">
                                <i style="font-style: normal;">&#x2B9F;</i> #PERCENTUAL_DESCONTO
                            </td>
                            <td style="font-size: 18px; margin-left: 5px; padding-bottom: 0px; font-weight: bold;">#VALOR_SERVICO_NEW</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</tr>`

const OFERTA_DURACAO = `<div style="font-family: 'Open Sans', sans-serif; font-size: 14px; width: 600px;">
    <div>
            <label><small>*Oferta válida até #OFERTA_FIM, ou enquanto durar o estoque.</small></label>
    </div>
    <div style="text-align: center">
            <label><small>powered by IS Vendas - Lume Tecnologia &#169;.</small></label>
    </div>
</div>`



const AZURE_LINK_BASE = 'https://stgisvendas.blob.core.windows.net'

const IMAGEM_VALOR_PADRAO = `${AZURE_LINK_BASE}/imagem-valor/valor.png`

const PANEL_ID = 'pnPrincipal'

const PANEL_PAI_ID = 'pnPai'

const TAG_DIV_ID = `<div style="width:610px; font-family: 'Open Sans', sans-serif;" id="${PANEL_ID}">#ITEM</div>`

const TAG_ITEM_BODY = '#ITEM'

const TAG_ITENS = '#ITENS'

const TAG_CABECALHO = '#CABECALHO'

const TAG_IMAGEM_CABECALHO = '#IMAGEM_CABECALHO'

const TAG_IMAGEM_VALOR = '#IMAGEM_VALOR'

const TAG_IMAGEM_ITEM = '#IMAGEM_ITEM'

const TAG_COD_ITEM = '#COD_ITEM'

const TAG_NOME_ITEM = '#NOME_ITEM'

const TAG_VALOR_ITEM_OLD = '#VALOR_ITEM_OLD'

const TAG_PERCENTUAL_DESCONTO = '#PERCENTUAL_DESCONTO'

const TAG_VALOR_ITEM_NEW = '#VALOR_ITEM_NEW'

const TAG_APLICABILIDADE = '#APLICABILIDADE'

const TAG_APLICABILIDADE_ITEM = '#APLICABILIDADE_ITEM'

const TAG_OFERTA_FIM = '#OFERTA_FIM'

const replaceHtmlTagsItem = ofertaItem => {
    let html = OFERTA_ITEM
    if(ofertaItem.pathImagemValor) {
        html = html.replace(TAG_IMAGEM_VALOR, AZURE_LINK_BASE + ofertaItem.pathImagemValor)
    } else {
        html = html.replace(TAG_IMAGEM_VALOR, IMAGEM_VALOR_PADRAO)
    }
    html = html.replace(TAG_IMAGEM_ITEM, AZURE_LINK_BASE + ofertaItem.voiStrPathImagem)
    html = html.replace(TAG_COD_ITEM, ofertaItem.fitStrCoditefabricante)
    if(ofertaItem.voiStrDesc) {
        html = html.replace(TAG_NOME_ITEM, ofertaItem.voiStrDesc)
    } else {
        html = html.replace(TAG_NOME_ITEM, '')
    }
    if(ofertaItem.vofFltPrecoSemDesc) {
        html = html.replace(TAG_VALOR_ITEM_OLD, utils.numberToReal(ofertaItem.vofFltPrecoSemDesc))
    } else {
        html = html.replace(TAG_VALOR_ITEM_OLD, '')
    }
    html = html.replace(TAG_PERCENTUAL_DESCONTO, utils.percentualDesconto(ofertaItem.vofFltPrecoSemDesc, ofertaItem.vofFltPrecoVenda))
    html = html.replace(TAG_VALOR_ITEM_NEW, utils.numberToReal(ofertaItem.vofFltPrecoVenda))
    if(ofertaItem.voiStrAplicabilidade) {
        aplicabilidadeItem = OFERTA_ITEM_APLICABILIDADE
        aplicabilidadeItem = aplicabilidadeItem.replace(TAG_APLICABILIDADE_ITEM, ofertaItem.voiStrAplicabilidade)
        html = html.replace(TAG_APLICABILIDADE, aplicabilidadeItem)
    } else {
        html = html.replace(TAG_APLICABILIDADE, '')
    }
    duracao = OFERTA_DURACAO
    duracao = duracao.replace(TAG_OFERTA_FIM, utils.formatDate(ofertaItem.vofDtmFim))
    html += duracao 
    return TAG_DIV_ID.replace(TAG_ITEM_BODY, html)
}

const gerarImagemHtmlItem = async (ofertaItem, cabec) => {
    let html = replaceHtmlTagsItem(ofertaItem)
    console.log(ofertaItem.tagImgCabecalho)
    if(cabec) {
        let cabecalho = OFERTA_CABECALHO
        cabecalho = cabecalho.replace(TAG_IMAGEM_CABECALHO, `<img src="${ofertaItem.tagImgCabecalho}" width="610"></img>`)
        html = html.replace(TAG_CABECALHO, cabecalho)
    } else {
        html = html.replace(TAG_CABECALHO, '')
    }
    let imagem64 = await gerarImagemHtml(html, PANEL_ID)
    return imagem64
}

const gerarImagemHtmlItens = async (ofertaItens, cabec) => {
    let html = ''
    for(let i = 0; i < ofertaItens.length; i++) {
        html += replaceHtmlTagsItem(ofertaItens[i]).replace(TAG_CABECALHO, '')
    }
    html = OFERTA_ITENS.replace(TAG_ITENS, html)
    if(cabec) {
        let cabecalho = OFERTA_CABECALHO
        cabecalho = cabecalho.replace(TAG_IMAGEM_CABECALHO, `<img src="${ofertaItens[0].tagImgCabecalho}" width="610"></img>`)
        html = html.replace(TAG_CABECALHO, cabecalho)
    } else {
        html = html.replace(TAG_CABECALHO, '')
    }
    let imagem64 = await gerarImagemHtml(html, PANEL_PAI_ID)
    return imagem64
}

const gerarImagemHtml = async (html, panelID) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 3840, height:10000 })
    await page.setContent(html);
    const bodyHandle = await page.$(`#${panelID}`);
    const { x, y,  height } = await bodyHandle.boundingBox();
    const imagem = await page.screenshot({
        path: 'out.jpeg',
        type: "jpeg",
        quality: 100,
        clip: {
            x,
            y,
            width: 610,
            height
        }
    });
    await browser.close();
    return imagem
}

exports.gerarImagemHtmlItem = gerarImagemHtmlItem
exports.gerarImagemHtmlItens = gerarImagemHtmlItens