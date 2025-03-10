
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
    const fileData = ">MCHU - Calmodulin - Human, rabbit, bovine, rat, and chicken\n" + req.query.gene;
    console.log(fileData);

    fs.writeFile('sequence.txt', fileData, function(err)
    {
        if (err) throw err;
        exec(`/home/rbcerto/Sfold-main/bin/sfold -i 2 -w ${req.query.aso_length} sequence.txt`, (error, stdout, stderr) =>
        {
            if (error)
            {
                console.error(`exec error: ${error}`);
                return;
            }
            if(stdout)
                console.log(`stdout: ${stdout}`);

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
                        end: rows[i].match(/\d+/g)[1],
                        aso: rows[i].match(/[A-Z]+/g)[1],
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
    console.log(`RM Fold app listening on port ${port}`)
});