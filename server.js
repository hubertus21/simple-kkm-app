const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



  function parseTicketHistory(txt){
    let patterns = [];
    patterns.push("Rodzaj biletu\: \<b\>(.*)\<\/b\>");
    patterns.push("Data i godzina zakupu\: \<b\>(.*) \<\/b\>");
    patterns.push("Numer klienta\: \<b\>(.*) \<\/b\>");
    patterns.push("Data początku ważności\: \<b\>(.*) \<\/b\>");
    patterns.push("Data końca ważności\: \<b\>(.*)\<\/b\>");

    let transposeArr = function(array){
      return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    };
    
    let regexps = patterns.map(pttn => new RegExp(pttn, "mg"));
    let matches = regexps.map(exp => [...txt.matchAll(exp)]);
    let onlyGroups = matches.map(match => match.map(
      lineMatch => lineMatch[1]
    ));
    let tickets = transposeArr(onlyGroups);
    return tickets.map( ticket =>
      {
        return {
        ticketType : ticket[0],
        bought : Date.parse(ticket[1]),
        clientNr : ticket[2],
        startDate : Date.parse(ticket[3]),
        endDate : Date.parse(ticket[4])
      }});
  };
  app.get('/api/history/:kkmNumber', function (req, res) {
    const kkmNumber = req.params.kkmNumber;
    if(kkmNumber === 'random'){
      let year = Math.floor(Math.random()*3) + 2013;
        if(year === 2014){
          res.send({tickets : []});
        }else{
          res.send({tickets : [{
            ticketType : 'Typ wymyślny',
            bought : new Date(year,2,2),
            clientNr : "Wymyślony klient",
            startDate : new Date(2012,2,2),
            endDate : new Date(2012,2,3)
          }]});
        }
        return
    }


    axios.get('http://mpk.krakow.pl/pl/sprawdz-waznosc-biletu/index,1.html',{
      params : {
        cityCardType : 0,
        dateValidity : '2010-01-01',
        identityNumber : '',
        cityCardNumber : kkmNumber,
        sprawdz_kkm : 'Sprawd%C5%BA'
      }
    }).then((rsp) => {
        let txtResponse = rsp.data;
        res.send({tickets : parseTicketHistory(txtResponse)});
        
      }).catch((err) => {
        console.error(err);
        res.send({tickets : []})
      })
    });

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.get('/dpcheck', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  app.get('/list', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(process.env.PORT || 8080);
