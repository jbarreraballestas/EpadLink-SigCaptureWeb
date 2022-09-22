
window.addEventListener('load', () => {
  const chromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');
  if (!chromium) {
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        html: '<p>El navegador que estás usando no es compatible, por favor usa Chrome o Microsoft Edge!</p>',
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

    }
  }
});




