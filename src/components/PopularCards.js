import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PopularCards = ({ places, type }) => {
  return (
    <>
      {places
        .filter(
          (popular) => popular.most_popular === true && popular.type === type
        )
        .map((place) => {
          let subRating = 0;

          place.user_reviews.map((review) => (subRating += review.rating));
          const vote_average = subRating / place.user_reviews.length;
          return (
            <div className='popular-cards' key={place.id}>
              <Link to={`places/place/${place.id}`}>
                <div>
                  <img
                    className='popular-image'
                    src={place.image_url}
                    alt={place.name}
                  />
                </div>
                <div className='popular-info'>
                  <div>
                    <span className='popular-title'>{place.name}</span>
                  </div>
                  <div className='popular-ratingDiv'>
                    <MdFavorite fontSize={'22px'} className={'heartIcon'} />
                    <span className='popular-rating'>
                      {vote_average ? Math.floor((vote_average * 100) / 5) : 0}%
                    </span>
                    <span className='popular-number'>
                      ({place.user_reviews.length})
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default PopularCards;
