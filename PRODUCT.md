# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who want to buy something and have that purchase benefit a charity. They arrive looking for an item, looking for a charity to shop for, or both. Confirmed: search-by-item and shop-by-charity are the same job and are not ranked.

Sellers and charities are not the primary users. The admin surface is for the site operator.

## Product Purpose

Charity Shop is a website dedicated to helping people find opportunities to make purchases that benefit charity. The main catalog highlights items from the eBay for Charity program: search, browse categories, and shop by nonprofit in one place. Checkout is completed on eBay. The site also maintains a directory of other shops besides eBay where purchases can benefit charity.

Success is a visitor finding a listing or shop they will actually buy from, knowing which nonprofit benefits.

## Positioning

eBay for Charity already exists, but eBay’s own Charity Shop is hard to find and cannot do a general search such as “all Nintendo items that benefit charity,” nor filter that search to one nonprofit. Charity Shop is the discovery layer that makes those paths possible.

## Operating Context

- Home: pick a category, then a more specific type of item.
- Header search across eBay for Charity listings.
- Charities: search the nonprofit list, open one, then search or filter its listings.
- Item page: photos, price, shipping, condition, seller, charity, donation share, AI listing summary, then **Go to item on eBay**.
- Signed-in shoppers (Google): star items and charities on a Watch List; **Favorite charities only** on search and category pages; after leaving for eBay, optionally record a purchase.
- Shop assistant chat is available on every page.
- Footer: About, Other Charity Shops directory.
- Production site: https://charityshopusa.com
- Backend: Django API in the sibling CharityShopBackend repo; this repo is the React frontend.

## Capabilities and Constraints

- The catalog is eBay for Charity listings served by the backend. Charity Shop does not complete the purchase.
- Sign-in is Google-only. Browsing the catalog does not require an account.
- Watch List stores starred items and charities. Purchase history is self-reported after the shopper visits eBay.
- Admin can add charities and view catalog stats; it is an operator tool, not part of the shopper product.
- UI terminology: Watch List, eBay for Charity, Other Charity Shops / directory, shop assistant.
- Do not invent charities, donation percentages, testimonials, or impact numbers. Listing charity and donation share come from eBay/backend data.
- Roadmap, not current product: in-site purchase via eBay Buy API, hosted fundraisers, recommendations.
- Inferred (not separately confirmed this round): keep the Charity Shop name and existing logos; purchases remain on eBay until an in-site buy path ships.

## Brand Commitments

Name: **Charity Shop** (page title and live site). README also calls it “Ebay Charity Shop”; shopper-facing name is Charity Shop.

Confirmed assets: `src/images/charityShopLogo.png`, `src/images/footerlogo.png`, `public/favicon.ico`.

Voice in current product copy is plain and explanatory: what the site is for, how eBay for Charity works, how to use the site. No hype, no fabricated proof.

Standing visual preference (2026-09-23): the shopper product sits in the category-standard marketplace, executed straight, with **eBay** and **Amazon** as the craft bar. Not a donation poster, not an experimental identity.

## Evidence on Hand

- Live site: https://charityshopusa.com
- Product copy: `src/pages/About.js`
- Logos: `src/images/charityShopLogo.png`, `src/images/footerlogo.png`
- Other shops: `src/constants/directoryConstants.js`
- Listing and charity facts come from the backend, not from frontend copy
- No testimonials, case studies, or measured impact claims are on hand; future work must not fabricate them

## Product Principles

1. Discover here; buy where the listing actually lives.
2. Which charity benefits, and by how much, is a first-class fact of every listing — never decoration or an invented claim.
3. Item-first and charity-first are one shopper job; both paths stay first-class.
4. Guests can complete the discovery job; accounts add memory (Watch List, filters, recorded purchases), not access to the catalog.
5. Do not compete with eBay’s checkout; compete with eBay’s weak charity discovery.
