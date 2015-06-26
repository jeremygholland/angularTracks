var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){
	$scope.test = 'test';

	$scope.hidden = false;
	$('.tabStuff').hide();
	$('.reset').hide();
	$('.money').hide();
	$('.comitStuff').hide();
	$('.bills').hide();

	$scope.search = function(){
		$('.inputForm').hide();
		$scope.hidden = true;
		$('.tabStuff').show();
		var entityTotal= [];
		var entityType = [];
		var id;
		var lasties;
		var firsties;
		 contribNames = [];
		var contribTotals= [];
		var total = []
		$scope.contribNames;
		$scope.contribTotals;
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
					$('.comitStuff').show();
					var newSearch = (event.target.id);
					$.getJSON('http://congress.api.sunlightfoundation.com/legislators?state='+state+'&district='+newSearch+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
						var firsties = json.results[0].first_name;
						var lasties = json.results[0].last_name;
						var party = json.results[0].party;
						var id = json.results[0].bioguide_id;
						var contact = json.results[0].contact_form;
						console.log(id);
						$('.name').html("<h2> <a href ="+contact+">" + firsties +" "+ lasties + "("+party+"), "+state+"</a></h2>");
						$.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+id +'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							$('.bills').show();
							for(j=0; j<json.results.length; j++){
								if(json.results[j].congress == '114'){
								var bills = json.results[j].bill_id; 
								var shortTitle = json.results[j].short_title;
								var link = json.results[j].last_version.urls.pdf;
								$('.bills').append('<li>' + bills + ' <ul> <a href = '+ link +'> '+ shortTitle+'</a></ul></li>');
								}
							}
						})
						$.getJSON('http://congress.api.sunlightfoundation.com/committees?member_ids='+id+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							for(w = 0; w<json.results.length; w++){
									var committees= json.results[w].name;
								$('.mainCommittee').append('<li>'+committees+'</li>');
							}
						})
						//&callback=?
						$.getJSON('http://transparencydata.com/api/1.0/entities.json?search='+firsties+'+'+lasties+'&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							$('.money').show();
							var newID = json[0].id;
							console.log(newID);
							var totalP = json[0].count_received;
							$('.totalP').html(totalP);
							//allows for angular currency filter to work
							$timeout(function() { 
								total.push(json[0].total_received);
							}, 2000);
						$.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors.json?cycle=2014&limit=40&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							for(y = 0; y<json.length; y++){
								var contribName = json[y].name;
								var contribTotal = json[y].total_amount;
								console.log(contribTotal);
								contribTotals.push(contribTotal);
								contribNames.push(contribName);
								}
								$scope.contribNames= contribNames;
								$scope.contribTotals= contribTotals;
						})

						$.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors/industries.json?cycle=2014&limit=30&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
							for(u = 0; u<json.length; u++){
								entityTotal.push(json[u].amount);
								 entityType.push(json[u].name);
							}
							$scope.entityType = entityType;
							$scope.entityTotal = entityTotal;
						})
						$.getJSON('http://transparencydata.com/api/1.0/entities/'+newID+'.json?cycle=2014&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
								var hmm =json.totals['2014'].recipient_amount;
								var hmmP = json.totals['2014'].recipient_count;
								$scope.total = hmm;
								$scope.hmmP = hmmP;
							});
					})
					})
				})

			}
		}
	})
$('.reset').show();
}
	$scope.reset = function(){
		$scope.zip = '';
		$('.inputForm').show();
		$('.name').html('');
		$('.bills').html('');
		$('.mainCommittee').html('');
		var firsties = '';
		var lasties = '';
		var party = '';
		var id = '';
		var contact = '';
		var bills = ''; 
		var shortTitle = '';
		var link = '';
		var committees= '';
		var newID = '';
		var totalP = '';
		var entityTotal= [];
		var entityType = [];
		var id;
		var lasties;
		var firsties;
		var contribNames = [];
		var contribTotals= [];
		var total = [];
		var contribName = '';
		var contribTotal = '';
		$scope.entityType = '';
		$scope.entityTotal = '';
		$scope.contribNames= '';
		$scope.contribTotals= '';
		$scope.hmm ='';
		$scope.hmmP = '';
		$('.money').hide();
		$('.tabStuff').hide();
		$('.bills').hide();

	}

}])