let c_echo = new Vue({
    data: {
        name: "echo",
        usage: "[STRING]",
        description: "Display a line of text.",
        local: [
            {name: "0", value: "-ArectShell"},
            {name: "PWD", value: ""},
            {name: "DEVICE", value: prompt.device},
            {name: "SHELL", value: "/usr/bin/ArectShell"},
            {name: "USER", value: prompt.username},
            {name: "USERNAME", value: prompt.username},
            {name: "ARECT", value: "A very handsome man."}
        ],
    },
    methods: {
        main: function(arr) {
            let temp = "";
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].substr(0, 1) === "$") {
                    let targetVar = arr[i].substr(1, arr[i].length);
                    for (let ii of this.local) {
                        if (ii.name === targetVar) {
                            switch (ii.name) {
                                case "PWD": {
                                    ii.value = prompt.getFullDir();
                                    break;
                                }
                                case "DEVICE": {
                                    ii.value = prompt.device;
                                    break;
                                }
                                case "USER": {
                                    ii.value = prompt.username;
                                    break;
                                }
                                case "USERNAME": {
                                    ii.value = prompt.username;
                                    break;
                                }
                                default: break;
                            }
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