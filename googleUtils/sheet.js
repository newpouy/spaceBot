var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var Futures = require("futures")

var SheetUtils = function (){
  var doc = new GoogleSpreadsheet('1ZqSaFQAjE5zs9zHqYBTnpxO468iZLvU3SJbG5RdaCvI');
  var sheet;
  var creds = require('../spaceBot-224968307243.json');

  doc.useServiceAccountAuth(creds, function(){
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.dir(sheet);
    });
  });

  this.insertRow = function(date, time, duration, roomNum, peopleNum, resName, payYN){
      console.log('hihi');
      doc.addRow('od6', {
          '일자' : date,
          '시각' : time,
          '시간' : duration,
          '방번호' : roomNum,
          '인원' : peopleNum,
          '예약자' : resName,
          '결제여부' : payYN
        }, function(result, err){
          consoel.log(result);
        })
  }
}
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      limit: 20,
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
      // the row is an object with keys set by the column headers
      rows[0].colname = 'new val';
      rows[0].save(); // this is async
    });
  }

  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cells.value);
    });
  }

  function managingSheets(step) {
    doc.addWorksheet({
      title: 'my new sheet'
    }, function(err, sheet) {
      sheet.setTitle('new title'); //async
      sheet.resize({rowCount: 50, colCount: 20}); //async
      sheet.setHeaderRow(['name', 'age', 'phone']); //async
    });
  }
//var testUtil = new SheetUtils();
var testUtil = new SheetUtils();
testUtil.insertRow('20160808','1000','2','R1','10','나','N');
