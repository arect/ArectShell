let template = new Vue({
    data: {
        name: "template",
        usage: "[]",
        description: "A template for developing your command.",
        temp1: "Hello, world!",
        temp2: "<h1>Hello, world!</h1>"
    },
    methods: {
        main: function (arr) {
            let result = [];
            // ...
            result.push({isHtml: false, result: this.temp1});
            result.push({isHtml: true, result: this.temp2});
            let str = "";
            for (let i of arr) {
                str += i;
            }
            result.push({isHtml: false, result: "You just input: " + str});
            return result;
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: false, result: this.description}
            ];
        }
    }
})