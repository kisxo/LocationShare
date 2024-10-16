const latitude_input = document.querySelector("#latitude-input")
const longitude_input = document.querySelector("#longitude-input")
const isprivate_checkbox = document.querySelector("#isprivate-checkbox")

function loadlocation(){
  latitude_input.value = null;
  longitude_input.value = null;
  navigator.geolocation.getCurrentPosition((position) => {
    latitude_input.value = position.coords.latitude;
    longitude_input.value = position.coords.longitude;
  })
};

const updatelocation_url = "https://" + window.location.host + "/updatelocation/";
function updatelocation(){
  console.log(csrftoken)
  updatelocation_data = {
      latitude : latitude_input.value,
      longitude : longitude_input.value,
      isprivate : isprivate_checkbox.checked,
  }
  
  if( latitude_input.value == ''|| longitude_input.value =='')
  {
    console.log("empty input")
    return;
  }
  
  latitude_input.value = null;
  longitude_input.value =null;
  isprivate_checkbox.checked = false;
  
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
        throw new Error('Location Update error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}