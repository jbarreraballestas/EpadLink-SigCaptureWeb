
window.addEventListener('load', () => {
  const chromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');
  if (!chromium) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      html: '<p>El navegador que estás usando no es compatible, por favor usa Chrome o Microsoft Edge!</p>',
    });
  } else {
    if (!document.documentElement.getAttribute('sigcapturewebextension-installed')) {
      Swal.fire({
        icon: 'warning',
        title: 'Ups...',
        html: '<p>No tienes instalada la extensión del navegador!</p><a target="_blank" href="https://chrome.google.com/webstore/detail/epadlink-sigcaptureweb-sd/idldbjenlmipmpigmfamdlfifkkeaplc">Instalar</a>',
      });
      setInterval(()=>{
        location.reload();
      },10000);
    }else{

    }
  }
});




