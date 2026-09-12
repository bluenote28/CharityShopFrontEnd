import Form from 'react-bootstrap/Form';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FavoriteCharitiesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const enabled = searchParams.get('favoriteCharities') === '1';

  if (!userInfo) {
    return null;
  }

  function toggle() {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    if (enabled) {
      params.delete('favoriteCharities');
    } else {
      params.set('favoriteCharities', '1');
    }
    setSearchParams(params);
  }

  return (
    <Form.Check
      type="switch"
      id="favorite-charities-filter"
      className="favorite-charities-filter"
      label="Favorite charities only"
      checked={enabled}
      onChange={toggle}
    />
  );
}

export default FavoriteCharitiesFilter;
