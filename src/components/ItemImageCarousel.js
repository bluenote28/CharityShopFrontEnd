import { useEffect, useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { convertItemPageImageUrl } from '../utilities/Converters';

function collectImageUrls(itemData) {
  const urls = [
    itemData?.img_url,
    ...(itemData?.additional_images?.additionalImages || []).map((image) => image.imageUrl)
  ]
    .filter(Boolean)
    .map(convertItemPageImageUrl)
    .filter(Boolean);

  return [...new Set(urls)];
}

function ItemImageCarousel({ itemData }) {
  const images = collectImageUrls(itemData);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [itemData?.img_url]);

  if (images.length === 0) {
    return (
      <div className="item-image-carousel d-flex align-items-center justify-content-center">
        <p className="mb-0">No image available</p>
      </div>
    );
  }

  return (
    <div className="item-image-carousel">
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        interval={null}
        indicators={hasMultipleImages}
        controls={hasMultipleImages}
        variant="dark"
        slide
      >
        {images.map((url, index) => (
          <Carousel.Item key={url}>
            <Image
              src={url}
              alt={`${itemData?.name || 'Item'} image ${index + 1} of ${images.length}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {hasMultipleImages && (
        <div className="item-image-carousel-counter" aria-live="polite">
          {activeIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
}

export default ItemImageCarousel;
