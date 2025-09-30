import { Link } from 'react-router-dom';

function Books(props) {
  const { books, handleChecked, removeBook } = props;

  return (
    <>
      {books.length === 0 ? (
        <p>Books is not Found</p>
      ) : (
        books.map((book, idx) => {
          return (
            <div key={book.id}>
              <div className='col s12 m7'>
                <div className='card horizontal book-card'>
                  <label className='checkbox-label'>
                    <input
                      type='checkbox'
                      name='read'
                      checked={book.read}
                      onChange={() => handleChecked(idx)}
                    />
                    <span> </span>
                  </label>

                  <div className='card-stacked'>
                    <div className='card-content'>
                      <h4 className={book.read ? 'header read-book' : 'header'}>
                        {book.bookName}
                      </h4>
                      <p>
                        {book.author}, {book.year}
                      </p>
                    </div>
                  </div>
                  <p>
                    <button
                      onClick={() => removeBook(idx)}
                      className='btn'
                    >
                      X
                    </button>
                  </p>
                </div>
                <Link
                  to={`/book/${book.id}`}
                  className='btn'
                >
                  View details
                </Link>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export { Books };
