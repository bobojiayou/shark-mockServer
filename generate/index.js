var randomData = require('../random/index.js');
var util = require('../util/index.js');

var type = util.type;
var rand = util.rand;

var mockData = {};
// 参数
mockData.params = {};
mockData.entry = function(template, params) {
    mockData.params = params;
    return mockData.generateFromTemplate(template);
}
mockData.generateFromTemplate = function(template, name) {

    var length = 0;
    //匹配 |length 或 | min-max;
    var matches = (name || '').match(/\w+\|(\d+)-(\d+)|\w+\|(\d+)/);
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
        case 'array':
            generated = [];
            for (var i = 0; i < length; i++) {
                generated[i] = mockData.generateFromTemplate(template[0]);
            }
            break;

        case 'object':
            generated = {};
            for (var p in template) {
                var inc_matches = p.match(/\w+\|\+(\d+)/);
                if (inc_matches && type(template[p]) == 'number') {
                    var increment = parseInt(inc_matches[1], 10);
                    template[p] += increment;
                }
                //传参替换处理
                if (mockData.params[p]) {
                    var paramType = template[p].split('=')[1] || '';
                    switch (paramType) {
                        case 'int':
                            template[p] = parseInt(mockData.params[p], 10);
                            break;
                        case 'float':
                            template[p] = parseFloat(mockData.params[p], 10);
                            break;
                        case 'string':
                            template[p] = String(mockData.params[p]);
                            break;
                        case 'boolean':
                            template[p] = Boolean(mockData.params[p]);
                            break;
                        default:
                            template[p] = mockData.params[p];
                            break;
                    }
                }
                generated[p.replace(/\|(\d+-\d+|\+\d+|\d+|\d+.\d+)/, '')] = mockData.generateFromTemplate(template[p], p);
            }
            break;

        case 'int':
            generated = (matches) ? length : template;
            break;

        case 'float'://TODO
            generated = 11.2;

        case 'boolean':
            generated = (matches) ? rand(true) >= 0.5 : template;
            break;

        case 'string':
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

module.exports = mockData;
