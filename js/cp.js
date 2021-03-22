let c_cp = new Vue({
    data: {
        name: "cp",
        usage: "[FILE/DIR] [PATH]",
        description: "Copy files and directories"
    },
    methods: {
        main: function (arr) {
            switch (arr.length) {
                case 1: {
                    return [{isHtml: true, result: "cp: missing file operand<br />Try 'cp --help' for more information."}]
                }
                case 2: {
                    return [{isHtml: true, result: "cp: missing destination file operand after \'" + arr[1] + "\'<br />Try 'cp --help' for more information."}]
                }
                case 3: {
                    // 获取被复制的文件指针
                    const file = shell.enterTargetDir(arr[1])
                    // 无效路径
                    if (Object.prototype.toString.call(file) === "[object String]") {
                        return [{isHtml: false, result: "cp: cannot stat \'" + arr[1] + "\': No such file or directory"}]
                    }
                    // 如果复制的是文件夹
                    if (file.type === "dir") {
                        return [{isHtml: false, result: "cp: omitting directory \'" + file.name + "\'"}]
                    }
                    // 获得目标文件夹指针
                    let dir = shell.enterTargetDir(arr[2])
                    // 复制后文件名
                    let _name = ""
                    // 深拷贝文件
                    let temp = JSON.parse(JSON.stringify(file))
                    // 如果目的地址无效
                    let fullPath = arr[2]
                    if (Object.prototype.toString.call(dir) === "[object String]") {
                        // 可能是路径加名字
                        // 截取名字
                        _name = arr[2].substring(arr[2].lastIndexOf("/") + 1)
                        // 截取目标路径
                        arr[2] = arr[2].substring(0, arr[2].lastIndexOf("/") + 1)
                        // 获取指针
                        dir = shell.enterTargetDir(arr[2])
                        // 路标地址仍然无效
                        if (Object.prototype.toString.call(dir) === "[object String]") {
                            return [{isHtml: false, result: "cp: cannot create regular file \'" + arr[2] + _name + "\': No such file or directory"}]
                        }
                        // 重命名文件
                        temp.name = _name
                        fullPath = arr[2] + _name
                    }
                    else {
                        // 保存文件名字
                        if (temp.type === "dir") {
                            _name = temp.name
                        }
                        else {
                            // 此时大概会覆盖吧
                            _name = dir.name
                        }
                        // 获得复制文件的完整路径
                        if (arr[2].lastIndexOf("/") === arr[2].length - 1) {
                            fullPath = arr[2] + _name
                        }
                        else {
                            fullPath = arr[2] + "/" + _name
                        }
                    }
                    // 如果有写权限
                    if (shell.permission(dir).indexOf("w") !== -1) {
                        // 如果路径为文件夹
                        if (dir.type === "dir") {
                            for (let i of dir.content) {
                                // 如果目标目录有同名文件，则覆盖
                                if (i.name === temp.name) {
                                    // 覆盖
                                    dir.name = _name
                                    dir.type = temp.type
                                    dir.content = temp.content
                                    dir.owner = temp.owner
                                    dir.permission = temp.permission
                                    break
                                }
                            }
                            dir.content.push(temp)
                        }
                        // 如果是文件，则覆盖
                        else {
                            // 如果是同文件
                            if (file === dir) {
                                return [{isHtml: false, result: "cp: '" + arr[1] + "' and '" + arr[2] + "' are the same file"}]
                            }
                            // 覆盖
                            dir.name = _name
                            dir.type = temp.type
                            dir.content = temp.content
                            dir.owner = temp.owner
                            dir.permission = temp.permission
                        }
                    }
                    // 如果无权限
                    else {
                        return [{isHtml: false, result: "cp: cannot create regular file \'" + fullPath + "\': Permission denied"}]
                    }
                    return [{isHtml: false, result: ""}]
                }
                default: {
                    return [{isHtml: false, result: "cp: too many arguments"}]
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