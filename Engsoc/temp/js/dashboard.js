var ReferanceMarkerTypes = ["circle","diamond","square","triangle-right","circle-open","circle-dot","circle-open-dot","square-open","square-dot","square-open-dot","diamond-open","diamond-dot","diamond-open-dot","cross","cross-open","cross-dot","cross-open-dot","x","x-open","x-dot","x-open-dot","triangle-up","triangle-up-open","triangle-up-dot","triangle-up-open-dot","triangle-down","triangle-down-open","triangle-down-dot","triangle-down-open-dot","triangle-left","triangle-left-open","triangle-left-dot","triangle-left-open-dot","triangle-right-open","triangle-right-dot","triangle-right-open-dot","triangle-ne","triangle-ne-open","triangle-ne-dot","triangle-ne-open-dot","triangle-se","triangle-se-open","triangle-se-dot","triangle-se-open-dot","triangle-sw","triangle-sw-open","triangle-sw-dot","triangle-sw-open-dot","triangle-nw","triangle-nw-open","triangle-nw-dot","triangle-nw-open-dot","pentagon","pentagon-open","pentagon-dot","pentagon-open-dot","hexagon","hexagon-open","hexagon-dot","hexagon-open-dot","hexagon2","hexagon2-open","hexagon2-dot","hexagon2-open-dot","octagon","octagon-open","octagon-dot","octagon-open-dot","star","star-open","star-dot","star-open-dot","hexagram","hexagram-open","hexagram-dot","hexagram-open-dot","star-triangle-up","star-triangle-up-open","star-triangle-up-dot","star-triangle-up-open-dot","star-triangle-down","star-triangle-down-open","star-triangle-down-dot","star-triangle-down-open-dot","star-square","star-square-open","star-square-dot","star-square-open-dot","star-diamond","star-diamond-open","star-diamond-dot","star-diamond-open-dot","diamond-tall","diamond-tall-open","diamond-tall-dot","diamond-tall-open-dot","diamond-wide","diamond-wide-open","diamond-wide-dot","diamond-wide-open-dot","hourglass","hourglass-open","bowtie","bowtie-open","circle-cross","circle-cross-open","circle-x","circle-x-open","square-cross","square-cross-open","square-x","square-x-open","diamond-cross","diamond-cross-open","diamond-x","diamond-x-open","cross-thin","cross-thin-open","x-thin","x-thin-open","asterisk","asterisk-open","hash-open","hash-dot","hash-open-dot","y-up","y-up-open","y-down","y-down-open","y-left","y-left-open","y-right","y-right-open"];
var markerTypes = ["circle","diamond","square","triangle-right","circle-open","circle-dot","circle-open-dot","square-open","square-dot","square-open-dot","diamond-open","diamond-dot","diamond-open-dot","cross","cross-open","cross-dot","cross-open-dot","x","x-open","x-dot","x-open-dot","triangle-up","triangle-up-open","triangle-up-dot","triangle-up-open-dot","triangle-down","triangle-down-open","triangle-down-dot","triangle-down-open-dot","triangle-left","triangle-left-open","triangle-left-dot","triangle-left-open-dot","triangle-right-open","triangle-right-dot","triangle-right-open-dot","triangle-ne","triangle-ne-open","triangle-ne-dot","triangle-ne-open-dot","triangle-se","triangle-se-open","triangle-se-dot","triangle-se-open-dot","triangle-sw","triangle-sw-open","triangle-sw-dot","triangle-sw-open-dot","triangle-nw","triangle-nw-open","triangle-nw-dot","triangle-nw-open-dot","pentagon","pentagon-open","pentagon-dot","pentagon-open-dot","hexagon","hexagon-open","hexagon-dot","hexagon-open-dot","hexagon2","hexagon2-open","hexagon2-dot","hexagon2-open-dot","octagon","octagon-open","octagon-dot","octagon-open-dot","star","star-open","star-dot","star-open-dot","hexagram","hexagram-open","hexagram-dot","hexagram-open-dot","star-triangle-up","star-triangle-up-open","star-triangle-up-dot","star-triangle-up-open-dot","star-triangle-down","star-triangle-down-open","star-triangle-down-dot","star-triangle-down-open-dot","star-square","star-square-open","star-square-dot","star-square-open-dot","star-diamond","star-diamond-open","star-diamond-dot","star-diamond-open-dot","diamond-tall","diamond-tall-open","diamond-tall-dot","diamond-tall-open-dot","diamond-wide","diamond-wide-open","diamond-wide-dot","diamond-wide-open-dot","hourglass","hourglass-open","bowtie","bowtie-open","circle-cross","circle-cross-open","circle-x","circle-x-open","square-cross","square-cross-open","square-x","square-x-open","diamond-cross","diamond-cross-open","diamond-x","diamond-x-open","cross-thin","cross-thin-open","x-thin","x-thin-open","asterisk","asterisk-open","hash-open","hash-dot","hash-open-dot","y-up","y-up-open","y-down","y-down-open","y-left","y-left-open","y-right","y-right-open"];
var ReferanceMarkerColours = ["Purple","Black","Brown","Pink","Green","Red","Blue","Orange"];
var markerColours = ["Purple","Black","Brown","Pink","Green","Red","Blue","Orange"];
var currentNumberofPlots = 0;

