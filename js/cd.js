let c_cd = new Vue({
    data: {
        name: "cd",
        usage: "[DIR]",
        description: "Switch to current working directory."
    },
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    this.main(["cd", "~"]);
                    return [{isHtml: false, result: ""}];
                }
                case 2: {
                    let temp = shell.enterTargetDir(arr[1]);
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
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});