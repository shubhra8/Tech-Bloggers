// async function dashSubmit(event) {
//   event.preventDefault();
//   const tname = document.querySelector('#tname').value;
//   const tdesc = document.querySelector('#tdesc').value;
//  const submit2 = document.querySelector('#submit2').value;
//  const response = await fetch(`/api/dashboard/`, {
//    method: 'POST',
//     body: JSON.stringify({
//       tname,
//       tdesc,
//     }),
//    headers: {
//      'Content-Type': 'application/json',
//     },
//   });

// if (response.ok) {
//    alert('dashboard added');
//      document.location.replace(`/api/users/signup/${email}`);
//     document.location.replace(`/api/dashboard/profile`);
//   } else {
//     alert('Failed to add');
//   }
//}
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const deletepost = async (event) => {
  // if (event.target.hasAttribute('data-id')) {
    // const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/dashboard/profile');
    } else {
      alert('Failed to delete dashboard');
    }
  }


function myFunction(){
  document.location.replace(`/api/dashboard/newpost`);
}
const editpost = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#tname').value;
  const content = document.querySelector('#tdesc').value;
    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'Put',
      body: JSON.stringify({ title,content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  
   if (response.ok) {
    document.location.replace('/api/dashboard/profile');
  } else {
    alert('Failed to edit dashboard');
  }

}
 // document.location.replace(`/api/dashboard/newpost`);

document.getElementById('update').addEventListener("click", editpost);
document.getElementById('delete').addEventListener("click", deletepost);
