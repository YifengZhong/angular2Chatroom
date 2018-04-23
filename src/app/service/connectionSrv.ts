import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'stompjs';
declare let Stomp:any;

@Injectable()
export class ConnectService {
    private _stompClient;
    private _stompSubject : Subject<any> = new Subject<any>();
    public  delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    public login(_name:string) {
        console.log(_name);
        this._stompClient.send("/app/login", {}, JSON.stringify({'fullName': _name}));

    }
    public connect(address:string, port:string):Observable<any> {
        let self = this;
        let webSocket = new WebSocket("wss://"+ address + "/gs-guide-websocket/websocket");
//for debug
//        let webSocket = new WebSocket("ws://192.168.1.157:8070/gs-guide-websocket/websocket");
        this._stompClient = Stomp.over(webSocket);
        this._stompClient.connect({}, function (frame) {

            self._stompClient.subscribe('/topic/messaging', function (stompResponse) {
                // stompResponse = {command, headers, body with JSON 
                // reflecting the object returned by Spring framework}
                self._stompSubject.next(JSON.parse(stompResponse.body));
                
            });
            self._stompClient.subscribe('/topic/login', function (stompResponse) {
                // stompResponse = {command, headers, body with JSON 
                // reflecting the object returned by Spring framework}
                self._stompSubject.next(JSON.parse(stompResponse.body));
                self._stompSubject.next(JSON.parse(stompResponse.body));
                
            });
            
        },function(err) {
            self._stompSubject.next(1);
        });
        return self._stompSubject;
    }
    public disConnect(username:string) {

        this._stompClient.send("/app/logout", {}, JSON.stringify({'fullName': username}))
        if (this._stompClient !== null) {
            this._stompClient.disconnect();
          }
      
    }

    public send(username:string, _payload: string,toUser:string) {
        this._stompClient.send("/app/messaging", {}, JSON.stringify({'name': username,'content':_payload,'toUser':toUser}));
    }
    public sendHeartBit() {
        this._stompClient.send("/app/heartBit", {}, {});
    }

    public getObservable() : Observable<any> {
        return this._stompSubject.asObservable();
    }
     
}