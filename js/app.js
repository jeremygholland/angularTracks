var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){
	$scope.test = 'test';
	$scope.hidden = false;
	$('.money').hide();

	$scope.search = function(){
		$scope.hidden = true;
		var id;
		var lasties;
		var firsties;
		var total = []
		$scope.total = total[0];
		$('.name').html('');
		console.log($scope.zip);
		$.getJSON("http://congress.api.sunlightfoundation.com/legislators/locate?zip="+$scope.zip+"&apikey=8b48c930d6bb4552be3b0e6248efb463").then(function (json){
			for(var i = 0; i< json.results.length; i++){
				if(json.results[i].chamber == "house"){
					var district = json.results[i].district;
					var firstName = json.results[i].first_name;
					var lastName = json.results[i].last_name;
					var state = json.results[i].state;
				$('.name').append("<td> <button id = "+district+"> "+district+"</button> </td> <td> <h4>"+firstName+" "+lastName+ "</h4> </td>");
				$('#'+district).click(function(event){
					$('.name').html('');
					var newSearch = (event.target.id);
					$.getJSON('http://congress.api.sunlightfoundation.com/legislators?state='+state+'&district='+newSearch+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
						var firsties = json.results[0].first_name;
						var lasties = json.results[0].last_name;
						var party = json.results[0].party;
						var id = json.results[0].bioguide_id;
						var contact = json.results[0].contact_form;
						console.log(id);
						$('.name').html("<h2> <a href ="+contact+">" + firsties +" "+ lasties + "("+party+")</a></h2>");
						$.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+id +'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							for(j=0; j<json.results.length; j++){
								if(json.results[j].congress == '114'){
								var bills = json.results[j].bill_id;
								var committee = json.results[j].committee_ids;
								var shortTitle = json.results[j].short_title;
								var link = json.results[j].last_version.urls.pdf;
								$('.bills').append('<li>' + bills + ' <ul> <a href = '+ link +'> '+ shortTitle+'</a></ul></li>');
								}
							}
						})
						//&callback=?
						$.getJSON('http://transparencydata.com/api/1.0/entities.json?search='+firsties+'+'+lasties+'&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							$('.money').show();
							var newID = json[0].id;
							console.log(newID);
							var total = json[0].total_received;
							$scope.total = total;
							var totalP = json[0].count_received;
							console.log($scope.total);
							$('.totalP').html(totalP);
							$timeout(function() { 
								total.push(json[0].total_received);
							}, 2000);
							})
					})

				})

			}
		}
	})
}

}])