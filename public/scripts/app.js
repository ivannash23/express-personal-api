
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

$('#newAthleteForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/athletes',
      data: $(this).serialize(),
      success: onSuccessNewAthletes
    });
  });

$('#newTeamForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/teams',
      data: $(this).serialize(),
      success: onSuccessNewTeam
    });
  });

$('.btn-team').on('click', function(e){
	$.ajax({
		method:'DELETE',
		url:'/api/teams/' + $(this).attr('id'),
		success: onSuccessDeleteTeam
	});
});

$('.btn-athlete').on('click', function(e){
	$.ajax({
		method:'DELETE',
		url:'/api/athletes/' + $(this).attr('id'),
		success: onSuccessDeleteAthlete
	});
});

function onSuccessDeleteTeam(){
	window.alert("Team successfully deleted");
	location.reload();
}

function onSuccessDeleteAthlete(){
	window.alert("Athlete successfully deleted");
	location.reload();
}

function onSuccessNewTeam(responseData){
	$('#teams').append(`<p>Name: ${responseData.name}</p>`);
	$('#teams').append(`<p>Colors: ${responseData.color1} and ${responseData.color2}</p>`);
	$('#teams').append(`<p>Sport: ${responseData.sport}</p>`);
	$('#teams').append(`<button id="${responseData._id}" class="btn btn-danger btn-team">Delete</button><hr>`);
	window.alert("Team successfully created");
	location.reload();
}


function onSuccessNewAthletes(responseData){
	if(responseData.isInATeam){
		var freeAgent = "Yes";
	}else{
		freeAgent = "No";
	}
	$('#athletes').append(`<p>Name: ${responseData.name}</p>`);
	$('#athletes').append(`<p>Is ${responseData.name} in a Team? ${freeAgent}</p>`);
	$('#athletes').append(`<p>Sports played: ${responseData.sport}</p>`);
	$('#athletes').append(`<button id="${responseData._id}" class="btn btn-danger btn-athlete">Delete</button><hr>`);
	window.alert("Athlete successfully created");
	location.reload();
}

function onSuccessAllAthletes(responseData){
	responseData.forEach(function(value, index){
		if(value.isInATeam){
			var freeAgent = "Yes";
		}else{
			freeAgent = "No";
		}
		$('#athletes').append(`<p>Name: ${value.name}</p>`);
		$('#athletes').append(`<p>Is ${value.name} in a Team? ${freeAgent}</p>`);
		$('#athletes').append(`<p>Sports played: ${value.sport}</p>`);
		$('#athletes').append(`<button id="${value._id}" class="btn btn-danger btn-athlete">Delete</button><hr>`);
	});
}

function onSuccessAllTeams(responseData){
	responseData.forEach(function(value, index){
		$('#teams').append(`<p>Name: ${value.name}</p>`);
		$('#teams').append(`<p>Colors: ${value.color1} and ${value.color2}</p>`);
		$('#teams').append(`<p>Sport: ${value.sport}</p>`);
		$('#teams').append(`<button id="${value._id}" class="btn btn-danger btn-team">Delete</button><hr>`);
		value.athlete.forEach(function(value,index){
		$('#teams').append(`<p>Roster: ${value.name}`);
			
		});
	});
}

});
