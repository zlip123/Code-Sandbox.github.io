const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.post('/runcode', (req, res) => {
    const code = req.body;
    const selectedLanguage = 'python'; // Default language is Python

    let command = '';
    switch (selectedLanguage) {
        case 'python':
            command = `python -c "${code}"`;
            break;
        case 'java':
            command = `java -Xmx256m -Xss512k -cp . Main`;
            break;
        case 'css':
            // Implement CSS execution logic here (if needed)
            break;
        default:
            res.status(400).send('Invalid language selection');
            return;
    }

    exec(command, (error, stdout, stderr) => {
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

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
