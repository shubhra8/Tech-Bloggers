   
 async function addComments(event) {
  event.preventDefault();

   const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  var comment = document.querySelector('#tdesc').value;
//Function will be called when Add Comments button will get clicked.
 if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/dashboard/post/${id}`, {
      method: 'POST',
      body: JSON.stringify({ comment, id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      alert("Posted ")
      post();
      function post(){
    const response = fetch(`/dashboard/post/${id}`, {
      method: 'GET',
    });
    document.location.reload();
  }
    } else {
      alert(response.statusText);
    }
  }

 }
document.getElementById('addComment').addEventListener("click", addComments);