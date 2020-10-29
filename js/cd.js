var c_cd = new Vue({
    methods: {
        cd: function(arr) {
            switch (arr.length) {
                case 1: {
                    return [{isHtml: false, result: ""}];
                }
                case 2: {
                    let temp = prompt.enterTargetDir(arr[1]);
                    if (Object.prototype.toString.call(temp) === "[object String]") {
                        if (temp === "ERR_PERMISSION_DENIED") {
                            return [{isHtml: false, result: "cd: permission denied: " + arr[1]}];
                        }
                        return [{isHtml: false, result: "cd: no such file or directory: " + arr[1]}];
                    }
                    if (!temp.isDir) {
                        return [{isHtml: false, result: "cd: not a directory: " + arr[1]}];
                    }
                    let target = arr[1].replace(new RegExp('^\\/+|\\/+$', 'g'), '').split("/");
                    if (target[0] === "~") {
                        prompt.directory.splice(0,prompt.directory.length);
                    }
                    for (let i of target) {
                        if (i === ".") {
                            continue;
                        }
                        if (i === "..") {
                            prompt.directory.pop();
                            continue;
                        }
                        prompt.directory.push(i);
                    }
                    return [{isHtml: false, result: ""}];
                }
                default: {
                    return [{isHtml: false, result: "cd: string not in pwd: " + arr[1]}];
                }
            }
        }
    }
});