let c_date = new Vue({
    data: {
        name: "date",
        usage: "[OPTION]",
        description: "Print the system date and time.<br /><br />&ensp;&ensp;-u&ensp;Print Coordinated Universal Time (UTC)"
    },
    methods: {
        main: function (arr) {
            let d = new Date();
            let date;
            let temp;
            if (arr.length === 1){
                date = d.toString().split(/\s+/);
                temp = date[0] + " " + date[1] + " " + date[2] + " " + date[4] + " " + date[5].substr(0, 3) + " " + date[3];
            }
            else if (arr.length === 2 && arr[1] === "-u") {
                date = d.toUTCString().split(/\s+/);
                temp = date[0].substr(0, 3) + " " + date[2] + " " + date[1] + " " + date[4] + " " + "UTC" + " " + date[3];
            }
            else {
                temp = "date: invalid option: " + arr[1];
            }
            return [{isHtml: false, result: temp}]
        },
        help: function () {
            return [
                {isHtml: false, result: "Usage: " + this.name + " " + this.usage},
                {isHtml: true, result: this.description}
            ];
        }
    }
})