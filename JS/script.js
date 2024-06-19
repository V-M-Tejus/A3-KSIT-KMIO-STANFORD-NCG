var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
  //Script for Image generation
/*
  $scope.uploadedImageSrc = '';

  $scope.openFilePicker = function() {
      document.getElementById('imageInput').click();
  };

  $scope.fileChanged = function(event) {
      var file = event.target.files[0];
      if (file) {
          var img = new Image();
          img.onload = function() {
              $scope.$apply(function() {
                  $scope.uploadedImageSrc = img.src;
                  document.getElementById('run-chart').style.display = 'none';
                  document.getElementById('uploadedImage').style.display = 'block';
              });
          };
          img.src = URL.createObjectURL(file);
      } else {
          document.getElementById('errorPopup').style.display = 'block';
          setTimeout(function() {
              document.getElementById('errorPopup').style.display = 'none';
          }, 3000);
      }
  };



*/



  //initialization of certain things

  $scope.keyVar = [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }];
  $scope.intVar = [{ name: "Item A" }, { name: "Item B" }, { name: "Item C" }];
  $scope.projectTitle = [{ name: "Enter Project title", editing: false }];

  $scope.problemStatement = [
    { name: "Enter max 300 characters", editing: false },
  ];

  $scope.background = [{ name: "Enter max 400 characters", editing: false }];

  $scope.targetState = [{ name: "Enter max 450 characters", editing: false }];

  $scope.currentState = [{ name: "Enter max 100 characters", editing: false }];

  $scope.sustainPlan = [
    {
      activity: { name: "Enter activity", editing: false },
      owner: { name: "Enter Owner", editing: false },
      sustainMethod: { name: "Enter Sustain method", editing: false },
      reportTo: { name: "Enter Report To", editing: false },
    },
  ];

  $scope.showButtons = true;
  $scope.visible = { homeActive: true, aboutUsActive: false, tioActive: false };

  $scope.navigate = function (page) {
    if (page === "home") {
      $scope.visible = {
        homeActive: true,
        aboutUsActive: false,
        tioActive: false,
      };
    } else if (page === "about") {
      $scope.visible = {
        homeActive: false,
        aboutUsActive: true,
        tioActive: false,
      };
    } else if (page === "tryItOut") {
      $scope.visible = {
        homeActive: false,
        aboutUsActive: false,
        tioActive: true,
      };
    }
  };

  //code for arrow generation
  $scope.arrowEditingStart = function () {
    $scope.arrowEdit = true;
  };

  $scope.arrowEditingEnd = function () {
    $scope.arrowEdit = false;
  };
  $scope.arrowPath = ""; // Initialize arrowPath

  $scope.arrows = []; // Array to store all arrow paths

  $scope.arrowGenerate = function (selectedKey, selectedInt) {
    // Find the index of the selected items in their respective arrays
    var keyIndex = $scope.keyVar.findIndex((k) => k.name === selectedKey);
    var intIndex = $scope.intVar.findIndex((i) => i.name === selectedInt);

    if (keyIndex !== -1 && intIndex !== -1) {
      // Calculate positions (adjust these based on your actual layout)
      var keyElement = document.querySelector(
        `#keyDrivers tr:nth-child(${keyIndex + 1}) td`
      );
      var intElement = document.querySelector(
        `#myTable tr:nth-child(${intIndex + 1}) td`
      );

      if (keyElement && intElement) {
        var keyRect = keyElement.getBoundingClientRect();
        var intRect = intElement.getBoundingClientRect();

        var svgRect = document
          .getElementById("arrowSvg")
          .getBoundingClientRect();

        var keyX = keyRect.right - svgRect.left;
        var keyY = keyRect.top + keyRect.height / 2 - svgRect.top;

        var intX = intRect.left - svgRect.left;
        var intY = intRect.top + intRect.height / 2 - svgRect.top;

        // Generate arrow path using SVG path syntax
        var newArrowPath = `M${keyX},${keyY} L${intX},${intY}`;
        $scope.arrows.push({
          path: newArrowPath,
          lhs: selectedKey,
          rhs: selectedInt,
          editing: false,
        }); // Add the new arrow path to the array
        $scope.updateArrows(); // Update the SVG paths
      }
    } else {
      // Handle error if selected items are not found
      console.error("Selected items not found.");
    }
  };

  $scope.updateArrows = function () {
    // Combine all paths into a single string separated by space
    $scope.arrowPaths = $scope.arrows.map((a) => a.path).join(" ");
  };

  $scope.editArrow = function (arrow) {
    arrow.editing = true;
  };

  $scope.saveArrow = function (arrow) {
    arrow.editing = false;
    // Recalculate the arrow path based on the new lhs and rhs values
    var keyIndex = $scope.keyVar.findIndex((k) => k.name === arrow.lhs);
    var intIndex = $scope.intVar.findIndex((i) => i.name === arrow.rhs);

    if (keyIndex !== -1 && intIndex !== -1) {
      var keyElement = document.querySelector(
        `#keyDrivers tr:nth-child(${keyIndex + 1}) td`
      );
      var intElement = document.querySelector(
        `#myTable tr:nth-child(${intIndex + 1}) td`
      );

      if (keyElement && intElement) {
        var keyRect = keyElement.getBoundingClientRect();
        var intRect = intElement.getBoundingClientRect();

        var svgRect = document
          .getElementById("arrowSvg")
          .getBoundingClientRect();

        var keyX = keyRect.right - svgRect.left - 20; //Added -20
        var keyY = keyRect.top + keyRect.height / 2 - svgRect.top - 20; //Added  -20

        var intX = intRect.left - svgRect.left - 20;
        var intY = intRect.top + intRect.height / 2 - svgRect.top - 20;

        arrow.path = `M${keyX},${keyY} L${intX},${intY}`;
        $scope.updateArrows(); // Update the SVG paths
      }
    }
  };

  $scope.deleteArrow = function (index) {
    $scope.arrows.splice(index, 1);
    $scope.updateArrows(); // Update the SVG paths
  };

  //Sustain Plan Functions
  $scope.addSustainPlan = function () {
    $scope.sustainPlan.push({
      activity: { name: "", editing: true },
      owner: { name: "", editing: true },
      sustainMethod: { name: "", editing: true },
      reportTo: { name: "", editing: true },
    });
  };

  $scope.editSustainPlan = function (i, colname) {
    if (colname === "activity") {
      i.activity.editing = true;
    } else if (colname === "owner") {
      i.owner.editing = true;
    } else if (colname === "sustainMethod") {
      i.sustainMethod.editing = true;
    } else if (colname === "reportTo") {
      i.reportTo.editing = true;
    }
  };

  $scope.saveSustainPlan = function (i, colname) {
    if (colname === "activity") {
      i.activity.editing = false;
    } else if (colname === "owner") {
      i.owner.editing = false;
    } else if (colname === "sustainMethod") {
      i.sustainMethod.editing = false;
    } else if (colname === "reportTo") {
      i.reportTo.editing = false;
    }
  };

  $scope.deleteSustainPlan = function (i) {
    const ind = $scope.sustainPlan.indexOf(i);
    if (ind !== -1) {
      $scope.sustainPlan.splice(ind, 1);
    }
  };

  //Functions for Key and Intervention

  $scope.addEmptyKey = function (varname) {
    if (varname === "key") {
      $scope.keyVar.push({ name: "", editing: true });
    } else if (varname === "intervention") {
      $scope.intVar.push({ name: "", editing: true });
    }
  };

  $scope.editKey = function (k) {
    k.editing = true;
  };

  $scope.saveKey = function (k) {
    if (k.name !== "") {
      k.editing = false;
    }
  };

  $scope.deleteKey = function (ind, varname) {
    if (ind !== -1) {
      if (varname === "key") {
        $scope.keyVar.splice(ind, 1);
      } else if (varname === "intervention") {
        $scope.intVar.splice(ind, 1);
      }
    }
  };

  $scope.downloadPDF = function () {
    //Here all Buttons will be hided and then we will get to see the downloaded pdf
    $scope.showButtons = false;
  };


  $scope.graphs = [
    { id: 1, defaultSrc: "./Static/Screenshot 2024-06-02 151729.png", altText: "Run Chart" },
    { id: 2, defaultSrc: "./Static/1.png", altText: "Flow Chart" },
    { id: 3, defaultSrc: "./Static/2.png", altText: "Another Chart" },
    { id: 4, defaultSrc: "./Static/3.png", altText: "Fourth Chart" }
];

});





