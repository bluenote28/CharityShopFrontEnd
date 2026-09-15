import {
  covertUrlToAffiliateLink,
  ebayLegacyItemId,
  ebayListingUrl,
} from './Converters'

describe('ebay listing URLs', () => {
  test('does not put Browse API ids on ebay.com/itm', () => {
    const browseId = 'v1|336123456789|0'
    const url = ebayListingUrl(browseId)

    expect(url).toBe('https://www.ebay.com/itm/336123456789')
    expect(url).not.toContain('v1|')
    expect(url).not.toMatch(/\/itm\/v\d+\|/)
  })

  test('uses the stored listing URL instead of synthesizing one', () => {
    const webUrl = 'https://www.ebay.com/itm/Vintage-Lamp/336123456789?hash=item4d8abc'
    expect(ebayListingUrl('v1|336123456789|0', webUrl)).toBe(webUrl)
  })

  test('keeps a numeric ebay id as the itm path', () => {
    expect(ebayLegacyItemId('336123456789')).toBe('336123456789')
    expect(ebayListingUrl('336123456789')).toBe('https://www.ebay.com/itm/336123456789')
  })

  test('affiliate links stay on the numeric item and do not reuse listing amdata', () => {
    const listingUrl = ebayListingUrl('v1|336123456789|0')
    const affiliateUrl = new URL(covertUrlToAffiliateLink(listingUrl))

    expect(affiliateUrl.origin + affiliateUrl.pathname).toBe('https://www.ebay.com/itm/336123456789')
    expect(affiliateUrl.searchParams.has('amdata')).toBe(false)
    expect(affiliateUrl.searchParams.get('campid')).toBe('5339132551')
    expect(affiliateUrl.searchParams.get('mkevt')).toBe('1')
  })
})
