import { fetchPhoto } from './Services/FetchPhoto';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import React from 'react';

import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchPhoto, setSearchPhoto] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageTags, setImageTags] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState([]);

  // state = {
  //   searchPhoto: '',
  //   page: 1,
  //   photos: [],
  //   isLoading: false,
  //   showLoadMore: false,
  //   showModal: false,
  //   imageTags: null,
  //   largeImageURL: [],

  // componentDidUpdate(_, prevState) {
  //   if (
  //     this.state.searchPhoto !== prevState.searchPhoto ||
  //     this.state.page !== prevState.page
  //   ) {
  //     this.setState({ isLoading: true });
  //     this.fetchResult(this.state.searchPhoto, this.state.page);
  //   }
  // }

  useEffect(() => {
    if (!searchPhoto) {
      return;
    }
    setIsLoading(true);
    fetchResult(searchPhoto, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPhoto, page]);

  async function fetchResult(query, page) {
    try {
      await fetchPhoto(query, page).then(result => {
        const data = result.data;
        const photos = data.hits;
        const total = data.totalHits;
        const lastPhotos = total - 12 * page;

        if (photos.length === 0) {
          setShowLoadMore(false);
          Notiflix.Notify.failure('There are no images. Please try again.');
          return;
        } else {
          setPhotos(prevPhotos => [...prevPhotos, ...photos]);
        }
        if (photos.length > 0 && page === 1) {
          Notiflix.Notify.success(`Yeeesss! We found ${total} images.`);
        }
        lastPhotos > 0 ? setShowLoadMore(true) : setShowLoadMore(false);
      });
    } catch (error) {
      Notiflix.Notify.failure(' Oooops...Some error occured...');
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = query => {
    setSearchPhoto(query);
    setPage(1);
    setPhotos([]);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL, imageTags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <div className={css.container}>
        {isLoading && <Loader />}
        <ImageGallery items={photos} showModal={toggleModal} />
        {showLoadMore && <Button onClick={onLoadMoreClick} />}
      </div>

      {showModal && (
        <Modal src={largeImageURL} alt={imageTags} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default App;
