const express = require('express');
const app = express();
const port = 3000;
const DIST_PATH = '/dist';

app.use(express.static(`${__dirname}${DIST_PATH}`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
