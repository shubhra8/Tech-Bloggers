async function dashSubmit(event) {
  event.preventDefault();
  const tname = document.querySelector('#tname').value;
  const tdesc = document.querySelector('#tdesc').value;
//  const submit2 = document.querySelector('#newpost').value;
 const response = await fetch(`/api/dashboard/`, {
    method: 'POST',
    body: JSON.stringify({
      tname,
      tdesc,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

if (response.ok) {
    alert('dashboard added');
     //document.location.replace(`/api/users/signup/${email}`);
    document.location.replace(`/api/dashboard/profile`);
  } else {
    alert('Failed to add');
  }
}

document.getElementById('create').addEventListener("click", dashSubmit);