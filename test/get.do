{
    "code": "200",
    "errorCode": "Optional，错误说明，参见ErrorCode",
    "data": {
        "pagination": {
            "page": "=int",
            "size": "=int",
            "total": 3,
            "totalPage|3-10": 3
        },
        "result|10": [
            {
                "id|+1": 1,
                "type|1-3": 1,
                "totalQuantity|20-90": 23,
                "sendTime": "@YYYY:@MM:@SS",
                "notifyInfo": {
                    "sendPush|0.2": false,
                    "pushMsg|2-4": "消息文案",
                    "sendSms|0.4": true,
                    "smsMsg|4-5": "222",
                    "number": "@NUMBER",
                    "name": "@CNAME",
                    "yes|3": 11.23,
                    "url": "@URL",
                    "dateTime": "@DATETIME",
                    "email": "@EMAIL",
                    "ip": "@IP",
                    "ctitle": "@CTITLE",
                    "title": "@TITLE",
                    "NAME": "@NAME"
                },
                "sendStatus|1-3": 1
            }
        ]
    }
}