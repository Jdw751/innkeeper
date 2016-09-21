

maintenance.factory('dataAdminFactory', function($http){



	var factory = {};

	factory.getAllTickets = function(){
		return $http.get('http://localhost:3030/maintenanceCheck/');

	};

	factory.getCategories = function(){
		return["Request Item","Missing Item","Broken Item"];
	};

	factory.getStatus = function(){
		return['Submitted','In-Progress','Complete'];
	};


	

	// factory.updateTicket = function(data,update){
	// 	return $http.post('http://localhost:3000/maintenanceCheck/'+
	// 		data._id+'/'+update);

	// };


	factory.sumbmitNewTicket = function(ticket){
		return $http.post('http://localhost:3030/maintenanceCheck/', ticket);
		
	};

	return factory;
});
