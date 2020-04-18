function cleanSheets(data) {


    const rowArray = [];
    let tempRow = [];
    let counter = 1;
    data.feed.entry.forEach(obj => {
        const row = obj.gs$cell.row;
        if (row == counter) {
                tempRow.push(obj.gs$cell.$t)
        } else {
            rowArray.push(tempRow);
            tempRow = [];
            tempRow.push(obj.gs$cell.$t)
            counter++;
        }
    });
    const header = rowArray.splice(0, 1)[0];
    const finalArray = rowArray.map(arr => {
        let data = {};
        for (let i = 0; i < header.length; i++) {
            data[header[i]] = arr[i];
        };
        return data;
    });
    return finalArray;
}