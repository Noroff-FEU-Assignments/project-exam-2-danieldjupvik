import axios from 'axios';
import { baseUrl, placesUrl } from '../utils/api';
import { useState, useEffect } from 'react';
import PlacesCards from '../components/PlacesCards';
import Select from 'react-select';
import LoaderComp from '../components/LoaderComp';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [placesDup, setPlacesDup] = useState();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // setLoader(true);
    const getPlaces = async () => {
      try {
        const response = await axios.get(`${baseUrl}${placesUrl}`);
        setPlaces(response.data);
        setPlacesDup(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getPlaces();
  }, []);

  const options = [
    { value: 'all', label: 'All places' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'hotel', label: 'Hotels' },
  ];
  const [selected, setSelected] = useState(options[0]);

  const filterPlaces = (selected) => {
    if (selected === 'all') {
      setPlaces(placesDup);
    } else {
      setPlaces(placesDup.filter((type) => type.type === selected));
    }
  };

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    filterPlaces(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };

  return (
    <div className='custom-container'>
      <h1 className='heading'>Places</h1>
      <div className='filterDiv'>
        <Select
          value={selected}
          defaultValue={options[0]}
          onChange={handleChange}
          options={options}
          setFieldValue={options[0].label}
          theme={(theme) => ({
            ...theme,
            borderRadius: '10px',
            colors: {
              ...theme.colors,
              primary25: '#EAECEF',
              primary: '#ff4f4f',
              primary75: '#ff4f4f',
              primary50: 'darkgrey',
            },
          })}
        />
      </div>
      {showLoader ? (
        <LoaderComp />
      ) : (
        <div className='places'>
          <PlacesCards places={places} />
        </div>
      )}
    </div>
  );
};

export default Places;
