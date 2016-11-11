{
    "code": "200",
    "errorCode": "Optional，错误说明，参见ErrorCode",
    "data": {
        "pagination": {
            "page": "=number",
            "size": "=number",
            "total": 3,
            "totalPage|3-10": 3
        },
        "result|10": [
            {
                "id|+1": 1,
                "type|1-3": 1,
                "totalQuantity|20-90": 20,
                "sendTime": "@DATETIME",
                "notifyInfo": {
                    "sendPush|1-2": false,
                    "pushMsg|2-4": "消息文案",
                    "sendSms|1-2": true,
                    "smsMsg|4-5": "222",
                    "number": "@NUMBER"
                },
                "sendStatus|1-3": 1
            }
        ]
    }
}