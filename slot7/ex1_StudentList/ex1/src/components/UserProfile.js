import React from 'react';

function UserProfile({ user }) {
  return (
    <div>
      <p>Hello, {user.name}, {user.age}</p>
    </div>
  );
}

export default UserProfile;
