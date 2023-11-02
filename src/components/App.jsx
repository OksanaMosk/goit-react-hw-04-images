
import React, { Component } from "react";
import { fetchPhoto } from './Services/FetchPhoto';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button }  from './Button/Button';
import Modal from './Modal/Modal';

import Loader from './Loader/Loader';
import Notiflix from "notiflix";
import css from './App.module.css';



export class App extends Component {
  state = {
    searchPhoto: '',
    page: 1,
    photos: [],
    isLoading: false,
    showLoadMore: false,
    showModal: false,
    imageTags: null,
    largeImageURL: [],
  }



componentDidUpdate(_, prevState) {

    if (this.state.searchPhoto !== prevState.searchPhoto ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchResult(this.state.searchPhoto, this.state.page);
    }
  }



 onSubmit = FormData => {
    const { query } = FormData;
    this.setState({ searchPhoto: query, page: 1, photos: [] })
}


  async fetchResult(query, page) {
    try {
      await fetchPhoto(query, page).then(result => {
        const data = result.data;
        const photos = data.hits;
        const total = data.totalHits;
        const lastPhotos = total - 12 * this.state.page;

        if (photos.length === 0) {
          this.setState({ showLoadMore: false });
          Notiflix.Notify.failure(
            'Sorry, there are no images. Please try again.' );
          return;
        } else {
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
          }));
        }
          lastPhotos > 0
          ? this.setState({ showLoadMore: true })
          : this.setState({ showLoadMore: false });
        if (photos.length > 0 && this.state.page === 1) {
          Notiflix.Notify.success(
            `Yeeesss! We found ${total} images.`);
        }

       
      
      });
    } catch (error) {

        Notiflix.Notify.failure(
        ' Oooops...Some error occured...');
     
    } finally {
      this.setState({ isLoading: false });
    }
    }


   onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    };

   toggleModal = (largeImageURL, imageTags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
      imageTags: imageTags,
    }));
   };

   

  render() {
    return (
    
   <div >
      <Searchbar onSubmit={this.onSubmit} />
          <div className={css.container}>  
          {this.state.isLoading && <Loader />}
          <ImageGallery
                  items={this.state.photos}
                  showModal={this.toggleModal}
            />
                {this.state.showLoadMore && (
          <Button
                   onClick={this.onLoadMoreClick}
            />
                  )}  
        </div>
      
        {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          
          />
        )}
   </div>
  );  
  }
}
