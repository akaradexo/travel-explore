import './App.css';
import React, { useState, useEffect } from 'react';

import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api/index';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'


const App = () => {

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [places , setPlaces] = useState([]);
  const [childClicked , setChildClicked] = useState(null);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, [])

  useEffect(() => {
    const filteredPlaces =places.filter((place) => place.rating > rating );
    setFilteredPlaces(filteredPlaces);
}, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, coords, bounds]);

  return (
    <>  
      <CssBaseline/>
      <Header setCoords={setCoords}/>
      <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces: places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces: places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
