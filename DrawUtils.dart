#library('drawUtils');
#import('dart:html');
#import('dart:core');

class DrawUtils {
    static drawHead (ctx,x0,y0,x1,y1,x2,y2,style)
    {
      // all cases do this.
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,y1);
      ctx.lineTo(x2,y2);
      switch(style){
        case 0:
          // curved filled, add the bottom as an arcTo curve and fill
          var backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
          ctx.arcTo(x1,y1,x0,y0,.55*backdist);
          ctx.fill();
          break;
        case 1:
          // straight filled, add the bottom as a line and fill.
          ctx.lineTo(x0,y0);
          ctx.fill();
          break;
        case 2:
          // unfilled head, just stroke.
          ctx.stroke();
          break;
        case 3:
          //filled head, add the bottom as a quadraticCurveTo curve and fill
          var cpx=(x0+x1+x2)/3;
          var cpy=(y0+y1+y2)/3;
          ctx.quadraticCurveTo(cpx,cpy,x0,y0);
          ctx.fill();
          break;
        case 4:
          //filled head, add the bottom as a bezierCurveTo curve and fill
          var cp1x, cp1y, cp2x, cp2y,backdist;
          var shiftamt=5;
          if(x2==x0){
      // Avoid a divide by zero if x2==x0
      backdist=y2-y0;
      cp1x=(x1+x0)/2;
      cp2x=(x1+x0)/2;
      cp1y=y1+backdist/shiftamt;
      cp2y=y1-backdist/shiftamt;
          }else{
      backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
      var xback=(x0+x2)/2;
      var yback=(y0+y2)/2;
      var xmid=(xback+x1)/2;
      var ymid=(yback+y1)/2;
  
      var m=(y2-y0)/(x2-x0);
      var dx=(backdist/(2*Math.sqrt(m*m+1)))/shiftamt;
      var dy=m*dx;
      cp1x=xmid-dx;
      cp1y=ymid-dy;
      cp2x=xmid+dx;
      cp2y=ymid+dy;
          }
  
          ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x0,y0);
          ctx.fill();
          break;
      }
      ctx.restore();
  }
  
  static drawArrow (ctx,x1,y1,x2,y2,[d=10,style=3,which=1,angle=Math.PI/8])
    {
  
      var dist=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
      var ratio=(dist-d/3)/dist;
      var tox, toy,fromx,fromy;
      if(which == 1){
        tox=x1+(x2-x1)*ratio;
        toy=y1+(y2-y1)*ratio;
      }else{
        tox=x2;
        toy=y2;
      }
      if(which == 2){
        fromx=x1+(x2-x1)*(1-ratio);
        fromy=y1+(y2-y1)*(1-ratio);
      }else{
        fromx=x1;
        fromy=y1;
      }
  
      // Draw the shaft of the arrow
      ctx.beginPath();
      ctx.moveTo(fromx,fromy);
      ctx.lineTo(tox,toy);
      ctx.stroke();
  
      var lineangle=Math.atan2(y2-y1,x2-x1);
      var h=(d/Math.cos(angle)).abs();
  
      if(which == 1){  // handle far end arrow head
        var angle1=lineangle+Math.PI+angle;
        var topx=x2+Math.cos(angle1)*h;
        var topy=y2+Math.sin(angle1)*h;
        var angle2=lineangle+Math.PI-angle;
        var botx=x2+Math.cos(angle2)*h;
        var boty=y2+Math.sin(angle2)*h;
        drawHead(ctx,topx,topy,x2,y2,botx,boty,style);
      }
      if(which == 2){ // handle near end arrow head
        var angle1=lineangle+angle;
        var topx=x1+Math.cos(angle1)*h;
        var topy=y1+Math.sin(angle1)*h;
        var angle2=lineangle-angle;
        var botx=x1+Math.cos(angle2)*h;
        var boty=y1+Math.sin(angle2)*h;
        drawHead(ctx,topx,topy,x1,y1,botx,boty,style);
      }
  }    
  
  static void DrawLabel(CanvasRenderingContext2D context,double x, double y, String label){
    context.beginPath();
    context.fillStyle="rgb(225,225,225)";
    context.strokeStyle="rgb(225,225,225)";
    context.arc(x,y,15,0,Math.PI*2,true);
    context.closePath();
    context.fill();    
    
    context.beginPath();
    context.fillStyle="rgb(0,0,0)";
    context.strokeStyle="rgb(0,0,0)";
    context.arc(x,y,15,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.fillStyle="rgb(225,225,225)";
    context.arc(x,y,13,0,Math.PI*2,true);
    context.closePath();
    context.fill();      
    
    context.fillStyle='#000000';
    context.font='bold 12px sans-serif';
    context.fillText(label, x-6, y+6);    
  }
  
  static void DrawLine(CanvasRenderingContext2D context,int x1, int y1, int x2, int y2, bool isSelected){
  Math math = new Math();
  
  double fixedX1;
  double fixedY1;
  double fixedX2;
  double fixedY2;
  int XLong = x2-x1;
  int YLong = (-1*y2)-(-1*y1);      
  double TanA = YLong/XLong;
  double Angle = (Math.atan(TanA) * (180/Math.PI));
  if (Angle<0)
    Angle = 180 + Angle;
  if (y2>y1)
    Angle = 180 + Angle;
  
  double Hip = 20.0;
  double fixX = Hip * Math.cos((Angle*Math.PI)/180);
  double fixY = Hip * Math.sin((Angle*Math.PI)/180);
  
  fixedX1 = x1+fixX;
  fixedY1 = y1-fixY;
  
  /**Second Node Draw**/
  XLong = x1-x2;
  YLong = (-1*y1)-(-1*y2);      
  TanA = YLong/XLong;
  Angle = (Math.atan(TanA) * (180/Math.PI));
  if (Angle<0)
    Angle = 180 + Angle;
  if (y1>y2)
    Angle = 180 + Angle;
  
  Hip = 20.0;
  fixX = Hip * Math.cos((Angle*Math.PI)/180);
  fixY = Hip * Math.sin((Angle*Math.PI)/180); 
  
  fixedX2 = x2+fixX;
  fixedY2 = y2-fixY;
  
  context.fillStyle="rgb(0,0,0)";
  DrawUtils.drawArrow(context, fixedX1, fixedY1, fixedX2, fixedY2, 20);
  
  context.beginPath();
  context.fillStyle="rgb(0,0,0)";
  context.strokeStyle="rgb(0,0,0)";

  context.arc((x1+x2)/2,(y1+y2)/2,15,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  context.beginPath();
  if (!isSelected){
    context.fillStyle="rgb(225,225,225)";
  }
  else{
    context.fillStyle="rgb(200,100,100)";
  }
  context.arc((x1+x2)/2,(y1+y2)/2,13,0,Math.PI*2,true);
  context.closePath();
  context.fill();      
  }
  
  
  static void DrawInitialNode(CanvasRenderingContext2D context,int x, int y, String label,String heuristic,bool isSelected){
  context.fillStyle='rgb(200,200,0)';
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  if (isSelected)
    context.strokeStyle='#AAAAAA';
  else
    context.strokeStyle='#0B173B';
  context.lineWidth=4;
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  
  context.fillStyle='#000000';
  context.font='bold 30px sans-serif';
  context.fillText(label, x-11, y+8);
  
  context.fillStyle='#0000FF';
  context.font='bold 20px sans-serif';
  context.fillText(heuristic, x-16, y-27);      
  }   
  
  static void DrawFinalNode(CanvasRenderingContext2D context,int x, int y, String label,String heuristic,bool isSelected){
  context.fillStyle='rgb(0,255,0)';
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  
  if (isSelected)
    context.strokeStyle='#AAAAAA';
  else
    context.strokeStyle='#0B173B';
  context.lineWidth=4;
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  
  context.fillStyle='#000000';
  context.font='bold 30px sans-serif';
  context.fillText(label, x-11, y+8);
  
  context.fillStyle='#0000FF';
  context.font='bold 20px sans-serif';
  context.fillText(heuristic, x-16, y-27);      
  }   
  
  static void DrawNode(CanvasRenderingContext2D context,int x, int y, String label,String heuristic,bool isSelected){
  context.fillStyle='#FF0000';
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  
  if (isSelected)
    context.strokeStyle='#AAAAAA';
  else
    context.strokeStyle='#0B173B';
  context.lineWidth=4;
  context.beginPath();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  
  context.fillStyle='#000000';
  context.font='bold 30px sans-serif';
  context.fillText(label, x-11, y+8);
  
  context.fillStyle='#0000FF';
  context.font='bold 20px sans-serif';
  context.fillText(heuristic, x-16, y-27);      
  }  
}
