import React, {Component} from 'react';
import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';


export default class ImageGalleryItem extends Component {

  handleImageClick = (index) => {
    this.props.getIndex(index)
  }

  render() {
    const { image, tags, onClick, index } = this.props;
    return <li onClick={onClick} className={css.ImageGalleryItem}>
      <img onClick={() => {this.props.getIndex(index)}} src={image} alt={tags} className={css.image}  />
       </li>
  }
}

ImageGalleryItem.propTypes = {
  getIndex: PropTypes.func,
  image: PropTypes.string,
  tags: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
}