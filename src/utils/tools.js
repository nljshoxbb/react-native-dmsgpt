var tools = {
	turnDate: function (oDate, sFomate, bZone) {
		console.log(oDate)
		sFomate = sFomate.replace("Y", oDate.getFullYear());
		sFomate = sFomate.replace("y", String(oDate.getFullYear()).substr(2))
		sFomate = sFomate.replace("m", this.toTwoNum(oDate.getMonth() + 1));
		sFomate = sFomate.replace("d", this.toTwoNum(oDate.getDate()));
		sFomate = sFomate.replace("H", this.toTwoNum(oDate.getHours()));
		sFomate = sFomate.replace("i", this.toTwoNum(oDate.getMinutes()));
		sFomate = sFomate.replace("s", this.toTwoNum(oDate.getSeconds()));
		console.log(oDate.getFullYear())
		if (bZone) sFomate = sFomate.replace(/\b(\d)\b/g, '0$1');
		return sFomate;
	},
	toTwoNum: function (n) {
		if (n < 10) {
			n = "0" + n;
		}
		return n;
	},
	arrIndexOf: function (arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) return i;
		}
		return -1;
	},
	deepCopy: function (source) { //深拷贝方法
		var result = {};
		for (var key in source) {
			result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
		}
		return result;
	},
	getQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	},
	indexOf: function (arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) return i;
		}
		return -1;
	},
	removeArr: function (arr, val) {
		var index = this.indexOf(arr, val);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
	cmp: function (x, y) {

		if (x === y) {
			return true;
		}
		if (!(x instanceof Object) || !(y instanceof Object)) {
			return false;
		}

		if (x.constructor !== y.constructor) {
			return false;
		}

		for (var p in x) {
			if (x.hasOwnProperty(p)) {

				if (!y.hasOwnProperty(p)) {
					return false;
				}


				if (x[p] === y[p]) {
					continue;
				}

				if (typeof (x[p]) !== "object") {
					return false;
				}

				if (!Object.equals(x[p], y[p])) {
					return false;
				}
			}
		}

		for (p in y) {
			if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
				return false;
			}
		}
		return true;
	},

	filterObjVal: function (data, val, keyname, getValName) {
		for (let i in data) {
			if (data[i][keyname] == val) {
				if (getValName) {
					return data[i][getValName];
				} else {
					return {
						data: data[i],
						idx: i
					};
				}

			}
		}
	},
	// supportCss3: function (style) {
	// 	var prefix = ['webkit', 'Moz', 'ms', 'o'],
	// 		i,
	// 		humpString = [],
	// 		htmlStyle = document.documentElement.style,
	// 		_toHumb = function (string) {
	// 			return string.replace(/-(\w)/g, function ($0, $1) {
	// 				return $1.toUpperCase();
	// 			});
	// 		};

	// 	for (i in prefix)
	// 		humpString.push(_toHumb(prefix[i] + '-' + style));

	// 	humpString.push(_toHumb(style));

	// 	for (i in humpString)
	// 		if (humpString[i] in htmlStyle) return true;

	// 	return false;
	// },
	// prefix: (function () {
	// 	var styles = window.getComputedStyle(document.documentElement, ''),
	// 		pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
	// 		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	// 	return {
	// 		dom: dom,
	// 		lowercase: pre,
	// 		css: '-' + pre + '-',
	// 		js: pre[0].toUpperCase() + pre.substr(1)
	// 	};
	// })(),
	IsPC: function () {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	},
	IE9: (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0"),
	initialFetch: function (method, body) {
		let initialFetch = {
			method: method,
			credentials: 'same-origin',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		if (body) {
			initialFetch['body'] = this.parseParam(body);
		}
		return initialFetch;
	},
	parseParam: function (param, key) {

		var paramStr = "";

		if (typeof param == "string" || typeof param == "number" || typeof param == "boolean") {

			paramStr += "&" + key + "=" + encodeURIComponent(param);

		} else {
			for (let i in param) {

				let k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);

				paramStr += '&' + this.parseParam(param[i], k);
			}
		}
		return paramStr.substr(1);
	},
	fetch: function ({ url, type, postData, success, error }) {
		let urlStr = type == 'get' ? url + '?' + this.parseParam(postData) : url;
		let postDataStr = type == 'get' ? this.initialFetch(type) : this.initialFetch(type, postData);

		fetch(urlStr, postDataStr)
			.then(response => response.json())
			.then((result) => {
				if (result.code == 'SUCCESS') {
					success(result);
				} else if (result.code == "ERROR") {
					if (error) {
						error(result);
					}

				}
			})


	},
	// turnToRem: function (px) {
	// 	const htmlFont = document.getElementsByTagName('html')['html'].style.fontSize.replace('px', '');
	// 	const scale = document.getElementsByTagName('meta')['viewport']['content'].split('=')[5];
	// 	return px / (htmlFont * scale);
	// },
	// setCookie: function (name, value) {
	// 	//设置名称为name,值为value的Cookie
	// 	var expdate = new Date(); //初始化时间
	// 	expdate.setTime(expdate.getTime() + 30 * 60 * 1000); //时间
	// 	document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
	// 	//即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
	// },
	// getCookie: function (c_name) {
	// 	if (document.cookie.length > 0) {
	// 		var c_start = document.cookie.indexOf(c_name + "=")
	// 		if (c_start != -1) {
	// 			c_start = c_start + c_name.length + 1
	// 			var c_end = document.cookie.indexOf(";", c_start)
	// 			if (c_end == -1) c_end = document.cookie.length
	// 			return unescape(document.cookie.substring(c_start, c_end))
	// 		}
	// 	}
	// 	return ""
	// },
	// delCookie: function (name) {
	// 	var exp = new Date();
	// 	exp.setTime(exp.getTime() - 1);
	// 	var cval = getCookie(name);
	// 	if (cval != null)
	// 		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	// },
	myTrim(x) {
		if (x) {
			return x.replace(/\s+/g, "");
		} else {
			return '';
		}

	}
}

module.exports = tools;