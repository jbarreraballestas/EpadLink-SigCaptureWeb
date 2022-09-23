let good = false;

window.addEventListener('load', () => {
  const chromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');
  const firefox = typeof InstallTrigger !== 'undefined';
  if (!chromium && !firefox) {
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        html: '<p>El navegador que estás usando no es compatible, por favor usa Chrome, Microsoft Edge o Firefox!</p>',
      });
    } else {
      alert('El navegador que estás usando no es compatible, por favor usa Chrome o Microsoft Edge!');
    }
  } else {
    if (!document.documentElement.getAttribute('sigcapturewebextension-installed')) {
      if (window.Swal) {
        Swal.fire({
          icon: 'warning',
          title: 'Ups...',
          html: '<p>No tienes instalada la extensión del navegador!</p><a target="_blank" href="https://chrome.google.com/webstore/detail/epadlink-sigcaptureweb-sd/idldbjenlmipmpigmfamdlfifkkeaplc">Instalar</a>',
        });
      } else {
        if (confirm('No tienes instalada la extensión del navegador, deseas instalarla?')) {
          window.open('https://chrome.google.com/webstore/detail/epadlink-sigcaptureweb-sd/idldbjenlmipmpigmfamdlfifkkeaplc', '_blank');
        }
      }
      setInterval(() => {
        location.reload();
      }, 10000);
    } else {
      good = true;
    }
  }
});

function loadSigCaptureWeb(containerId){
  if (good) {
    height = 150;
    width = 500;
    let container = document.getElementById(containerId);
    if (!container && !window.Swal) {
      alert('No existe el contenerdor para la firma con id: '+containerId);return;
    } else if(!container) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'No existe el contenerdor para la firma con id: '+containerId,
      });return;
    }
    let canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    canvas.getContext('2d').clearRect(0, 0, width, height);
    document.addEventListener('SigCaptureWeb_SignResponse', SignResponse, false);
    var message = { "firstName": "", "lastName": "", "eMail": "", "location": "", "imageFormat": 1, "imageX": canvasObj.width, "imageY": canvasObj.height, "imageTransparency": true, "imageScaling": false, "maxUpScalePercent": 0.0, "rawDataFormat": "ENC", "minSigPoints": 25 };
    var messageData = JSON.stringify(message);
    var element = document.createElement("SigCaptureWeb_ExtnDataElem");
    element.setAttribute("SigCaptureWeb_MsgAttribute", messageData);
    // container.append(canvas);
  }else{
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        html: '<p>No se encontraron las herramientas para usar epad link!</p>',
      });
    } else {
      alert('No se encontraron las herramientas para usar epad link!');
    }
  }
}

function SignResponse(event) {
  console.log(event);
}



