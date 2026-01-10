export function convertIdToCharityName(charities, id){

    for (let i = 0; i < charities.length; i++){

        if (charities[i].id === id){

            return charities[i].name;

        }
    }

    return null;

}

export function covertUrlToAffiliateLink(link){
    return link + "?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339132551&customid=&toolid=10001&mkevt=11"
}