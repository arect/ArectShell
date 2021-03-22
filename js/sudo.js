let c_sudo = new Vue({
    data: {
        name: "sudo",
        usage: "[]",
        description: "sudo",
        command: []
    },
    methods: {
        main: function (arr) {
            if (mode.sign === "root") {
                this.command.splice(0, 1)
                inputCommand.select(this.command)
                this.command = []
                mode.normal()
            }
            for (let i of shell.users) {
                if (i.name === prompt.username) {
                    if (arr === i.password) {
                        mode.sign = "root"
                        this.command.splice(0, 1)
                        inputCommand.select(this.command)
                        this.command = []
                        mode.normal()
                    }
                }
            }
        },
        help: function () {
            return [
                {isHtml: false, result: ""}
            ];
        }
    }
})