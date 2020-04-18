console.log('js is loaded');
let myData;

const googleSheetURL1 = `https://spreadsheets.google.com/feeds/cells/${WORKBOOK}/1/public/full?alt=json`;
const googleSheetURL2 = `https://spreadsheets.google.com/feeds/cells/${WORKBOOK}/2/public/full?alt=json`;
d3.json(googleSheetURL1).then(data => {
    myData= cleanSheets(data);
    console.log(myData);
});

d3.json(googleSheetURL2).then(data => {
    console.log(data)
    myData= cleanSheets(data);
    console.log(myData);
});

//charts that I want
    //anlysis on students