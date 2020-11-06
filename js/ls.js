let c_ls = new Vue({
    data: {
        name: "ls",
        usage: "[FILE/DIR]...",
        description: "List the FILEs (the current directory by default)."
    },
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    let temp = shell.getCurrentLocation();
                    let tempStr = ""
                    for (let i of temp.content) {
                        if (i.type === "dir") {
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
                        let temp = shell.enterTargetDir(arr[i]);
                        let tempStr = "";
                        if (Object.prototype.toString.call(temp) === "[object String]") {
                            if (temp === "ERR_PERMISSION_DENIED") {
                                result.push({isHtml: false, result: "ls: cannot open directory \'" + arr[i] + "\': Permission denied"});
                                continue;
                            }
                            result.push({isHtml: false, result: "ls: no such file or directory: " + arr[i]});
                            continue;
                        }
                        if (temp.type  !== "dir") {
                            result.push({isHtml: true, result: temp.name});
                            continue;
                        }
                        if (arr.length > 2){
                            tempStr += arr[i] + ":<br />";
                        }
                        for (let ii of temp.content) {
                            if (ii.type === "dir") {
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
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});