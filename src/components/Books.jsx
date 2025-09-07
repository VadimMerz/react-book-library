import { Book } from './Book';

function Books(props) {
  const { books } = props;

  return (
    <div>
      <Book
        books={books}
        handleChecked={props.handleChecked}
        removeBook={props.removeBook}
        idx={props.idx}
      />
    </div>
  );
}

export { Books };
