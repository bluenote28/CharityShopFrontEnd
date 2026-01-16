import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';

const CONTAINER_STYLE = {
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const IMAGE_STYLE = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
}

function ImageCarousel(props) {
  return (
    <Carousel>
      <Carousel.Item>
        <div style={CONTAINER_STYLE}>
          <Image src={props.mainImage} alt='main' style={IMAGE_STYLE}/>
        </div>
      </Carousel.Item>

      {props.altImages?.map((item, index) => (
        <Carousel.Item key={index}>
          <div style={CONTAINER_STYLE}>
            <Image src={item.imageUrl} alt='alternate' style={{minHeight: "400px"}} />
          </div>
        </Carousel.Item>
      ))}      
    </Carousel>
  );
}

export default ImageCarousel;