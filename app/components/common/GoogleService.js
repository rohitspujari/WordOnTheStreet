import Qs from 'qs';
const KEY='AIzaSyDaKls5tJ2u0RY5QEICM8QDSdPqMe9lAsc';

class GoogleService {

  requestNearby(latitude, longitude, filters={}, cb) {

    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
      location: latitude+','+longitude,
      key: KEY,
      ...filters,
    });

    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      cb(responseData);
    })
    .catch((error) => {
      console.warn(error);
    });

  }


}
module.exports = new GoogleService();
