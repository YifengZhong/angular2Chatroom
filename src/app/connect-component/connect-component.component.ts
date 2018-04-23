import { Component, OnInit,HostListener } from '@angular/core';
import { ConnectService } from "../service/connectionSrv";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'connect-component',
  templateUrl: './connect-component.component.html',
  styleUrls: ['./connect-component.component.css']
})
export class ConnectComponentComponent implements OnInit {

  username: string;
  toUser:string;
  public items = [];
  hideorShow:boolean;
  showErrorMsg:boolean;
  message_content:string;
  errMessage:string;
  filterargs = {sender: ''};
 
  activeList = [];
  isActive:boolean;
  connect_address:string;
  connect_port:string;
  constructor(public connect: ConnectService) {
    this.hideorShow=false;
    this.showErrorMsg=false;
   }

  ngOnInit() {
    this.isActive = false;
    this.connect_address = "chatroom4zhong-srv.herokuapp.com";
    this.toUser = "";
    this.connect_port = "8080";
  }
  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    if(this.isActive === true) {
      this.onDisconnect();
    }
  }
  onSubmit(form) {
    console.log(this.activeList.length);
    if(this.activeList.length > 10) {
      this.showErrorMsg = true;
    }
    this.connect.login(this.username);
  }
  onDisconnect() {
    this.connect.disConnect(this.username);
    this.hideorShow = false;
  }
  onSend() {

    this.connect.send(this.username,this.message_content,this.toUser);
    this.message_content = "";
    
  }
  sendHeartbit() {
    this.connect.sendHeartBit();
  }
  onConnect() {
    this.hideorShow = true;
    this.showErrorMsg = false;
    this.connect.connect(this.connect_address, this.connect_port).subscribe(data => {
      Observable.interval(1000 * 30).subscribe(x => {
        this.sendHeartbit();
      });
      //reaching the maxium number
      if(data.full === true) {
        this.hideorShow = false;
        this.showErrorMsg = true;
        this.errMessage = "Over maxium number of connection!";
        return;
      }
      //wrong hostname or port number
      if(data === 1) {
        this.hideorShow = false;
        this.showErrorMsg = true;
        this.errMessage = "Can not find host name or wrong port number!";
        return;        
      }
      //update the active list
      if(data.list !== undefined) {
        this.activeList = data.list;
        this.isActive = true;
        return;
      }
      let receiver = "";
      if(data.toUser !== "") {
        receiver = "@" + data.toUser;
      }
      this.items.unshift({sender:data.name+":",toUser:receiver, message:data.content});

      this.toUser="";
    });;   
  }
  showError() {
      if(this.showErrorMsg===false) {
        return "hideParts";
      } else {
        return "errorMsg showParts";
      }
  }
  getClaz() {
    if(this.hideorShow) {
      return "addParts";
      
    } else {
      return "hideParts";
    }
  }
  getsubmitClass() {
    if(this.hideorShow) {
      return "hideParts";
      
    } else {
      return "addParts";
    }    
  } 
  onFilter() {
    this.filterargs.sender = this.toUser;
  }
  onDismissFilter() {
    this.filterargs.sender = "";
  }
  setClickedRow(i) {
    this.toUser=this.activeList[i];
  }
  onAbout() {
    confirm("\n\
    Front :angular 2  \n\
    Back-end :Springboot + Websocket \n\
    \n\
    Below is the functions of this project \n\
    Server: \n\
    -  Server accepts 1 to 10 simultaneous client connections \n\
    -  A message received from any client can be echoed to all clients by default \n\
    -  The server logs all client connect and disconnect events \n\
    -  The listening IP and port address can be configurable \n\
    \n\
    Client Requirements:\n\
    -  The server IP and port address can be configurable \n\
    -  At start-up, the client can ask the user to provide a unique username\n\
    -  The client can allow the user to enter an alpha-numeric text message\n\
    -  Entered text messages can be transmitted to the server\n\
    -  The client can display received text messages\n\
    -  The client can be able to filter messages by user\n\
    -  (Optional) The client can be able to send a message to a selected user\n\
    -  Logout by clicking disconnect.");
  }
}
