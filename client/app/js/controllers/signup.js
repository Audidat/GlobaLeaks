GL.controller("SignupCtrl", ["$scope", "$route", "$http",
              function($scope, $route, $http) {

  $scope.hostname = "";

  $scope.step = 1;
  $scope.signup = {
    "subdomain": "",
    "name": "",
    "surname": "",
    "role": "",
    "email": "",
    "phone": "",
    "organization_name": "",
    "organization_type": "",
    "organization_tax_code": "",
    "organization_vat_code": "",
    "organization_location": "",
    "tos1": false,
    "tos2": false
  };

  var completed = false;

  $scope.updateSubdomain = function() {
    $scope.signup.subdomain = "";
    if ($scope.signup.organization_name) {
      $scope.signup.subdomain = $scope.signup.organization_name.replace(/[^\w]/gi, "").toLowerCase();
    }
  };

  $scope.complete = function() {
    if (completed) {
        return;
    }

    completed = true;

    $http.post("api/signup", $scope.signup).then(function() {
      $scope.step += 1;
    });
  };
}]).
controller("SignupActivationCtrl", ["$scope", "$http", "$location",
                    function($scope, $http, $location) {
  var token = $location.search().token;
  if (token) {
    $http.get("api/signup/" + token);
  }
}]);
