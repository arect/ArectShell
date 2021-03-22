let c_rm = new Vue({
    data: {
        name: "rm",
        usage: "[FILE/DIR]",
        description: "Delete something",
    },
    methods: {
        main: function (arr) {
            switch (arr.length){
                case 1: {
                    return [{isHtml: true, result: "rm: missing file operand<br />Try 'rm --help' for more information."}]
                }
                default: {
                    let msg = []
                    for (let i = 1; i < arr.length; i++) {
                        let t = shell.enterTargetDir(arr[i])
                        if (Object.prototype.toString.call(t) === "[object String]") {
                            msg.push({isHtml: false, result: "rm: cannot remove '" + arr[i] + "': No such file or directory"})
                        }
                        else {
                            if (shell.permission(t).indexOf("w") === -1) {
                                msg.push({isHtml: false, result: "rm: cannot remove '" + arr[i] + "': Permission denied"})
                            }
                            else {
                                if (t.type === "dir") {
                                    msg.push({isHtml: false, result: "rm: cannot remove '" + arr[i] + "': Is a directory"})
                                }
                                else {
                                    let f = shell.findFather(t)
                                    let index = f.content.findIndex(item => item === t)
                                    f.content.splice(index, 1)
                                }
                            }
                        }
                    }
                    return msg
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