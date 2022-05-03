const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter The message</title></head>')
        res.write('<body><h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];//using const so that we can never re assign a new value like 'body ='
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //end will fire when it's done parsing the data
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });


    }

    res.setHeader('content-type', 'text/html');
    res.write('<html>')
    res.write('<body><h1>Hello from Node JS server</body>');
    res.write('</html>')
    res.end();//we can't write after end as nodejs will send it back to the client after this 


};

module.exports = requestHandler;