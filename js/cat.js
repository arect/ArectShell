var c_cat = new Vue({
    methods: {
        cat: function(arr) {
            switch (arr.length) {
                case 1: {
                    return [{isHtml: true, result: "<span style = \"color: #E91E63;\">喵~</span>"}];
                    break;
                }
                default: {
                    let result = [];
                    for (let i = 1; i < arr.length; i++) {
                        let temp = prompt.enterTargetDir(arr[i]);
                        if (Object.prototype.toString.call(temp) == "[object String]") {
                            if (temp == "ERR_PERMISSION_DENIED") {
                                result.push({isHtml: false, result: "cat: " + arr[i] + ": Permission denied"});
                                continue;
                            }
                            result.push({isHtml: false, result: "cat: " + arr[i] + ": No such file or directory"});
                            continue;
                        }
                        if (temp.isDir) {
                            result.push({isHtml: false, result: "cat: " + arr[i] + ": Is a directory"});
                            continue;
                        }
                        for (let ii of temp.content) {
                            result.push({isHtml: false, result: ii});
                        }
                    }
                    return result;
                }
            }
        }
    }
});