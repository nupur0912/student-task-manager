const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
        <h1>Student Task Manager</h1>
        <p>Application is running successfully inside Docker!</p>
    `);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});
