import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AboutPage() {

    const containerStyle = {
        fontFamily: "arial", 
    }

    return (
        <>
           <Container className="border rounded-2 mt-2 mb-5 py-3" style={containerStyle}>
                <h1 className="mt-2" style={{textAlign: "center"}}>About Charity Shop</h1>
                <p className="w-50 m-auto">Charity Shop is a website dedicated to helping people find opportunities to make purchases that benefit charity. Every listing you browse here is a chance to buy something you want while supporting a nonprofit at the same time.</p>
                <p className="w-50 m-auto mt-3">The main part of the site highlights items from the eBay for Charity program. You can search, browse categories, and follow specific charities to discover those listings in one place, then go to eBay to complete the purchase.</p>
                <p className="w-50 m-auto mt-3">The site also has a <Link to="/directory">directory of other shops</Link> besides eBay where you can make purchases that benefit charity.</p>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>How eBay for Charity works</h2>
                <p className="w-50 m-auto">eBay for Charity lets sellers attach a donation to an ordinary eBay listing. When they create the listing, they choose a participating charity and pledge a percentage of the selling price, typically from 10% to 100%. Charity-run shops on eBay donate 100% of the proceeds from their own listings.</p>
                <p className="w-50 m-auto mt-3">You shop the item the same way you would any other eBay purchase. After the item sells, eBay’s nonprofit partner, PayPal Giving Fund, collects the pledged donation and grants 100% of that amount to the chosen charity. The listing shows which organization benefits and what share of the sale is donated, which is the same information Charity Shop displays when you browse items here.</p>
           </Container>
        </>
    )   
}

export default AboutPage;
