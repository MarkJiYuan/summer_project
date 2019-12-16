/*1�������httpbasic��֤��admin/admin���������Σ�����sabreʱ���������£�
 * crossDomain:true
 * withCredentials: false
 * calendar.js�����������е�req.setRequestHeader('Authorization', basicAuth(userAuth.userName, userAuth.userPassword));
 * �����89����href��ֵӦ��Ϊhttp://166.111.4.89:49998
 * 
 *
 * 
 * http://166.111.3.219/calendars/
 * http://166.111.4.89:49998/admin/calendars/
 * http://166.111.3.140/calendars/
 * http://166.111.3.244:8080/calendars/
 * http://101.6.19.98:8080/calendars/
 */
var zhjw_base_url = "http://zhjw.cic.tsinghua.edu.cn";
var wlxt_host = window.location.href.split("/")[2];
var globalNetworkCheckSettings={href: 'http://'+wlxt_host+'/calendars/', hrefLabel: null, crossDomain: false, additionalResources: [], forceReadOnly: null, withCredentials: true, showHeader: true, settingsAccount: true, checkContentType: true, syncInterval: 60000, timeOut: 30000, lockTimeOut: 10000, delegation: false, ignoreAlarms: false, backgroundCalendars: [],httpBasic: false};

var globalInterfaceLanguage='en_US';

var globalTimeZone='local';

