import { Books } from './Books';

function BooksList(props) {
  const { books } = props;

  return (
    <div>
      <Books
        books={books}
        handleChecked={props.handleChecked}
        removeBook={props.removeBook}
        idx={props.id}
      />
    </div>
  );
}

export { BooksList };
