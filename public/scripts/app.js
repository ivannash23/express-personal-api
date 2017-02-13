console.log("Sanity Check: JS is working!");

$(document).ready(function(){

$.ajax({
    method: 'GET',
    url: '/api/athletes',
    success: onSuccessAllAthletes
});

$.ajax({
    method: 'GET',
    url: '/api/teams',
    success: onSuccessAllTeams
});

function onSuccessAllAthletes(responseData){
	responseData.forEach(function(value, index){
		$('#athletes').append(`<p>Name: ${value.name}</p>`);
		$('#athletes').append(`<p>Is ${value.name} in a Team? ${value.isInATeam}</p>`);
		$('#athletes').append(`<p>Sports played: ${value.sport}</p><hr>`);
	});
}

function onSuccessAllTeams(responseData){
	responseData.forEach(function(value, index){
		$('#teams').append(`<p>Name: ${value.name}</p>`);
		$('#teams').append(`<p>Colors: ${value.color1} and ${value.color2}</p>`);
		$('#teams').append(`<p>Sport: ${value.sport}</p><hr>`);
	});
}

});
