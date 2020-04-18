console.log('js is loaded');
let sessionData;
let currentStudents;

const googleSheetURL1 = `https://spreadsheets.google.com/feeds/cells/${WORKBOOK}/1/public/full?alt=json`;
const googleSheetURL2 = `https://spreadsheets.google.com/feeds/cells/${WORKBOOK}/2/public/full?alt=json`;
d3.json(googleSheetURL1).then(data => {
    sessionData = cleanSheets(data);
    console.log(sessionData);
    d3.json(googleSheetURL2).then(data => {
        currentStudents = cleanSheets(data);
        console.log(currentStudents);
        currentStudentAnalysis(currentStudents);
    });
});


function unpack(data, key) {
    return data.map(obj => obj[key]);
}

function currentStudentAnalysis(data) {
    const names = unpack(data, 'Student Name');
    const studentTallies = names.map(name => {
        return sessionData.filter(obj => obj['Student Name'] == name).length;
    });

    const currentTrace = {
        x: names,
        y: studentTallies,
        type: 'bar',
        text: studentTallies.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    var currentStudentData = [currentTrace];

    var currentStudentlayout = {
        title: 'January 2013 Sales Report',
        barmode: 'stack',
        height: 500,
        margin: {
            l: 20,
            r: 0,
          },
    };

    Plotly.newPlot('curentStudents', currentStudentData, currentStudentlayout);
}

//charts that I want
    //anlysis on students with the most sessions of all time
    //analysis on CURRENT students