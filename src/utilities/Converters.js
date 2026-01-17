export function convertIdToCharityName(charities, id){

    for (let i = 0; i < charities.length; i++){

        if (charities[i].id === id){

            return charities[i].name;

        }
    }

    return null;

}

export function covertUrlToAffiliateLink(link){
    return link.split("?")[0] + "?amdata=enc%3AAQAKAAAAoFu2GTm2ZGNVXFEsdeNYg5JtV0Mb9vSX--sSMCpph7rYoRXJSjeipe1eovEk1WjxgnuPFJmsfFO%2FlScyT89lDhVFR%2BLKsYsfesJCWUvXtlJtlL8%2Bmk5l%2BEsu0sMS3aaDGjMTkMDtvhvFgqR2%2B%2BHOoJZtMFN1P9wzCR61ANbN5M2LtDraWr%2BlI2qGWzE6UWhduBWbzGye8Bc4ULIT3AVAggM%3D&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339132551&customid=&toolid=10001&mkevt=1"
}

export function convertItemPageImageUrl(url){
    
    if (url == null){
        return
    }
    
    return url.replace("s-l225.jpg", "s-l1600.jpg")
}