//Handles adding a plot from the hugo db
function addPlot (coord,cameraType,Parameter) {
	//Send Command to SQL and plot return vales
	getData(coord,buildSQlString(cameraType,Parameter),createPlotName(cameraType,Parameter));
}

//Calls the hugo db and executes the sqlCommand passed 
function getData (coord,sqlCommand,PlotName){
	$.ajax({
		url: '/php/getData.php',
		type: 'get', 
		data: {sqlCommand:sqlCommand, date:'true'},
		dataType: 'json', 
		success: function(responseData) { plot(coord,PlotName,responseData.X,responseData.Y); }
	});
}

// Given data, plots it
function plot (coord,PlotName,X,Y){
	hoverInfo = [];
	var data = {
		x: X, 
		y: Y, 
		mode: 'markers',
		type: 'scatter',		
		marker: { 
				color: markerColours[0],
				symbol: markerTypes[0],
				size:6,
				},
		name : PlotName
		};
	
	var options = {
		modeBarButtonsToRemove:['sendDataToCloud'],
		displaylogo: false,
		scrollZoom: true,
		staticPlot: true,
	};
	
	var layout = {
		margin:{
			l: 10,
			r: 10,
			b: 100,
			t: 100,
			},
		title:PlotName,
		legend: {x:0,y:1},
	};
	
	var graphDiv = document.getElementById(coord);
	
	if(graphDiv.data !== undefined)
	{
		graphDiv.layout.title = graphDiv.layout.title + '<br>' + PlotName;
		Plotly.addTraces(coord, data);
	}
	else 
		Plotly.newPlot(coord, [data], layout , options);
	
	// Move used marker type to the end of the list
	markerTypes.push(markerTypes[0]);
	markerTypes.splice(0,1);	
	
	markerColours.push(markerColours[0]);
	markerColours.splice(0,1);
	
	addSavitzkyGolay(coord,PlotName);
}

//Given a camera and a parameter, returns an sql command to send to the hugo db
function buildSQlString (cameraType, Parameter){
	if(cameraType == "Spectra")        { cameraType = "P7"; }	
	else if (cameraType == "AAK")      { cameraType = "AAK_"; }
	else if (cameraType == "Vega")     { cameraType = "P9"; }
	else if (cameraType == "Vicra")    { cameraType = "P6"; }
	else if (cameraType == "Astra")    { cameraType = "P8"; }
	else if (cameraType == "Certus")   { cameraType = "C3-04"; }
	else if (cameraType == "Optotrak") { cameraType = "C3-06"; } 
	
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear() - 1;
	
	var string  = 'SELECT s1.NDI_Results_SerialNbr, s1.NDI_Results_CreatedDate, s1.NDI_Results_TestID, s3.NDI_Results_Details_Value ';
		string += 'FROM NDI_Results s1 ';
		string += 'inner join (select NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID, max(NDI_Results.NDI_Results_CreatedDate) NDI_Results_CreatedDate from NDI_Results group by NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID) s2 ';
		string += 'on s1.NDI_Results_CreatedDate = s2.NDI_Results_CreatedDate ';
		string += 'and s1.NDI_Results_SerialNbr = s2.NDI_Results_SerialNbr ';
		string += 'and s1.NDI_Results_TestID = s2.NDI_Results_TestID ';
		string += 'LEFT JOIN NDI_Results_Details s3 ON s1.NDI_Results_ResultID = s3.NDI_Results_Details_ResultsID ';
		string += "WHERE (((s1.NDI_Results_SerialNbr) LIKE '%" + cameraType + "%') ";
		string += "AND s1.NDI_Results_CreatedDate > CONVERT(varchar,'" + month + "/" + day + "/" + year + "',103) "; 
		string += "AND ((s3.NDI_Results_Details_Label)='" + Parameter + "')) ";
		string += "ORDER BY NDI_Results_CreatedDate ASC;";

	return string;
}	

//Given a camera and a parameter, returns a plot name
function createPlotName(cameraType,Parameter){
	if(cameraType == "Spectra")       { return "P7_" + Parameter; }
	else if (cameraType == "AAK")     { return "AAK_" + Parameter; }
	else if (cameraType == "Vega")    { return "P9_" + Parameter; }
	else if (cameraType == "Vicra")   { return "P6_" + Parameter; }
	else if (cameraType == "Astra")   { return "P8_" + Parameter; }
	else if (cameraType == "Certus")  { return "C304_" + Parameter; }
	else if(cameraType == "Optotrak") { return "C306_" + Parameter; } 
	else { return Parameter; }
}

