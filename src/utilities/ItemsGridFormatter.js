
export default function formatItemsIntoRows(data, numOfRows){
    
    let itemsWithRows = []
    let row = []

    for (let i = 0; i < data.length; i++) { 
        
        if (i > 0 && row.length % numOfRows === 0 && row.length > 0){

            itemsWithRows.push(row);
            row = [];
            row.push(data[i]) 
        }
        else{   
            row.push(data[i])
        }
    }

    if (row.length > 0){
        itemsWithRows.push(row);
    }

    return itemsWithRows
}