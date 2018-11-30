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
  constructor() { }
  ngOnInit() {
    var c = this;
    this.timerRing = setInterval(function(this){
      c.ringRight+=1;
      c.ringSmallRight+=1;
      if(c.ringRight>950){
        c.ringRight=-300;
        c.ringSmallRight=-275;
      }
    }, 10)
  }

  fall(ball:HTMLDivElement){
    var start = Number(ball.style.top.replace('px',""));
    console.log(ball.style.top);
    this.timerFall = setInterval(function() {
      // вычислить сколько времени прошло с начала анимации
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))>=430) {
        clearInterval(this.timerFall); // конец через 2 секунды
        return;
      }

      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))+(timePassed>150?3:1)+ 'px';
      

    }, 5);

// в то время как timePassed идёт от 0 до 2000
// left принимает значения от 0 до 400px
    
  }


  jump(ball:HTMLDivElement, ctrl:any){
    clearInterval(this.timerFall);
    clearInterval(this.timerJump);
    var start = Number(ball.style.top.replace('px',""));
     // сохранить время начала
    ctrl.timerJump = setInterval(function() {
      // вычислить сколько времени прошло с начала анимации
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))<=0) {
        clearInterval(ctrl.timerJump);

         // конец через 2 секунды
        return;
      }

      if (Math.abs(Number(ball.style.top.replace('px',""))-start)>200) {
        clearInterval(ctrl.timerJump);
        ctrl.fall(ball);
        return;
      }

      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))- (timePassed>150?1:2) + 'px';
      

    }, 5);
  }

  j(){

  }
  

}
