
import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css'

export class Searchbar  extends Component {
    state = {
       query:'',
    }


    handleChange = event => {
        const query = event.currentTarget.value;
        this.setState({ query: query });
    };
  
  
    handleSubmit = event => {
        event.preventDefault();
        

  if (this.state.query.trim() === '') {
      return Notiflix.Notify.warning(
        'Please enter word for search');
        }
        
        this.props.onSubmit(this.state)
        this.setState({ query: ''});
    };
    



 render (){
     return (
         <header className={css.searchbar}>
             <form className={css.form} onSubmit={this.handleSubmit}>
                 <button
                     type="submit" className={css.button}>
                 
                     <span className={css.buttonLabel}>Search</span>
                     &#128269;
                 </button>

                 <input className={css.input} type="text" autoComplete="off" autoFocus placeholder="Search images and photos" onChange={this.handleChange}  value={this.state.query}
                 />
             </form>
         </header>
     )
 }    
}