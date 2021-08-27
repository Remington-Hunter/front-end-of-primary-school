export function dateFormat(value) {
  Date.prototype.Format = function(fmt) {
    // author: meizz
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };
  var time2 = value.Format("yyyy-MM-dd hh:mm:ss");
  var times = time2.split(" ");
  var value1 = times[0] + "T" + times[1] + "Z";
  return value1;
}

export function order(x, y) {
  var xx = [];
  for (var ii = 0; ii < x.length; ii++) {
    for (var jj = 0; jj < y.length; jj++) {
      if (x[ii] === y[jj].content) {
        xx.push(jj + "");
        break;
      }
    }
  }
  for (var j = 0; j < xx.length - 1; j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
    for (var i = 0; i < xx.length - 1 - j; i++) {
      if (xx[i] > xx[i + 1]) {
        var temp = xx[i];
        xx[i] = xx[i + 1];
        xx[i + 1] = temp;
      }
    }
  }
  var res = "";
  for (var i = 0; i < xx.length; i++) {
    res += xx[i];
  }
  return res
}

export function strtolist(x) {
  var xx=x.split("")
  for (var j = 0; j < xx.length - 1; j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
    for (var i = 0; i < xx.length - 1 - j; i++) {
      if (xx[i] > xx[i + 1]) {
        var temp = xx[i];
        xx[i] = xx[i + 1];
        xx[i + 1] = temp;
      }
    }
  }
  return xx
}

export function orderlisttostr(xx) {
  for (var j = 0; j < xx.length - 1; j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
    for (var i = 0; i < xx.length - 1 - j; i++) {
      if (xx[i] > xx[i + 1]) {
        var temp = xx[i];
        xx[i] = xx[i + 1];
        xx[i + 1] = temp;
      }
    }
  }
  var y=""
  for(var j=0;j<xx.length;j++){
    y+=xx[j]
  }
  return y
}