app.directive('imageUploader', function() {
  return {
      restrict: 'E',
      scope: {
          id: '@',
          defaultSrc: '@',
          altText: '@'
      },
      template: `
          <div class="graph" ng-click="openFilePicker()">
              <div class="imageContainer">
                  <img id="uploadedImage{{id}}" ng-src="{{uploadedImageSrc}}" alt="{{altText}}">
                  <input type="file" id="imageInput{{id}}" style="display:none" accept="image/*" onchange="angular.element(this).scope().fileChanged(event)">
                  <img class="run-chart" id="run-chart{{id}}" ng-src="{{defaultSrc}}" alt="{{altText}}">   
              </div>
              <div class="error-popup" id="errorPopup{{id}}">Error: Invalid file</div>
          </div>
      `,
      controller: function($scope) {
          $scope.uploadedImageSrc = '';

          $scope.openFilePicker = function() {
              document.getElementById('imageInput' + $scope.id).click();
          };

          $scope.fileChanged = function(event) {
              var file = event.target.files[0];
              if (file) {
                  var img = new Image();
                  img.onload = function() {
                      $scope.$apply(function() {
                          $scope.uploadedImageSrc = img.src;
                          document.getElementById('run-chart' + $scope.id).style.display = 'none';
                          document.getElementById('uploadedImage' + $scope.id).style.display = 'block';
                      });
                  };
                  img.src = URL.createObjectURL(file);
              } else {
                  document.getElementById('errorPopup' + $scope.id).style.display = 'block';
                  setTimeout(function() {
                      document.getElementById('errorPopup' + $scope.id).style.display = 'none';
                  }, 3000);
              }
          };
      }
  };
});