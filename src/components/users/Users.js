import React, { useContext } from 'react';
import UserItem from '../users/UserItem';
import Spinner from '../layouts/Spinner';
import GithubContext from '../../context/github/githubContext';


const Users = () => {
  const { loading, users } = useContext(GithubContext);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users
