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
  timerRotate:any;
  curRotate:number=0;
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
  rotating:boolean=false;
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
    this.m.nativeElement.style.top=this.scrHeight/2-15 + 'px';
    this.ringsTop = this.scrHeight/2-10;
    this.ballRight = this.scrWidth * 0.6;
    // this.ringSmallRight= this.ballRight+6;
  }

  fall(ball:any, ctrl:any){
    var start = Number(ball.style.top.replace('px',""));
    this.timerFall = setInterval(function() {
      var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
      if (Number(ball.style.top.replace('px',""))>=ctrl.scrHeight-35) {
        if(!ctrl.falled){
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        
        ctrl.score=0;
        ctrl.falled=true;
        clearInterval(ctrl.timerFall); 
        return;
      }
      ball.style.top = Number(ball.style.top.replace('px',""))+1+Math.pow(timePassed/100,1.4)+ 'px';
      let t = Number(ball.style.top.replace('px',""));
      let t1 = Number(ball.style.right.replace('px',""))
      if (t>ctrl.scrHeight/2-30 && t<ctrl.scrHeight/2+10 && ctrl.ringSmallRight>ctrl.ballRight-ctrl.ringWidth+17 && ctrl.ringSmallRight<ctrl.ballRight+19) {
        if(ctrl.ringSmallRight<ctrl.ballRight-ctrl.ringWidth+26 || ctrl.ringSmallRight>ctrl.ballRight+10){
          
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        
        else{
          if(!ctrl.scored ){
            ctrl.scored=true;
            ctrl.score++;
          }
          
        }

        
      }
      if( !ctrl.rotating && t>ctrl.scrHeight/2-30 && t<ctrl.scrHeight/2+10 && (!ctrl.scored && ctrl.ringSmallRight>ctrl.ballRight-ctrl.ringWidth-1 && ctrl.ringSmallRight<ctrl.ballRight-ctrl.ringWidth+18 || ctrl.ringSmallRight<ctrl.ballRight+10 && ctrl.ringSmallRight>ctrl.ballRight+5)){
        console.log(ctrl.ringSmallRight);
        console.log(ctrl.ballRight-ctrl.ringWidth);
        ctrl.ringSmallRight-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      


    }, 5);
    
    
  }
  rotate(ball:HTMLDivElement, ctrl:any){
  ctrl.curRotate = ctrl.curRotate%360;
  console.log(ctrl.curRotate);
  var start = ctrl.curRotate;
  var timePassed=0;
  clearInterval(this.timerRotate);
  
    this.timerRotate = setInterval(function() {
     
      
      if(timePassed>500){
        ctrl.rotating = false;
        clearInterval(ctrl.timerRotate);
        return;
      }
      ctrl.curRotate+=5;
      console.log(ctrl.curRotate);
      timePassed=ctrl.curRotate-start;
      console.log(false);
      ball.style.transform="rotate("+ctrl.curRotate+"deg)";


    }, 5);
    
    
  }
  // rotate(ball:HTMLDivElement, ctrl:any){
  // var start = ball.style.transform;
  // console.log(start);
    // this.timerFall = setInterval(function() {
    //   var timePassed = Math.abs(Number(ball.style.top.replace('px',"")) - start);

      
    //   if (Number(ball.style.top.replace('px',""))>=ctrl.scrHeight-35) {
    //     if(!ctrl.falled){
    //       ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
    //     }
    //     ctrl.score=0;
    //     ctrl.falled=true;
    //     clearInterval(ctrl.timerFall); 
    //     return;
    //   }
    //   ball.style.top = Number(ball.style.top.replace('px',""))+1+Math.pow(timePassed/100,1.4)+ 'px';
    //   let t = Number(ball.style.top.replace('px',""));
    //   let t1 = Number(ball.style.right.replace('px',""))
    //   if (t>ctrl.scrHeight/2-30 && t<ctrl.scrHeight/2+10 && ctrl.ringSmallRight>ctrl.ballRight-ctrl.ringWidth+17 && ctrl.ringSmallRight<ctrl.ballRight+19) {
    //     if(ctrl.ringSmallRight<ctrl.ballRight-ctrl.ringWidth+26 || ctrl.ringSmallRight>ctrl.ballRight+10){
    //       console.log(true);
    //       ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
    //     }
    //     else{
    //       if(!ctrl.scored ){
    //         ctrl.scored=true;
    //         ctrl.score++;
    //       }
          
    //     }

        
    //   }
      


    // }, 5);
    
    
  //}

  
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
      let t = Number(ball.style.top.replace('px',""));
      if( !ctrl.rotating && t>ctrl.scrHeight/2-30 && t<ctrl.scrHeight/2+10 && (!ctrl.scored && ctrl.ringSmallRight>ctrl.ballRight-ctrl.ringWidth-1 && ctrl.ringSmallRight<ctrl.ballRight-ctrl.ringWidth+18 || ctrl.ringSmallRight<ctrl.ballRight+10 && ctrl.ringSmallRight>ctrl.ballRight+5)){
        console.log(ctrl.ringSmallRight);
        console.log(ctrl.ballRight-ctrl.ringWidth);
        ctrl.ringSmallRight-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))- (3-Math.pow(timePassed/100,2)) + 'px';
   

    }, 5);
  }

  j(){

  }
  

}
