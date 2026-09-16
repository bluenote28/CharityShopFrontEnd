import Button from 'react-bootstrap/Button';
import { ebaySearchAffiliateUrl } from '../utilities/Converters';

function GoToEbayButton({ search }) {
  if (!search) {
    return null;
  }

  const ebayUrl = ebaySearchAffiliateUrl(search);

  return (
    <>
      <p>Can't find what you're looking for? Try searching for it directly on eBay.</p>
      <Button
        variant="primary"
        href={ebayUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Search "{search}" on eBay
      </Button>
    </>
  );
}

export default GoToEbayButton;
