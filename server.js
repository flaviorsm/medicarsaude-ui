const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/medicarsaude-ui'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/medicarsaude-ui/' }),
);

app.listen(process.env.PORT || 8080);