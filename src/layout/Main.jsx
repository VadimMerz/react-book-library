import { useEffect } from 'react';

import { Add } from '../components/Add';

function Main() {
  useEffect(() => {
    JSON.parse(localStorage.getItem('books'));
  }, []);

  return (
    <main className='container content'>
      <Add />
    </main>
  );
}

export { Main };
