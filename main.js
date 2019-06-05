//load libs
const express = require('express');
const hbs = require('express-handlebars')

//assign port
const PORT = 3000;

//create instance
const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const roll = (count = 1) => {
    let result = [];
    for (let i = 0; i < count; i++ ) {
        let d = Math.floor(Math.random()*6)+1
        result.push(d);
    }
    return (result);
}

//routes
app.get('/dice', (req,res) => {
    let r = parseInt(req.get('X-Dice-Count')) || 1;
    if (r <= 0) {
        res.status(400);
        res.type(test/plain);
        res.send(`number cannot be -ve ${r}`);
        return;
    }
    let diceRoll = roll(r)
    res.status(200);
    res.format ({
        'text/html': () => {
            res.render('dice', {dices: diceRoll , layout: false});
        },
        'text/plain': () => {
            res.send(diceRoll.join(','));
        },
        'application.json': () => {
            res.json({rolls:diceRoll});
        },
        'default' : () => {
            res.status(406);
            res.send('Could not return requested image');
        }
    })
})

app.get(/.*/, express.static(__dirname + '/number')),

//listen
app.listen(PORT,()=> {
    console.info(`Application started at ${new Date()} on port ${PORT}`)
})
