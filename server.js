const express = require('express')//import express fw
const app = express()//spusteni expresu
const port = 80//definovani portu
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//import bodyParseru
const mysql = require('mysql2');//import modulu mysql



app.set('view engine', 'ejs');//pouzij sablonovaci system ejs
app.set('views', path.join(__dirname, 'views'));//sablony najdes v teto slozce
app.use(bodyParser.urlencoded({ extended: false }));//pouziti bodyparseru

const con = mysql.createConnection({
    host: '192.168.1.161', // Název nebo IP adresa serveru databáze
    user: 'martin.habal', // Uživatelské jméno
    password: 'mojetajneheslo22', // Heslo
    database: 'martin.habal', // Název databáze
    port: 3001
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/', (req, res) => {//home routa

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users LEFT JOIN info ON users.user_id = info.info_id;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.render('index', { result });
        });
      });

})

app.get('/newuser', (req, res) => {//home routa
  res.render('newuser');
})

app.get('/getvar', (req, res) => {//pres get
  const data = req.query.jmeno
  res.send(data);
})

app.post('/saveuser', (req, res) => {

  let { jmeno, prijmeni } = req.body

  const sqlQuery = `INSERT INTO users (fname, lname) VALUES ('${jmeno}', '${prijmeni}')`;

  con.connect(function(err) {
      if (err) throw err;
      con.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       res.sendStatus(200)
      });
    });

})

app.listen(port, () => {//spustni serveru
  console.log(`Nyní moje webová aplikace běží ${port}`)
})