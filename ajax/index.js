function ajax({url, type = 'GET', data, callback, async = true}) {    
    let params = getParam(data)
    let xhr = null;
    if (window.XMLHttpRequest) {                          //创建一个ajax对象；
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.WMLHttp')      //对ie做兼；
    }
    type = type.toUpperCase();                        
    if (type == 'GET') {
        xhr.open(type, url + '?' + params, async);         
        xhr.send();                                       //发送请求；    
    } else if (type == 'POST') {
        xhr.open(type, url, async);                      //设置发送的样式；
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')   
        xhr.send(params);                                   //发送请求；   post请求不能跟get请求一样拼接在请求地址的后面，需要写到send里面；   
    }
    xhr.onreadystatechange = function () {                      
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let data = xhr.responseText              //获取数据成功的情况下，将数据交给我们的回调函数进行处理
                callback && callback(data);
            }
        }
    }
    
    function getParam(data) {
      let url = ''
      for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
      }
      return url ? url.substring(1) : ''
    }
}
