import axios from 'axios';
import { baseUrl, placesUrl } from '../utils/api';
import { useState, useEffect } from 'react';
import PlacesCards from '../components/PlacesCards';
import Select from 'react-select';
import LoaderComp from '../components/LoaderComp';
import { useTranslation } from 'react-i18next';

const Places = () => {
  const { t } = useTranslation();
  document.title = `Holidaze | ${t('places')}`;
  const [places, setPlaces] = useState([]);
  const [placesDup, setPlacesDup] = useState();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
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
    { value: 'all', label: t('allTypes') },
    { value: 'apartment', label: t('apartments') },
    { value: 'cabin', label: t('cabins') },
    { value: 'hotel', label: t('hotels') },
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
  };

  return (
    <div className='custom-container'>
      <h1 className='heading'>{t('places')}</h1>
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
