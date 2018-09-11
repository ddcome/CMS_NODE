//声明一个工具类.
var MainUtil = {
    //美化显示null数据和undefined数据格式
    beautyText: function (str) {
        if (str == null || str == undefined) {
            return "-";
        }
        return str;
    },
    //信息提示组件
    showModel: function (str) {
        new jBox('Notice', {
            attributes: {
                x: 'right',
                y: 'bottom'
            },
            theme: 'NoticeBorder',
            color: 'green',
            volume: '100',
            stack: false,
            autoClose: 3000,
            animation: {
                open: 'slide:bottom',
                close: 'slide:left'
            },
            onInit: function () {
                this.options.content = str;
            }
        });
    },
    //UUID
    UUID: function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "_";
        var uuid = s.join("");
        return uuid;
    },
    //替换所有回车和换行
    transferString: function (content) {
        var string = content;
        try {
            string = string.replace(/\r\n/g, "");
            string = string.replace(/\n/g, "");
            string = string.replace(/[\\]/g, "");
            string = string.replace(/\ /g, "");
        } catch (e) {
            console.log(e.message);
        }
        return string;
    },
    //base64
    base64_encode: function (str) {
        var s = CryptoJS.enc.Utf8.parse(str);
        return CryptoJS.enc.Base64.stringify(s);
    },
    base64_decode: function (str) {
        var words = CryptoJS.enc.Base64.parse(str);
        return words.toString(CryptoJS.enc.Utf8);
    }

};