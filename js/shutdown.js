var c_shutdown = new Vue({
    methods: {
        shutdown: function(arr) {
            window.location.href = "about:blank";
            return [{isHtml: false, result: ""}];
        }
    }
});