
export const CATEGORY_OPTIONS = [

        {value: null, label: "All Categories"},
        {value: "womensClothing", label: "Women's Clothing"},
        {value: "mensClothing", label: "Men's Clothing"},
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
        {value: "homeDecor", label: "Home Décor"},
        {value: "art", label: "Art"},
        {value: "ebayMotors", label: "eBay Motors"},
        //{value: "Pottery & Glass", label: "Pottery & Glass"},
        //{value: "Business & Industrial", label: "Business & Industrial"},
        //{value: "Music Memorabilia", label: "Music Memorabilia"},
]

export const FILTER_OPTIONS = {

        "Movies & TV" : [{label: "DVD", subCategory: "DVDs & Blu-ray Discs", filter: null, search: null}, 
                        {label: "Blu-ray", subCategory: "DVDs & Blu-ray Discs", filter: null, search: "Blu-ray"}, 
                        {label: "TV Shows",subCategory: "DVDs & Blu-ray Discs", filter: null, search: "season"},
                        {label: "VHS Tapes",subCategory: "VHS Tapes", filter: null, search: null},
                        {label: "Film Stock",subCategory: "Film Stock", filter: null, search: null},
                        {label: "Other Formats",subCategory: "Other Formats", filter: null, search: null}
                ],

        "Video Games & Consoles": [
        {label: "Xbox Games", subCategory: "Video Games", filter: null, search: "xbox"},
        {label: "Nintendo Games", subCategory: "Video Games", filter: null, search: "nintendo"},
        {label: "Playstation Games", subCategory: "Video Games", filter: null, search: "playstation"},
        {label: "Xbox Consoles", subCategory: "Video Game Consoles", filter: null, search: "xbox"},
        {label: "Nintendo Consoles", subCategory: "Video Game Consoles", filter: null, search: "nintendo"},
        {label: "PlayStation Consoles", subCategory: "Video Game Consoles", filter: null, search: "playstation"},
        {label: "Controllers & Attachments", subCategory: "Controllers & Attachments", filter: null, search: null},
        {label: "Video Game Merchandise", subCategory: "Video Game Merchandise", filter: null, search: null},
        {label: "Headsets", subCategory: "Headsets", filter: null, search: null},
        {label: "Original Game Cases & Boxes", subCategory: "Original Game Cases & Boxes", filter: null, search: null}
     ],

       "Computers/Tablets & Networking": [
        { label: "Desktops & All-In-Ones", subCategory: "Desktops & All-In-Ones", filter: null, search: null},
        { label: "PC Laptops & Netbooks", subCategory: "PC Laptops & Netbooks", filter: null, search: null},
        { label: "Tablets & eBook Readers", subCategory: "Tablets & eBook Readers", filter: null, search: null},
        { label: "Apple Laptops", subCategory: "Apple Laptops", filter: null, search: null},
        { label: "Apple Desktops & All-In-Ones", subCategory: "Apple Desktops & All-In-Ones", filter: null, search: null},
        { label: "Monitors", subCategory: "Monitors", filter: null, search: null},
        { label: "Keyboards, Mice & Pointers", subCategory: "Keyboards, Mice & Pointers", filter: null, search: null},
        { label: "Printers", subCategory: "Printers", filter: null, search: null},
        { label: "Drives, Storage & Blank Media", subCategory: "Drives, Storage & Blank Media", filter: null, search: null},
        { label: "Laptop Replacement Parts", subCategory: "Laptop Replacement Parts", filter: null, search: null},
        { label: "Graphics/Video Cards", subCategory: "Graphics/Video Cards", filter: null, search: null},
        { label: "Wireless Routers", subCategory: "Wireless Routers", filter: null, search: null},
        { label: "Enterprise Networking, Servers", subCategory: "Enterprise Networking, Servers", filter: null, search: null},                   
        ],

        "Women's Clothing": [
                //{label: "Women's Clothing", subCategory: "Women's Clothing", filter: null, search: null},
                {label: "Tops", subCategory: "Tops", filter: null, search: null},
                {label: "Pants", subCategory: "Pants", filter: "Women", search: null},
                {label: "Shorts", subCategory: "Shorts", filter: "Women", search: null},
                {label: "Dresses", subCategory: "Dresses", filter: null, search: null},
                {label: "Skirts", subCategory: "Skirts", filter: null, search: null},
                {label: "Coats, Jackets & Vests", subCategory: "Coats, Jackets & Vests", filter: 'women', search: null},
                {label: "Jeans", subCategory: "Jeans", filter: 'women', search: null},
                {label: "Shoes", subCategory: "Women's Shoes", filter: null, search: null},
                {label: "Activewear", subCategory: "Activewear", filter: "Women", search: null},
                {label: "Accessories", subCategory: "Women's Accessories", filter: null, search: null},
                {label: "Bags & Handbags", subCategory: "Women's Bags & Handbags", filter: null, search: null}
            ], //Jumpsuits & Rompers 
             //Suits & Suits Separates
             //Sweaters
             //Pantyhose & Tights
             //Bras & Bra Sets

        "Men's Clothing": [
                {label: "Men's Clothing", subCategory: "Men's Clothing", filter: null, search: null},
                {label: "Shirts", subCategory: "Shirts", filter: "Men", search: null},
                {label: "Casual Button-Down Shirts", subCategory: "Casual Button-Down Shirts", filter: "Men", search: null},
                {label: "Polos", subCategory: "Polos", filter: "Men", search: null},
                {label: "T-Shirts", subCategory: "T-Shirts", filter: "Men", search: null},
                {label: "Sweaters", subCategory: "Sweaters", filter: "Men", search: null},
                {label: "Pants", subCategory: "Pants", filter: 'Men', search: null},
                {label: "Shoes", subCategory: "Men's Shoes", filter: null, search: null},
                {label: "Hats", subCategory: "Hats", filter: "Men", search: null},
                {label: "Sunglasses", subCategory: "Sunglasses & Sunglasses Accessories", filter: "Men", search: null},
                {label: "Underwear", subCategory: "Underwear", filter: "Men", search: null},
                {label: "Coats, Jackets & Vests", subCategory: "Coats, Jackets & Vests", filter: 'Men', search: null},
                {label: "Ties", subCategory: "Ties", filter: "Men", search: null},
                {label: "Suits & Suit Separates", subCategory: "Suits & Suit Separates", filter: "Men", search: null},
                {label: "Wallets", subCategory: "Wallets", filter: "Men", search: null},
                {label: "Belts", subCategory: "Belts", filter: "Men", search: null},
                {label: "Socks", subCategory: "Socks", filter: "Men", search: null},
                {label: "Bags", subCategory: "Bags", filter: "Men", search: null},
            ],

        "Crafts": [
        {label: "Sewing", subCategory: "Sewing", filter: null, search: null},
        {label: "Quilting", subCategory: "Quilting", filter: null, search: null},
        {label: "Embroidery & Cross Stitch", subCategory: "Embroidery & Cross Stitch", filter: null, search: null},
        {label: "Kids' Crafts", subCategory: "Kids' Crafts", filter: null, search: null},
        {label: "Craft Kits", subCategory: "Craft Kits", filter: null, search: null}
        ],

        "Jewelry & Watches": [
        {label: "Rings", subCategory: "Rings", filter: null, search: null},
        {label: "Watches", subCategory: "Rings", fitler: null, search: null},
        {label: "Earrings", subCategory: "Earrings", filter: null, search: null},
        {label: "Bracelets & Charms", subCategory: "Bracelets & Charms", filter: null, search: null}
        ],

        "Books & Magazines": [
        {label: "Textbooks", subCategory: "Textbooks", filter: null, search: null},
        {label: "Magazines", subCategory: "Magazines", filter: null, search: null},
        {label: "Books", subCategory: "Books", filter: null, search: null},
        {label: "Cook Books", subCategory: "Books", filter: null, search: "cookbook"},
        {label: "Antiquarian & Collectible", subCategory: "Antiquarian & Collectible", filter: null, search: null},
        {label: "Audiobooks", subCategory: "Audiobooks", filter: null, search: null},
        {label: "Study Guides & Test Prep", subCategory: "Study Guides & Test Prep", filter: null, search: null},
        {label: "Dictionaries & Reference", subCategory: "Dictionaries & Reference", filter: null, search: null}],

        "Toys & Hobbies": [
        {label: "Action Figures", subCategory: "Action Figures", filter: null, search: null},
        {label: "Fisher Price",subCategory: "Fisher Price", filter: null, search: null},
        {label: "Disney", subCategory: "Disney", filter: null, search: null},
        {label: "LEGO (R) Complete Sets & Packs", subCategory: "LEGO (R) Complete Sets & Packs", filter: null, search: null},
        {label: "LEGO (R) Building Toys", subCategory: "LEGO (R) Building Toys", filter: null, search: null},
        {label: "LEGO (R) Bricks, Pieces & Parts", subCategory: "LEGO (R) Bricks, Pieces & Parts", filter: null, search: null},
        {label: "Puzzles", subCategory: "Puzzles", filter: null, search: null},
        {label: "Electronic Games", subCategory: "Electronic Games", filter: null, search: null},
        {label: "Models & Kits", subCategory: "Models & Kits", filter: null, search: null},
        {label: "Cars: Racing, NASCAR", subCategory: "Cars: Racing, NASCAR", filter: null, search: null},
        {label: "Star Wars", subCategory: "Star Wars", filter: null, search: null}
        ],

        "Collectibles": [
        { label: "Sports Trading Cards", subCategory: "Sports Trading Cards", filter: null, search: null},
        { label: "Non-Sport Trading Cards", subCategory: "Non-Sport Trading Cards", filter: null, search: null},
        { label: "Trading Card Lots", subCategory: "Trading Card Lots", filter: null, search: null},
        { label: "Comics", subCategory: "Comics", filter: null, search: null},
        { label: "Coins", subCategory: "Coins", filter: null, search: null},
        { label: "Collectible Figures & Bobbleheads", subCategory: "Collectible Figures & Bobbleheads", filter: null, search: null},
        { label: "Coca-Cola", subCategory: "Coca-Cola", filter: null, search: null},
        { label: "Disney", subCategory: "Disney", filter: null, search: null},
        { label: "Postcards", subCategory: "Postcards", filter: null, search: null},
        { label: "Stamps", subCategory: "Stamps", filter: null, search: null},
        { label: "Baseball-MLB", subCategory: "Baseball-MLB", filter: null, search: null},
        { label: "Football-NFL", subCategory: "Football-NFL", filter: null, search: null}, 
        { label: "Basketball-NBA", subCategory: "Basketball-NBA", filter: null, search: null}, 
        { label: "Hockey-NHL", subCategory: "Hockey-NHL", filter: null, search: null}, 
        { label: 'Antique (Pre-1900)', subCategory: "Antique (Pre-1900)", filter: null, search: null},
        { label: "Civil War (1861-65)", subCategory: "Civil War (1861-65)", filter: null, search: null},
        { label: "Advertising", subCategory: "Advertising", filter: null, search: null},
        { label: "Records", subCategory: "Records", filter: null, search: null},
        { label: "Star Wars Collectibles", subCategory: "Star Wars Collectibles", filter: null, search: null},
        { label: "Patches, Pins & Buttons", subCategory: "Patches, Pins & Buttons", filter: null, search: null}],

         "Sporting Goods": [
        {label: "Football", subCategory: "Football", filter: null, search: null},
        {label: "Basketball", subCategory: "Basketball", filter: null, search: null},
        {label: "Baseball", subCategory: "Baseball", filter: null, search: null},
        {label: "Golf", subCategory: "Golf", filter: null, search: null},
        {label: "Soccer", subCategory: "Soccer", filter: null, search: null},
        {label: "Tennis", subCategory: "Tennis", filter: null, search: null},
        {label: "Cycling", subCategory: "Cycling", filter: null, search: null},
        {label: "Skateboarding & Longboarding", subCategory: "Skateboarding & Longboarding", filter: null, search: null},
        {label: "Fishing", subCategory: "Fishing", filter: null, search: null},
        {label: "Hunting", subCategory: "Hunting", filter: null, search: null},
        {label: 'Ice Skating', subCategory: "Ice Skating", filter: null, search: null}
        ],

        "Home & Garden": [
        {label: "Candles & Home Fragrance", subCategory: "Candles & Home Fragrance", filter: null, search: null},
        {label: "Glassware & Drinkware", subCategory: "Glassware & Drinkware", filter: null, search: null},
        {label: "Flatware, Knives & Cutlery", subCategory: "Flatware, Knives & Cutlery", filter: null, search: null},
        {label: "Dinnerware & Serveware", subCategory: "Dinnerware & Serveware", filter: null, search: null},
        {label: "Kitchen Tools & Gadgets", subCategory: "Kitchen Tools & Gadgets", filter: null, search: null},
        {label: "Coffee, Tea & Espresso Makers",subCategory: "Coffee, Tea & Espresso Makers", filter: null, search: null},
        {label: "Bakeware", subCategory: "Bakeware", filter: null, search: null},
        {label: "Cookware", subCategory: "Cookware", filter: null, search: null},
        {label: "Grills & Griddles", subCategory: "Grills & Griddles", filter: null, search: null},
        {label: "Wall Décor", subCategory: "Wall Décor", filter: null, search: null},
        {label: "Furniture", subCategory: "Furniture", filter: null, search: null},
        {label: "Bedding", subCategory: "Bedding", filter: null, search: null},
        {label: "Kitchen, Dining & Bar", subCategory: "Kitchen, Dining & Bar", filter: null, search: null},
        {label: "Small Kitchen Appliances", subCategory: "Small Kitchen Appliances", filter: null, search: null},
        {label: "Patio & Garden Furniture", subCategory: "Patio & Garden Furniture", filter: null, search: null},
        {label: "Garden Hand Tools & Equipment", subCategory: "Garden Hand Tools & Equipment", filter: null, search: null},
        {label: "Plants, Seeds & Bulbs", subCategory: "Plants, Seeds & Bulbs", filter: null, search: null},
        {label: "Plant Care, Soil & Accessories", subCategory: "Plant Care, Soil & Accessories", filter: null, search: null},
        {label: "Herbs, Spices & Seasonings", subCategory: "Herbs, Spices & Seasonings", filter: null, search: null},
        ],

        "Home Décor": [
        {label: "Wall Décor", subCategory: "Wall Décor", filter: null, search: null},
        {label: "Pillows", subCategory: "Pillows", filter: null, search: null},
        {label: "Rugs & Carpets", subCategory: "Rugs & Carpets", filter: null, search: null},
        {label: "Clocks", subCategory: "Clocks", filter: null, search: null},
        {label: "Mirrors", subCategory: "Mirrors", filter: null, search: null},
        {label: "Picture Frames", subCategory: "Picture Frames", filter: null, search: null},
        {label: "Vases", subCategory: "Vases", filter: null, search: null},
        {label: "Lamps & Lighting", subCategory: "Lamps", filter: null, search: null},
        {label: "Posters & Prints", subCategory: "Posters & Prints", filter: null, search: null},
        {label: "Plaques & Signs", subCategory: "Plaques & Signs", filter: null, search: null},
        {label: "Decals, Stickers & Vinyl Art", subCategory: "Decals, Stickers & Vinyl Art", filter: null, search: null},
        {label: "Baskets", subCategory: "Baskets", filter: null, search: null},
        {label: "Sculptures & Figurines", subCategory: "Sculptures & Figurines", filter: null, search: null},

        ],

        "eBay Motors": [
        {label: "Motorcycles", subCategory: "Motorcycles", filter: null, search: null},
        {label: "Air Conditioning & Heating", subCategory: "Air Conditioning & Heating", filter: null, search: null},
        {label: "Antennas", subCategory: "Antennas", filter: null, search: null},
        {label: "Air Intake & Fuel Delivery", subCategory: "Air Intake & Fuel Delivery", filter: null, search: null},
        {label: "Air Hoses, Lines & Pipes", subCategory: "Air Hoses, Lines & Pipes", filter: null, search: null},
        {label: "Batteries", subCategory: "Batteries", filter: null, search: null},
        {label: "Starters, Alternators, ECUs & Wiring", subCategory: "Starters, Alternators, ECUs & Wiring", filter: null, search: null},
        {label: "RV, Trailer & Camper Parts & Accessories", subCategory: "RV, Trailer & Camper Parts & Accessories", filter: null, search: null},
        {label: "Gauges", subCategory: "Gauges", filter: null, search: null},
        {label: "Headlight Assemblies", subCategory: "Headlight Assemblies", filter: null, search: null},
        {label: "Decals & Vinyls", subCategory: "Decals & Vinyls", filter: null, search: null},
        {label: "Car & Truck Parts & Accessories", subCategory: "Car & Truck Parts & Accessories", filter: null, search: null},     
        {label: "Automatic Transmission Parts", subCategory: "Automatic Transmission Parts", filter: null, search: null},
        {label: "Brakes & Brake Parts", subCategory: "Brakes & Brake Parts", filter: null, search: null},
        {label: "Suspension & Steering Parts", subCategory: "Suspension & Steering Parts", filter: null, search: null},
        {label: "Transmission & Drivetrain", subCategory: "Transmission & Drivetrain", filter: null, search: null},
        {label: "Brakes & Brake Parts", subCategory: "Brakes & Brake Parts", filter: null, search: null},
        {label: "Steering & Suspension", subCategory: "Steering & Suspension", filter: null, search: null},
        {label: "In-Car Technology, GPS & Security", subCategory: "In-Car Technology, GPS & Security", filter: null, search: null},
        {label: "Starters, Alternators, ECUs & Wiring", subCategory: "Starters, Alternators, ECUs & Wiring", filter: null, search: null},
        {label: "Ignition & Starting Systems", subCategory: "Ignition & Starting Systems", filter: null, search: null},
        {label: "Wheels, Tires & Parts", subCategory: "Wheels, Tires & Parts", filter: null, search: null},
        {label: "Seat Covers", subCategory: "Seat Covers", filter: null, search: null},
        {label: "Tires", subCategory: "Tires", filter: null, search: null},
        {label: "Wheels", subCategory: "Wheels", filter: null, search: null},
        {label: "Automotive Tools & Supplies", subCategory: "Automotive Tools & Supplies", filter: null, search: null},
        {label: "Boats & Watercraft", subCategory: "Boats & Watercraft", filter: null, search: null},
        ],

        "Art": [
        {label: "Art Prints", subCategory: "Art Prints", filter: null, search: null},
        {label: "Paintings", subCategory: "Paintings", filter: null, search: null},
        {label: "Art Sculptures", subCategory: "Art Sculptures", filter: null, search: null},
        {label: "Art Posters", subCategory: "Art Posters", filter: null, search: null},
        {label: "Mixed Media Art & Collage Art", subCategory: "Mixed Media Art & Collage Art", filter: null, search: null},
        {label: "Other Art", subCategory: "Other Art", filter: null, search: null},
        {label: "Art Photographs", subCategory: "Art Photographs", filter: null, search: null},
        {label: "Art Drawings", subCategory: "Art Drawings", filter: null, search: null},
        {label: "Art NFTs", subCategory: "Art NFTs", filter: null, search: null},
        {label: "Textile Art & Fiber Art", subCategory: "Textile Art & Fiber Art", filter: null, search: null}
        ]  



}