{
    "code": "200",
    "errorCode": "Optional，错误说明，参见ErrorCode",
    "data": {
        "pagination": {
            "page": 2311,
            "size": "=int",
            "total": 3,
            "totalPage|3-10": 3
        },
        "result|2": [
            {
                "id|+2": 1,
                "type|1-3": 1,
                "totalQuantity|20-90": 23,
                "sendTime": "@YYYY:@MM:@SS",
                "notifyInfo": {
                    "sendPush|0.2": false,
                    "pushMsg|2-4": "字符串",
                    "sendSms|0.4": true,
                    "smsMsg|4-5": "222",
                    "number": "@NUMBER",
                    "float|2:90-91": 11.23,
                    "url": "@URL",
                    "dateTime": "@DATETIME",
                    "email": "@EMAIL",
                    "ip": "@IP",
                    "ctitle": "@CTITLE",
                    "title": "@TITLE",
                    "cname": "@CNAME",
                    "enNAME": "@NAME"
                },
                "sendStatus|1-3": 1
            }
        ]
    }
}
