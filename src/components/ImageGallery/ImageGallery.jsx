
import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';




export const ImageGallery = ({ items, showModal }) => {
    return (
        <ul className={css.gallery}>
            {items.map(item => {
                return (
                    <ImageGalleryItem
                        key={item.id}
                        webformatURL={item.webformatURL}
                        largeImageURL={item.largeImageURL}
                        tags={item.tags}
                        showModal={showModal}
                    />
                );
            })}
        </ul>
    );
};      
           
            

   