/*
//Export section
//Exports all plots into a different files
function exportPlots(){ for(var i = 0; i < plots.length; i++) { exportPlot(plots[i]); } }

//Exports a plot into a csv given its name 
function exportPlot(plotName){
	var index = 0;
	
	for( i = 0; i < currentNumberofPlots; i ++){if (graphDiv.data[i].name == plotName) { index = i;  break; } }
	
	if(index == graphDiv.data.length && graphDiv.data[i].name != plotName)
		return;
	
	if(isin(custom3DPlots,plotName) == -1) { var outputString = plotName +"-x," +plotName+ "-y\n"; }
	else { var outputString = plotName + "-x," + plotName + "-y," + plotName+ "-z\n"; }
	var plotsDone = 0; 
	var lineCount = 0; 
	
	for(var i = 0; i < graphDiv.data[index].x.length; i ++)
	{
		newLine = '';
		
		if(graphDiv.data[index].x !== undefined)
		{
			if(graphDiv.data[index].x.length > lineCount) {newLine += graphDiv.data[index].x[lineCount] + ","; }
			else { newLine += ","; }										
		}			
		
		if(graphDiv.data[index].y !== undefined)
		{
			if(graphDiv.data[index].y.length > lineCount) {newLine += graphDiv.data[index].y[lineCount] + ","; }
			else { newLine += ","; }										
		}						
		
		if(graphDiv.data[index].z !== undefined)
		{
			if(graphDiv.data[index].z.length > lineCount) {newLine += graphDiv.data[index].z[lineCount] + ","; }
			else { newLine += ","; }										
		}			
			
		outputString += newLine+"\n";
		lineCount ++;
	}
	fileName = plotName + "-Data.csv";
	var blob = new Blob([outputString], {type: "text/plain;charset=utf-8"});
	saveAs(blob, fileName);
}

	
	if(graphDiv.data.length == 0)
		return;
	
	var outputString = createHeader();
	var plotsDone = 0; 
	var lineCount = 0; 
	
	while(plotsDone != graphDiv.data.length)
	{
		newLine = '';
		plotsDone = 0; 
		
		for(var i = 0; i < graphDiv.data.length; i ++)
		{
			if(graphDiv.data[i].x !== undefined)
			{
				if(graphDiv.data[i].x.length > lineCount) {newLine += graphDiv.data[i].x[lineCount] + ","; }
				else { newLine += ","; plotsDone++}										
			}			
			
			if(graphDiv.data[i].y !== undefined)
			{
				if(graphDiv.data[i].y.length > lineCount) {newLine += graphDiv.data[i].y[lineCount] + ","; }
				else { newLine += ","; }										
			}						
			
			if(graphDiv.data[i].z !== undefined)
			{
				if(graphDiv.data[i].z.length > lineCount) {newLine += graphDiv.data[i].z[lineCount] + ","; }
				else { newLine += ","; }	
			}			
		}
		outputString += newLine+"\n";
		lineCount ++;
	}
	
	
	currentTime = new Date().getTime();
	fileName = currentTime + ".csv";
	
	var blob = new Blob([outputString], {type: "text/plain;charset=utf-8"});
	saveAs(blob, fileName);
}
//Creates a header for the csv file
function createHeader(){
	var header = '';
	for(var i = 0; i < graphDiv.data.length; i ++)
	{
		if(graphDiv.data[i].x !== undefined) { header += graphDiv.data[i].name + "-x,"; }
		if(graphDiv.data[i].y !== undefined) { header += graphDiv.data[i].name + "-y,"; }
		if(graphDiv.data[i].z !== undefined) { header += graphDiv.data[i].name + "-z,"; }
	}
	return header +"\n";
}

 */
 
window.onresize = function() { Plotly.Plots.resize(graphDiv) };
 
 
 function addSavitzkyGolay(coord,plotName){
	var graphDiv = document.getElementById(coord);
	
	var index = 0;
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i; break; } }
	
	calculatedWindowSize = Math.floor(graphDiv.data[index].y.length*0.50);
	
	//The smallest allowable window size is 5 
	if(calculatedWindowSize < 5)
		calculatedWindowSize = 5;
	
	//Make sure the window size is odd
	if(calculatedWindowSize % 2 == 0)
		calculatedWindowSize ++;
	
	/*
	 * windowSize: The odd number of points to approximate the regression polynomial
	 * derivative: The grade of the derivative. 0 by default(Smoothing)
	 * polynomial: The order of the regression polynomial
	 */
	var options = {
				windowSize: calculatedWindowSize,
				derivative: 0,
				polynomial: 5
			};
	
	var newY = SavitzkyGolay(graphDiv.data[index].y,1,options);
		
	plotName = "SG_" + plotName;

	var data = {
		x: graphDiv.data[index].x, 
		y: newY, 
		mode: 'lines+markers',
		marker: { 
				symbol: markerTypes[0],
				color: markerColours[0],
				size:6,
				},
			name : plotName
	};
	
	Plotly.addTraces(coord, [data]);
	
	currentNumberofPlots ++;
			
	// Move used marker type to the end of the list
	markerTypes.push(markerTypes[0]);
	markerTypes.splice(0,1);	
	markerColours.push(markerColours[0]);
	markerColours.splice(0,1);
}
