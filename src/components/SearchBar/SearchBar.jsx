import React, { PureComponent } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";



export default class SearchBar extends PureComponent {

  state = { inputquery: '', };

  handleChange = (e) => {
    this.setState({inputquery: e.currentTarget.value})
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputquery);
    this.setState({ inputquery: '' });
  }

  render() {
    return <header className={css.SearchBar}>

      <form className={css.SearchForm} onSubmit={this.formSubmit}>
  
        <button type="submit" className={css.button}>
          <FaSearch/>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}
          value={this.state.inputquery}
        />

      </form>
    </header>
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}