
const { exec } = require('child_process');
const fs = require('fs');

const express = require('express')
const app = express()
const port = 80;

app.get('/', (req, res) =>
{

});


app.get('/fold', (req, res) =>
{
    const fileData = ">MCHU - Calmodulin - Human, rabbit, bovine, rat, and chicken\n" + req.query.gene + "*";
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

            fs.readFile('output/oligo.out', 'utf8', (err, data) =>
            {
                const re = /\d+-.+/g;
                const rows = data.match(re);

                let responseData = [];
                for (let i = 0; i < rows.length; i++)
                {
                    let tmpBe = rows[i].match(/[\d|\.|-]+\d  \d$/)[0];

                    let rowData = {
                        start: rows[i].match(/^\d+/)[0],
                        end: rows[i].match(/(?: )(\d+)/)[0],
                        aso: rows[i].match(/[A-Z]+(?:  )/)[0],
                        gc: rows[i].match(/\d+\.\d%/)[0],
                        be: tmpBe.match(/[\d|\.|-]+\d/)[0],
                        gggg: rows[i].match(/\d+$/)[0]
                    };
                    responseData.push(rowData);
                }
                res.json({oligo: responseData});
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});