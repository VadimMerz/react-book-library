import { useParams, useNavigate } from 'react-router-dom';

function BookItem(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const book = books.find((b) => b.id === +id);
  if (!book) {
    return <p>Книга не знайдена</p>;
  }

  return (
    <>
      <div className='card'>
        <div className='card-image'>
          <img
            src='/book.jpg'
            alt={book.bookName}
          />
        </div>
        <div className='card-content content'>
          <h2>{book.bookName}</h2>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <h5>book description...</h5>
        </div>
        <div className='card-action'>
          <button
            onClick={goBack}
            className='btn'
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export { BookItem };
