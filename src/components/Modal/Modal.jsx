import React, { Component } from 'react';
import css from "./Modal.module.css";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.hadleKeyDown)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hadleKeyDown)
  }

  hadleKeyDown = e => {
    if (e.code === 'Escape') {
        this.props.onClose()
      }
  }

  handleBackdropClick = (e) => {

    if (e.currentTarget === e.target) {
      this.props.onClose()
    }

  }
  render() {
    return createPortal(<div className={css.Overlay} onClick={this.handleBackdropClick}>
      <div className={css.Modal} >{this.props.children}</div>
    </div>, modalRoot)
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element
}