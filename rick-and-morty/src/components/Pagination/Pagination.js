import './Pagination.css';

function Pagination({ info, page, setPage }) {
  const buttons = [];
  for (let i = 1; i <= info.pages; i++) {
    const isCurrentPage = i === page;
    const buttonClass = isCurrentPage ? 'pagination-button pagination-button-clicked' : 'pagination-button';

    buttons.push(
      <button className={buttonClass} key={i} onClick={() => setPage(i)}>
        {i}
      </button>
    );
  }

  function leftArrowClick() {
    if (page > 1)
    setPage(page-1);
  }

  function rightArrowClick() {
    if (page < info.pages)
      setPage(page + 1);
  }


  if (info.pages > 1) {
    return (
      <>
    <div className="pagination-container">
          <i className={`fa-regular fa-circle-left ${page === 1 ? 'inactive' : ''}`} onClick={leftArrowClick}></i>
      {buttons}
          <i className={`fa-regular fa-circle-right ${page === info.pages ? 'inactive' : ''}`} onClick={rightArrowClick}></i>
    </div>
      </>
    );
  }

  return null;
}

export default Pagination;
