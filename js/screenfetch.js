let c_screenfetch = new Vue({
    data:{
        name: "screenfetch",
        usage: "",
        description: "The bash screenshot information tool.",
        logo: [
            "       ,]@@@@@@@O\\`      ",
            "    ./@@@@@@@@@@@@@@\\.   ",
            "   /@@@@@@@@@@@@@@@@@@^  ",
            "  /@@@@@@/`    ,\\@@@@@@^ ",
            " =@@@@@@`        ,@@@@@@`",
            " =@@@@@^          =@@@@@@^",
            " =@@@@@\          O@@@@@@@^",
            "  @@@@@@\        /@@@@@@O ",
            "  ,@@@@@@@@O]]/@@@@@@@` ",
            "    \\@@@@@@@@@@@@@@@@/   ",
            "      \\@@@@@@@@@@@@[     ",
            "          @@@@@@         ",
        ],
        os: "Arect OS",
        kernel: "",
        uptime: "I don't want to count",
        url: "https://github.com/arect/ArectShell"
    },
    methods: {
        main: function() {
            let temp = "<div style = \"color: #fb7299; float: left\">";
            for (let i of this.logo) {
                temp += i.replace(/ /g, "&ensp;") + "<br />";
            }
            temp += "</div>";
            temp += "<div style = \"float: left; padding-left: 64px\"><br />";
            temp += prompt.username + "@" + prompt.device + "<br />";
            temp += "OS:&ensp;" + this.os + "<br />";
            temp += "Kernel:&ensp;" + this.getBrowser() + "<br />";
            temp += "Uptime:&ensp;" + this.uptime + "<br />";
            temp += "Shell:&ensp;" + shell.name + "&ensp;-" + shell.version + "&ensp;<span v-if = \"isBeta\" style = \"color: #FF9800\">beta</span>" + "<br />";
            temp += "Project url:&ensp;<a href = " + this.url + ">" + this.url + "</a><br />";
            temp += "Powered by <span style='color: #ffc107'>Javascript</span> & <span style='color: #42b983'>Vue</span><br />";
            temp += "Made with 💖<br /></div>";
            return [{isHtml: true, result: temp}];
        },
        // 吕化冬 https://blog.csdn.net/weixin_40656367/article/details/82908714
        getBrowser: function(n) {  
            let ua = navigator.userAgent.toLowerCase(),
                s,  
                name = '',  
                ver = 0;  
            //探测浏览器
            (s = ua.match(/msie ([\d.]+)/)) ? _set("ie", _toFixedVersion(s[1])):  
            (s = ua.match(/firefox\/([\d.]+)/)) ? _set("firefox", _toFixedVersion(s[1])) :  
            (s = ua.match(/chrome\/([\d.]+)/)) ? _set("chrome", _toFixedVersion(s[1])) :  
            (s = ua.match(/opera.([\d.]+)/)) ? _set("opera", _toFixedVersion(s[1])) :  
            (s = ua.match(/version\/([\d.]+).*safari/)) ? _set("safari", _toFixedVersion(s[1])) : 0;  

            function _toFixedVersion(ver, floatLength) {  
                ver = ('' + ver).replace(/_/g, '.');  
                floatLength = floatLength || 1;  
                ver = String(ver).split('.');  
                ver = ver[0] + '.' + (ver[1] || '0');  
                ver = Number(ver).toFixed(floatLength);  
                return ver;  
            }  
            function _set(bname, bver) {  
                name = bname;  
                ver = bver;  
            }  
            return (n === 'n' ? name : (n === 'v' ? ver : name + "-" + ver));
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
})