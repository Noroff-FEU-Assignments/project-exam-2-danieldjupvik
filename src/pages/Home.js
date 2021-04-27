import { Typeahead } from 'react-bootstrap-typeahead';
import { useState, useEffect } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { baseUrl, placesUrl } from '../utils/api';
import { Link, useHistory } from 'react-router-dom';
import PopularCards from '../components/PopularCards';
import LoaderComp from '../components/LoaderComp';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // setLoader(true);
    const getPlaces = async () => {
      try {
        const response = await axios.get(`${baseUrl}${placesUrl}`);
        setPlaces(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getPlaces();
  }, []);

  const history = useHistory();
  function navigate(id) {
    history.push(`/place/${id}`);
  }

  return (
    <div>
      <div className='hero'>
        <div className=' hero__div custom-container'>
          <div>
            <h1 className='hero__heading'>Find your next destination</h1>
          </div>
          <div>
            <Typeahead
              // flip
              // isLoading
              labelKey='name'
              size={'large'}
              highlightOnlyResult
              id={'search-places'}
              emptyLabel={'No places with that name...'}
              clearButton
              placeholder={'Search places'}
              onChange={(result) => {
                navigate(result[0].id);
                setSelected(result);
              }}
              options={places}
              selected={selected}
              renderMenuItemChildren={(option) => (
                <div key={option.id}>
                  <img
                    alt={option.name}
                    src={option.image_url}
                    style={{
                      height: '35px',
                      marginRight: '10px',
                      width: '35px',
                      borderRadius: '5px',
                    }}
                  />
                  <span>{option.name}</span>
                </div>
              )}
            >
              <div className='rbt-aux searchIcon'>
                <MdSearch fontSize={'30px'} color={'#050505'} />
              </div>
            </Typeahead>
          </div>
        </div>
      </div>
      <div className='custom-container'>
        <div className='most-popular'>
          <h2 className='heading'>Our most popular places</h2>
          {showLoader ? (
            <LoaderComp />
          ) : (
            <div>
              <div className='category'>
                <h3 className='subheading'>Cabins</h3>
                <div className='cabin'>
                  <PopularCards places={places} type={'cabin'} />
                </div>
              </div>
              <div className='category'>
                <h3 className='subheading'>Apartments</h3>
                <div className='apartment'>
                  <PopularCards places={places} type={'apartment'} />
                </div>
              </div>
              <div className='category'>
                <h3 className='subheading'>Hotels</h3>
                <div className='hotel'>
                  <PopularCards places={places} type={'hotel'} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <Link to='/places' className='button'>
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
