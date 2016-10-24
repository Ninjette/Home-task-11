require('../sass/style.scss');
require('../external/five-star-rating-master/js/src/rating.js')
import {serviceFunc} from "./services/data.js";
import {mainController} from "./controllers/mainController.js";
import {itemController} from "./controllers/itemController.js";

angular.module("moviesApp",['ngRoute'])
	.service('dataService', serviceFunc)
	.controller('mainController', mainController)
	.controller('itemController', itemController)
	.config(function($routeProvider){
		$routeProvider
			.when('/item:ID',{
				templateUrl: '/angular/template/item'
			})
			.when('/',{
				templateUrl: '/angular/template/search'
			})
			.when('/login',{
				templateUrl: '/angular/template/login'
			})
			.when('/signup',{
				templateUrl: '/angular/template/signup'
			})

	});