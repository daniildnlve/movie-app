import { Component } from 'react';
import { format } from 'date-fns';
import { Skeleton } from 'antd';

import './Movie.css';


export default class Movie extends Component {

  render() {
    const {label, date, description, path} = this.props;  
    const urlImg = 'https://image.tmdb.org/t/p/original'
    const cutDescription = (str) => {
      if (!str) return 'Has no overview'
      if (str.length < 100) return str;
      return `${str.split('').slice(0, 100).join('')} ...`
    }    
    
    return (
      <div className='movie'>
        <div className='movie__image-content'>
          {path 
          ? <img className='movie__image' 
                 src={`${urlImg}${path}`} 
                 alt='movie poster'
            />
          : <Skeleton.Image style={{width: '100%', 
                                    height: '100%', 
                                    position: 'absolute', 
                                    top: '0', 
                                    borderRadius: '0'}}/>
          }
        </div>
        <div className='movie__text-content'>
          <h1 className='movie__name'>{label}</h1>
          <span className='movie__date'>{date ? format(new Date(date), 'MMMM dd, yyyy') : 'Release date unknown'}</span>
          <div className='movie__genres'>
            <button className='movie__genre'>Action</button>
            <button className='movie__genre'>Drama</button>
          </div>
          <p className='movie__description'>
            {cutDescription(description)}
          </p>
        </div>
      </div>
    )
  }
}