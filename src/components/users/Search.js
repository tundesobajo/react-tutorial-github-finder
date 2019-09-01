import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
  state ={
    text: '',
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  onSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text === '') {
      this.props.setAlert('Please enter some text', 'alert');
    } else {
      this.props.searchUsers(text);
      this.setState({ text: '' });
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input type="text" name="text" placeholder='Search Users...' value={this.state.text} onChange={this.onChange}/>
          <input type="submit" value="Search" className='btn btn-dark btn-block' />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button>        
        )}
      </div>
    )
  }
}

export default Search
