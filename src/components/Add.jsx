import React from 'react';
import { Books } from './Books';

class Add extends React.Component {
  state = {
    bookName: '',
    author: '',
    year: '',
    books: [],
    errors: { bookName: '', author: '', year: '' },
  };
  validate = () => {
    let newErrors = {};
    if (this.state.bookName === '') {
      newErrors.bookName = 'err';
    } else if (this.state.author === '') {
      newErrors.author = 'err';
    } else if (isNaN(this.state.year) || this.state.year === '') {
      newErrors.year = 'err';
    }
    this.setState({ errors: newErrors });
  };

  componentDidMount() {
    if (localStorage.getItem('books') !== null) {
      let lsbooks = JSON.parse(localStorage.getItem('books'));
      this.setState({ books: lsbooks });
    }
  }
  removeBook = (index) => {
    this.setState((prevState) => {
      const filteredBook = prevState.books.filter((_, idx) => idx !== index);
      localStorage.setItem('books', JSON.stringify(filteredBook));
      return { books: filteredBook };
    });
  };

  handleChecked = (index) => {
    this.setState((prev) => {
      const updatedBooks = prev.books.map((book, i) =>
        i === index ? { ...book, read: !book.read } : book
      );

      localStorage.setItem('books', JSON.stringify(updatedBooks));
      return { books: updatedBooks };
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.validate();
    const { bookName, author, year } = this.state;
    const newBook = {
      bookName,
      author,
      year,
      read: false,
    };
    if (!bookName.trim() || !author.trim() || !year.trim()) return;

    this.setState((prev) => {
      const updatedBooks = [...prev.books, newBook];
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      return {
        books: updatedBooks,
        bookName: '',
        author: '',
        year: '',
      };
    });
  };

  render() {
    const { bookName, author, year } = this.state;

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
              className={
                this.state.errors.bookName ? 'validate invalid' : 'validate'
              }
              value={bookName}
              onChange={this.handleChange}
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
              className={
                this.state.errors.author ? 'validate invalid' : 'validate'
              }
              value={author}
              onChange={this.handleChange}
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
              className={
                this.state.errors.year ? 'validate invalid' : 'validate'
              }
              value={year}
              onChange={this.handleChange}
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
          onClick={this.handleClick}
        />
        <Books
          removeBook={this.removeBook}
          books={this.state.books}
          handleChecked={this.handleChecked}
        />
      </form>
    );
  }
}

export { Add };
