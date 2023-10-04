import React,{Component} from 'react'
import "../App.css";

export class Tiffin extends Component {
    sendMessage = () => {
        const phoneNumber = '7798286678'; // Replace with the actual phone number
        const message =    `Ejaz : ${this.state.Ejaz}\nFarhan : ${this.state.Farhan}\nMubasshir : ${this.state.Mubasshir}\nTahir : ${this.state.Tahir}\nUsama : ${this.state.Usama}\nSaif : ${this.state.Saif}\nAadil : ${this.state.Aadil}\n*Total : ${this.state.Total}*`; // Replace with the desired message
    
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      };

    state ={
        Ejaz : 0 ,
        Farhan : 0 ,
        Mubasshir : 0,
        Tahir : 0,
        Usama : 0,
        Saif:0,
        Aadil : 0,
        Total :0,
    }


render() {
    return(
    <div class="center">

        <table class="table">
        <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
      <th scope="col">Tiffin</th>
    </tr>
  </thead>
    <tbody>
    <tr>
        <td>Ejaz</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Ejaz : prevState.Ejaz + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Ejaz : prevState.Ejaz -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Ejaz}</td>
    </tr>

    <tr>
        <td>Farhan</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Farhan : prevState.Farhan + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Farhan : prevState.Farhan -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Farhan}</td>
    </tr>
   
    <tr>
        <td>Mubasshir</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Mubasshir : prevState.Mubasshir + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Mubasshir : prevState.Mubasshir -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Mubasshir}</td>
    </tr>

    <tr>
        <td>Tahir</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Tahir : prevState.Tahir + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Tahir : prevState.Tahir -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Tahir}</td>
    </tr>

    <tr>
        <td>Usama</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Usama : prevState.Usama + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Usama : prevState.Usama -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Usama}</td>
    </tr>
    
    <tr>
        <td>Saif</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Saif : prevState.Saif + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Saif : prevState.Saif -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Saif}</td>
    </tr>

    <tr>
        <td>Aadil</td>
        <td>
            <button   type="button" onClick={()=>{this.setState((prevState)=>({ Aadil : prevState.Aadil + 1 , Total:prevState.Total +1}))}} class=" button-aling btn btn-success">+</button> 
            <button type="button" onClick={()=>{this.setState((prevState)=>({ Aadil : prevState.Aadil -1 , Total:prevState.Total -1}))}} class=" btn btn-danger">-</button>
        </td>
        <td>{this.state.Aadil}</td>
    </tr>

    </tbody>
    </table>
        <center>
            <h1>Total : {this.state.Total}</h1>
            <button type="button" class="btn btn-primary" onClick={this.sendMessage}>Send Message on WhatsApp</button>
        </center>
        
    </div>
    )
}
}


export default Tiffin;