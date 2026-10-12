const http = require("http");
const client = require("prom-client");

const PORT = 3000;

// Enable default Node.js metrics
client.collectDefaultMetrics();

// Create HTTP request counter
const httpRequestCounter = new client.Counter({
    name: "task_manager_http_requests_total",
    help: "Total HTTP requests received"
});

// Create HTTP server
const server = http.createServer(async (req, res) => {

    // Prometheus metrics endpoint
    if (req.url === "/metrics") {
        try {
            res.writeHead(200, {
                "Content-Type": client.register.contentType
            });

            res.end(await client.register.metrics());
        } catch (error) {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Error generating metrics");
        }

        return;
    }

    // Count application requests, excluding metrics scraping
    httpRequestCounter.inc();

    // Student Task Manager application
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>Student Task Manager</h1>
        <p>Application is running successfully inside Docker!</p>
    `);
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});
