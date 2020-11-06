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
                        else if (temp === "ERR_NO_SUCH_DIR_OR_FILE") {
                            return [{isHtml: false, result: "cd: no such file or directory: " + arr[1]}];
                        }
                        else return [{isHtml: false, result: "cd: " + temp + ": " + arr[1]}];
                    }
                    if (temp.type !== "dir") {
                        return [{isHtml: false, result: "cd: not a directory: " + arr[1]}];
                    }
                    prompt.directory.splice(0, prompt.directory.length);
                    while (temp.name !== "/") {
                        prompt.directory.unshift(temp.name);
                        temp = shell.findFather(temp);
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