   
   const form = document.getElementById('form');

  if (form) {
      form.addEventListener('submit', function() {
      alert("Everything was sent Successfuly! Thank you.");
      this.submit();
    });
  }