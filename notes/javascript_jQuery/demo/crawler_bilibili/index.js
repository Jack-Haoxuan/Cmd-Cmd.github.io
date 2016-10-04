const fs = require('fs');
const request = require('request');

(() => {
  const jsonUrl = 'http://www.bilibili.com/index/index-icon.json';
  getJsonFile(jsonUrl); // 获取json文件，并解析对象
})();

function getJsonFile(url) {
  request({
    url: url,
    gzip: true
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log('======获取JSON文件成功======');
      let result = JSON.parse(body);
      for (let i = 0; i < result.fix.length; i++) {
        saveGif(result.fix[i].icon, result.fix[i].title);
      }
    } else {
      console.log('=======Error info=======', err, 'Code: ' + res.statusCode);
      return false;
    }
  });
}

function saveGif(url, title) {
  console.log('存储图片 => ' + title);
  request(url).pipe(fs.createWriteStream('./gif/' + title + '.gif'));
  console.log('图片 ' + title + ' => 存储完成');
}
