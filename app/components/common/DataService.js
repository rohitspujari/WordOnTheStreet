const PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI&placeid=';
const DEFAULT_PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4';

class DataService {

  fetchPlaceDetails(placeID = DEFAULT_PLACE_ID, cb) {
    let url = `${PLACE_DETAILS}${placeID}`;

    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{
      if(responseData.status === 'OK') {
        return cb(responseData.result);
      }
      throw {
        error: 'bad request',
        status: responseData.status
      }
    })
    .catch((err)=>{
      cb(err);
    })

    //return cb({name:'rohit',city:'chicago'})

  }

}
module.exports = new DataService();
