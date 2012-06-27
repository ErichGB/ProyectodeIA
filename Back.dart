#import('dart:html');
#import('dart:core');
#import('DrawUtils.dart');
#import('SearchAlgorithms.dart');


  class DrawGraph{
    List<DrawNode> Nodes;
    List<DrawAriste> Aristes;
    
    int currentSelected = 0;
    bool readyToLine = false;
    DrawNode currentInitialNode;
    DrawNode currentFinalNode;
    
    DrawGraph(){
     this.Nodes = new List<DrawNode>(); 
     this.Aristes = new List<DrawAriste>(); 
    }
    
    void ResetLine(){
      this.currentSelected = 0;
      this.readyToLine = false;
    }
    
    DrawAriste getSelectedAriste(){
      for(int j=0; j<this.Aristes.length; j++){
        if (this.Aristes[j].checked == true)
          return this.Aristes[j];
       }
      return null;
    }
    
    void ResetAristes(){
      for(int j=0; j<this.Aristes.length; j++){
        this.Aristes[j].checked = false; 
       }
    }
    
    bool HasAristeClick(int x, int y){
      for(int j=0; j<this.Aristes.length; j++){
        this.Aristes[j].checked = false; 
       }      
      
      for(int i=0; i<this.Aristes.length; i++){
        if (this.Aristes[i].isCoorInside(x, y)){
          this.Aristes[i].checked = true;
          return true;
        }
      }
      return false;
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
  
  class DrawAriste{
    int x1;
    int y1;
    int x2;
    int y2;
    double x;
    double y;
    int w=24;
    int h=24;
    int val;
    bool checked=false;
    String strVal="";
    int d=0;
    String d0="";
    String d1="";
    
    /*******/
    GraphNode initialNode;
    GraphNode finalNode;
    
    void AddValue(String str){
      if (d==0){
        d0=str;
        d=1;
      }
      else if (d==1){
        d1=str;
        d=0;
      }
      
      this.strVal = "${this.d0}${this.d1}";
      this.val = Math.parseInt(this.strVal);
    }
    
    bool isCoorInside (int cx, int cy){
      if (((cx)>=this.x-12) && ((cx)<=(this.x+this.w)) &&
          ((cy)>=this.y-12) && ((cy)<=(this.y+this.h))
          ){
        return true;
        }
        else
        return false;
    }
    
    DrawAriste(int x1, int y1, int x2, int y2){
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.x = (x1+x2)/2;
      this.y = (y1+y2)/2;
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
    
    GraphNode GNode;
    
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
  
  void processGraph(DrawGraph GraphN){
    Graph CU_Graph = new Graph(); 
    
    for(int i=0; i<GraphN.Aristes.length; i++){
      GraphN.Aristes[i].initialNode.ConnectTo(GraphN.Aristes[i].finalNode,GraphN.Aristes[i].val);
    }
    
    GraphN.Nodes.last().GNode.setFinal();
    CU_Graph.setFinalState(GraphN.Nodes.last().GNode);
    CU_Graph.setInitialState(GraphN.Nodes[0].GNode);
    
    for (int i=0; i<GraphN.Nodes.length; i++){
      CU_Graph.NodesCollecion.add(GraphN.Nodes[i].GNode);
    }
    
    print("Costo Uniforme");
    SearchAlgorithms.UniFormCost(CU_Graph);
    /*print("A Estrella");
    SearchAlgorithms.AStar(CU_Graph);
    print("Primero el mejor");
    SearchAlgorithms.FirstBest(CU_Graph);*/
    print("Primero en Anchura");
    SearchAlgorithms.FirstWide(CU_Graph);
    print("Primer en Profundidad");
    SearchAlgorithms.FirstDeep(CU_Graph);   
  }

  void main() {
    CanvasElement canvas = document.query("#canvas");
    CanvasRenderingContext2D ctx = canvas.getContext("2d");
    DrawGraph GraphN = new DrawGraph();
    var alpth = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","v","w","x","y","z"];
    int it = 0;
    
    document.query("#process").on.click.add(function(e){
      processGraph(GraphN);
    });
    
    document.on.keyPress.add(function(e){
      try{
      String val = new String.fromCharCodes([e.charCode]);
      GraphN.getSelectedAriste().AddValue(val);
      DrawUtils.DrawLabel(ctx,GraphN.getSelectedAriste().x,GraphN.getSelectedAriste().y,GraphN.getSelectedAriste().strVal);
      
      } catch (var es){
        
      }
    });
    
    canvas.on.click.add(function (e){
      if (GraphN.HasAristeClick(e.offsetX, e.offsetY)){
      }
      else if (!GraphN.HasClick(e.offsetX, e.offsetY))
      {
        GraphN.ResetLine();
        DrawNode newNode = new DrawNode(e.offsetX,e.offsetY,alpth[it],0);
        /*********/
        newNode.GNode = new GraphNode(alpth[it]);
        
        GraphN.Nodes.add(newNode);
        DrawNode LastNode = GraphN.Nodes.last();
        DrawUtils.DrawNode(ctx, LastNode.x, LastNode.y, LastNode.val,"${LastNode.he}");
       
        it++;
      }
      else if (GraphN.readyToLine){
        DrawAriste newAriste = new DrawAriste( GraphN.currentInitialNode.x, GraphN.currentInitialNode.y, GraphN.currentFinalNode.x , GraphN.currentFinalNode.y);
        
        /**********/
        newAriste.initialNode = GraphN.currentInitialNode.GNode;
        newAriste.finalNode = GraphN.currentFinalNode.GNode;
        
        GraphN.Aristes.add(newAriste);
        DrawUtils.DrawLine(ctx, GraphN.currentInitialNode.x, GraphN.currentInitialNode.y, GraphN.currentFinalNode.x , GraphN.currentFinalNode.y);
        GraphN.ResetLine();

      }
    });

  }
