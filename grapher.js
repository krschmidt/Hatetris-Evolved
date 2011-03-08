allPoints=Array();
dataPoints=Array();

var Grapher = {

    point:function(x,y){
      this.x=x;
      this.y=y;
      return this;
    },
    addSeries: function(seriesName){
      if(allPoints[seriesName] != undefined){
        throw "series " + seriesName + " already exists";
      }
      if(dataPoints[seriesName] != undefined){
        throw "series " + seriesName + " already exists";
      }
      allPoints[seriesName] = Array();
      dataPoints[seriesName] = Array();
    },
    
    addPoint:function(x,y,seriesName){
      if(allPoints[seriesName] == undefined)
        throw "Cannot add a point to a nonexistant series";
      allPoints[seriesName][allPoints[seriesName].length++] = new Grapher.point(x,y);
    },
    //TODO add something to scale the x axis, so we're not always on the left
    addDataPoint:function(data,canvasName,seriesName){
      if(allPoints[seriesName] == undefined)
        throw "Cannot add a point to a nonexistant series";
      if(dataPoints[seriesName] == undefined)
        throw "Cannot add a point to a nonexistant series";
      canvas = document.getElementById(canvasName);
      allPoints[seriesName][allPoints[seriesName].length++] = 
        new Grapher.point((allPoints[seriesName].length-1),data)
      dataPoints[seriesName][dataPoints[seriesName].length++] = data;
      //TODO assumption? that we'll never have only negative data?
      //find biggest and smallest points
      //TODO this isn't going to work....?
      biggest = Math.max.apply(Math,dataPoints[seriesName]);
      if(biggest == 0)
        biggest = canvas.height;
      //smallest = Math.min.apply(Math,dataPoints[seriesName]);
      //rangeOfPoints = biggest-smallest;
      //TODO deal with when rangeOfPoints =0

      //add the newest point, then loop through them and adjust as necessary
      //for now the location of the point doesn't really matter
      for(var i=0;i<dataPoints[seriesName].length;i++){
        allPoints[seriesName][i].y= 
          canvas.height-(Math.floor((dataPoints[seriesName][i]/biggest)*(canvas.height-2)))-1;//includes offsets to keep a 1 px buffer around eveyrhting
      }    
    },

    draw:function(canvasName){
      canvas = document.getElementById(canvasName);
      //wipe the canvas, resizing to a little bigger than # of data points
      //This is a hack, but I can't come up with a better way to do it without
      //switching to lists(more work than I'm good for at this time of the
      //evening)
      for(var series in allPoints){
        canvas.width = allPoints[series].length + 5;
        break;
      }
      var ctx = canvas.getContext("2d");
      colors = ['red','blue','green','purple','orange'];
      var z=0;
      for(var series in allPoints){
        //According to _diveIntoHTML5_, the 0.5 hack allows smaller lines
        ctx.beginPath();
        ctx.moveTo(allPoints[series][0].x+0.5,allPoints[series][0].y+0.5);
        ctx.strokeStyle = colors[z%colors.length];
        //if(seriesName == "avgFit") alert(allPoints[seriesName][i].y + " " +allPoints[seriesName][i].x);
        for(var i=1;i<allPoints[series].length;i++){
          ctx.lineTo(allPoints[series][i].x+0.5,allPoints[series][i].y+0.5);
        }
        ctx.stroke();
        z++;
      }

//      ctx.strokeWeight= 0;


    },
    // 800 is arbitrary, but is probably smaller than most screens
    clear:function(canvasName){
      canvas = document.getElementById(canvasName);
      if(canvas.width >= 800){
        canvas.width = 800;
      }
      else{
        canvas.width = canvas.width;
      }
      allPoints=Array();
      dataPoints=Array();      
    }
  };
