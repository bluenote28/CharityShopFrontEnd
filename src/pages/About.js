import { Container } from "react-bootstrap";

function AboutPage() {

    const containerStyle = {
        fontFamily: "arial", 
    }

    return (
        <>
           <Container className="border rounded-2 mt-2 py-3" style={containerStyle}>
                <h1 className="mt-2" style={{textAlign: "center"}}>About this site</h1>
                <p className="w-50 m-auto">This is a site that makes it easier to find items on eBay that benefit charity.
                    The inspiration of this site was to create a site where everything on it benefits charity, similar to what 
                    Amazon Smile used to be before Amazon ended it. Ebay has a program where any seller can dedicate a portion 
                    of a listing to charity, however in my opinion has no good way to easily find items which benefits charity. 
                    They do have a Charity Shop on their site but there are some problems with it:
                </p>

                <ul className="w-50 m-auto mt-2">
                    <li>It's hidden. You have to know where it is to find it.</li>
                    <li>There is no easy way to do a general item search for things that benefit charity.<br />
                        For example, I cannot easily do a search for all Nintendo products which benefit charity.</li>
                    <li>There is no way to filter search results by a specific charity you want to shop for. <br />
                        "Show me all Nintendo items which benefits the American Cancer Society" cannot be done</li>
                </ul>
                
                <p className="w-50 m-auto mt-3">This site is designed to fix those issues as well as add other features 
                    (see roadmap).</p>
                <p className="w-50 m-auto mt-3">If you have any questions or feedback, you can email me at <a href="mailto:ancowden@yahoo.com">ancowden@yahoo.com</a></p>
           </Container>


           <Container className="mt-3 mb-5 border rounded-2 py-3" style={containerStyle}>
                <h1 style={{textAlign: "center"}}>Site Roadmap</h1>

                <p className="w-50 m-auto">Features either curently in progress or will be worked on in the future:</p>
                <ul className="w-50 m-auto mt-2">
                    <li>The ability to purchase things directly from this site</li>
                    <li>The ability to save your favorite charities</li>
                    <li>The ability for a user to track how much their purchases have benefited charity</li>
                    <li>A recommmendation system based on the user's purchases and favorites</li>
                    <li>The ability to host a fundraiser for a particular charity</li>
                </ul>
           </Container>

        </>
    )   
}

export default AboutPage;