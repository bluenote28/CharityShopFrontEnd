import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AboutPage() {

    const containerStyle = {
        fontFamily: "arial", 
    }

    return (
        <>
           <Container className="border rounded-2 mt-2 py-3" style={containerStyle}>
                <h1 className="mt-2" style={{textAlign: "center"}}>About Charity Shop</h1>
                <p className="w-50 m-auto">Charity Shop is a website dedicated to helping people find opportunities to make purchases that benefit charity. Every listing you browse here is a chance to buy something you want while supporting a nonprofit at the same time.</p>
                <p className="w-50 m-auto mt-3">The main part of the site highlights items from the eBay for Charity program. You can search, browse categories, and follow specific charities to discover those listings in one place, then go to eBay to complete the purchase.</p>
                <p className="w-50 m-auto mt-3">The site also has a <Link to="/directory">directory of other shops</Link> besides eBay where you can make purchases that benefit charity.</p>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>How eBay for Charity works</h2>
                <p className="w-50 m-auto">eBay for Charity lets sellers attach a donation to an ordinary eBay listing. When they create the listing, they choose a participating charity and pledge a percentage of the selling price, typically from 10% to 100%. Charity-run shops on eBay donate 100% of the proceeds from their own listings.</p>
                <p className="w-50 m-auto mt-3">You shop the item the same way you would any other eBay purchase. After the item sells, eBay’s nonprofit partner, PayPal Giving Fund, collects the pledged donation and grants 100% of that amount to the chosen charity. The listing shows which organization benefits and what share of the sale is donated, which is the same information Charity Shop displays when you browse items here.</p>
           </Container>

           <Container className="border rounded-2 mt-3 mb-5 py-3" style={containerStyle}>
                <h1 className="mt-2" style={{textAlign: "center"}}>How to use Charity Shop</h1>
                <p className="w-50 m-auto">You can browse without an account. Signing in with Google unlocks a watch list, favorite-charity filters, and a record of purchases you choose to save.</p>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>Find items</h2>
                <ul className="w-50 m-auto mt-2">
                    <li>On the <Link to="/">home page</Link>, choose a category, then pick a more specific type of item. That shows eBay for Charity listings in that group.</li>
                    <li>Use <strong>Search all items</strong> in the header to search across listings. If nothing matches, you can try the same search on eBay from the results page.</li>
                    <li>Open <Link to="/charities">Charities</Link> to shop by nonprofit. Search the directory, then open a charity to see items that benefit it. You can search those listings and filter them by category.</li>
                </ul>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>Look at a listing</h2>
                <ul className="w-50 m-auto mt-2">
                    <li>Click a listing for photos, price, shipping, condition, seller feedback, and which charity benefits from the sale.</li>
                    <li>The item page includes an AI summary of the listing and a short profile of the charity, including the donation percentage.</li>
                    <li>Purchases are completed on eBay. When you are ready to buy, use <strong>Go to item on eBay</strong>.</li>
                </ul>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>Save favorites and track purchases</h2>
                <ul className="w-50 m-auto mt-2">
                    <li><Link to="/login">Sign in with Google</Link> from the header.</li>
                    <li>Star an item or a charity to save it. Open your <Link to="/favorites">Watch List</Link> from the account menu to return to them later.</li>
                    <li>On search and category pages, turn on <strong>Favorite charities only</strong> to limit results to charities you have starred.</li>
                    <li>After you go to eBay while signed in, Charity Shop asks whether you bought the item. If you say yes, it is stored on your <Link to="/purchases">Purchases</Link> page, along with an estimated donation total.</li>
                </ul>

                <h2 className="mt-4" style={{textAlign: "center", fontSize: "1.5rem"}}>Other shops and help</h2>
                <ul className="w-50 m-auto mt-2">
                    <li>The <Link to="/directory">directory</Link> lists shops other than eBay where purchases can also benefit charity.</li>
                    <li>The shop assistant button in the bottom-right corner opens a chat you can use on any page. Ask about items, charities, or how the site works.</li>
                </ul>
           </Container>
        </>
    )   
}

export default AboutPage;
