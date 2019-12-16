# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-27 16:05:18
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-06-27 16:23:55
# @Abstract: 

from myemail import Email

context = {
	'sender': 'zhengjiy16@163.com',
	'sender_name': '杨静达',
	'receiver': 'zhengjy.16@sem.tsinghua.edu.cn',
	'receiver_name': '郑吉源',
	'subject': '你被退学了！',
	'body': '郑吉源，你因为挂科太多，被退学了！',
	'html': '',
	'attachments': [],
}

em = Email('zhengjiy16@163.ini')
em.send_email(context)
