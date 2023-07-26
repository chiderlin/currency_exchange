const express = require('express');
const app = express();
const PORT = process.env.PORT | 8000;
const HOST = '127.0.0.1';
const router = require('./routes');

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
