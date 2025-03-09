
const { exec } = require('child_process');

exec('./home/rbcerto/Sfold-main/bin/sfold ', (error, stdout, stderr) =>
{
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

    const express = require('express')
const app = express()
const port = 3000

app.get('/:query?', (req, res) =>
{
    console.log(req.query);

    exec('./home/rbcerto/Sfold-main/bin/sfold sequence.txt', (error, stdout, stderr) =>
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