import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

// import mapStyles from '../../mapStyles';
import useStyles from './style.js';



const Map = ({ setCoords, setBounds , coords ,places}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: 'AIzaSyBhg7e5ODZtFGQgIzExQ6jAjE1wFkJqiE4'}}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true}}
        onChange={(e) => {
          console.log(e);
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={''}
      >
        {places?.map((place , i) => (
          <div 
          className={classes.markerContainer} 
          lat={Number(place.latitude)} 
          lng={Number(place.longitude)}
          key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
              ):(
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} varient="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img 
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;