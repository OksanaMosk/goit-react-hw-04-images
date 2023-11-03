import fetchPhoto from './Services/FetchPhoto';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
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

  useEffect(() => {
    if (!searchPhoto) {
      return;
    }
    setIsLoading(true);
    fetchResult(searchPhoto, page);
  }, [searchPhoto, page]);

  async function fetchResult(searchPhoto, page) {
    try {
      await fetchPhoto(searchPhoto, page).then(result => {
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
    if (query === searchPhoto) {
      return Notiflix.Notify.warning(
        `Enter another word, we already found images for ${query.toUpperCase()}.`
      );
    }
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
