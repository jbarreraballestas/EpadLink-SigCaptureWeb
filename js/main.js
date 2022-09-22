document.addEventListener('DOMContentLoaded',()=>{
  const chromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');
  if (!chromium) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      html: '<p>El navegador que estás usando no es compatible!</p>',
    });
  } else {
    
  }

})