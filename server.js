const xml = require("fast-xml-parser");
const fs = require('fs');
const http = require("http");

let host = 'localhost';
let port = 8000;

let xmlFile = 'data.xml';
let totalIncome = 'BS2_IncomeTotal';
let totalExpenses = 'BS2_ExpensesTotal';


const xmlData = fs.readFileSync(xmlFile, 'utf-8');
const parser = new xml.XMLParser();
const jsonData = parser.parse(xmlData);




const filteredData = {
    data: {
      indicators: []
    }
  };
  

  for (const item of jsonData.indicators.banksincexp) {
    if (item.id_api === totalIncome || item.id_api === totalExpenses) {
      filteredData.data.indicators.push({
        txt: item.txt,
        value: item.value
      });
    }
  }

const builder = new xml.XMLBuilder();
const xmlStr = builder.build(filteredData);


const server = http.createServer(function(req,res){
    res.setHeader('Content-type', 'text/xml');
    res.setHeader('Access-Controll-Allow-Origin', "*");
    res.writeHead(200); 
    res.end(xmlStr);
});

server.listen(port,host, function(){
    console.log(`Listening on port ${port}`)
})