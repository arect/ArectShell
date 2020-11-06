let c_su = new Vue({
    data: {
        name: "su",
        usage: "[USERNAME]",
        description: "Switch users."
    },
    methods: {
        main: function(arr) {
            switch (arr.length) {
                case 1: {
                    prompt.username = "root";
                    prompt.authority = "#";
                    return [{isHtml: false, result: ""}];
                }
                case 2: {
                    for (let i of shell.users) {
                        if (i.name === arr[1]) {
                            prompt.username = i.name;
                            console.log()
                            if (prompt.username === "root") {
                                prompt.authority = "#";
                            }
                            else {
                                prompt.authority = "$";
                            }
                            return [{isHtml: false, result: ""}];
                        }
                    }
                    return [{isHtml: false, result: "su: user " + arr[1] + " does not exist"}];
                }
                default: {
                    return [{isHtml: false, result: "su: not supported"}];
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