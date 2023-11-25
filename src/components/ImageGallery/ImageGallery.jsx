import React, { PureComponent } from 'react';
import css from "./ImageGallery.module.css";
import PropTypes from 'prop-types';



export default class ImageGallery extends PureComponent {

  render() {

    return <ul className={css.ImageGallery}>
      {this.props.children}
      </ul>
  }
}

ImageGallery.propTypes = {
  children: PropTypes.array
}