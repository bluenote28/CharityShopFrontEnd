import Container from 'react-bootstrap/Container'
import FavoriteItems from '../components/FavoriteItems';

function FavoritesPage() {

    return (

        <>
            <h1 style={{textAlign: 'center'}}>Watch List</h1>
            <Container>
            
                <FavoriteItems />
         
            </Container>
        
        </>
    )   
}

export default FavoritesPage