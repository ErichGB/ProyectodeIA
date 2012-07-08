#import('dart:html');
#import('dart:core');
#import('DrawUtils.dart');
#import('SearchAlgorithms.dart');


  class DrawGraph{
    List<DrawNode> Nodes;
    List<DrawAriste> Aristes;
    
    DrawNode CurrentSelecteNode;
    DrawAriste CurrentSelectAriste;
    
    bool IsAdd = true;
    bool IsJoin = false;
    bool IsMove = false;
    bool IsRemove = false;
    bool IsSelect = false;
    
    ResetStates(){
      IsAdd = false;
      IsJoin = false;
      IsMove = false;
      IsRemove = false;
      IsSelect = false;      
    }
    
    SetAdd(){
      this.ResetStates();
      IsAdd = true;
    }
    
    SetJoin(){
      this.ResetStates();
      IsJoin = true;
    }
    
    SetMove(){
      this.ResetStates();
      IsMove = true;
    }
    
    SetRemove(){
      this.ResetStates();
      IsRemove = true;
    }
    
    SetSelect(){
      this.ResetStates();
      IsSelect = true;      
    }
    
    DrawGraph(){
      this.Nodes = new List<DrawNode>();
      this.Aristes = new List<DrawAriste>();
    }
    
    BlockConnectedAristes(DrawNode node){      
      for (int i=0; i < this.Aristes.length; i++){
        if (this.Aristes[i].IsConnectedTo(node)){
          this.Aristes[i].Block();
        }
      }
    }
    
    BlockSelectedAristes(){      
      for (int i=0; i < this.Aristes.length; i++){
        if (this.Aristes[i].IsSelected){
          this.Aristes[i].Block();
        }
      }
    }    
    
    GetSelectedNodesID(){
      int nodeCount = this.Nodes.length;
      List<int> SelectedNodesID;
      
      SelectedNodesID = new List<int>();
      for (int i=0; i<nodeCount; i++){
        if (this.Nodes[i].isSelected){
          SelectedNodesID.add(i);
        }
      }
      
      return SelectedNodesID;      
    }
    
    List<DrawAriste> GetSelectedAristes(){
      int aristeCount = this.Aristes.length;
      List<DrawAriste> SelectedAristes;
      
      SelectedAristes = new List<DrawAriste>();
      for (int i=0; i<aristeCount; i++){
        if (this.Aristes[i].IsSelected){
          SelectedAristes.add(this.Aristes[i]);
        }
      }
      
      return SelectedAristes;      
    }
    
    List<DrawNode> GetSelectedNodes(){
      int nodeCount = this.Nodes.length;
      List<DrawNode> SelectedNodes;
      
      SelectedNodes = new List<DrawNode>();
      for (int i=0; i<nodeCount; i++){
        if (this.Nodes[i].isSelected){
          SelectedNodes.add(this.Nodes[i]);
        }
      }
      
      return SelectedNodes;
    }
    
    ClearNodeSelection(){
      this.Nodes.forEach((node) => node.isSelected = false);
    }
    
    ClearAristesSelection(){
      this.Aristes.forEach((ariste) => ariste.IsSelected = false);
    }
    
    HasAristeClick(int x, int y){
      int aristeCount = this.Aristes.length;
      for (int i=0; i<aristeCount; i++)
      {
        if (this.Aristes[i].IsInside(x, y))
        {
          if (this.Aristes[i].IsSelected == true)
          {
            this.Aristes[i].IsSelected = false;
          }
          else
          {
            this.Aristes[i].IsSelected = true;
          }
          return true;
        }
      }
      return false;        
    }
    
    HasNodeClick(int x, int y)
    {
      int nodeCount = this.Nodes.length;
      for (int i=0; i<nodeCount; i++)
      {
        if (this.Nodes[i].IsInside(x, y))
        {
          if (this.Nodes[i].isSelected == true)
          {
            this.Nodes[i].isSelected = false;
          }
          else
          {
            this.Nodes[i].isSelected = true;
          }
          return true;
        }
      }
      return false;      
    }
    
    AddNewNode(DrawNode node)
    {
      if (this.Nodes.length >0 )
      { 
        this.Nodes[0].isInitial = true;
        this.Nodes.last().isLast = false;
      }
      this.Nodes.add(node);
    }
    
    Draw(CanvasRenderingContext2D ctx)
    {
      ctx.clearRect(0, 0, 600, 400);
      this.Nodes.forEach((node) => node.Draw(ctx));
      this.Aristes.forEach((ariste) => ariste.Draw(ctx));
    }
  }
  
  class SelectableShape {
    int cx;
    int cy;
    int size;
    
    bool IsInside(int x, int y){
      if (((x)>=this.cx-this.size/2) && ((x)<=(this.cx+this.size/2)) &&
          ((y)>=this.cy-this.size/2) && ((y)<=(this.cy+this.size/2))
          ){
        return true;
        }
        else
        {
        return false;
        }
    }    
  }
  
  class DrawAriste extends SelectableShape{
    DrawNode initialN;
    DrawNode finalN;
    int val;
    bool IsSelected=false;
    bool IsBlocked = false;
    
    String StrVal = "";
    String StrV0 = "";
    String StrV1 = "";
    int d = 0;    
    
    Block()
    {
      this.IsBlocked = true;
      this.cx = -10;
      this.cy = -10;
    }
    
    SetJoin(){
      this.initialN.node.ConnectTo(this.finalN.node, this.val);
    }
    
    SetValue(int charCode){
      String str = new String.fromCharCodes([charCode]);
      
      if (d==0){
        StrV0 = str;
        d = 1;
      }
      else if (d==1){
        StrV1 = str;
        d = 0;
      }
      
      StrVal = "${StrV0}${StrV1}";
      this.val = Math.parseInt(this.StrVal);
    }    
    
    bool isSame(DrawAriste ariste){
      if ((ariste.initialN.isSame(this.initialN)) &&
      (ariste.finalN.isSame(this.finalN)))
      {
        return true;
      }
      else 
      {
        return false;
      }
    }
    
    bool IsConnectedTo(DrawNode node)
    {
      if ((node.isSame(initialN)) || (node.isSame(finalN)))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    
    RecalculateAriste()
    {
      this.cx = ((this.initialN.cx + this.finalN.cx) / 2).toInt();
      this.cy = ((this.initialN.cy + this.finalN.cy) / 2).toInt();      
    }
    
    DrawAriste(DrawNode initialNode , DrawNode finalNode, int value)
    {
      this.initialN = initialNode;
      this.finalN = finalNode;
      this.cx = ((this.initialN.cx + this.finalN.cx) / 2).toInt();
      this.cy = ((this.initialN.cy + this.finalN.cy) / 2).toInt();
      this.val = value;
      this.size = 40;
    }
    
    Draw(CanvasRenderingContext2D ctx)
    {
      if (!this.IsBlocked)
      {
        this.RecalculateAriste();
      DrawUtils.DrawLine(ctx, this.initialN.cx,this.initialN.cy,this.finalN.cx ,this.finalN.cy,this.IsSelected);
      DrawUtils.DrawLabel(ctx,  this.cx.toDouble() , this.cy.toDouble(), val.toString());
      }
    }
  }  

  class DrawNode extends SelectableShape{
    String val;
    
    int h;
    String StrHe = "";
    String StrH0 = "";
    String StrH1 = "";
    int d = 0;
    
    bool isLast = true;
    bool isInitial = false;
    bool isSelected = false;
    
    GraphNode node;
    
    isSame(DrawNode nd){
      return this.val == nd.val;
    }
        
    DrawNode(int x, int y, String value ,int heuristic){
      this.cx = x;
      this.cy = y;
      this.val = value;
      this.h = heuristic;
      this.size = 40;
    }
    
    void SetNodeValue(){
      this.node = new GraphNode(this.val.toString());
      this.node.Heuristic = this.h;
    }

    SetHeuristicValue(int charCode){
      String str = new String.fromCharCodes([charCode]);
      
      if (d==0){
        StrH0 = str;
        d = 1;
      }
      else if (d==1){
        StrH1 = str;
        d = 0;
      }
      
      StrHe = "${StrH0}${StrH1}";
      this.h = Math.parseInt(this.StrHe);
    }
    
    Draw(CanvasRenderingContext2D ctx)
    {
      if (this.isInitial)
        DrawUtils.DrawInitialNode(ctx, this.cx, this.cy, this.val,"${this.h}",isSelected);
      else if (this.isLast)
        DrawUtils.DrawFinalNode(ctx, this.cx, this.cy, this.val,"${this.h}",isSelected);
      else
        DrawUtils.DrawNode(ctx, this.cx, this.cy, this.val,"${this.h}",isSelected);
    }
  }
  
  void ProcessGraph(DrawGraph graph){
    Graph NodeGraph = new Graph(); 
    
    for(int i=0; i<graph.Nodes.length; i++){
      graph.Nodes[i].SetNodeValue();
    }
    
    graph.Nodes.last().node.setFinal();
    
    for(int i=0; i<graph.Aristes.length; i++){
      if (!graph.Aristes[i].IsBlocked)
        graph.Aristes[i].SetJoin();
    }
    
    for(int i=0; i<graph.Nodes.length; i++){
      NodeGraph.NodesCollecion.add(graph.Nodes[i].node);
    }    
    
    NodeGraph.setInitialState(graph.Nodes[0].node);
    NodeGraph.setFinalState(graph.Nodes.last().node);

    document.query("#first-deep").innerHTML = SearchAlgorithms.FirstDeep(NodeGraph);
    document.query("#first-wide").innerHTML = SearchAlgorithms.FirstWide(NodeGraph);
    document.query("#first-best").innerHTML = SearchAlgorithms.FirstBest(NodeGraph);
    document.query("#uniform-cost").innerHTML = SearchAlgorithms.UniFormCost(NodeGraph);
    document.query("#a-star").innerHTML = SearchAlgorithms.AStar(NodeGraph);
  }

  void main() {
    CanvasElement canvas = document.query("#canvas");
    CanvasRenderingContext2D ctx = canvas.getContext("2d");
    DrawGraph GraphN = new DrawGraph();
    var alpth = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","v","w","x","y","z"];
    int it = 0;
    
    /*Set function to Controls*/
    document.query("#add").on.click.add(function(e){
      GraphN.SetAdd();
      GraphN.ClearNodeSelection();
      GraphN.ClearAristesSelection();
    });
    document.query("#join").on.click.add(function(e){
      GraphN.SetJoin();
      GraphN.ClearNodeSelection();
      GraphN.ClearAristesSelection();
    }); 
    document.query("#move").on.click.add(function(e){
      GraphN.SetMove();
      GraphN.ClearNodeSelection();
      GraphN.ClearAristesSelection();
    });    
    document.query("#remove").on.click.add(function(e){
      GraphN.SetRemove();
      GraphN.ClearNodeSelection();
      GraphN.ClearAristesSelection();
    });
    document.query("#select").on.click.add(function(e){
      GraphN.SetSelect();
      GraphN.ClearNodeSelection();
      GraphN.ClearAristesSelection();
    });    
    /*********************/
    
    /*Set Function to process*/
    document.query("#process").on.click.add(function(e){
      ProcessGraph(GraphN);
    });
    /************************/
    
    /*Set Function to Select*/
    document.on.keyPress.add(function(e)
    {
      if (GraphN.IsSelect)
      {
        if (GraphN.GetSelectedNodes().length == 1)
        {
          GraphN.GetSelectedNodes()[0].SetHeuristicValue(e.charCode);  
        }
        else if (GraphN.GetSelectedAristes().length == 1)
        {
          GraphN.GetSelectedAristes()[0].SetValue(e.charCode); 
        }
        GraphN.Draw(ctx);
      }
    });
    canvas.on.click.add(function(e){
      if (GraphN.IsSelect){
        if (GraphN.HasNodeClick(e.offsetX, e.offsetY)){
          GraphN.ClearNodeSelection();
          GraphN.ClearAristesSelection();
          GraphN.HasNodeClick(e.offsetX, e.offsetY);
        }
        else if (GraphN.HasAristeClick(e.offsetX, e.offsetY)){
          GraphN.ClearNodeSelection();
          GraphN.ClearAristesSelection();
          GraphN.HasAristeClick(e.offsetX, e.offsetY);
        }
        else
        {
          GraphN.ClearNodeSelection();
          GraphN.ClearAristesSelection();
        }
        GraphN.Draw(ctx);
      }
    });
    /***************************/
    
    
    /*Set function to Move*/
    canvas.on.mouseMove.add(function(e){
      if (GraphN.IsMove){
        List<DrawNode> SelectedNodes = GraphN.GetSelectedNodes();
        if (SelectedNodes.length == 1)
        {
          SelectedNodes[0].cx = e.offsetX;
          SelectedNodes[0].cy = e.offsetY;
        }
        GraphN.Draw(ctx);
      }
    });
    canvas.on.mouseDown.add(function(e){
      if (GraphN.IsMove){
        if (GraphN.HasNodeClick(e.offsetX, e.offsetY)){
          GraphN.Draw(ctx);
        }
      }
    });
    canvas.on.mouseUp.add(function(e){
      if (GraphN.IsMove){
        GraphN.ClearNodeSelection();
        GraphN.Draw(ctx);
      }
    });    
    /**********************/
    
    /*Set function to Remove*/
    canvas.on.click.add(function(e){
      if (GraphN.IsRemove){
        if (GraphN.HasNodeClick(e.offsetX, e.offsetY)){
          List<int> SelectedNodesID = GraphN.GetSelectedNodesID();
          
          GraphN.BlockConnectedAristes(GraphN.GetSelectedNodes()[0]);
          GraphN.Nodes.removeRange(SelectedNodesID[0],1);
          
          GraphN.ClearNodeSelection();
          GraphN.ClearAristesSelection();
          GraphN.Draw(ctx);
        }
        else if (GraphN.HasAristeClick(e.offsetX, e.offsetY)){
          GraphN.BlockSelectedAristes();
          GraphN.ClearNodeSelection();
          GraphN.ClearAristesSelection();
          GraphN.Draw(ctx);          
        }
        
        GraphN.Nodes[0].isInitial = true;
        GraphN.Nodes.last().isLast = false;
        GraphN.Nodes[GraphN.Nodes.length-1].isLast = true;
      }
    });
    /***********************/
    
    /*Set function to Add*/
    canvas.on.click.add(function(e){
      if (GraphN.IsAdd)
      {
        if (!GraphN.HasNodeClick(e.offsetX, e.offsetY)){
          DrawNode newNode = new DrawNode(e.offsetX,e.offsetY,alpth[it],0);
          GraphN.AddNewNode(newNode);
          it++;
        }
        else
        {
          GraphN.ClearNodeSelection();
        }
        GraphN.Draw(ctx);
      }
    });
    /*****************/
    
    /*Set function to Join*/
    canvas.on.click.add(function(e){
      if (GraphN.IsJoin)
      {
        if (GraphN.HasNodeClick(e.offsetX,e.offsetY))
        {
          List<DrawNode> SelectedNodes = GraphN.GetSelectedNodes();
          if (SelectedNodes.length == 2)
          {
            GraphN.Aristes.add(new DrawAriste(SelectedNodes[0],SelectedNodes[1],0));
            GraphN.ClearNodeSelection();
          }
        }
        GraphN.Draw(ctx);
      }
    });    
    /*******************/
  }
