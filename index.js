"use strict";

let express = require("express");
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const longString = "----------------------------------------------------";

let port = process.env.PORT || 5005;
app.listen(port);
console.log("Server works on port " + port);
console.log(longString);

const users = [];

app.post('/*', (request, response) => {
    let bigString = "";
    request.on('data', (data) => {
        bigString += data;
    }).on('end', () => {
        const dataObj = JSON.parse(bigString);
        const mass = request.url.split("/");
        const operation = mass[1];

        console.log("Method: POST");
        console.log("Url: " + request.url);
        console.log("Operation: " + operation);
        console.log("Body: " + bigString);

	if(operation === "login") {
	    const loginField = dataObj.loginField;
            const passwordField = dataObj.passwordField;

	    for(let i = 0; i < users.length; i++) {
		const obj = users[i];
		if(obj.loginField === loginField && obj.passwordField === passwordField) {
		    const result = JSON.stringify({
                       message: "YES"
                    });
                    console.log("Result:" + result);
                    console.log(longString);
                    response.end(result);
                    return;
		}
	    }

	    const result = JSON.stringify({
                  message: "NO"
            });
            console.log("Result:" + result);
            console.log(longString);
            response.end(result);
            return;
	}

        if(operation === "signup") {
            const loginField = dataObj.loginField;
            const passwordField = dataObj.passwordField;

            for(let i = 0; i < users.length; i++) {
                const obj = users[i];
                if(obj.loginField === loginField) {
                    const result = JSON.stringify({
                       message: "NO"
                    });
                    console.log("Result:" + result);
                    console.log(longString);
                    response.end(result);
                    return;
                }
            }

            users.push({
                loginField: loginField,
                passwordField: passwordField
            });

            const result = JSON.stringify({
                message: "YES"
            });
            console.log("Result:" + result);
            console.log(longString);
            response.end(result);
        }

    });
});


