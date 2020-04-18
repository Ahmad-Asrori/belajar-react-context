import React from 'react';
import { Link } from "react-router-dom";

const UserItem = props => {
  const { login, avatar_url } = props.user;

  return (
    <div className="card" style={{width: '18rem'}}>
      <img src={avatar_url} className="card-img-top" alt="..."/>
        <div className="card-body text-center">
          <h5 className="card-title">{login}</h5>
          <p className="card-text">Profile Description</p>
        </div>
        <div className="card-body text-center">
          <Link to={`/user/${login}`} className="card-link">Go To Profile</Link>
        </div>
    </div>
  );

};

export default UserItem;