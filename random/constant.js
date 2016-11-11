module.exports = {
    first: function() {
        //常见的英文名
        return [
            // male
            "James", "John", "Robert", "Michael", "William",
            "David", "Richard", "Charles", "Joseph", "Thomas",
            "Christopher", "Daniel", "Paul", "Mark", "Donald",
            "George", "Kenneth", "Steven", "Edward", "Brian",
            "Ronald", "Anthony", "Kevin", "Jason", "Matthew",
            "Gary", "Timothy", "Jose", "Larry", "Jeffrey",
            "Frank", "Scott", "Eric"
        ].concat([
            // female
            "Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
            "Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
            "Lisa", "Nancy", "Karen", "Betty", "Helen",
            "Sandra", "Donna", "Carol", "Ruth", "Sharon",
            "Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
            "Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
            "Brenda", "Amy", "Anna"
        ]);
    },
    // 常见的英文姓。
    last: function() {
        return [
            "Smith", "Johnson", "Williams", "Brown", "Jones",
            "Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
            "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
            "Moore", "Martin", "Jackson", "Thompson", "White",
            "Lopez", "Lee", "Gonzalez", "Harris", "Clark",
            "Lewis", "Robinson", "Walker", "Perez", "Hall",
            "Young", "Allen"
        ];
    },
    //常见中文姓
    cfirst: function() {
        return (
            '王 李 张 刘 陈 杨 赵 黄 周 吴 ' +
            '徐 孙 胡 朱 高 林 何 郭 马 罗 ' +
            '梁 宋 郑 谢 韩 唐 冯 于 董 萧 ' +
            '程 曹 袁 邓 许 傅 沈 曾 彭 吕 ' +
            '苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 ' +
            '余 潘 杜 戴 夏 锺 汪 田 任 姜 ' +
            '范 方 石 姚 谭 廖 邹 熊 金 陆 ' +
            '郝 孔 白 崔 康 毛 邱 秦 江 史 ' +
            '顾 侯 邵 孟 龙 万 段 雷 钱 汤 ' +
            '尹 黎 易 常 武 乔 贺 赖 龚 文'
        ).split(' ');
    },
    //常见中文名
    clast: function() {
        return (
            '伟 芳 娜 秀英 敏 静 丽 强 磊 军 ' +
            '洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 ' +
            '平 刚 桂英 泽东 江民 近平 波哥'
        ).split(' ');
    },
    //顶级域名
    tld: function() {
        return ('com net org edu gov int mil cn ' +
            // 国内域名
            'com.cn net.cn gov.cn org.cn ' +
            // 中文国内域名
            '中国 中国互联.公司 中国互联.网络 ' +
            // 新国际域名
            'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
            // 世界各国域名后缀
            'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw'
        ).split(' ');
    },
    //协议簇
    protocol: function() {
        return ('http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais').split(' ');
    }

}
