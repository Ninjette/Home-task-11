export {serviceFunc};
function serviceFunc($http){

	this.getJSON = (query = '', page = 1, callback) =>{
		$http.get(`/angular/search?s=${query}&page=${page}`).then(callback);
	};

	this.getItemJSON = (title, callback) =>{
		$http.get(`/angular/item/?t=${title}`).then(callback);
	};
}