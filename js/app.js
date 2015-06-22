var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', function($scope){
	$scope.test = 'test';

	$scope.search = function(){
		var dicks = [];
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
				$('#'+district).click(function(){
					$('.name').html('');
					var newSearch = $(this).text();
					console.log(newSearch);
					$.getJSON('http://congress.api.sunlightfoundation.com/legislators?state='+state+'&district='+district+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
						var firsties = json.results[0].first_name;
						var lasties = json.results[0].last_name;
						var party = json.results[0].party;
						var id = json.results[0].bioguide_id;
						$('.name').html("<h2> " + firsties +" "+ lasties + "("+party+")</h2>");
						$.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+id +'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							for(j=0; j<json.results.length; j++){
								var bills = json.results[j].bill_id;
								var committee = json.results[j].committee_ids
								$('.bills').append('<p>' + bills + '</p>');
								$.getJSON('http://congress.api.sunlightfoundation.com/committees?committee_id='+committee+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
									for(b = 0; b<json.results.length; b++){
										var committeeName= json.results[b].name;
										$('.committees').append('<p>' + committeeName + '</p>');
									}
								})
							}
						})
					})

				})

			}
		}
	})
	}

}])