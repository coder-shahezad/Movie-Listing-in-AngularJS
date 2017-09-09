var app = angular.module('movieApp', ['ui.bootstrap','ngStorage']);

app.controller('lolCtrl',['$scope','$localStorage', '$http',
  function($scope,$localStorage, $http) {
 $scope.movieGenre = "All";
 
    function paginate() {

      $scope.filteredTodos = []
      ,$scope.currentPage = 1
      ,$scope.numPerPage = 9
      ,$scope.maxSize = 5;

      $scope.makeTodos = function() {
       $scope.todos = $scope.moviesData;

     };
     $scope.makeTodos(); 

     $scope.$watch('currentPage + numPerPage', function() {
       var begin = (($scope.currentPage - 1) * $scope.numPerPage)
       , end = begin + $scope.numPerPage;

       $scope.filteredTodos = $scope.todos.slice(begin, end);
     });
   }

   function paginateForGenres(filteredTodos) {

    $scope.filteredTodos = []
    ,$scope.currentPage = 1
    ,$scope.numPerPage = 12
    ,$scope.maxSize = 5;

    $scope.makeTodos = function(filteredTodos) {
     $scope.todos = filteredTodos;

   };
   $scope.makeTodos(filteredTodos); 



   $scope.$watch('currentPage + numPerPage', function() {
     var begin = (($scope.currentPage - 1) * $scope.numPerPage)
     , end = begin + $scope.numPerPage;

     $scope.filteredTodos = $scope.todos.slice(begin, end);
   });
 }

 $scope.lol = function () {
  $http.get("http://starlord.hackerearth.com/movieslisting").then(function (response) {
    var data = response.data;

    for(var i=0; i <data.length; i++){
      var genre=null;
      genre=data[i].genres;
      var splittedGenre = genre.split("|");
      data[i].genres=splittedGenre;
    }



    $scope.moviesData = data;
    $localStorage.moviesData = data;

    console.log('Hi Faran--> ');
    paginate();
  });
}

$scope.filterMoviesByGenre = function(moviesData,genre){
 $scope.movieGenre = genre;
  $scope.filteredTodos = [];

  for(var i=0; i<moviesData.length; i++){
    if(moviesData[i].genres.includes(genre)){
      $scope.filteredTodos.push(moviesData[i]);
    }
  }
  paginateForGenres($scope.filteredTodos);

}

$scope.getMovieDetails = function(data){
    $scope.movieDetails = data;
}
}]);