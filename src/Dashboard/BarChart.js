import BarChart from '@mui/icons-material/BarChart';
import * as React from 'react';
import {Bar} from 'react-chartjs-2';


class BarChar extends React.Component{
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
<Bar data={{
     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'],
     datasets: [{
        label: 'This Year',
        data: [12, 19, 3, 5, 2, 3,80,14,25,35,60,70],

        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },
{
label:'Last Year',

data: [70, 10, 30, 50, 20, 30,8,10,40,10,65,30],
backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
],
borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
],
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


    );
}}
export default BarChar;  