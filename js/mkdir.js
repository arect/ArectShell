let c_mkdir = new Vue({
    data:{
        name: "mkdir",
        usage: "DIRECTORY",
        description: "Create the DIRECTORY, if they do not already exist.",
        banList: [
            "<",
            ">",
            "&",
            "#",
            "$",
            "/",
            "\\",
            "%",
            "@",
            "^",
            "*",
            "~",
            "\`",
            "\"",
            "\'",
            "/",
            "?",
            "!"
        ]
    },
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    return [{isHtml: false, result: ""}];
                }
                case 2: {
                    if (arr[1].substr(0, 1) === "/") {
                        arr = arr[1].trim().replace(new RegExp('^\\/+|\\/+$', 'g'), '').split("/");
                        arr.unshift("/");
                    }
                    else {
                        arr = arr[1].trim().replace(new RegExp('^\\/+|\\/+$', 'g'), '').split("/");
                    }
                    if (Object.prototype.toString.call(arr) === "[object String]") {
                        arr = arr.trim().replace(new RegExp('^\\/+|\\/+$', 'g'), '').split("/");
                    }
                    let target = arr.pop();
                    if (target !== undefined) {
                        for (let i of this.banList) {
                            if (target.indexOf(i) !== -1) {
                                return [{isHtml: false, result: "mkdir: invalid name: " + target}];
                            }
                        }
                    }
                    console.log(arr);
                    let loc = shell.enterTargetDir(arr);
                    if (loc === "ERR_NO_SUCH_DIR_OR_FILE") {
                        let temp = "";
                        for (let i of arr) {
                            temp += i;
                        }
                        return [{isHtml: false, result: "mkdir: no such directory: " + temp}];
                    }
                    if (loc === "ERR_PERMISSION_DENIED") {
                        let temp = "";
                        for (let i of arr) {
                            temp += i;
                        }
                        return [{isHtml: false, result: "mkdir: permission denied: " + temp}];
                    }
                    for (let i of loc.content) {
                        if (i.name === target) {
                            return [{isHtml: false, result: "mkdir: cannot create directory `" + target + "`: File exists"}];
                        }
                    }
                    if (shell.permission(loc).indexOf("w") !== -1) {
                        loc.content.push({
                            name: target,
                            isDir: true,
                            owner: prompt.username,
                            permission: ["rwx", "rwx", "rx"],
                            content: []
                        });
                    }
                    else return [{isHtml: false, result: "mkdir: cannot create directory `" + target + "`: Permission denied"}];
                    return [{isHtml: false, result: ""}];
                }
                default: {
                    return [{isHtml: false, result: "mkdir: Does not support creating multiple folders at the same time"}];
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
})