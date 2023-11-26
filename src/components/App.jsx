import React, { PureComponent } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import { fetchData } from './api';


export default class App extends PureComponent {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    index: null,
  };

  saveSearchQuerry = (query) => {
    this.setState({ query, page: 1 }, this.fetchImages);
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async () => {
    this.setState({ loading: true });

    try {
      const { query, page } = this.state;
      const images = await fetchData(query, page);
      this.setState((prevState) => ({
        images: page === 1 ? images : [...prevState.images, ...images],
        loading: false,
      }));
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };


  getIndex = (index) => {
  this.setState({index})
  }

  render() {

    const { images, loading, showModal, index } = this.state;
    
    return <div className={css.App}>
      <SearchBar onSubmit={this.saveSearchQuerry}></SearchBar>

        
      <ImageGallery>
        {images.map((image, index) => {
          return < ImageGalleryItem onClick={this.toggleModal} getIndex={this.getIndex} key={image.id} index={index} image={image.webformatURL} tags={image.tags} />
        })}
      </ImageGallery>
      
      {loading && <ThreeDots
          height="300"
          width="300"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{justifyContent: 'center'}}
          wrapperClassName=""
          visible={true} />}

      {images.length >= 12 && <Button onClick={this.handleClick} />}

      {showModal && <Modal onClose={this.toggleModal}><img src={images[index].largeImageURL} alt={images[index].tags}/></Modal>}
    </div>
  }
}
