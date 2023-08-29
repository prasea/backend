const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/failure', (req, res) => {
  res.redirect('/');
})
app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);

  const list_id = "37ebfbba6c";
  const dc = "us10";
  const req2URL = `https://${dc}.api.mailchimp.com/3.0/lists/${list_id}`;
  const options = {
    method: 'POST',
    auth: 'prasea:e46c4409d2f2d5e91edec42b421ce777-us100'
  }
  const request = https.request(req2URL, options, response => {
    if (response.statusCode === 200)
      res.sendFile(__dirname + "/views/success.html")
    else
      res.sendFile(__dirname + "/views/failure.html")
  });
  request.write(jsonData);
  request.end();//To specify we're done with request
})
app.listen(2000, () => console.log("Listening on PORT 2000"))