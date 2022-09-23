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

function loadSigCaptureWeb(){
  if (good) {
    console.log('loadSigCaptureWeb');
    document.addEventListener('SigCaptureWeb_SignResponse', SignResponse, false);
    var element = document.createElement("SigCaptureWeb_ExtnDataElem");
    element.setAttribute("SigCaptureWeb_MsgAttribute", messageData);
    document.documentElement.appendChild(element);
    var evt = document.createEvent("Events");
    evt.initEvent("SigCaptureWeb_SignStartEvent", true, false);
    element.dispatchEvent(evt);
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



