var c_ls = new Vue({
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    let temp = prompt.getCurrentLocation();
                    let tempStr = ""
                    for (let i of temp.content) {
                        if (i.isDir === true) {
                            tempStr += "<div class = \"helpItem ls_dir\">" + i.name + "</div>";
                        }
                        else {
                            tempStr += "<div class = \"helpItem\">" + i.name + "</div>";
                        }
                    }
                    if (tempStr === "") {
                        tempStr += "<br />";
                    }
                    return [{isHtml: true, result: tempStr}];
                }
                default: {
                    let result = [];
                    for (let i = 1; i < arr.length; i++) {
                        let temp = prompt.enterTargetDir(arr[i]);
                        let tempStr = "";
                        if (Object.prototype.toString.call(temp) === "[object String]") {
                            if (temp === "ERR_PERMISSION_DENIED") {
                                result.push({isHtml: false, result: "ls: cannot open directory \'" + arr[i] + "\': Permission denied"});
                                continue;
                            }
                            result.push({isHtml: false, result: "ls: no such file or directory: " + arr[i]});
                            continue;
                        }
                        if (!temp.isDir) {
                            result.push({isHtml: true, result: temp.name});
                            continue;
                        }
                        if (arr.length > 2){
                            tempStr += arr[i] + ":<br />";
                        }
                        for (let ii of temp.content) {
                            if (ii.isDir === true) {
                                tempStr += "<div class = \"helpItem ls_dir\">" + ii.name + "</div>";
                            }
                            else {
                                tempStr += "<div class = \"helpItem\">" + ii.name + "</div>";
                            }
                        }
                        result.push({isHtml: true, result: tempStr + "<br />"});
                    }
                    return result;
                }
            }
        }
    }
});