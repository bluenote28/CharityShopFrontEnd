export function convertIdToCharityName(charities, id){

    for (let i = 0; i < charities.length; i++){

        if (charities[i].id === id){

            return charities[i].name;

        }
    }

    return null;

}

const AFFILIATE_PARAMS = {
    mkcid: '1',
    mkrid: '711-53200-19255-0',
    siteid: '0',
    campid: '5339132551',
    customid: '',
    toolid: '10001',
    mkevt: '1',
}

export function ebayLegacyItemId(listingId) {
    if (listingId == null || listingId === '') {
        return ''
    }
    const value = String(listingId).trim()
    const match = value.match(/^v\d+\|(\d+)(?:\|\d+)?$/i)
    if (match) {
        return match[1]
    }
    return value
}

export function ebayListingUrl(listingId, webUrl) {
    if (typeof webUrl === 'string' && /^https?:\/\//i.test(webUrl.trim())) {
        return webUrl.trim()
    }
    const itemId = ebayLegacyItemId(listingId)
    if (!itemId) {
        return ''
    }
    return `https://www.ebay.com/itm/${itemId}`
}

export function covertUrlToAffiliateLink(link) {
    if (!link) {
        return link
    }
    try {
        const url = new URL(link)
        url.searchParams.delete('amdata')
        Object.entries(AFFILIATE_PARAMS).forEach(([key, value]) => {
            url.searchParams.set(key, value)
        })
        return url.toString()
    } catch {
        const base = String(link).split('?')[0]
        const params = new URLSearchParams(AFFILIATE_PARAMS)
        return `${base}?${params.toString()}`
    }
}

export function convertItemPageImageUrl(url){
    
    if (url == null){
        return
    }
    
    return url.replace("s-l225.jpg", "s-l1600.jpg")
}