let c_clear = new Vue({
    data: {
        name: "clear",
        usage: "",
        description: "Clear the terminal screen."
    },
    methods: {
        main: function() {
            commandHistory.prompts.splice(0,commandHistory.prompts.length);
            commandHistory.commands.splice(0,commandHistory.commands.length);
            commandHistory.results.splice(0,commandHistory.results.length);
            return "$EMPTY$";
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
});