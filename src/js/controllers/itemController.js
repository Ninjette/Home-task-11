export {itemController}

function itemController($scope, dataService, $location, $http) {
	//rating
	$scope.rating = 0;
	let ratingDiv = document.querySelector('.rating');
    if (ratingDiv) {
        let currentRating = 0;
        let maxRating = 5;

        let callback = function(rating) {
            $scope.rating = rating;
        };

        let myRating = rating(ratingDiv, currentRating, maxRating, callback);
    }


	let path = $location.path();
	let titleName = path.slice(6);
	let reviewID;

	$scope.getInfo = (title) =>{
		dataService.getItemJSON(title, (response) =>{
			$scope.item = response.data;
			//$scope.showReviews($scope.item.imdbID);
		});
        dataService.getComments(title, (response) => {
            console.log('response', response);
            $scope.reviews = response.data;
        });
	};

	$scope.getInfo(titleName);
	$scope.reviewId = 0;
	$scope.reviews = [];
	$scope.reviewMask = 'review_';

	
	/*$scope.showReviews = (itemID) => {
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for(let i = 0; i < $scope.lsLength; i++) {
				let key = localStorage.key(i);
				if(key.indexOf(itemID) > 0) {
					$scope.reviews.push(JSON.parse(localStorage.getItem(key)));
					let lsKey = localStorage.getItem(key);
				}
			}
		}
	};*/
	// $scope.showReviews();

	$scope.addReview = (movieTitle, text) => {
		//Local storage saving
        $http.post('/add-comment', {movieTitle, text, rating: $scope.rating}).then(() => {
            //make new review visible on view
            $scope.reviews.push({
                text,
                rating : $scope.rating
            });
            $scope.reviewText = '';
        });
	}
}