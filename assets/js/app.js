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
        topTen(sessionData);
        pieCharts(sessionData);
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
        title: 'Session Count of Current Students',
        barmode: 'stack',
        height: 500,
        margin: {
            l: 20,
            r: 0,
        },
    };

    Plotly.newPlot('curentStudents', currentStudentData, currentStudentlayout);
}

function topTen(data) {
    const names = [];
    data.forEach(obj => {
        if (!names.includes(obj['Student Name'])) {
            names.push(obj['Student Name']);
        };
    });

    const studentTallies = names.map(name => {
        //this is cool--think about it
        return sessionData.filter(obj => obj['Student Name'] == name).length;
    });

    const nameTally = names.map((name, i) => {
        return {
            name: name,
            tally: studentTallies[i]
        }
    }).sort((a, b) => b.tally - a.tally);
    const topTenTrace = {
        x: unpack(nameTally, 'name').slice(0, 10),
        y: unpack(nameTally, 'tally').slice(0, 10),
        type: 'bar',
        text: unpack(nameTally, 'tally').map(String),
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

    var topTenData = [topTenTrace];

    var topTenlayout = {
        title: 'Top 10',
        barmode: 'stack',
        height: 500,
        margin: {
            l: 20,
            r: 0,
        },
    };

    Plotly.newPlot('topTen', topTenData, topTenlayout);
}

function pieCharts(data) {
    const values = [data.filter(obj => obj['Back2Back (Y/N)'] == 'N').length, data.filter(obj => obj['Back2Back (Y/N)'] == 'Y').length]
    var pieData = [
        {
            values: values,
            labels: ['No', 'Yes'],
            type: 'pie',
            domain: {
                row: 0,
                column: 0
            },
            name: 'Back2Back',
            text: 'Back2Back',
        },
        {
            values: [10, 90],
            labels: ['No', 'Y'],
            type: 'pie',
            domain: {
                row: 0,
                column: 1
            }
        },
    ];

    var pieLayout = {
        height: 400,
        width: 500,
        grid: { rows: 1, columns: 2 }
    };

    Plotly.newPlot('b2b', pieData, pieLayout);
}
//charts that I want
    //anlysis on students with the most sessions of all time
    //analysis on CURRENT students