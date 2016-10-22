export {mainController}

function mainController($scope, $http, dataService) {
	$scope.show = false;
	$scope.desired = window.desired || [];
    console.log('window.desired', window.desired);
	$scope.propertyName = "Year";
	let inputData;

	$scope.changePage = (page) =>{
		dataService.getJSON(inputData, page, (response, inputData) => {
			$scope.movies = response.data.Search;
			$scope.renderReviewsAmount($scope.movies);
		});
	};

	$scope.searchFunc = (input) =>{
		$scope.pages = [];
		inputData = input;
		dataService.getJSON(input, 1, (response) => {
			console.log(response);
			$scope.movies = response.data.Search;

			let results = response.data.totalResults;
			if(results.length > 1){
				let pagesAmount = results.substring(0, results.length - 1);

				for (let i = 0; i <= pagesAmount; i++) {
					$scope.pages.push({num: i+1});
				};
			}
			$scope.renderReviewsAmount($scope.movies);
		});
	};

	$scope.renderReviewsAmount = (items) =>{
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for (var j = 0; j < items.length; j++) {
				let itemID = items[j].imdbID;
				items[j].reviews = 0;
				for(let i = 0; i < $scope.lsLength; i++) {
					let key = localStorage.key(i);
					if(key.indexOf(itemID) > 0) {
						items[j].reviews += 1;
					}
				}
			};
		}
	}

	// Desired
	$scope.elemMask = 'elem_';

    $scope.addToDesired = (movie) => {
        console.log(movie);
        $http.post('/add-desired', {movie}).then((resp) => {
            if (resp.data.type == 'success') {
                $scope.desired.push(movie);
            }
        });
	}
}