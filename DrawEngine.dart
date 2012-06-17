#import('dart:html');
#import('dart:core');
#import('DrawUtils.dart');

  class DrawGraph{
    List<DrawNode> Nodes;
    int currentSelected = 0;
    bool readyToLine = false;
    DrawNode currentInitialNode;
    DrawNode currentFinalNode;
    
    DrawGraph(){
     this.Nodes = new List<DrawNode>(); 
    }
    
    void ResetLine(){
      this.currentSelected = 0;
      this.readyToLine = false;
    }
    
    bool HasClick(int x, int y){
      for(int i=0; i<this.Nodes.length; i++){
        if (this.Nodes[i].isCoorInside(x, y)){

          if (this.currentSelected==0) {
            this.currentSelected = 1;
            this.currentInitialNode = this.Nodes[i];
          }
          else if(this.currentSelected == 1){
            this.currentSelected = 0;
            this.currentFinalNode = this.Nodes[i];
            this.readyToLine = true;
            
            if (this.currentFinalNode.val == this.currentInitialNode.val){
              this.ResetLine();
              return true;
            }
          }
          return true;
        }
      }
      return false;
    }
  }

  class DrawNode{
    int x;
    int y;
    int w=40;
    int h=40;
    int he;
    String val;
    bool d;
    bool selected=false;
    
    bool isCoorInside (int cx, int cy){
      if (((cx)>=this.x-20) && ((cx)<=(this.x+this.w-20)) &&
          ((cy)>=this.y-20) && ((cy)<=(this.y+this.h-20))
          ){
        return true;
        }
        else
        return false;
    }
    
    DrawNode(int x, int y, String val , int he){
      this.x = x;
      this.y = y;
      this.val = val;
      this.he = he;
    }
  }

  void main() {
    CanvasElement canvas = document.query("#canvas");
    CanvasRenderingContext2D ctx = canvas.getContext("2d");
    DrawGraph GraphN = new DrawGraph();
    var alpth = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","v","w","x","y","z"];
    int it = 0;
    canvas.on.click.add(function (e){
      if (!GraphN.HasClick(e.offsetX, e.offsetY))
      {
        GraphN.ResetLine();
        DrawNode newNode = new DrawNode(e.offsetX,e.offsetY,alpth[it],0);
        GraphN.Nodes.add(newNode);
        DrawNode LastNode = GraphN.Nodes.last();
        DrawUtils.DrawNode(ctx, LastNode.x, LastNode.y, LastNode.val,"${LastNode.he}");
        it++;
      }
      else if (GraphN.readyToLine){
        DrawUtils.DrawLine(ctx, GraphN.currentInitialNode.x, GraphN.currentInitialNode.y, GraphN.currentFinalNode.x , GraphN.currentFinalNode.y);
        GraphN.ResetLine();
      }
    });

  }
