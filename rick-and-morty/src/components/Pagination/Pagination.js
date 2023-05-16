import './Pagination.css';

function Pagination({ info, page, setPage }) {
  const buttons = [];
  for (let i = 1; i <= info.pages; i++) {
    if (i===page) {
      buttons.push(
        <button className="pagination-button pagination-button-clicked" key={i} onClick={() => setPage(i)}>
          {i}
        </button>
      );
    } else {
      buttons.push(
        <button className="pagination-button" key={i} onClick={() => setPage(i)}>
          {i}
        </button>
      );
    }
  }

  function leftArrowClick() {
    if (page >= 1)
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
      <i className="fa-regular fa-circle-left" onClick={leftArrowClick}></i>
      {buttons}
          <i className="fa-regular fa-circle-right" onClick={rightArrowClick}></i>
    </div>
      </>
    );
  }

  return null;
}

export default Pagination;
