let c_pft = new Vue({
    data: {
        name: "pft",
        usage: "",
        description: "Display all dirs and files.",
        tab: "&emsp;",
        syb: "┗"
    },
    methods: {
        main: function (arr) {
            return [{isHtml: true, result: this.f(shell.fileTree, 0)}]
        },
        f: function (arr, level) {
            let tabs = ""
            for (let i = 0; i < level; i++) {
                tabs = tabs + this.tab
            }
            let result = ""
            for (let i of arr.content) {
                if (i.type !== "dir") {
                    result = result + tabs + this.syb + i.name + "<br />"
                }
                if (i.type === "dir") {
                    result = result + tabs + this.syb + "<span class='ls_dir'>" + i.name + "</span>" + "<br />"
                    result = result + this.f(i, level + 1)
                }
            }
            return result
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
})