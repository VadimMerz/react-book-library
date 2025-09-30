import { useState, useEffect } from 'react';
import { BooksList } from './BooksList';

function Add() {
  const [id, setId] = useState(1);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({ bookName: '', author: '', year: '' });

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (bookName === '') {
      newErrors.bookName = 'err';
      isValid = false;
    }
    if (author === '') {
      newErrors.author = 'err';
      isValid = false;
    }
    if (isNaN(year) || year === '') {
      newErrors.year = 'err';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  useEffect(() => {
    const lsBooks = localStorage.getItem('books');
    if (lsBooks) {
      setBooks(JSON.parse(lsBooks));
    }
  }, []);

  const removeBook = (index) => {
    const filteredBooks = books.filter((_, idx) => idx !== index);
    setBooks(filteredBooks);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  };

  const handleChecked = (index) => {
    const updatedBooks = books.map((book, i) =>
      i === index ? { ...book, read: !book.read } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'bookName') setBookName(value);
    if (name === 'author') setAuthor(value);
    if (name === 'year') setYear(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newBook = {
      id,
      bookName,
      author,
      year,
      read: false,
    };

    if (!bookName.trim() || !author.trim() || !year.trim()) return;

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setId(id + 1);
    setBookName('');
    setAuthor('');
    setYear('');
  };

  return (
    <form className='col s12'>
      <h4>Add Book</h4>
      <div className='row'>
        <div className='input-field col s6'>
          <input
            name='bookName'
            placeholder='name'
            id='name'
            type='text'
            className={errors.bookName ? 'validate invalid' : 'validate'}
            value={bookName}
            onChange={handleChange}
          />
          <span
            className='helper-text'
            data-error='Введіть назву книги'
          ></span>
        </div>
        <div className='input-field col s6'>
          <input
            name='author'
            placeholder='author'
            id='author'
            type='text'
            className={errors.author ? 'validate invalid' : 'validate'}
            value={author}
            onChange={handleChange}
          />
          <span
            className='helper-text'
            data-error='Введіть автора'
          ></span>
        </div>
      </div>
      <div className='row'>
        <div className='input-field col s12'>
          <input
            name='year'
            placeholder='year'
            id='year'
            type='number'
            className={errors.year ? 'validate invalid' : 'validate'}
            value={year}
            onChange={handleChange}
          />
          <span
            className='helper-text'
            data-error='Введіть рік'
          ></span>
        </div>
      </div>
      <input
        type='submit'
        className='btn'
        value='Add book'
        onClick={handleClick}
      />
      <BooksList
        removeBook={removeBook}
        books={books}
        handleChecked={handleChecked}
      />
    </form>
  );
}

export { Add };
