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
  ringTop:number[] = [0,0];
  ringSmallRight:number[] = [-275,-775];
  ctrl:any = this;
  scored:boolean[] = [false,false];
  rotating:boolean=false;
  falled:boolean = false;
  constructor() { }
  @ViewChild('ball')
  public m:ElementRef;
  @HostListener('document:keydown') doSth(){
    
    this.jump(this.m.nativeElement, this);
  }
  ngOnInit() {

    var c = this;
    this.scrWidth=window.innerWidth;
    c.ringSmallRight[0]=-c.ringWidth;
    c.ringSmallRight[1] = c.ringSmallRight[0]-c.scrWidth/2-c.ringWidth/2;
    this.timerRing = setInterval(function(this){
      c.ringSmallRight[0]+=1;
      c.ringSmallRight[1]+=1;
      if(c.ringSmallRight[0]>c.scrWidth+c.ringWidth){
        c.scored[0] = false;
        c.ringSmallRight[0]=-c.ringWidth;
        if(c.score>10){
          c.ringTop[0] = c.rnd(150,c.scrHeight-200);
        }
      }
      if(c.ringSmallRight[1]>c.scrWidth+c.ringWidth){
        c.scored[1] = false;
        c.ringSmallRight[1]=-c.ringWidth;
        if(c.score>10){
          c.ringTop[1] = c.rnd(150,c.scrHeight-200);
        }
      }
    }, 10);
    this.scrWidth=window.innerWidth;
    this.scrHeight=window.innerHeight;
    this.m.nativeElement.style.top=this.scrHeight/2-15 + 'px';
    
    this.ballRight = this.scrWidth * 0.6;
    // this.ringSmallRight= this.ballRight+34;
  }
  rnd(min, max)
  {
    return Math.random() * (max - min) + min;
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
      if (t>(ctrl.ringTop[0]>0?ctrl.ringTop[0]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[0]>0?ctrl.ringTop[0]+10:ctrl.scrHeight/2+10) && ctrl.ringSmallRight[0]>ctrl.ballRight-ctrl.ringWidth+17 && ctrl.ringSmallRight[0]<ctrl.ballRight+19) {
        if(ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+26 || ctrl.ringSmallRight[0]>ctrl.ballRight+10){
          
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        
        else{
          if(!ctrl.scored[0] ){
            ctrl.scored[0]=true;
            ctrl.score++;
          }
          
          
        }

        
      }
      if (t>(ctrl.ringTop[1]>0?ctrl.ringTop[1]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[1]>0?ctrl.ringTop[1]+10:ctrl.scrHeight/2+10) && ctrl.ringSmallRight[1]>ctrl.ballRight-ctrl.ringWidth+17 && ctrl.ringSmallRight[1]<ctrl.ballRight+19) {
        if(ctrl.ringSmallRight[1]<ctrl.ballRight-ctrl.ringWidth+26 || ctrl.ringSmallRight[1]>ctrl.ballRight+10){
          
          ctrl.jump(ball, ctrl, (Number(ball.style.top.replace('px',"")) - start)/4);
        }
        
        else{
          if(!ctrl.scored[1] ){
            ctrl.scored[1]=true;
            ctrl.score++;
          }
          
        }

        
      }
      if( !ctrl.rotating && t>(ctrl.ringTop[0]>0?ctrl.ringTop[0]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[0]>0?ctrl.ringTop[0]+10:ctrl.scrHeight/2+10) && (!ctrl.scored[0] && ctrl.ringSmallRight[0]>ctrl.ballRight-ctrl.ringWidth-1 && ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+18 || ctrl.ringSmallRight[0]<ctrl.ballRight+10 && ctrl.ringSmallRight[0]>ctrl.ballRight)){
      
        ctrl.ringSmallRight[0]-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl, true);
        
      }
      
      if( !ctrl.rotating && t>(ctrl.ringTop[0]>0?ctrl.ringTop[0]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[0]>0?ctrl.ringTop[0]+10:ctrl.scrHeight/2+10) && (ctrl.ringSmallRight[0]>ctrl.ballRight-ctrl.ringWidth+25 && ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+41|| ctrl.ringSmallRight[0]>ctrl.ballRight+24 && ctrl.ringSmallRight[0]<ctrl.ballRight+35  )){
      
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      if( !ctrl.rotating && t>(ctrl.ringTop[1]>0?ctrl.ringTop[1]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[1]>0?ctrl.ringTop[1]+10:ctrl.scrHeight/2+10) && (!ctrl.scored[1] && ctrl.ringSmallRight[1]>ctrl.ballRight-ctrl.ringWidth-1 && ctrl.ringSmallRight[1]<ctrl.ballRight-ctrl.ringWidth+18 || ctrl.ringSmallRight[1]<ctrl.ballRight+10 && ctrl.ringSmallRight[1]>ctrl.ballRight)){
      
        ctrl.ringSmallRight[1]-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl, true);
        
      }
      
      if( !ctrl.rotating && t>(ctrl.ringTop[1]>0?ctrl.ringTop[1]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[1]>0?ctrl.ringTop[1]+10:ctrl.scrHeight/2+10) && (ctrl.ringSmallRight[1]>ctrl.ballRight-ctrl.ringWidth+25 && ctrl.ringSmallRight[1]<ctrl.ballRight-ctrl.ringWidth+41|| ctrl.ringSmallRight[1]>ctrl.ballRight+24 && ctrl.ringSmallRight[1]<ctrl.ballRight+35  )){
      
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      


    }, 5);
    
    
  }
  rotate(ball:HTMLDivElement, ctrl:any, left?:boolean){
  ctrl.curRotate = ctrl.curRotate%360;
  var start = ctrl.curRotate;
  var timePassed=0;
  clearInterval(this.timerRotate);
  
    this.timerRotate = setInterval(function() {
     
      
      if(timePassed>1000){
        ctrl.rotating = false;
        clearInterval(ctrl.timerRotate);
        return;
      }
      ctrl.curRotate+=left?-5:5;
      timePassed=Math.abs(ctrl.curRotate-start);
      ball.style.transform="rotate("+ctrl.curRotate+"deg)";


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
      let t = Number(ball.style.top.replace('px',""));
      if( !ctrl.rotating 
        && t>(ctrl.ringTop[0]>0?ctrl.ringTop[0]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[0]>0?ctrl.ringTop[0]+10:ctrl.scrHeight/2+10)
        && (!ctrl.scored[0] 
          && ctrl.ringSmallRight[0]>ctrl.ballRight-ctrl.ringWidth-1 
          && ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+18 
          || ctrl.ringSmallRight[0]<ctrl.ballRight+10 
          && ctrl.ringSmallRight[0]>ctrl.ballRight+5)){
        
        ctrl.ringSmallRight[0]-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      if( !ctrl.rotating && t>(ctrl.ringTop[0]>0?ctrl.ringTop[0]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[0]>0?ctrl.ringTop[0]+10:ctrl.scrHeight/2+10)
        && (ctrl.ringSmallRight[0]>ctrl.ballRight-ctrl.ringWidth+25 
          && ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+41 
          || ctrl.ringSmallRight[0]>ctrl.ballRight+24 
          && ctrl.ringSmallRight[0]<ctrl.ballRight+35  )){
      
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl, true);
        
      }
      if( !ctrl.rotating 
        && t>(ctrl.ringTop[1]>0?ctrl.ringTop[1]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[1]>0?ctrl.ringTop[1]+10:ctrl.scrHeight/2+10)
        && (!ctrl.scored[1] 
          && ctrl.ringSmallRight[1]>ctrl.ballRight-ctrl.ringWidth-1 && ctrl.ringSmallRight[0]<ctrl.ballRight-ctrl.ringWidth+18 || ctrl.ringSmallRight[1]<ctrl.ballRight+10 && ctrl.ringSmallRight[1]>ctrl.ballRight+5)){
        
        ctrl.ringSmallRight[1]-= 4;
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl);
        
      }
      if( !ctrl.rotating && t>(ctrl.ringTop[1]>0?ctrl.ringTop[1]-30: ctrl.scrHeight/2-30) && t<(ctrl.ringTop[1]>0?ctrl.ringTop[1]+10:ctrl.scrHeight/2+10) && (ctrl.ringSmallRight[1]>ctrl.ballRight-ctrl.ringWidth+25 && ctrl.ringSmallRight[1]<ctrl.ballRight-ctrl.ringWidth+41|| ctrl.ringSmallRight[1]>ctrl.ballRight+24 && ctrl.ringSmallRight[1]<ctrl.ballRight+35  )){
      
        ctrl.rotating = true;
        ctrl.rotate(ball,ctrl, true);
        
      }
      // рисует состояние анимации, соответствующее времени timePassed
      ball.style.top = Number(ball.style.top.replace('px',""))- (3-Math.pow(timePassed/100,2)) + 'px';
   

    }, 5);
  }

  j(){

  }
  

}
