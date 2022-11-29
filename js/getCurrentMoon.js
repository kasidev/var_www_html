// formula to compute all Moon information at current time:
// moon phase information, moon rise/set time, ....
// ...moon altitude/azimuth, positional angle, parallactic angle, zenith angle
//
// get Sun Rise and Sun Set in HH:MM format

// make HH and MM always two digits
      function Pad(value) {
        if (value > 9) {
          return value;
        } else if (value > 0) {
          return "0" + value;
        } else {
          return "00";
        }
	  }
var latx = 13.71732
var longx = 100.5907
//var datenow = new Date(); // current date 

//...Moon section...
// get today's moonlight times for Europa Cafe
var times_m = SunCalc.getMoonTimes(new Date(), latx, longx);
// format moonrise and moonset time from the Date object
var moonrisehhmm = Pad(times_m.rise.getHours()) + ':' + Pad(times_m.rise.getMinutes());
$('#MOONri').text(moonrisehhmm);
var moonsethhmm = Pad(times_m.set.getHours()) + ':' + Pad(times_m.set.getMinutes());
//$('#MOONri').text(moonrisehhmm);
$('#MOONse').text(moonsethhmm); 
//
var datetransit_m = times_m.rise.getTime() + ((times_m.set.getTime() - times_m.rise.getTime()) /2); // transit date time

// get position of the moon (azimuth and altitude) now
var moonnowPos = SunCalc.getMoonPosition(new Date(), latx, longx);
// get moon azimuth in degrees
var moonnowAzimuth = moonnowPos.azimuth * 180 / Math.PI;
// get Moon altitude in degrees (E0-90-0W) and adjust degree to E0-90-180W where 180 is altitude for setting Moon (west side of nadir)
var moonnowAltitude = moonnowPos.altitude * 180 / Math.PI;
// east or west position in degrees from east side (sunrise at 0 degree, and sunset at 180 degree)
var timeDiff_m = datenow.getTime() - datetransit_m; // in miliseconds
//var timeDiff_m = Date.now() - datetransit_m; // in miliseconds
if (timeDiff_m > 0) {
  var eastorwest_m = "W";
  var moonnowAltitude_adj = 180 - moonnowAltitude;
} else {
  var eastorwest_m = "E";
  var moonnowAltitude_adj = moonnowAltitude;
} 
// get moon parallactic angle
var moonnowParal = moonnowPos.parallacticAngle * 180 / Math.PI;
// get Moon angle
var moonnowIllu = SunCalc.getMoonIllumination(new Date());
var moonnowAngle = moonnowIllu.angle * 180 / Math.PI;
// get Moon fraction (0-1)
var moonnowFrac = moonnowIllu.fraction;
// get Moon phase (0, 0.25, 0.5-full, 0.75, 1),... 
// this value will also be used in MoonPhaseDIY.html
var moonnowPhase = moonnowIllu.phase;
// calculate moon zenith angle of bright illu (angle - parallactic angle), anticlockwise
var moonnowZenithA = moonnowAngle - moonnowParal;


$('#MOONrise').text(times_m.rise);
$('#MOONtransit').text(datetransit_m);
$('#MOONset').text(times_m.set);
//$('#DateNow').text(new Date());
$('#timediff_m').text(timeDiff_m);
$('#MOONeORw').text(eastorwest_m);
$('#MOONnowAlt').text(moonnowAltitude);
$('#MOONnowAltAdj').text(moonnowAltitude_adj);
$('#MOONnowAngle').text(moonnowAngle);
$('#MOONnowParal').text(moonnowParal);
$('#MOONnowZenithA').text(moonnowZenithA);
$('#MOONnowFrac').text(moonnowFrac);
$('#MOONnowPhase').text(moonnowPhase);

// compute moon phase bright limb degree to be oriented from what seen at north pole (Moon base image)
if (moonnowPhase > 0.5) { 
	moonorient = moonnowZenithA - 90;}
else
	{moonorient = moonnowZenithA + 90;}
// as rotate function in html is limited to +180 and -180, so need adjustment
if (moonorient > 180)
   {moonorient = moonorient - 360;}
else
if (moonorient < -180)
	{moonorient = moonorient + 360;}
else {}
moonorient = moonorient * -1;
$('#MOONnowOrient').text(moonorient); //moonorient positive value is clockwise in css
