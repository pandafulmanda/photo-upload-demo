(function(window, angular, undefined){

  angular.module('photoUpload',['ngImgCrop'])
    .controller('PhotoUploadMain', PhotoUploadMainCtrl)
    .controller('PhotoUploadCustom', PhotoUploadCustomCtrl);


  function PhotoUploadMainCtrl($scope){

    $scope.profileImage = '';
    $scope.croppedProfileImage = '';

    $scope.imgCropChange = imgCropChange;


    document.getElementById('file-uploader').addEventListener('change', function(fileSelectEvent){

      fileSelected(fileSelectEvent, function(fileSelectEvent){

        $scope.$apply(function($scope){
          $scope.profileImage = fileSelectEvent.target.result;
        });
      });

    });

    function imgCropChange(cropperData){
      console.log(cropperData);
    }

  }

  function PhotoUploadCustomCtrl($scope){

    var cropper = document.querySelector('.crop-bsx'),
      uploadedImage = document.querySelector('.crop-bsx img'),
      image = {};

    $scope.uploadedFile = '';
    $scope.croppedUploadedFile = '';
    $scope.psuedoCrop = {
      width : 0,
      height: 0,
      topHide: 0,
      leftHide: 0
    };

    document.getElementById('bsx-file-uploader').addEventListener('change', function(fileSelectEvent){

      fileSelected(fileSelectEvent, function(fileSelectEvent){

        $scope.$apply(function($scope){
          $scope.uploadedFile = fileSelectEvent.target.result;          
        });
      });

    });

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



    // calculate cropper coordinates
    function calcCropperCoords(imageCoords){
      var offsets = quickOffsetCalc(uploadedImage),
        relativeCoords = {
          up : {
            x: imageCoords.up.x - offsets.left,
            y: imageCoords.up.y - offsets.top + window.scrollY
          },
          down: {
            x: imageCoords.down.x - offsets.left,
            y: imageCoords.down.y - offsets.top + window.scrollY
          }
        }

      // force psuedo crop values to update for style
      $scope.$apply(function($scope){
        $scope.psuedoCrop.width = Math.abs(relativeCoords.up.x - relativeCoords.down.x);
        $scope.psuedoCrop.height = Math.abs(relativeCoords.up.y - relativeCoords.down.y);
        $scope.psuedoCrop.topHide = Math.min(relativeCoords.up.y, relativeCoords.down.y);
        $scope.psuedoCrop.leftHide = Math.min(relativeCoords.up.x, relativeCoords.down.x);
      });

      console.log(relativeCoords);

    }



    // Quickly calculate offset of an element from the origin point of the page without jQuery
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



  function fileSelected(fileSelectEvent, afterFileLoadedCallBack){

    var file = fileSelectEvent.currentTarget.files[0],
      reader = new FileReader();

    reader.onload = afterFileLoadedCallBack;

    reader.readAsDataURL(file);
  }

})(window, angular);