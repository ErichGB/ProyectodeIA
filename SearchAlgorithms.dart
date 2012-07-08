#library('SearchAlgorithms');
#import('dart:html');
#import('dart:core');

class CommonUtils {
  static Revert(List<Object> RList){
    List<Object> TempList = new List<Object>();
    for (int i=RList.length-1; i>=0; i--){
      TempList.add(RList[i]);
    }
    return TempList;
  }
}

class GraphAriste{
  int value;
  GraphNode Node;
  
  GraphAriste(this.value,this.Node);
}

class GraphNode{
  String Data;
  bool Final;
  int Heuristic;
  List<GraphAriste> Aristes;
  
  GraphNode(String Data){
    this.Data = Data;
    Final = false;
    Aristes = new List<GraphAriste>();
  }
  
  setFinal(){
    this.Final = true;
  }
  
  ConnectTo(GraphNode GNode,int Value){
    this.Aristes.add(new GraphAriste(Value,GNode));
  }
}

class Path {
  int Value;
  List<GraphNode> NodesCollecion;
  bool Extended;
  
  Path(){
    this.NodesCollecion = new List<GraphNode>(); 
    this.Extended = false;
  }  
  
  int getHeuristic(){
    return NodesCollecion.last().Heuristic;
  }
  
  bool hasFinalNode(){
    for (int i=0; i< this.NodesCollecion.length; i++){
      if (this.NodesCollecion[i].Final)
        return true;
    }
    return false;
  }
  
  List<Path> ExtendPath(){
    List<Path> ExtendedPath = new List<Path>();
    this.Extended = true;
    
    for (var i=0; i< this.NodesCollecion[this.NodesCollecion.length-1].Aristes.length; i++){
        Path NewPath = new Path();
        for (var j=0; j<this.NodesCollecion.length; j++){
          NewPath.AddNode(this.NodesCollecion[j]);
        }
        NewPath.AddNode(this.NodesCollecion[this.NodesCollecion.length-1].Aristes[i].Node);
        NewPath.Value=this.NodesCollecion[this.NodesCollecion.length-1].Aristes[i].value+this.Value;
        ExtendedPath.add(NewPath);
    }
    
    return ExtendedPath;
  }
  
  AddNode(GraphNode GNode){
    this.NodesCollecion.add(GNode);
  }
  
  String GetAbsolutePath(){
    String s="(";
    for (var i=0; i< this.NodesCollecion.length ; i++){
      s=s.concat(CommonUtils.Revert(this.NodesCollecion)[i].Data.toString());
    }
    s=s.concat(")");
    return s;
  }  
  
  String GetStrHeuristicPath(){
    String s="(";
    s=s.concat((this.Value+this.getHeuristic()).toString());
    for (var i=0; i< this.NodesCollecion.length ; i++){
      s=s.concat(CommonUtils.Revert(this.NodesCollecion)[i].Data.toString());
    }
    s=s.concat(")");
    return s;
  }

  String GetStr(){
    String s="(";
    s=s.concat(this.getHeuristic().toString());
    for (var i=0; i< this.NodesCollecion.length ; i++){
      s=s.concat(CommonUtils.Revert(this.NodesCollecion)[i].Data.toString());
    }
    s=s.concat(")");
    return s;
  } 
  
  String GetStrHeuristic(){
    String s="(";
    s=s.concat(this.getHeuristic().toString());
    for (var i=0; i< this.NodesCollecion.length ; i++){
      s=s.concat(CommonUtils.Revert(this.NodesCollecion)[i].Data.toString());
    }
    s=s.concat(")");
    return s;
  }  
  
  String GetStrPath(){
   String s="(";
   s=s.concat(this.Value.toString());
   for (var i=0; i< this.NodesCollecion.length ; i++){
     s=s.concat(CommonUtils.Revert(this.NodesCollecion)[i].Data.toString());
   }
   s=s.concat(")");
   return s;
  }
 
}

class PathRow{
  List<Path> Paths;
  
  PathRow(){
    this.Paths = new List<Path>();
  }
  
  AddPath(Path QPath){
    this.Paths.add(QPath);
  }
  
  List<Path> GetUnexpandedPaths(){
    List<Path> UnexpandedPaths = new List<Path>();
    for (var i=0; i<this.Paths.length ; i++){
      if (!this.Paths[i].Extended)
        UnexpandedPaths.add(this.Paths[i]);
    }
    return UnexpandedPaths;
  }
  
  Print(){
    String s="";
    for(var i=0; i<this.Paths.length; i++){
      s = s.concat(Paths[i].GetAbsolutePath());
    }
    print(s);
  }
  
  String GetPathStr(){
    String s="";
    for(var i=0; i<this.Paths.length; i++){
      s = s.concat(Paths[i].GetAbsolutePath());
    }
    return s; 
  }
  
