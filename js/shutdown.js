let c_shutdown = new Vue({
    data: {
        name: "shutdown",
        usage: "",
        description: "Switch to blank page.",
    },
    methods: {
        main: function() {
            window.location.href = "about:blank";
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