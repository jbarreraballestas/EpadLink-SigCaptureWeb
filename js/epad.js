let good = false;
let height = 150;
let width = 500;
let id;
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

function loadSigCaptureWeb(containerId) {
  if (good) {
    let container = document.getElementById(containerId);
    if (!container && !window.Swal) {
      alert('No existe el contenerdor para la firma con id: ' + containerId); return;
    } else if (!container) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'No existe el contenerdor para la firma con id: ' + containerId,
      }); return;
    }
    id = containerId;
    document.addEventListener('SigCaptureWeb_SignResponse', SignResponse, false);
    let message = { "firstName": "", "lastName": "", "eMail": "", "location": "", "imageFormat": 1, "imageX": width, "imageY": height, "imageTransparency": true, "imageScaling": false, "maxUpScalePercent": 0.0, "rawDataFormat": "ENC", "minSigPoints": 25 };
    let messageJson = JSON.stringify(message);
    let element = document.createElement("SigCaptureWeb_ExtnDataElem");
    element.setAttribute("SigCaptureWeb_MsgAttribute", messageJson);
    document.documentElement.appendChild(element);
    let evt = document.createEvent("Events");
    evt.initEvent("SigCaptureWeb_SignStartEvent", true, false);
    element.dispatchEvent(evt);
  } else {
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
  let str = event.target.getAttribute("SigCaptureWeb_msgAttri");
  let objResponse = JSON.parse(str);
  let obj = JSON.parse(JSON.stringify(objResponse));
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  if (obj.errorMsg != null && obj.errorMsg != "" && obj.errorMsg != "undefined") {
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: obj.errorMsg,
      });
    } else {
      alert(obj.errorMsg);
    }
  } else {
    if (obj.isSigned) {
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0, width, height);
      }
      var imageData = "data:image/png;base64," + obj.imageData;
      img.src = imageData;
      let input = document.createElement('input');
      input.type = "hidden";
      input.value = imageData;
      input.name = id;
      let contenedor = document.getElementById(id);
      contenedor.appendChild(input);
      contenedor.appendChild(canvas);
    } else {

    }
  }


  // container.append(canvas);

}



