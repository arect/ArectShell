let c_clear = new Vue({
    data: {
        name: "clear",
        usage: "",
        description: "Clear history."
    },
    methods: {
        main: function() {
            commandHistory.prompts.splice(0,commandHistory.prompts.length);
            commandHistory.commands.splice(0,commandHistory.commands.length);
            commandHistory.results.splice(0,commandHistory.results.length);
            return [{isHtml: false, result: ""}];
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});