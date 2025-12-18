# Ebay Charity Shop

This is a site that is essentially a wrapper for ebay that helps you locate items that benefit charity.

Site is currently hosted at: https://charityshopusa.com

The backend code is written in Python using the Django Framework. The repo for that is here: https://github.com/bluenote28/CharityShopBackend

# Features

The site has an administration page that can only be viewed by users with an adminstrator account. From this page, you can see which charities are already in the database, add a new charity to the database, and view statistics of what is in the database.

<img width="1570" height="904" alt="image" src="https://github.com/user-attachments/assets/646b9a30-cb41-4f12-b2bd-bdc63a251406" />

<img width="1059" height="878" alt="image" src="https://github.com/user-attachments/assets/78be9c5c-ffd0-4c8c-9744-38275d7f37e2" />

Once a new charity is entered in the form pictured above, the backend will automatically load items from ebay into the database.

A user can search for all items in the database, filtering items by the charity the item supports, the item category, and a general word search.
The application paginates the results.

<img width="1565" height="848" alt="image" src="https://github.com/user-attachments/assets/5da6c364-ba02-4b31-b078-bb349db70fe9" />

A user can save items in a favorites list by clicking the star on the item listing:

<img width="347" height="402" alt="image" src="https://github.com/user-attachments/assets/1f364d67-1ddc-495c-8621-d5efa5628aea" />
<img width="329" height="395" alt="image" src="https://github.com/user-attachments/assets/30ba601f-3d2f-44bd-9843-4c7245edbf18" />

All saved listings can be viewed in the users favorite page: 

<img width="1741" height="835" alt="image" src="https://github.com/user-attachments/assets/7bac741e-7848-4ece-94c6-b31177de092b" />

# Roadmap

Things I am currently working on or plan to work on:

 - Integrate the application with Ebay's buy api so items can be purchased directly from the site.
 - Be able to save a user's favorite charitites.
 - A filter to see items only benefiting a user's favorite charities
 - The ability to host a fundraiser for a particular charity
 - The ability for a user to track how much their purchases have benefited charity
 - A recommmendation system based on the user's purchases and favorites






