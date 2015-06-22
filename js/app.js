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
					dicks.push(json.results[i].bioguide_id);
					var emailEm = json.results[i].contact_form;
					var firstName = json.results[i].first_name;
					var lastName = json.results[i].last_name;
					$('.name').append("<td class = "+lastName+"> <a href = " +emailEm+"> "+firstName + ' ' + lastName+" </a></td>");
					for(j =0; j<dicks.length; j++){
			$.getJSON("http://congress.api.sunlightfoundation.com/bills?sponsor_id="+dicks[j]+"&apikey=8b48c930d6bb4552be3b0e6248efb463").then(function (json){
				for (b = 0; b <json.results.length; b++){
					var newLast =json.results[b].sponsor.last_name;
					var bills = json.results[b].bill_id;
				$('.'+lastName).append("<ul>" + bills+ "</ul>");
				}
			})
		}
					}
			}
		})
	}

}])