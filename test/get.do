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
                "totalQuantity|20-90": 20,
                "sendTime": "@YYYY:@MM:@SS",
                "notifyInfo": {
                    "sendPush|1-2": false,
                    "pushMsg|2-4": "消息文案",
                    "sendSms|1-2": true,
                    "smsMsg|4-5": "222",
                    "number": "@NUMBER",
                    "name": "@CNAME",
                    "float": 11.84949,
                    "url": "@URL",
                    "email": "@EMAIL",
                    "ip":"@IP",
                    "ctitle": "@CTITLE",
                    "title": "@TITLE",
                    "NAME":"@NAME"
                },
                "sendStatus|1-3": 1
            }
        ]
    }
}