  PrintHeuristic([bool returnString=false]){
    String s="";
    for(var i=0; i<this.Paths.length; i++){
      s = s.concat(Paths[i].GetStrHeuristic());
    }
    if (returnString)
      return s;
    else
      print(s);
  }    
  
  PrintHeuristicPaths([bool returnString=false]){
    String s="";
    for(var i=0; i<this.Paths.length; i++){
      s = s.concat(Paths[i].GetStrHeuristicPath());
    }
    if (returnString)
      return s;
    else
      print(s);
  }  
  
  PrintPaths([bool returnString=false]){
    String s="";
    for(var i=0; i<this.Paths.length; i++){
      s = s.concat(Paths[i].GetStrPath());
    }
    if (returnString)
      return s;
    else
      print(s);
  }
  
  Path GetLastPath(){
    return this.Paths.last();
  }
  
  Path GetFirstPath(){
    return this.Paths[0];
  }
  
  Path GetLowestPath(){
    int LowestVal;
    Path LowestPath = this.Paths[0];
    LowestVal = LowestPath.Value;
    
    for (var i=1; i<Paths.length; i++){
        if (Paths[i].Value<LowestVal)
          LowestPath = Paths[i];
    }
    
    return LowestPath;
  }
  
  Path GetLowestHeuristicPath(){
    int LowestVal;
    Path LowestPath = this.Paths[0];
    LowestVal = LowestPath.Value;
    
    for (var i=1; i<Paths.length; i++){
        if ((Paths[i].Value+Paths[i].getHeuristic())<LowestVal)
          LowestPath = Paths[i];
    }
    
    return LowestPath;
  }
  
  Path GetLowestHeuristic(){
    int LowestVal;
    Path LowestPath = this.Paths[0];
    LowestVal = LowestPath.getHeuristic();
    
    for (var i=1; i<Paths.length; i++){
        if ((Paths[i].getHeuristic())<=LowestVal)
          LowestPath = Paths[i];
    }
    return LowestPath;    
  }  
}

class PathTable{
  List<PathRow> Rows;
  
  PathTable(){
    this.Rows = new List<PathRow>();
  }
  
  AddRow(PathRow NewRow){
    this.Rows.add(NewRow);
  }
  
  PathRow GetLastRow(){
    return this.Rows.last();
  }
}

class Graph {
  List<GraphNode> NodesCollecion;
  GraphNode InitialState;
  GraphNode FinalState;
  GraphNode CurrentNode;
  
  setInitialState(GraphNode GNode){
    this.InitialState = GNode;
  }
  
  setFinalState(GraphNode GNode){
    this.FinalState = GNode;
  }
  
  Graph(){
    this.NodesCollecion = new List<GraphNode>();
  }
}

class SearchAlgorithms{
  
  static String FirstWide(Graph GraphToProcess){
    String ResultTable = "";
    
    PathTable CU_QTable = new PathTable();
    PathRow InitialRow = new PathRow();
    Path InitialPath = new Path();
    InitialPath.AddNode(GraphToProcess.InitialState);
    InitialPath.Value = 0;
    InitialRow.AddPath(InitialPath);
    ResultTable = ResultTable.concat("<div class='pathrow'>${InitialRow.GetPathStr()}</div>");
    CU_QTable.AddRow(InitialRow);
    
    PathRow TempRow;
    PathRow NewRow;
    do{
      TempRow = CU_QTable.GetLastRow();
      NewRow = new PathRow();
      if (TempRow.GetFirstPath().hasFinalNode())
        break;    
      for (var i=0; i<TempRow.GetFirstPath().ExtendPath().length; i++){
        NewRow.AddPath(TempRow.GetFirstPath().ExtendPath()[i]);
      }
      List<Path> TempList = new List<Path>();
      TempList.addAll(TempRow.GetUnexpandedPaths());
      TempList.addAll(NewRow.Paths);
      NewRow.Paths = TempList;
      CU_QTable.AddRow(NewRow);
      ResultTable = ResultTable.concat("<div class='pathrow'>${NewRow.GetPathStr()}</div>");
    }while(true);
    
    return "<div class='pathtable'>$ResultTable</div>";
  }
  
