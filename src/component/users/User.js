import React, {useEffect, Fragment, useContext} from 'react';
import {Link} from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/GithubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, repos, getUserRepos } = githubContext;
  const { name, avatar_url, location, html_url, followers, following, public_repos, public_gists, hireable } = user;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">Back To Search</Link> Hireable : {' '}
        {hireable ? <i className={'fas fa-check text-success'}/> : <i className={'fas fa-time-circle text-danger'}/>}
        <div className={'card grid-2'}>
          <div className={'all-center'}>
            <img src={avatar_url} className={'round-img'} style={{width: 175, height: 175}} alt={''}/>
            <h1>{name}</h1>
            <p>location : {location}</p>
            <a href={html_url} className={'btn btn-light'}>Go To Github Profile</a>
            <div className={'card-center'} style={{marginTop: 20}}>
              <div className={'badge badge-primary'}> Followers : {followers}</div>
              <div className={'badge badge-success'}> Following : {following}</div>
              <div className={'badge badge-danger'}> Public Repos : {public_repos}</div>
              <div className={'badge badge-dark'}> Public Gist : {[public_gists]}</div>
            </div>
            <Repos repos={repos}/>
          </div>
        </div>
      </Fragment>
    );
}

export default User;