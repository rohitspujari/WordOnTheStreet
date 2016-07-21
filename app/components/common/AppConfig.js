

const yellow = '#fce55a';
const teal = '#169487';
const red = '#e3533d';
const green = '#49b079';
const lemonGreen = '#b3cd52';

const backgroundColor = '#f6f7f8'

const textColor = '#34495e';
const starColor = '#e7711b';
const test = 'red';
export default class AppConfig {

  //static x = '#b3cd52';

  static themeStarColor() {
   //return '#b3cd52';
   return starColor;
 }

  static themeTextColor() {
   //return '#b3cd52';
   return textColor;
 }

 static themeTransperentColor() {
   return 'rgba(255,255,255,0.6)'
 }

 static themeBackgroundColor() {
  //return '#b3cd52';
  //return 'rgba(255,255,255,0.6)'
  return backgroundColor;
}

  static themeColor() {
   //return '#b3cd52';
   return lemonGreen;
 }



 static getDistance (lat1, lon1, lat2, lon2, unit) {
   var radlat1 = Math.PI * lat1/180
   var radlat2 = Math.PI * lat2/180
   var theta = lon1-lon2
   var radtheta = Math.PI * theta/180
   var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
   dist = Math.acos(dist)
   dist = dist * 180/Math.PI
   dist = dist * 60 * 1.1515
   if (unit=="K") { dist = dist * 1.609344 }
   if (unit=="N") { dist = dist * 0.8684 }
   //return dist
   return (Math.round(dist*10)/10)+" mile."
 }
}