  static String FirstDeep(Graph GraphToProcess){
    String ResultTable = "";
    
    PathTable CU_QTable = new PathTable();
    PathRow InitialRow = new PathRow();
    Path InitialPath = new Path();
    InitialPath.AddNode(GraphToProcess.InitialState);
    InitialPath.Value = 0;
    InitialRow.AddPath(InitialPath);
    ResultTable = ResultTable.concat("<div class='pathrow'>${InitialRow.GetPathStr()}</div>");
    CU_QTable.AddRow(InitialRow);
    
    PathRow TempRow;
    PathRow NewRow;
    do{
      TempRow = CU_QTable.GetLastRow();
      NewRow = new PathRow();
      if (TempRow.GetFirstPath().hasFinalNode())
        break;
      for (var i=0; i<TempRow.GetLastPath().ExtendPath().length; i++){
        NewRow.AddPath(TempRow.GetLastPath().ExtendPath()[i]);
      }
      List<Path> TempList = new List<Path>();
      TempList.addAll(NewRow.Paths);
      TempList.addAll(TempRow.GetUnexpandedPaths());
      NewRow.Paths = TempList;
      CU_QTable.AddRow(NewRow);
      ResultTable = ResultTable.concat("<div class='pathrow'>${NewRow.GetPathStr()}</div>");
    }while(true);
    
    return "<div class='pathtable'>$ResultTable</div>";
  }
  
  static String FirstBest(Graph GraphToProcess){
    String ResultTable = "";
    
    PathTable CU_QTable = new PathTable();
    PathRow InitialRow = new PathRow();
    Path InitialPath = new Path();
    InitialPath.AddNode(GraphToProcess.InitialState);
    InitialPath.Value = 0;
    InitialRow.AddPath(InitialPath);
    ResultTable =  ResultTable.concat("<div class='pathrow'>${InitialRow.PrintPaths(true)}</div>");
    CU_QTable.AddRow(InitialRow);
    
    PathRow TempRow;
    PathRow NewRow;
    do{
      TempRow = CU_QTable.GetLastRow();
      NewRow = new PathRow();
      if (TempRow.GetLowestHeuristic().hasFinalNode())
        break;    
      for (var i=0; i<TempRow.GetLowestHeuristic().ExtendPath().length; i++){
        NewRow.AddPath(TempRow.GetLowestHeuristic().ExtendPath()[i]);
      }
      NewRow.Paths.addAll(TempRow.GetUnexpandedPaths());
      CU_QTable.AddRow(NewRow);
      ResultTable =  ResultTable.concat("<div class='pathrow'>${NewRow.PrintHeuristic(true)}</div>");
    }while(true);
    
    return "<div class='pathtable'>$ResultTable</div>";
  }
  
  static String UniFormCost(Graph GraphToProcess){
    String ResultTable = "";
    
    PathTable CU_QTable = new PathTable();
    PathRow InitialRow = new PathRow();
    Path InitialPath = new Path();
    InitialPath.AddNode(GraphToProcess.InitialState);
    InitialPath.Value = 0;
    InitialRow.AddPath(InitialPath);
    ResultTable = ResultTable.concat("<div class='pathrow'>${InitialRow.PrintPaths(true)}</div>");
    CU_QTable.AddRow(InitialRow);
    
    PathRow TempRow;
    PathRow NewRow;
    do{
      TempRow = CU_QTable.GetLastRow();
      NewRow = new PathRow();
      if (TempRow.GetLowestPath().hasFinalNode())
        break;    
      for (var i=0; i<TempRow.GetLowestPath().ExtendPath().length; i++){
        NewRow.AddPath(TempRow.GetLowestPath().ExtendPath()[i]);
      }
      NewRow.Paths.addAll(TempRow.GetUnexpandedPaths());
      CU_QTable.AddRow(NewRow);
      ResultTable = ResultTable.concat("<div class='pathrow'>${NewRow.PrintPaths(true)}</div>");
    }while(true); 
    
    return "<div class='pathtable'>$ResultTable</div>";;
  }
  
  static String AStar(Graph GraphToProcess){
    String ResultTable = "";
    
    PathTable CU_QTable = new PathTable();
    PathRow InitialRow = new PathRow();
    Path InitialPath = new Path();
    InitialPath.AddNode(GraphToProcess.InitialState);
    InitialPath.Value = 0;
    InitialRow.AddPath(InitialPath);
    ResultTable = ResultTable.concat("<div class='pathrow'>${InitialRow.PrintPaths(true)}</div>");
    CU_QTable.AddRow(InitialRow);
    
    PathRow TempRow;
    PathRow NewRow;
    do{
      TempRow = CU_QTable.GetLastRow();
      NewRow = new PathRow();
      if (TempRow.GetLowestHeuristicPath().hasFinalNode())
        break;    
      for (var i=0; i<TempRow.GetLowestHeuristicPath().ExtendPath().length; i++){
        NewRow.AddPath(TempRow.GetLowestHeuristicPath().ExtendPath()[i]);
      }
      NewRow.Paths.addAll(TempRow.GetUnexpandedPaths());
      CU_QTable.AddRow(NewRow);
      ResultTable = ResultTable.concat("<div class='pathrow'>${NewRow.PrintHeuristicPaths(true)}</div>");
    }while(true); 
    
    return "<div class='pathtable'>$ResultTable</div>";
  }  
}