# Ebay Charity Shop

This is a site that is essentially a wrapper for ebay that helps you locate items that benefit charity.

Site is currently hosted at: https://charityshopusa.com

The backend code is written in Python using the Django Framework. The repo for that is here: https://github.com/bluenote28/CharityShopBackend

# Features

The site has an administration page that can only be viewed by users with an adminstrator account. From this page, you can see which charities are already in the database, add a new charity to the database, and view statistics of what is in the database.

<img width="1885" height="888" alt="image" src="https://github.com/user-attachments/assets/bdc19a8c-a3da-44ea-8c90-2a28cd60ee62" />

<img width="1879" height="884" alt="image" src="https://github.com/user-attachments/assets/141378a5-8d33-4ddd-9c81-26ba0d3cccc4" />

Once a new charity is entered in the form pictured above, the backend will automatically load items from ebay into the database.

A user can search for all items in the database, filtering items by the charity the item supports, the item category, and a general word search.
The application paginates the results.

<img width="1867" height="838" alt="image" src="https://github.com/user-attachments/assets/daaf64d4-b5ad-4b78-bd33-f31b406ccf25" />

A user can save items in a favorites list by clicking the star on the item listing:

<img width="1592" height="346" alt="image" src="https://github.com/user-attachments/assets/dc3c1f74-0244-48c7-bc3a-7678c871efcb" />

<img width="1775" height="378" alt="image" src="https://github.com/user-attachments/assets/b9551b74-25e8-4b76-8fba-40b91aff7ed8" />

All saved listings can be viewed in the users favorite page: 

<img width="1911" height="880" alt="image" src="https://github.com/user-attachments/assets/4e4ca3b2-65c0-4134-827c-d8fceec27ec7" />


# Roadmap

Things I am currently working on or plan to work on:

 - Integrate the application with Ebay's buy api so items can be purchased directly from the site.
 - Be able to save a user's favorite charitites.
 - A filter to see items only benefiting a user's favorite charities
 - The ability to host a fundraiser for a particular charity
 - The ability for a user to track how much their purchases have benefited charity
 - A recommmendation system based on the user's purchases and favorites






