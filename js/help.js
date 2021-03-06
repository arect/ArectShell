let c_help = new Vue({
    data: {
        data: {
            name: "help",
            usage: "[COMMAND]",
            description: "List the commands which I want you to see."
        },
    },
    methods: {
        main: function() {
            let temp = "<div>You can use following commands:</div>";
            for (let i of inputCommand.command) {
                temp += "<div class = \"helpItem\">" + i.name + "</div>";
            }
            return [{isHtml: true, result: temp}];
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: help"},
                {isHtml: false, result: "List the commands which I want you to see."}
            ];
        }
    }
});