import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  score:number = 0;
  timerFall:any;
  timerJump:any;
  timerRing:any;
  ringRight:number = -300;
  ringSmallRight:number = -275;
  ctrl:any = this;
  scored:boolean = false;
  constructor() { }
  ngOnInit() {
    var c = this;
    this.timerRing = setInterval(function(this){
      c.ringSmallRight+=1;
      if(c.ringSmallRight>950){
        c.scored = false;
        c.ringSmallRight=-250;
      }
    }, 10)
  }

  fall(ball:HTMLDivElement, ctrl:any){
    var start = Number(ball.style.top.replace('px',""));
    this.timerFall = setInterval(function() {
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))>=445) {
        clearInterval(this.timerFall); 
        return;
      }
      ball.style.top = Number(ball.style.top.replace('px',""))+0.5+(timePassed==0? start / 100: timePassed / 100)+ 'px';
      let t = Number(ball.style.top.replace('px',""));
      let t1 = Number(ball.style.right.replace('px',""))
      if (!ctrl.scored && t>230 && t<270 && ctrl.ringSmallRight>605 && ctrl.ringSmallRight<710  ) {
        if(ctrl.ringSmallRight<615 || ctrl.ringSmallRight>700){
          ctrl.jump(ball, ctrl);
        }
        else{
          console.log(ctrl.ringSmallRight);
          ctrl.scored=true;
          ctrl.score++;
        }

        
      }
      


    }, 5);
    
  }


  jump(ball:HTMLDivElement, ctrl:any){
    clearInterval(this.timerFall);
    clearInterval(this.timerJump);
    var start = Number(ball.style.top.replace('px',""));
     // сохранить время начала
    ctrl.timerJump = setInterval(function() {
      // вычислить сколько времени прошло с начала анимации
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))<=10) {
        clearInterval(ctrl.timerJump);
        ctrl.fall(ball, ctrl);
         // конец через 2 секунды
        return;
      }
      if (timePassed>80) {
        clearInterval(ctrl.timerJump);
        ctrl.fall(ball, ctrl);
        return;
      }

      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))- (2-(timePassed==0? start / 50: timePassed / 50)) + 'px';
      

    }, 5);
  }

  j(){

  }
  

}
