export function convertIdToCharityName(charities, id){

    for (let i = 0; i < charities.length; i++){

        if (charities[i].id === id){

            return charities[i].name;

        }
    }

    return null;

}