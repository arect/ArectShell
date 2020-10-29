var c_clear = new Vue({
    methods: {
        main: function() {
            commandHistory.prompts.splice(0,commandHistory.prompts.length);
            commandHistory.commands.splice(0,commandHistory.commands.length);
            commandHistory.results.splice(0,commandHistory.results.length);
            return [{isHtml: false, result: ""}];
        }
    }
});