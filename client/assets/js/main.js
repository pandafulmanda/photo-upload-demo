(function(window, angular, undefined){

  angular.module('photoUpload',['ngImgCrop'])
    .controller('PhotoUploadMain', PhotoUploadMainCtrl)
    .controller('PhotoUploadCustom', PhotoUploadCustomCtrl);


  function PhotoUploadMainCtrl($scope){

    $scope.profileImage = '';
    $scope.croppedProfileImage = '';

    $scope.imgCropChange = imgCropChange;


    document.getElementById('file-uploader').addEventListener('change', fileSelected);


    function fileSelected(fileSelectEvent){

      var file = fileSelectEvent.currentTarget.files[0],
        reader = new FileReader();

      reader.onload = function(fileSelectEvent){
        $scope.$apply(function($scope){
          $scope.profileImage = fileSelectEvent.target.result;          
        });
      };

      reader.readAsDataURL(file);
    }


    function imgCropChange(cropperData){
      console.log(cropperData);
    }

  }

  function PhotoUploadCustomCtrl($scope){


    $scope.uploadedFile = '';
    $scope.croppedUploadedFile = '';
    $scope.psuedoCrop = {
      width : 0,
      height: 0,
      topHide: 0,
      leftHide: 0
    };


    document.getElementById('bsx-file-uploader').addEventListener('change', fileSelected);
    var cropper = document.querySelector('.crop-bsx'),
      uploadedImage = document.querySelector('.crop-bsx img'),
      image = {};

    uploadedImage.addEventListener('mousedown', function(mouseDownEvent){

      image.down = {
        x: mouseDownEvent.x,
        y: mouseDownEvent.y
      }
    });

    uploadedImage.addEventListener('mouseup', function(mouseUpEvent){

      image.up = {
        x: mouseUpEvent.x,
        y: mouseUpEvent.y
      }

      calcCropperCoords(image);

    });


    uploadedImage.addEventListener('dragstart', function(dragEvent){
      dragEvent.preventDefault();
    });


    function calcCropperCoords(imageCoords){
      var offsets = quickOffsetCalc(uploadedImage),
        relativeCoords = {
          up : {
            x: imageCoords.up.x - offsets.left,
            y: imageCoords.up.y - offsets.top
          },
          down: {
            x: imageCoords.down.x - offsets.left,
            y: imageCoords.down.y - offsets.top
          }
        }

      $scope.$apply(function($scope){
        $scope.psuedoCrop.width = Math.abs(relativeCoords.up.x - relativeCoords.down.x);
        $scope.psuedoCrop.height = Math.abs(relativeCoords.up.y - relativeCoords.down.y);
        $scope.psuedoCrop.topHide = Math.min(relativeCoords.up.y, relativeCoords.down.y);
        $scope.psuedoCrop.leftHide = Math.min(relativeCoords.up.x, relativeCoords.down.x);
      });
      console.log(relativeCoords);

    }


    function fileSelected(fileSelectEvent){

      var file = fileSelectEvent.currentTarget.files[0],
        reader = new FileReader();

      reader.onload = function(fileSelectEvent){
        $scope.$apply(function($scope){
          $scope.uploadedFile = fileSelectEvent.target.result;
        });
      };

      reader.readAsDataURL(file);
    }

    function quickOffsetCalc(element){

      var offset = {
        top: element.offsetTop,
        left: element.offsetLeft
      };

      while(element.offsetParent && element.offsetParent !== document){
        offset.top += element.offsetParent.offsetTop;
        offset.left += element.offsetParent.offsetLeft;
        element = element.offsetParent;
      }

      return offset;
    }

  }

})(window, angular);