
const { exec } = require('child_process');

const express = require('express')
const app = express()
const port = 80;

app.get('/:query?', (req, res) =>
{
    console.log(req.query);

    exec('/home/rbcerto/Sfold-main/bin/sfold sequence.txt', (error, stdout, stderr) =>
    {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

    res.send("Data");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});