var constant = require('./constant.js');
var util = require('../util/index.js');

function range(defaultMin, defaultMax, min, max) {
    return min === undefined ? natural(defaultMin, defaultMax) : // ()
        max === undefined ? min : // ( len )
        natural(parseInt(min, 10), parseInt(max, 10)) // ( min, max )
}

function randomDate() {
    return new Date(Math.floor(Math.random() * new Date().valueOf()));
}
// 返回一个随机的自然数（大于等于 0 的整数）。
function natural(min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : 0;
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min;
}
// 返回一个随机的整数。
function integer(min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
    return Math.round(Math.random() * (max - min)) + min;
}

function intfunction(min, max) {
    return integer(min, max);
}

// 随机生成一个单词。
function word(min, max) {
    var len = range(3, 10, min, max)
    var result = '';
    for (var i = 0; i < len; i++) {
        result += character('lower')
    }
    return result
}

// 随机生成一个或多个汉字。
function cword(pool, min, max) {
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
    var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'

    var len
    switch (arguments.length) {
        case 0: // ()
            pool = DICT_KANZI
            len = 1
            break
        case 1: // ( pool )
            if (typeof arguments[0] === 'string') {
                len = 1
            } else {
                // ( length )
                len = pool
                pool = DICT_KANZI
            }
            break
        case 2:
            // ( pool, length )
            if (typeof arguments[0] === 'string') {
                len = min
            } else {
                // ( min, max )
                len = natural(pool, min)
                pool = DICT_KANZI
            }
            break
        case 3:
            len = natural(min, max)
            break
    }

    var result = ''
    for (var i = 0; i < len; i++) {
        result += pool.charAt(natural(0, pool.length - 1))
    }
    return result
}
// 返回一个随机字符。
function character(pool) {
    var pools = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        number: '0123456789',
        symbol: '!@#$%^&*()[]'
    }
    pools.alpha = pools.lower + pools.upper;
    pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol;

    pool = pools[('' + pool).toLowerCase()] || pool;
    return pool.charAt(natural(0, pool.length - 1));
}

var randomData = {
    randomDateTime: function() {
        return randomDate().getTime();
    },
    YYYY: function() {
        return ('' + randomDate().getFullYear());
    },
    MM: function() {
        var m = randomDate().getMonth() + 1;
        return m < 10 ? '0' + m : m;
    },
    DD: function() {
        var d = randomDate().getDate();
        return d < 10 ? '0' + d : d;
    },
    HH: function() {
        var h = randomDate().getHours();
        return h < 10 ? '0' + h : h;
    },
    SS: function(date) {
        var s = randomDate().getSeconds();
        return s < 10 ? '0' + s : s;
    },

    NUMBER: "0123456789".split(''),
    DATETIME: function() {
        return randomDate().getTime();
    },
    NOWTIME: Date.now(),
    CNAME: function() {
        return util.pick(constant.cfirst()) + util.pick(constant.clast());
    },
    NAME: function(){
        return util.pick(constant.first()) + util.pick(constant.last());
    },
    FLOAT: function() { //TODO
    },
    IP: function() {
        return natural(0, 255) + '.' +
            natural(0, 255) + '.' +
            natural(0, 255) + '.' +
            natural(0, 255);
    },
    EMAIL: function() {
        return character('lower') + '.' + word() + '@' + (word() + '.' + util.pick(constant.tld()));
    },
    CTITLE: function() {
        var len = range(3, 7, 3, 7);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(cword());
        }
        return result.join('');
    },
    TITLE: function() {
        var len = range(3, 7, 3, 7);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push((word()));
        }
        return result.join(' ');
    },
    URL: function() {
        return util.pick(constant.protocol()) + '://' + word() + '-' + util.pick(constant.tld()) + '/' + word();
    }
};
module.exports = randomData;
