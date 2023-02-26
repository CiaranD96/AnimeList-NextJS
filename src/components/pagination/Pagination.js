export default function Pagination({
  pagination,
  handlePageButton,
  currentPage,
}) {
  return (
    <div className='page-selection-container'>
      <button
        className='btn page-selection-button previous-button'
        onClick={() => {
          handlePageButton('previous');
        }}
      >
        Previous Page
      </button>
      <p>
        Page: {pagination.current_page ? pagination.currentPage : currentPage} -{' '}
        {pagination.last_visible_page}
      </p>
      <button
        className='btn page-selection-button next-button'
        onClick={() => {
          handlePageButton('next');
        }}
      >
        Next Page
      </button>
    </div>
  );
}
