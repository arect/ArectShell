let c_html = new Vue({
    data: {
        name: "html",
        usage: "[FILE]...",
        description: "Parse the HTML FILE(s)."
    },
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    return [{isHtml: false, result: ""}];
                }
                default: {
                    let result = [];
                    for (let i = 1; i < arr.length; i++) {
                        let temp = prompt.enterTargetDir(arr[i]);
                        if (Object.prototype.toString.call(temp) === "[object String]") {
                            if (temp === "ERR_PERMISSION_DENIED") {
                                result.push({isHtml: false, result: "html: " + arr[i] + ": Permission denied"});
                                continue;
                            }
                            result.push({isHtml: false, result: "html: " + arr[i] + ": No such file or directory"});
                            continue;
                        }
                        if (temp.isDir) {
                            result.push({isHtml: false, result: "html: " + arr[i] + ": Is a directory"});
                            continue;
                        }
                        for (let ii of temp.content) {
                            result.push({isHtml: true, result: ii});
                        }
                    }
                    return result;
                }
            }
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});