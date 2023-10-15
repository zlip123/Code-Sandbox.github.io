const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.post('/runcode', (req, res) => {
    const code = req.body;

    // Run Python code using child_process
    exec('python -c "' + code + '"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`Output: ${stdout}`);
            console.error(`Error Output: ${stderr}`);
            res.send(stdout);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
