# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-27 14:32:36
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-06-27 16:23:13
# @Abstract: 
import smtplib
import configparser
import os
from email.header import Header
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.utils import parseaddr, formataddr

class Email():

	def __init__(self):
		self.server_info = {
			'smtp_server': 'smtp.163.com',
			'username': 'zhengjiy16@163.com',
			'password': '521Luozhenyi'
		}
		self.smtp_server = self.server_info['smtp_server']
		self.username = self.server_info['username']
		self.password = self.server_info['password']
		print('数据读入完毕！')
	
	def _format_addr(self, s):
		name, addr = parseaddr(s)
		return formataddr((Header(name, 'utf-8').encode(), addr))

	def login(self):
		self.server = smtplib.SMTP(self.smtp_server)
		self.server.set_debuglevel(1)
		self.server.login(self.username, self.password)
		print('邮箱登陆成功！')

	def send_email(self, context):
		self.login()
		msg = MIMEMultipart()
		sender = '%s <%s>' % (context['sender_name'], context['sender'])
		msg['From'] = self._format_addr(sender)
		receiver = '%s <%s>' % (context['receiver_name'], context['receiver'])
		msg['To'] = self._format_addr(receiver)
		msg['Subject'] = Header(context['subject'], 'utf-8').encode()

		if context['html'] == '':
			body = MIMEText(context['body'], 'plain', 'utf-8')
			msg.attach(body)
		else:
			html = MIMEText(context['html'], 'html', 'utf-8')
			msg.attach(html)

		for attachment in context['attachments']:
			att = MIMEApplication(open(attachment, 'rb').read())
			filename = os.path.basename(attachment)
			att.add_header('Content-Disposition', 'attachment', filename=filename)
			msg.attach(att)

		self.server.sendmail(context['sender'], context['receiver'], msg.as_string())
		self.server.quit()


if __name__ == '__main__':
	em = Email()
	email_context = {
		'sender_name': '郑吉源',
		'sender': 'zhengjiy16@163.com',
		'receiver_name': '郑吉源',
		'receiver': 'zhengjy.16@sem.tsinghua.edu.cn',
		'subject': '这是用封装好的邮箱类发送的邮件',
		'html': '<h1>天啊！</h1><p>这是一封特别的邮件</p>',
		'body': '测试邮件',
		'attachments': [
			'/Users/zhengjiyuan/Desktop/Python/smtp/screenshot.png',
			'/Users/zhengjiyuan/Desktop/todo.txt',
			'/Users/zhengjiyuan/Desktop/test.py'
		],
	}
	em.send_email(email_context)
