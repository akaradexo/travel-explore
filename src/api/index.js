import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async ( sw, ne ) => {
  try{
    const { data : { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': '11fc00958emsh4205882e9e50159p139f3fjsn38333722f22a',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      },
    });
    console.log(data);

    return data;
  } catch(error){
    console.log(error);
  }
}