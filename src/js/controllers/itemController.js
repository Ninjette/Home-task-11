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

	$scope.addReview = (movieTitle, text) => {
        $http.post('/add-comment', {movieTitle, text, rating: $scope.rating}).then(() => {
            $scope.reviews.push({
                text,
                rating : $scope.rating
            });
            $scope.reviewText = '';
        });
	}
}