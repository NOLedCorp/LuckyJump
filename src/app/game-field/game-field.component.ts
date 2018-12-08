import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

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
  scrWidth:number=800;
  scrHeight:number=500;
  ringWidth:number = 100;
  ringRight:number = -300;
  ballRight:number = 700;
  ballTop:number = 230;
  ringsTop:number = 250;
  ringSmallRight:number = -275;
  ctrl:any = this;
  scored:boolean = false;
  falled:boolean = false;
  constructor() { }
  @ViewChild('ball')
  public m:ElementRef;
  @HostListener('document:keydown') doSth(){
    console.log(this.m);
    this.jump(this.m.nativeElement, this);
  }
  ngOnInit() {

    var c = this;
    this.timerRing = setInterval(function(this){
      c.ringSmallRight+=1;
      if(c.ringSmallRight>c.scrWidth+c.ringWidth){
        c.scored = false;
        c.ringSmallRight=-c.ringWidth;
      }
    }, 10);
    this.scrWidth=window.innerWidth;
    this.scrHeight=window.innerHeight;
    console.log(this.scrHeight/2-10);
    this.m.nativeElement.style.top=this.scrHeight/2-15 + 'px';
    this.ringsTop = this.scrHeight/2-10;
    this.ballRight = this.scrWidth * 0.6;
  }

  fall(ball:any, ctrl:any){
    var start = Number(ball.style.top.replace('px',""));
    this.timerFall = setInterval(function() {
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))>=ctrl.scrHeight-30) {
        if(!ctrl.falled){
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        ctrl.score=0;
        ctrl.falled=true;
        clearInterval(this.timerFall); 
        return;
      }
      ball.style.top = Number(ball.style.top.replace('px',""))+1+Math.pow(timePassed/100,1.4)+ 'px';
      let t = Number(ball.style.top.replace('px',""));
      let t1 = Number(ball.style.right.replace('px',""))
      if (!ctrl.scored && t>ctrl.scrHeight/2-10 && t>ctrl.scrHeight/2 && ctrl.ringSmallRight>ctrl.ballRight+5-ctrl.ringWidth && ctrl.ringSmallRight<ctrl.ballRight+10  ) {
        if(ctrl.ringSmallRight<ctrl.scrWidth+15-ctrl.ballRight || ctrl.ringSmallRight>ctrl.ballRight){
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        else{
          ctrl.scored=true;
          ctrl.score++;
        }

        
      }
      


    }, 5);
    
  }


  jump(ball:any, ctrl:any, pos:number = 100){
    clearInterval(this.timerFall);
    clearInterval(this.timerJump);
    if(ctrl.falled){
      ctrl.falled = false;
    }
    var start = Number(ball.style.top.replace('px',""));
     // сохранить время начала
    ctrl.timerJump = setInterval(function() {
      // вычислить сколько времени прошло с начала анимации
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))<=0) {
        clearInterval(ctrl.timerJump);
        ctrl.fall(ball, ctrl);
         // конец через 2 секунды
        return;
      }
      
      if (timePassed>pos) {
        clearInterval(ctrl.timerJump);
        ctrl.fall(ball, ctrl);
        return;
      }

      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))- (3-Math.pow(timePassed/100,2)) + 'px';
   

    }, 5);
  }

  j(){

  }
  

}
