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

  $scope.keyVar = [{ name: "Specialist consultation  at KMIO (Cardiology/Urology)" }, { name: "Smooth Patient Navigation"}, { name: "Adequate Universal Electronic Retrieval of Patient Health Records" },{name:"Patient Counselling Post Initial Visit"},{name:"Segregation of New and Follow Patients"}];
  $scope.intVar = [{ name: "Arrangement for Visiting Consultants." }, { name: "Compilation of Citizen Charter and it’s Active Dissemination." }, { name: "Mandatory e-Hospital Implementation for all New Patients." },{name:"Adequate Medical and Social Counselling"},{name:"Separate Queues for New Patients"}];
  $scope.projectTitle = [{ name: "Enter Project title", editing: false }];

  $scope.problemStatement = [
    { name: "Patients Registered with Suspected/Diagnosed Lung Cancer and Colorectal Cancers take an Average of  31 Days to be Started on Treatment.", editing: false },
  ];

  $scope.background = [{ name: "KMIO, a tertiary cancer care center, faces significant delays in diagnosing and treating lung and colorectal cancer due to heavy workloads, limited manpower, and low patient education levels. Quantifying these delays helps identify factors causing them, allowing targeted improvements for better patient care and timely treatment.", editing: false }];

  $scope.targetState = [{ name: "Reducing treatment initiation time for Lung and Colorectal cancer patients from 31 Days to 14 Days by December 2022 ", editing: false }];

  $scope.currentState = [{ name: "At KMIO, lung cancer treatment starts in 27 days (7-68 days) and colorectal in 26 days (19-42 days).", editing: false }];

  $scope.sustainPlan = [
    {
      activity: { name: "Enter activity", editing: false },
      owner: { name: "Enter Owner", editing: false },
      sustainMethod: { name: "Enter Sustain method", editing: false },
      reportTo: { name: "Enter Report To", editing: false },
    },
    {
      activity: { name: "Visiting consultants at KMIO", editing: false },
      owner: { name: "The Medical Superintendent", editing: false },
      sustainMethod: { name: "Monthly Referral Audits and Discussion in Head of the Departments (HoDs) committee meeting", editing: false },
      reportTo: { name: "The Director       ", editing: false }
  },
  {
      activity: { name: "Citizen Charter compilation and dissemination. (Citizen Charter shall be released after approval of the Governing Council of the Institute)", editing: false },
      owner: { name: "The Public Relation Officer", editing: false },
      sustainMethod: { name: "Patient and Citizen feedback through Institute website. To Update Citizen Charter once in 3 Months or earlier as and when necessary.", editing: false },
      reportTo: { name: "The Director       ", editing: false }
  },
  {
      activity: { name: "E Hospital Implementation", editing: false },
      owner: { name: "The Medical Record Officer", editing: false },
      sustainMethod: { name: "MRD audit once a month and Implementation of Corrective and Preventive Action (CAPA).", editing: false },
      reportTo: { name: "The Medical Superintendent       ", editing: false }
  },
  {
      activity: { name: "Adequate Medical Counselling and Medico Social Counselling during the first visit of the Patient", editing: false },
      owner: { name: "The HoDs and Chief Social Welfare Officer", editing: false },
      sustainMethod: { name: "Monthly New patients satisfaction survey and Implementing CAPA", editing: false },
      reportTo: { name: "The Medical Superintendent       ", editing: false }
  },
  {
      activity: { name: "Separate Priority Lanes for Newly Registered Patients at all counters", editing: false },
      owner: { name: "The Resident Medical Officer", editing: false },
      sustainMethod: { name: "Monthly New Patients’ satisfaction Survey and Implementing CAPA. (Waiting Time at Billing Counters and OPD Counters)", editing: false },
      reportTo: { name: "The Medical Superintendent       ", editing: false }
  }


  ];

  $scope.showButtons = true;
  $scope.visible = { homeActive: true, abouInitActive: false, tioActive: false ,slideShowActive: false,slideEditActive: false};

  $scope.navigate = function (page) {
    if (page === "home") {
      $scope.visible = {
        homeActive: true,
        aboutInitActive: false,
        tioActive: false,
        slideEditActive:false,
        slideShowActive: false
      };
    } else if (page === "about") {
      $scope.visible = {
        homeActive: false,
        aboutInitActive: true,
        tioActive: false,
        slideEditActive: false,
        slideShowActive: false
      };
    } else if (page === "tryItOut") {

      $scope.visible = {
        homeActive: false,
        aboutInitActive: false,
        tioActive: true,
        slideEditActive:false,
        slideShowActive: false
      };
    }
    else if (page === "slideEdit")
    {
      $scope.visible = {
        homeActive: false,
        aboutInitActive: false,
        tioActive: false,
        slideEditActive:true,
        slideShowActive: false
      };
    }
    else if (page === "slideShow")
    {
      $scope.visible = {
        homeActive: false,
        aboutInitActive: false,
        tioActive: false,
        slideEditActive:false,
        slideShowActive: true
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
    { id: 1, defaultSrc: "../Static/Runchart.png", altText: "Run Chart" },
    { id: 2, defaultSrc: "../Static/flowchart.png", altText: "Flow Chart" },
    { id: 3, defaultSrc: "../Static/Fish-Bone.png", altText: "Fishbone Diagram" },
    { id: 4, defaultSrc: "../Static/Pareto Diagram.jpeg", altText: "Pareto Diagram" },
    { id: 5, defaultSrc: "../Static/TwoByTwoChart.png", altText: "twoByTwo Chart" }
];

$scope.graph4 = {active:false};
$scope.graph4activate = function(){
  if($scope.graph4.active === false){
    $scope.graph4 = {active:true}
  }
  else{
    $scope.graph4 = {active:false}
}
  };
  

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
                  <img id="uploadedImage{{id}}" ng-src="{{uploadedImageSrc}}" >
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



///here is the next
let currentSlide = 1;
showSlide(currentSlide);

function navigateSlide(n) {
    showSlide(currentSlide += n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slidenxtSection");
    if (n > slides.length) { currentSlide = 1 }
    if (n < 1) { currentSlide = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[currentSlide - 1].classList.add("active");

    // Update slide number
    document.getElementById("slideNumber").innerText = currentSlide;

    console.log(`Showing slide ${currentSlide}`);
}

function toggleFullScreen() {
    let elem = document.getElementById("presentation");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function endPresentation() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    // Optionally, navigate to the first slide or another section
    currentSlide = 1;
    showSlide(currentSlide);
    console.log("Presentation ended");
}

document.addEventListener("keydown", function(event) {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === "ArrowRight") {
        navigateSlide(1);
    } else if (event.key === "ArrowLeft") {
        navigateSlide(-1);
    } else if (event.key === "f" || event.key === "F") {
        toggleFullScreen();
    } else if (event.key === "Escape") {
        endPresentation();
    }
});
