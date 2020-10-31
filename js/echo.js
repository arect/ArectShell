let c_echo = new Vue({
    data: {
        name: "echo",
        usage: "[STRING]",
        description: "Display a line of text."
    },
    methods: {
        main: function(arr) {
            let temp = "";
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].substr(0, 1) === "$") {
                    let targetVar = arr[i].substr(1, arr[i].length);
                    for (let ii of shell.local) {
                        if (ii.name === targetVar) {
                            temp += ii.value+ " ";
                        }
                    }
                }
                else {
                    temp += arr[i] + " ";
                }
            }
            return [{isHtml: false, result: temp}];
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});