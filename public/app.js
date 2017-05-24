const planeVue = new Vue({
  el: '#plane',
  data: {
    header: 'Plane Enthusiasts Club',
    planes: [],
    newType: '',
    newSpeed: '',
    newImg: '',
  },
  methods: {
    addNewPlane: function(event){
      event.preventDefault();
      let plane = {
        type: this.newType,
        topSpeed: this.newSpeed,
        img: this.newImg
      }
      $.ajax({
        url: '/api/planes',
        method: 'POST',
        data: plane
      }).done((response) => {
        console.log(response);
        window.location = '/';
      })
    },
    deletePlain: function(plane) {
      let updatedPlanes = this.planes.filter((planeInArray) => {
        return planeInArray._id !== plane._id
      });
      this.planes = updatedPlanes;
      $.ajax({
        url: `/api/planes/${plane._id}`,
        method: 'DELETE'
      }).done(response => console.log('Plane Deleted!'))
    }
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
