// navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position)
//     console.log(position.coords.latitude)
//     console.log(position.coords.longitude)
//       let link = 'https://www.google.com/maps/search/?api=1&query='+position.coords.latitude+'%2C'+position.coords.longitude
//     document.body.innerHTML +='<a href='+link+'>Your Location</a>'
//     console.log(link)
// });

const updatelocation_url = "http://" + window.location.host + "/updatelocation/";
function updatelocation(){
  console.log(csrftoken)
  navigator.geolocation.getCurrentPosition((position) => {
    updatelocation_data = {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
      isprivate : true,
    }
    
    fetch(updatelocation_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(updatelocation_data),
    })
    .then(response => {
      if (!response.ok) 
      {
        throw new Error('Trade order error');
      }
      return response.json();
    })
    .then(order_response => {
      if (order_response.status == 'success')
      {
        money.innerHTML = order_response.balance.toFixed(3);
      }
      // Process the newly created user data
      console.log('Order Response Data:', order_response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  })
}