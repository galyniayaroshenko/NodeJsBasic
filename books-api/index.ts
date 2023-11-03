import http from "http";
import { bootstrap } from "./server";
import { Express } from "express";

bootstrap().then((app: Express) => {
    const server = http.createServer(app);

    const { API_PORT } = process.env;
    const port = API_PORT || 8080;

    // server listening
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
