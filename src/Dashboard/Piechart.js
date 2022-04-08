import BarChart from '@mui/icons-material/BarChart';
import * as React from 'react';
import {Pie} from 'react-chartjs-2';


class Piechar extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          user: null,
          interventions : [],
          errMsg:"",
  data:[],
          
          query:"",
  
          
      }
    }
     getListInteventions(){
      let url = "http://localhost:3000/api/vehicules/inteventions/list?id="+this.state.id;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", localStorage.getItem('token'));
      
   
      var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
      };
      
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => { 
            console.log(result);

            this.setState({interventions:result.data})
         })
        .catch(error => console.log('error', error));
  }
    render() {
        return (
<Pie  data={{
     labels: ['Intervention revenues', 'Parking revenues'],
     datasets: [{
       
        data: [1200, 1900],

        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)'
           
            
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)'
        ],
        borderWidth: 1
    },

],
}}

height={400}
width={600}
options={{maintainAspectRatio:false,
scales:{
    yAxes:[
        {
            ticks:{
                beginAtZero:true,
            },
        },
    ]
}}}

/>

 
    );}


}

    // These labels appear in the legend and in the tooltips when hovering different arcs
    

export default Piechar;  