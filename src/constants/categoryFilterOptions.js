
export const CATEGORY_OPTIONS = [

        {value: null, label: "All Categories"},
        {value: "clothing", label: "Clothing, Shoes & Accessories"},
        {value: "collectibles", label: "Collectibles"},
        {value: "tvAndMovies", label: "Movies & TV"},
        {value: "toys", label: "Toys & Hobbies"},
        {value: "videoGames", label: "Video Games & Consoles"},
        {value: "computer", label: "Computers/Tablets & Networking"},
        {value: "jewelry", label: "Jewelry & Watches"},
        {value: "books", label: "Books & Magazines"},
        {value: "crafts", label: "Crafts"},
        {value: "sportingGoods", label: "Sporting Goods"},
        {value: "homeGarden", label: "Home & Garden"},
        {value: "art", label: "Art"},
        //{value: "Pottery & Glass", label: "Pottery & Glass"},
        //{value: "Home Décor", label: "Home Décor"},
        //{value: "Business & Industrial", label: "Business & Industrial"},
        //{value: "eBay Motors", label: "eBay Motors"},
        //{value: "Music Memorabilia", label: "Music Memorabilia"},
]

export const FILTER_OPTIONS = {

        "Movies & TV" : [{label: "DVD", subCategory: "DVDs & Blu-ray Discs", filter: "DVD"}, 
                        {label: "Blu-ray", subCategory: "DVDs & Blu-ray Discs", filter: "Blu-ray"}, 
                        {label: "TV Shows",subCategory: "DVDs & Blu-ray Discs", filter: "season"},
                        {label: "VHS Tapes",subCategory: "VHS Tapes", filter: null},
                        {label: "Film Stock",subCategory: "Film Stock", filter: null},
                        {label: "Other Formats",subCategory: "Other Formats", filter: null}
                ],

        "Video Games & Consoles": [
        {label: "Xbox Games", subCategory: "Video Games", filter: "xbox"},
        {label: "Nintendo Games", subCategory: "Video Games", filter: "nintendo"},
        {label: "Playstation Games", subCategory: "Video Games", filter: "playstation"},
        {label: "Xbox Consoles", subCategory: "Video Game Consoles", filter: "xbox"},
        {label: "Nintendo Consoles", subCategory: "Video Game Consoles", filter: "nintendo"},
        {label: "PlayStation Consoles", subCategory: "Video Game Consoles", filter: "playstation"},
        {label: "Controllers & Attachments", subCategory: "Controllers & Attachments", filter: null},
        {label: "Video Game Merchandise", subcategory: "Video Game Merchandise", filter: null},
        {label: "Headsets", subCategory: "Headsets", filter: null},
        {label: "Original Game Cases & Boxes", subCategory: "Original Game Cases & Boxes", filter: null}
     ],

       "Computers/Tablets & Networking": [
        { label: "Desktops & All-In-Ones", subCategory: "Desktops & All-In-Ones", filter: null},
        { label: "PC Laptops & Netbooks", subCategory: "PC Laptops & Netbooks", filter: null},
        { label: "Tablets & eBook Readers", subCategory: "Tablets & eBook Readers", filter: null},
        { label: "Apple Laptops", subCategory: "Apple Laptops", filter: null},
        { label: "Apple Desktops & All-In-Ones", subCategory: "Apple Desktops & All-In-Ones", filter: null},
        { label: "Monitors", subCategory: "Monitors", filter: null},
        { label: "Printers", subCategory: "Printers", filter: null},
        { label: "Laptop Replacement Parts", subCategory: "Laptop Replacement Parts", filter: null},
        { label: "Graphics/Video Cards", subCategory: "Graphics/Video Cards", filter: null},
        { label: "Enterprise Networking, Servers", subCategory: "Enterprise Networking, Servers", filter: null},                    
        ],

        "Clothing, Shoes & Accessories": [    
                {label: "Womens's Clothing", subCategory: "Womens's Clothing", filter: null},
                {label: "Women's Bags & Handbags", subCategory: "Women's Bags & Handbags", filter: null},
                {label: "Girls", subCategory: "Girls", filter: null}, 
                {label: "Boys", subCategory: "Boys", filter: null},
                {label: "Men", subCategory: "Men", filter: null},
                {label: "Men's Clothing", subCategory: "Men's Clothing", filter: null},
                {label:"Baby & Toddler Clothing", subCategory: "Baby & Toddler Clothing", filter: null}
            ],

        "Crafts": [
        {label: "Sewing", subCategory: "Sewing", filter: null},
        {label: "Quilting", subCategory: "Quilting", filter: null},
        {label: "Embroidery & Cross Stitch", subCategory: "Embroidery & Cross Stitch", filter: null},
        {label: "Kids' Crafts", subCategory: "Kids' Crafts", filter: null},
        {label: "Craft Kits", subCategory: "Craft Kits", filter: null}
        ],

        "Jewelry & Watches": [
        {label: "Rings", subCategory: "Rings", filter: null},
        {label: "Watches", subCategory: "Rings", fitler: null},
        {label: "Earrings", subCategory: "Earrings", filter: null},
        {label: "Bracelets & Charms", subCategory: "Bracelets & Charms", filter: null}
        ],

        "Books & Magazines": [
        {label: "Textbooks", subCategory: "Textbooks", filter: null},
        {label: "Magazines", subCategory: "Magazines", filter: null},
        {label: "Books", subCategory: "Books", filter: null},
        {label: "Antiquarian & Collectible", subCategory: "Antiquarian & Collectible", filter: null},
        {label: "Audiobooks", subCategory: "Audiobooks", filter: null},
        {label: "Study Guides & Test Prep", subCategory: "Study Guides & Test Prep", filter: null},
        {label: "Dictionaries & Reference", subCategory: "Dictionaries & Reference", filter: null}],

        "Toys & Hobbies": [
        {label: "Action Figures", subCategory: "Action Figures", filter: null},
        {label: "Fisher Price",subCategory: "Fisher Price", filter: null},
        {label: "Disney", subCategory: "Disney", filter: null},
        {label: "LEGO (R) Complete Sets & Packs", subCategory: "LEGO (R) Complete Sets & Packs", filter: null},
        {label: "LEGO (R) Building Toys", subCategory: "LEGO (R) Building Toys", filter: null},
        {label: "LEGO (R) Bricks, Pieces & Parts", subCategory: "LEGO (R) Bricks, Pieces & Parts", filter: null},
        {label: "Puzzles", subCategory: "Puzzles", filter: null},
        {label: "Electronic Games", subCategory: "Electronic Games", filter: null},
        {label: "Models & Kits", subCategory: "Models & Kits", filter: null},
        {label: "Cars: Racing, NASCAR", subCategory: "Cars: Racing, NASCAR", filter: null},
        {label: "Star Wars", subCategory: "Star Wars", filter: null}
        ],

        "Collectibles": [
        { label: "Sports Trading Cards", subCategory: "Sports Trading Cards", filter: null},
        { label: "Non-Sport Trading Cards", subCategory: "Non-Sport Trading Cards", filter: null},
        { label: "Trading Card Lots", subCategory: "Trading Card Lots", filter: null},
        { label: "Comics", subCategory: "Comics", filter: null},
        { label: "Coins", subCategory: "Coins", filter: null},
        { label: "Collectible Figures & Bobbleheads", subCategory: "Collectible Figures & Bobbleheads", filter: null},
        { label: "Coca-Cola", subCategory: "Coca-Cola", filter: null},
        { label: "Disney", subCategory: "Disney", filter: null},
        { label: "Postcards", subCategory: "Postcards", filter: null},
        { label: "Stamps", subCategory: "Stamps", filter: null},
        { label: "Baseball-MLB", subCategory: "Baseball-MLB", filter: null},
        { label: "Football-NFL", subCategory: "Football-NFL", filter: null}, 
        { label: "Basketball-NBA", subCategory: "Basketball-NBA", filter: null}, 
        { label: "Hockey-NHL", subCategory: "Hockey-NHL", filter: null}, 
        { label: 'Antique (Pre-1900)', subCategory: "Antique (Pre-1900)", filter: null},
        { label: "Civil War (1861-65)", subCategory: "Civil War (1861-65)", filter: null},
        { label: "Advertising", subCategory: "Advertising", filter: null},
        { label: "Records", subCategory: "Records", filter: null},
        { label: "Star Wars Collectibles", subCategory: "Star Wars Collectibles", filter: null},
        { label: "Patches, Pins & Buttons", subCategory: "Patches, Pins & Buttons", filter: null}],

         "Sporting Goods": [
        {label: "Football", subCategory: "Football", filter: null},
        {label: "Basketball", subCategory: "Basketball", filter: null},
        {label: "Baseball", subCategory: "Baseball", filter: null},
        {label: "Golf", subCategory: "Golf", filter: null},
        {label: "Soccer", subCategory: "Soccer", filter: null},
        {label: "Tennis", subCategory: "Tennis", filter: null},
        {label: "Cycling", subCategory: "Cycling", filter: null},
        {label: "Skateboarding & Longboarding", subCategory: "Skateboarding & Longboarding", filter: null},
        {label: "Fishing", subCategory: "Fishing", filter: null},
        {label: "Hunting", subCategory: "Hunting", filter: null},
        {label: 'Ice Skating', subCategory: "Ice Skating", filter: null}
        ],

        "Home & Garden": [
        {label: "Candles & Home Fragrance", subCategory: "Candles & Home Fragrance", filter: null},
        {label: "Glassware & Drinkware", subCategory: "Glassware & Drinkware", filter: null},
        {label: "Flatware, Knives & Cutlery", subCategory: "Flatware, Knives & Cutlery", filter: null},
        {label: "Dinnerware & Serveware", subCategory: "Dinnerware & Serveware", filter: null},
        {label: "Kitchen Tools & Gadgets", subCategory: "Kitchen Tools & Gadgets", filter: null},
        {label: "Coffee, Tea & Espresso Makers",subCategory: "Coffee, Tea & Espresso Makers", filter: null},
        {label: "Bakeware", subCategory: "Bakeware", filter: null},
        {label: "Cookware", subCategory: "Cookware", filter: null},
        {label: "Grills & Griddles", subCategory: "Grills & Griddles", filter: null},
        {label: "Wall Décor", subCategory: "Wall Décor", filter: null},
        {label: "Furniture", subCategory: "Furniture", filter: null},
        {label: "Bedding", subCategory: "Bedding", filter: null},
        {label: "Kitchen, Dining & Bar", subCategory: "Kitchen, Dining & Bar", filter: null},
        {label: "Small Kitchen Appliances", subCategory: "Small Kitchen Appliances", filter: null},
        {label: "Patio & Garden Furniture", subCategory: "Patio & Garden Furniture", filter: null},
        {label: "Garden Hand Tools & Equipment", subCategory: "Garden Hand Tools & Equipment", filter: null},
        {label: "Plants, Seeds & Bulbs", subCategory: "Plants, Seeds & Bulbs", filter: null},
        {label: "Plant Care, Soil & Accessories", subCategory: "Plant Care, Soil & Accessories", filter: null},
        {label: "Herbs, Spices & Seasonings", subCategory: "Herbs, Spices & Seasonings", filter: null},
        ],

        "Art": [
        {label: "Art Prints", subCategory: "Art Prints", filter: null},
        {label: "Paintings", subCategory: "Paintings", filter: null},
        {label: "Art Sculptures", subCategory: "Art Sculptures", filter: null},
        {label: "Art Posters", subCategory: "Art Posters", filter: null},
        {label: "Mixed Media Art & Collage Art", subCategory: "Mixed Media Art & Collage Art", filter: null},
        {label: "Other Art", subCategory: "Other Art", filter: null},
        {label: "Art Photographs", subCategory: "Art Photographs", filter: null},
        {label: "Art Drawings", subCategory: "Art Drawings", filter: null},
        {label: "Art NFTs", subCategory: "Art NFTs", filter: null},
        {label: "Textile Art & Fiber Art", subCategory: "Textile Art & Fiber Art", filter: null}
        ]  



}