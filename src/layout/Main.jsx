import React from 'react';

import { Add } from '../components/Add';

class Main extends React.Component {
  state = {};
  componentDidMount() {
    JSON.parse(localStorage.getItem('books'));
  }

  render() {
    return (
      <main className='container content'>
        <Add />
      </main>
    );
  }
}

export { Main };
