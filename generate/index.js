var randomData = require('../random/index.js');
var util = require('../util/index.js');

var type = util.type;
var rand = util.rand;
var randFloat = util.randFloat;
var mockData = {};
// 参数
mockData.params = {};
mockData.entry = function (template, req) {
    if (req.method === 'GET') {
        mockData.params = req.query;
    } else if (req.method === 'POST') {
        mockData.params = req.body;
    }
    return mockData.generateFromTemplate(template);
}
mockData.generateFromTemplate = function (template, name) {

    var length = 0;
    //匹配 |length 或 | min-max;
    var matches = (name || '').match(/\w+\|(\d+)-(\d+)|\w+\|(\d+)$/);
    if (matches) {
        //| min-max
        if (matches[2]) {
            var length_min = parseInt(matches[1], 10);
            var length_max = parseInt(matches[2], 10);
            length = Math.round(rand(true) * (length_max - length_min)) + length_min;
            //|length
        } else if (matches[3]) {
            length = parseInt(matches[3], 10);
        }
    }
    // 解析数据载体
    var generated = null;
    switch (type(template)) {
        case 'array': // length| minLength - maxLength
            if (matches) {
                generated = [];
                for (var i = 0; i < length; i++) {
                    generated[i] = mockData.generateFromTemplate(template[0]);
                }
                break;
            } else { //数组无参数配置时，保持原状
                generated = [];
                for (var i = 0; i < template.length; i++) {
                    generated[i] = mockData.generateFromTemplate(template[i]);
                }
                break;
            }
        case 'object':
            generated = {};
            for (var p in template) { //处理步进
                var inc_matches = p.match(/\w+\|\+(\d+)/);
                if (inc_matches && type(template[p]) === 'int') {
                    var increment = parseInt(inc_matches[1], 10);
                    template[p] += increment;
                }
                //传参替换处理
                if (mockData.params[p]) {
                    var param = mockData.params[p]
                    var equalP = ''
                    var paramType = ''
                   
                    if (type(template[p])==='string' && (template[p].indexOf(',') !== -1 || template[p].indexOf('=') !== -1)) {
                        var contentArr = (template[p]).split(',') || []
                        if (!isEmpty(contentArr[0]) && contentArr[0].indexOf('=') !== -1) {
                            paramType = contentArr[0].split('=')[1] || '';
                        }
                        if(!isEmpty(contentArr[1])  && contentArr[1].indexOf('^') !== -1){
                            equalP = contentArr[1].split('^')[1] || p;
                        }
                        mockData.params[equalP] = mockData.params[p]
                        template[equalP] = template[p];
                    }
                    console.log('paramType2', paramType);
                    switch (paramType) {
                        case 'int':
                            template[p] = parseInt(param, 10);
                            break;
                        case 'float':
                            template[p] = parseFloat(param, 10);
                            break;
                        case 'string':
                            template[p] = String(param);
                            break;
                        case 'boolean':
                            template[p] = Boolean(param);
                            break;
                        default:
                            template[p] = param;
                            break;
                    }
                }
                generated[p.replace(/\|(\d+-\d+|\+\d+|\d+|\d+.\d|\d+:\d+-\d+)$/, '')] = mockData.generateFromTemplate(template[p], p);
            }
            break;

        case 'int': // length
            generated = (matches) ? length : template;
            break;

        case 'float': //TODO  length：min-max
            var matchFloat = (name || '').match(/\w+\|(\d+):(\d+)-(\d+)$/);
            if (matchFloat) {
                generated = randFloat(parseInt(matchFloat[1], 10), parseInt(matchFloat[2], 10), parseInt(matchFloat[3], 10));
            } else if (matches) {
                generated = randFloat(length);
            } else {
                generated = template;
            }
            break;

        case 'boolean': // percent
            var matchBool = (name || '').match(/\w+\|(\d+.\d+)/);
            if (!matchBool) {
                generated = template;
            } else {
                generated = rand(true) <= parseFloat(matchBool[1], 10);
                if (template) { //区分初始值为true或false的处理
                    return generated;
                } else {
                    return !generated;
                }
            }
            break;

        case 'string': //length| minLength-maxLength
            if (template.length) {
                generated = '';
                length = length || 1;
                for (var i = 0; i < length; i++) {
                    generated += template;
                }
                var keys = generated.match(/@([A-Z_0-9\(\),]+)/g) || [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    generated = generated.replace(key, getRandomData(key));
                }
            } else {
                generated = ""
                for (var i = 0; i < length; i++) {
                    generated += String.fromCharCode(Math.floor(rand(true) * 255));
                }
            }
            break

        default:
            generated = template;
            break;
    }
    return generated;

}


function getRandomData(key) {
    key = key.substr(1);
    var params = key.match(/\(([^\)]+)\)/g) || [];

    if (!(key in randomData)) {
        return key;
    }

    var a = randomData[key];

    switch (type(a)) {
        case 'array':
            var index = Math.floor(a.length * rand(true));
            return a[index];

        case 'function':
            return a();
    }
}

function isEmpty(data){
    return data === null || data === undefined || data === '' || data === NaN
}

module.exports = mockData;