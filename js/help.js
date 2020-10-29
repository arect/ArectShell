var c_help = new Vue({
    data: {
        commands: [{
            name: "cat",
            describe: "Usage: cat [FILE]...<br />Concatenate FILE(s) to standard output."
        },{
            name: "cd",
            describe: "cd: no such file or directory: --help<br />Just a joke."
        },{
            name: "clear",
            describe: "Usage: clear<br />Clear history."
        },{
            name: "help",
            describe: "Usage: help<br />List the commands which I want you to see."
        },{
            name: "html",
            describe: "Usage: html [FILE]...<br />Parse the HTML FILE(s)."
        },{
            name: "ls",
            describe: "Usage: ls [FILE/DIR]...<br />List the FILEs (the current directory by default)."
        },{
            name: "shutdown",
            describe: "Usage: shutdown<br />Switch to blank page."
        }]
    },
    methods: {
        helpBy__help: function(name) {
            for (let i of this.commands) {
                if (i.name === name) {
                    return [{isHtml: true, result: i.describe}];
                }
            }
            return [{isHtml: false, result: "-ArectShell: command not found: " + name}];
        },
        help: function(arr) {
            let temp = "<div>You can use following commands:</div>";
            for (let i of this.commands) {
                temp += "<div class = \"helpItem\">" + i.name + "</div>";
            }
            return [{isHtml: true, result: temp}];
        }
    }
});