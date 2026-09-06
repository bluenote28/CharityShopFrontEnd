import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';

function ListingsPagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <Container className='d-flex justify-content-center align-items-center flex-wrap px-2'>
      {page > 1 && (
        <Pagination>
          <Pagination.First onClick={() => onPageChange(1)} />
          <Pagination.Prev onClick={() => onPageChange(page - 1)} />
        </Pagination>
      )}

      <div className='d-flex mx-2 mt-1'>
        Page {page} of {pageCount}
      </div>

      {page < pageCount && (
        <Pagination>
          <Pagination.Next onClick={() => onPageChange(page + 1)} />
          <Pagination.Last onClick={() => onPageChange(pageCount)} />
        </Pagination>
      )}
    </Container>
  );
}

export default ListingsPagination;
