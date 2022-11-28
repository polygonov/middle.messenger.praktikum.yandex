const express = require('express');
const app = express();
const DIST_PATH = '/dist';
process.env.PORT = '3000';

app.use(express.static(`${__dirname}` + `${DIST_PATH}`));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
