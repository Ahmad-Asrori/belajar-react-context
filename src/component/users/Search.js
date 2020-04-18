import React, {useState, useContext} from 'react';
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const submitFormHandler = e => {
    e.preventDefault();
    if (text === ''){
      alertContext.setAlert('please enter something', 'danger');
    }
    githubContext.searchUsers(text);
    setText('');
  };

  const inputTextHandler = e => setText(e.target.value)

  return (
      <div className={'mt-5 mb-5'}>
        <form onSubmit={submitFormHandler}>
          <div className="row">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Input User"
                onChange={inputTextHandler}
                value={text}
              />
            </div>
            <div className="col">
              <button
                type="submit"
                className="btn btn-block btn-outline-primary">
                <i className={'fas fa-search'}/>
              </button>
            </div>
            {githubContext.users.length> 0 &&
            <div className="col">
              <button
                type="button"
                onClick={githubContext.clearUsers}
                className="btn btn-block btn-outline-danger">
                <i className={'fas fa-times'}/>
              </button>
            </div>}
          </div>
        </form>
      </div>
  );
}

export default Search;