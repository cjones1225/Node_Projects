const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Hello Express");
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;

    //2. validate the values
    if(!name) {
        //3. name was not provided
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        //3. race was not provided
        return res.status(400).send('Please provide a race');
    }

    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    //6. send the response 
    res.send(greeting);
});

app.get('/sum', (req,res) => {

    const a = req.query.a;
    const b = req.query.b;

    const sum = (Number(a) + Number(b));
    console.log(a);
    res.send(`The sum of ${Number(a)} + ${Number(b)} is ${sum}`);
})

app.get('/cipher', (req,res) => {
    var key = 3;
    var plaintext2 = '';
    var re = /[a-z]/;
    ciphertext = "";   

    const encode = plaintext => {
       
        for(i=0; i<plaintext.length; i++){ 
            if(re.test(plaintext.charAt(i))) ciphertext += String.fromCharCode((plaintext.charCodeAt(i) - 97 + key)%26 + 97); 
            else ciphertext += plaintext.charAt(i); 
        } 
        return ciphertext;
    }
    
    const decode = ciphertext => {
        
        for (i = 0; i < ciphertext.length; i++) {
            if (re.test(ciphertext.charAt(i))) plaintext2 += String.fromCharCode((ciphertext.charCodeAt(i) - 97 + 26 - key) % 26 + 97);
            else plaintext2 += ciphertext.charAt(i);
        }
        return plaintext2
    }

    const text = req.query.text;
    const shift = req.query.shift;

    res.send(text ? encode(text) : decode(shift))
});

app.get('/lotto', (req, res) => {
    
    const nums = req.query.arr;
    let correct = 0;
    for (i = 0; i < 6; i++) {

        const wins = Math.floor(Math.random() * 20) + 1;
        if (wins === nums[i]) correct++;


    }
    let award;
    if(correct === 4){
        award = 'Congratulations, you win a free ticket'
    }else if(correct=== 5){
        award = "Congratulations! You win $100!"
    }else if(correct === 6){
        award = "WOW"
    }else{
        award = 'Sorry, you lose!'
    }

    res.send(award);
})