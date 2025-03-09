
const { exec } = require('child_process');
const fs = require('fs');

const express = require('express')
const app = express()
const port = 80;

app.get('/:query?', (req, res) =>
{
    const fileData = ">placeholder\n" + req.query.gene;
    console.log(fileData);

    fs.writeFile('sequence.txt', fileData, function (err)
    {
        if (err) throw err;
        exec('/home/rbcerto/Sfold-main/bin/sfold sequence.txt', (error, stdout, stderr) =>
        {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            res.json({probabilities: [".9", ".75", ".2"]});
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});