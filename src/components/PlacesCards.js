import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils/library';

const PlacesCards = ({ places }) => {
  // useEffect(() => {
  //   let subRating = 0;
  //   details.user_reviews?.map((review) => (subRating += review.rating));
  //   setVote_average(subRating / details.user_reviews?.length);
  // }, [details]);

  return (
    <>
      {places.map((place) => {
        let subRating = 0;

        place.user_reviews.map((review) => (subRating += review.rating));
        const vote_average = subRating / place.user_reviews.length;
        return (
          <div className='places__card' key={place.id}>
            <Link to={`places/place/${place.id}`} className='places--link'>
              <div className='places--imgDiv'>
                <img
                  className='places--img'
                  src={`${place.image_url}`}
                  alt={`${place.name}`}
                />
              </div>
              <div className='places-info'>
                <div>
                  <span className='places-title'>{place.name}</span>
                </div>
                <div className='places-underTitleDiv'>
                  <div className='places-typeDiv'>
                    <span> {capitalize(place.type)}</span>
                  </div>
                  <div className='places-ratingDiv'>
                    <MdFavorite fontSize={'18px'} className={'redIcon'} />
                    <span className='places-rating'>
                      {vote_average ? Math.floor((vote_average * 100) / 5) : 0}%
                    </span>
                    <span className='places-number'>
                      ({place.user_reviews.length})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default PlacesCards;
