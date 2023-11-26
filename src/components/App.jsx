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

  fetchImages = async () => {
    this.setState({ loading: true });

    try {
      const { query, page } = this.state;
      const images = await fetchData(query, page);
      this.setState((prevState) => ({
        images: page === 1 ? images : [...prevState.images, ...images],
        loading: false,
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handleClick = () => {
    this.setState({ loading: true });
    
    fetch(`https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=40087799-873756a7f0c0976e3054c80be&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(images => this.setState(prevState => ({ images: [...prevState.images, ...images.hits] })))
      .catch(error => this.setState({ error }))
      .finally(() => { this.setState({ loading: false }); this.setState(prevState => ({ page: prevState.page + 1 })) });
  }

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
