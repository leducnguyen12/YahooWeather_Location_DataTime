
$(function(){
	getClock();
	setInterval(getClock,1000);
	getWeather();
});


//2017. 02. 20(월)
//15 : 45 : 56

function getClock() {
	tday = new Array("일", "월", "화", "수", "목", "금", "토");
	var d = new Date();
	var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d
			.getYear();
	if (nyear < 1000)
		nyear += 1900;
	var nhour = d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds();

	document.getElementById('date').innerHTML = "" + nyear + ". "
			+ checkTime((nmonth + 1)) + ". " + checkTime(ndate) + "("
			+ tday[nday] + ")";
	document.getElementById('time').innerHTML = "" + nhour + ":"
			+ checkTime(nmin) + ":" + checkTime(nsec) + "";
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}




function getWeather(){
	var getIP = 'http://ip-api.com/json/';
	var DEG = 'C';
	var wsql = 'select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="WID") and u="'+DEG+'"'  ;
	var weatherYQL = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(wsql)+'&format=json';
	var code, city, results, woeid;
	$.getJSON(getIP).done(function(location) {
		woeid = location.city+','+location.country;
		weatherYQL = weatherYQL.replace('WID', woeid.replace(' ', ''));
		$.getJSON(weatherYQL).done(function(weather) {
			var code = 'na',
			temp = '?';
			text = '';
			if (weather
					&& weather.query
					&& weather.query.results
					&& weather.query.results.channel
					&& weather.query.results.channel.item
					&& weather.query.results.channel.item.condition){
				code = weather.query.results.channel.item.condition.code;
				temp = weather.query.results.channel.item.condition.temp;
				text = weather.query.results.channel.item.condition.text;
			}
			var iconCode = (0 < code && code <47)? code.toString():'na';
			var icon = 'images/weather/'+ iconCode + '.png';
			var weatherElement = '<img src="'+icon+'" alt="' + text + '" width="35" height="35"/> '+ temp +'℃';
			document.getElementById("temple").innerHTML = weatherElement;
		})
	})
}