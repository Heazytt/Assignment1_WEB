const express = require('express');
const app = express();
const urlencodedParser = express.urlencoded({extended: false})

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(_, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    let height = parseFloat(req.body.userHeight) / 100;
    let weight = parseFloat(req.body.userWeight);
    let bmi = weight / (height * height);
    let status = '';

    if (isNaN(bmi) || !isFinite(bmi)){
        return res.send('Invalid input data');
    }

    if (bmi < 18.5){
        status = 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 24.9){
        status = 'Normal weight';
    }
    else if (bmi >= 25 && bmi < 29.9){
        status = 'Overweight';
    }
    else {
        status = 'Obese';
    }    

    res.render('response.ejs', {bmi: bmi.toFixed(2), status: status});
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});


