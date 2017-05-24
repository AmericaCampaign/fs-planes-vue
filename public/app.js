const planeVue = new Vue({
  el: '#plane',
  data: {
    header: 'Plane Enthusiasts Club',
    planes: []
  }
});

const loadPlanesFromServer = () => {
  $.ajax({
    url: '/api/planes',
    method: 'GET'
  }).done((response) => {
    console.log(response.data);
    planeVue.planes = response.data;
  })
}

loadPlanesFromServer();
