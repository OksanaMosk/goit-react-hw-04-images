import css from './ImageGalleryItem.module.css'




  export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showModal,
}) => {
    return (
        <li onClick={() => showModal(largeImageURL, tags)} className={css.imageItem}>
            
            <div className={css.imageGalleryItemImage}>
                <img src={webformatURL} alt={tags} className={css.imageGalleryItem} loading="lazy" />
            </div> 

        </li>
    )
};
