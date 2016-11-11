

function randomDateTime() {
    var date = new Date(Math.floor(Math.random() * new Date().valueOf()));
    return date.getTime();
}

var randomData = {
    NUMBER: "0123456789".split(''),
    DATETIME: randomDateTime
};
module.exports = randomData;