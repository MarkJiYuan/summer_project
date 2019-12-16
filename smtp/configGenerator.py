# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-27 14:37:59
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-06-27 15:10:10
# @Abstract: 

import configparser

config = configparser.ConfigParser()

config['server_info'] = {
	'smtp_server': 'smtp.163.com',
	'username': 'zhengjiy16@163.com',
	'password': '521Luozhenyi'
}

with open('server.ini', 'w') as configfile:
   config.write(configfile)