let c_sudo = new Vue({
    data: {
        name: "sudo",
        usage: "[]",
        description: "sudo"
    },
    methods: {
        main: function (arr) {
            for (let i of shell.users) {
                if (i.name === prompt.username) {
                    console.log(arr)
                    console.log(i.password)
                    if (arr[0] === i.password) {
                        mode.isActive = false
                        return [{isHtml: false, result: "Success"}]
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