import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { showAlert } = useContext(AlertContext);

  const [ text, setText ] = useState(''); 

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter some text', 'alert');
    } else {
      searchUsers(text);
      setText('');
    }
  }

  const onChange = ({ target: { value } }) => {
    setText(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input type="text" name="text" placeholder='Search Users...' value={text} onChange={onChange}/>
        <input type="submit" value="Search" className='btn btn-dark btn-block' />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button>        
      )}
    </div>
  );

}

export default Search
