const moment = require('moment')

const formatDate = date => {
    moment.locale("pt-br");
    if(date){
        return moment(date).format("DD/MM/YYYY");
    } 
    return ""
};

const numberToReal = numero => {
    numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

const percentualDesconto = (valorOld, valorNew) => {
    if (valorOld === undefined || valorOld === null || valorOld === 0 || valorNew === undefined || valorNew === null || valorNew === 0) {
        return '0%';
    }
    return (100 - (valorNew * 100 / valorOld)).toFixed(0) + '%';
}

exports.formatDate = formatDate
exports.numberToReal = numberToReal
exports.percentualDesconto = percentualDesconto