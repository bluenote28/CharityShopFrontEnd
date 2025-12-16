import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorites } from '../actions/userActions';
import NormalSpinner from './Spinner';
import formatItemsIntoRows from '../utilities/ItemsGridFormatter'; 
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListingCard from './ListingCard';

function FavoriteItems() {

const dispatch = useDispatch();
const favoritesData = useSelector((state) => state.favorites);
const { error, loading, favorites } = favoritesData

useEffect(() => {
dispatch(getUserFavorites())
}, [dispatch])

if (loading){
    return <NormalSpinner />
}

else if (error){    
    return <h3>{error}</h3>
}
else{   
        if (favorites){

        const formattedFavorites = formatItemsIntoRows(favorites.items, 4);

        return (
            <>
            {formattedFavorites.map((item, index) => { 
                    
            return (
                    <div key={index}>        
                        {error ? <p>{error}</p>:
                        
                                <Row key={index}>

                                        {item.map(
                                            (item, index) => {
                                                return (
                                                    <Col key={index} className='mb-4'>
                                                        <ListingCard title={item.name} image={item.img_url} url={item.web_url} id={item.ebay_id} favorites={favorites.items} />
                                                    </Col>
                                                )
                                            }
                                        )}
                                </Row>
                            }
                    </div>
                    )
            })}
         </>
        )

    }
}

}

export default FavoriteItems;