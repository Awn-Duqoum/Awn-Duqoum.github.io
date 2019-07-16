var ReferanceMarkerTypes = ["circle","diamond","square","triangle-right","circle-open","circle-dot","circle-open-dot","square-open","square-dot","square-open-dot","diamond-open","diamond-dot","diamond-open-dot","cross","cross-open","cross-dot","cross-open-dot","x","x-open","x-dot","x-open-dot","triangle-up","triangle-up-open","triangle-up-dot","triangle-up-open-dot","triangle-down","triangle-down-open","triangle-down-dot","triangle-down-open-dot","triangle-left","triangle-left-open","triangle-left-dot","triangle-left-open-dot","triangle-right-open","triangle-right-dot","triangle-right-open-dot","triangle-ne","triangle-ne-open","triangle-ne-dot","triangle-ne-open-dot","triangle-se","triangle-se-open","triangle-se-dot","triangle-se-open-dot","triangle-sw","triangle-sw-open","triangle-sw-dot","triangle-sw-open-dot","triangle-nw","triangle-nw-open","triangle-nw-dot","triangle-nw-open-dot","pentagon","pentagon-open","pentagon-dot","pentagon-open-dot","hexagon","hexagon-open","hexagon-dot","hexagon-open-dot","hexagon2","hexagon2-open","hexagon2-dot","hexagon2-open-dot","octagon","octagon-open","octagon-dot","octagon-open-dot","star","star-open","star-dot","star-open-dot","hexagram","hexagram-open","hexagram-dot","hexagram-open-dot","star-triangle-up","star-triangle-up-open","star-triangle-up-dot","star-triangle-up-open-dot","star-triangle-down","star-triangle-down-open","star-triangle-down-dot","star-triangle-down-open-dot","star-square","star-square-open","star-square-dot","star-square-open-dot","star-diamond","star-diamond-open","star-diamond-dot","star-diamond-open-dot","diamond-tall","diamond-tall-open","diamond-tall-dot","diamond-tall-open-dot","diamond-wide","diamond-wide-open","diamond-wide-dot","diamond-wide-open-dot","hourglass","hourglass-open","bowtie","bowtie-open","circle-cross","circle-cross-open","circle-x","circle-x-open","square-cross","square-cross-open","square-x","square-x-open","diamond-cross","diamond-cross-open","diamond-x","diamond-x-open","cross-thin","cross-thin-open","x-thin","x-thin-open","asterisk","asterisk-open","hash-open","hash-dot","hash-open-dot","y-up","y-up-open","y-down","y-down-open","y-left","y-left-open","y-right","y-right-open"];
var markerTypes = ["circle","diamond","square","triangle-right","circle-open","circle-dot","circle-open-dot","square-open","square-dot","square-open-dot","diamond-open","diamond-dot","diamond-open-dot","cross","cross-open","cross-dot","cross-open-dot","x","x-open","x-dot","x-open-dot","triangle-up","triangle-up-open","triangle-up-dot","triangle-up-open-dot","triangle-down","triangle-down-open","triangle-down-dot","triangle-down-open-dot","triangle-left","triangle-left-open","triangle-left-dot","triangle-left-open-dot","triangle-right-open","triangle-right-dot","triangle-right-open-dot","triangle-ne","triangle-ne-open","triangle-ne-dot","triangle-ne-open-dot","triangle-se","triangle-se-open","triangle-se-dot","triangle-se-open-dot","triangle-sw","triangle-sw-open","triangle-sw-dot","triangle-sw-open-dot","triangle-nw","triangle-nw-open","triangle-nw-dot","triangle-nw-open-dot","pentagon","pentagon-open","pentagon-dot","pentagon-open-dot","hexagon","hexagon-open","hexagon-dot","hexagon-open-dot","hexagon2","hexagon2-open","hexagon2-dot","hexagon2-open-dot","octagon","octagon-open","octagon-dot","octagon-open-dot","star","star-open","star-dot","star-open-dot","hexagram","hexagram-open","hexagram-dot","hexagram-open-dot","star-triangle-up","star-triangle-up-open","star-triangle-up-dot","star-triangle-up-open-dot","star-triangle-down","star-triangle-down-open","star-triangle-down-dot","star-triangle-down-open-dot","star-square","star-square-open","star-square-dot","star-square-open-dot","star-diamond","star-diamond-open","star-diamond-dot","star-diamond-open-dot","diamond-tall","diamond-tall-open","diamond-tall-dot","diamond-tall-open-dot","diamond-wide","diamond-wide-open","diamond-wide-dot","diamond-wide-open-dot","hourglass","hourglass-open","bowtie","bowtie-open","circle-cross","circle-cross-open","circle-x","circle-x-open","square-cross","square-cross-open","square-x","square-x-open","diamond-cross","diamond-cross-open","diamond-x","diamond-x-open","cross-thin","cross-thin-open","x-thin","x-thin-open","asterisk","asterisk-open","hash-open","hash-dot","hash-open-dot","y-up","y-up-open","y-down","y-down-open","y-left","y-left-open","y-right","y-right-open"];
var ReferanceMarkerColours = ["Purple","Black","Brown","Pink","Green","Red","Blue","Orange"];
var markerColours = ["Purple","Black","Brown","Pink","Green","Red","Blue","Orange"];
var colourSchemes = ["Greys", "YlGnBu", "Greens", "YlOrRd", "Bluered", "RdBu", "Reds", "Blues", "Picnic", "Rainbow", "Portland", "Jet", "Hot", "Blackbody", "Earth", "Electric", "Viridis"];
var modes = ['markers','lines','lines+markers'];
var scaleModes = ['colour','size','size+colour','vector'];
var currentNumberofPlots = 0;

//Array that keeps track of the custom plots that are plotted
var customPlots = [];

//Array that keeps track of the custom #D plots that are plotted
var custom3DPlots = [];

//Array that keeps track of the external plots that are plotted
var externalPlots = [];

//Array that keeps track of the all plots that are plotted
var plots = [];

//Arrays that track the users selected points
var selectedX = [];
var selectedY = [];

//Variables to hold all information about an external plot
var externalPlotScalingMethodIndex = 0;
var externalPlotColourIndex = 0;
var externalPlotColourNames = [];
var externalPlotColour = [];

//The div that holds the graph
var graphDiv = document.getElementById('Graph');

//NDI Bad Float
var badFloat = -36973140000000000000000000000;

// Get the model
var model = document.getElementById('mymodel');
// Get the <span> element that closes the model
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the model
span.onclick = function() { model.style.display = "none"; }

// When the user clicks anywhere outside of the model, close it
window.onclick = function(event) { if (event.target == model) { model.style.display = "none"; } }

//Handles moving plots between selects
function pairSelects (){
	$('#avalibleTestSelect').pairMaster();
	$('#keyleft').click(function(){ $('#avalibleTestSelect').addSelected('#plottingTestSelect'); });
	$('#keyright').click(function(){ $('#plottingTestSelect').removeSelected('#avalibleTestSelect');  });
}

//Sets up date inputs if not chrome, and adds a blank grid
function initalSetup(){
	
	//Adds events to html elements
	setUpControls();
	
	//Test if browser is chrome
	var is_chrome = /chrome/i.test( navigator.userAgent );
	if(!is_chrome)
	{
		$(function() {
			$( "#dateBeforInput" ).datepicker({ dateFormat: 'yy-mm-dd'}); 
			$( "#dateAfterInput" ).datepicker({ dateFormat: 'yy-mm-dd'}); 
		});
	}
	
	var data = {
		x: [0,1,2,3,4], 
		y: [0,1,2,3,4], 
		type: 'scatter'
		};
		
	var layout = {
		legend: {x: 0,y: 1}, 
		margin:{t:10, r:10},
		title:'', 
		xaxis:{title:'X axis'}, 
		yaxis:{title:'Y axis'}
	}
	 
	var customControls = {
		modeBarButtonsToRemove:['sendDataToCloud'], 
		displaylogo: false,
		scrollZoom: true,
	}

	Plotly.newPlot('Graph', [data], layout, customControls );
	
	Plotly.deleteTraces('Graph', [0]);
	
	//displayTestIDs();
	
	$.ajax({
    type:    "GET",
    url:     "TestData.csv",
    success: function(text) {
        parseFile ("SampleFile", text)
    },
    error:   function() {
        // An error occurred
    }
	});
}

//Shows the add plot dialogue
function showAddPlotDialog (){ model.style.display = "block"; }

//Handles adding a plot from the hugo db
function addPlot () {
	var PlotName = "";
	model.style.display = "none";
	
	var cameraType = document.getElementById('CameraType');
	cameraType = cameraType.options[cameraType.selectedIndex].value;
	
	var testID = document.getElementById('testID');
	testID = testID.options[testID.selectedIndex].value;
	
	var Parameter = document.getElementById('plottingTestSelect');
	Parameter = Parameter.options; //Array
	var numberOfPlots = Parameter.length;
	
	var CustomPlot = document.getElementById('CustomPlot');
	
	if(CustomPlot.checked && !(numberOfPlots == 2 || numberOfPlots == 3)){
		alert("If custom plot is selected, you must provide 2 or 3 headers");
		return;
	}

	for(currentIndex = 0; currentIndex < numberOfPlots; currentIndex++)
	{
		PlotName = createPlotName(cameraType,Parameter[currentIndex].value);
		
		if(isin(plots,PlotName) == -1)
		{
			var axisNames = [];
			//Build string command
			if(CustomPlot.checked)
			{
				var sqlCommand = [];	
				for(var i = 0; i < numberOfPlots; i++)
				{
					sqlCommand.push(buildSQlString(cameraType,Parameter[i].value));
					axisNames.push(Parameter[i].value);
				}
				numberOfPlots = 1;
				customPlots.push(PlotName);
				if(sqlCommand.length == 3) { custom3DPlots.push(PlotName) };
			}
			else
				var sqlCommand = buildSQlString(cameraType,Parameter[currentIndex].value);		
			
			//Send Command to SQL and plot return vales
			getData(sqlCommand,PlotName,axisNames);
			
			//Add plot to the sidebar to allow for removal 
			addToSideBar( PlotName ); 
			
			//Update local table adding the new plot we just added
			plots.push(PlotName);
		}
	}
}

//Calls the hugo db and executes the sqlCommand passed 
function getData (sqlCommand,PlotName,Names){
	var pullByDate = document.getElementById("PlotByDate").checked;
	var CustomPlot = document.getElementById('CustomPlot').checked;
	
	if(CustomPlot)
	{
		if(sqlCommand.length == 2)
		{
			$.ajax({
				url: '/php/getData.php',
				type: 'get', 
				data: {sqlCommand:sqlCommand[0], date:pullByDate},
				dataType: 'json', 
				success: function(responseData0) {	
					$.ajax({
						url: '/php/getData.php',
						type: 'get', 
						data: {sqlCommand:sqlCommand[1], date:pullByDate},
						dataType: 'json', 
						success: function(responseData1) {
							var Response = [];
							var sortedX  = []; 
							var sortedY  = [];
							var emptyZ  = [];
							
							//if(responseData1.Y.length != responseData0.Y.length) { removeOrphanedPoints([responseData0,responseData1]); }
							
							if(custom3DPlots.length != 0){
								for(var i = 0; i < responseData0.Y.length; i ++) {emptyZ.push(0);};	
								custom3DPlots.push(PlotName);
							}
							
							//Sorting data
							for(var i = 0; i < responseData0.Y.length; i ++) {Response.push( [responseData0.Y[i],responseData1.Y[i]]); };
							Response.sort(function(a,b) { return a[0]-b[0] });
							for(var i = 0; i < Response.length; i ++) { sortedX.push(Response[i][0]);  sortedY.push(Response[i][1]);  };
							
							plot(PlotName,sortedX,sortedY,emptyZ,Names);
						}
					});
				}
			});
		}
		else if (sqlCommand.length == 3)
		{
			$.ajax({
				url: '/php/getData.php',
				type: 'get', 
				data: {sqlCommand:sqlCommand[0], date:pullByDate},
				dataType: 'json', 
				success: function(responseData0) {	
					$.ajax({
						url: '/php/getData.php',
						type: 'get', 
						data: {sqlCommand:sqlCommand[1], date:pullByDate},
						dataType: 'json', 
						success: function(responseData1) {	
							$.ajax({
								url: '/php/getData.php',
								type: 'get', 
								data: {sqlCommand:sqlCommand[2], date:pullByDate},
								dataType: 'json', 
								success: function(responseData2) {
									
									if(responseData1.Y.length != responseData0.Y.length || responseData0.Y.length != responseData2.Y.length || responseData1.Y.length != responseData2.Y.length) { 
										//removeOrphanedPoints([responseData0,responseData1,responseData2]); 
									}
									
									var Response = [];
									var sortedX  = []; 
									var sortedY  = [];
									var sortedZ  = [];
									
									for(var i = 0; i < responseData0.Y.length; i ++) {Response.push( [responseData0.Y[i],responseData1.Y[i],responseData2.Y[i]]); };
									Response.sort(function(a,b) { return a[0]-b[0] });
									for(var i = 0; i < Response.length; i ++) { sortedX.push(Response[i][0]);  sortedY.push(Response[i][1]); sortedZ.push(Response[i][2]); };
									
									plot(PlotName,sortedX,sortedY,sortedZ,Names);
								}
							});
						}
					});
				}
			});
		}
	} 
	else 
	{ 
		$.ajax({
			url: '/php/getData.php',
			type: 'get', 
			data: {sqlCommand:sqlCommand, date:pullByDate},
			dataType: 'json', 
			success: function(responseData) {	
				var emptyZ  = [];
				if(custom3DPlots.length != 0) for(var i = 0; i < responseData.Y.length; i ++) {emptyZ.push(0);};
				plot(PlotName,responseData.X,responseData.Y,emptyZ,Names);
			}
		});
	}
}

// Given data, plots it
function plot (PlotName,X,Y,Z,Names){
	if(Z.length > 0)
	{
		var emptyPlot = {
			x: X, 
			y: Y, 
			z: Z,
			mode: 'markers',
			type: 'scatter3d',
			marker: { 
					color: markerColours[0],
					symbol: markerTypes[0],
					size:6,
					},
			name : PlotName
			};
	}
	else
	{
		hoverInfo = [];
		for(var i = 0; i < X.length; i ++) { hoverInfo.push('(' +  X[i] + ',' + Y[i] + ')'); }		
		var emptyPlot = {
			x: X, 
			y: Y, 
			mode: 'markers',
			type: 'scatter',
			text: hoverInfo,
			marker: { 
					color: markerColours[0],
					symbol: markerTypes[0],
					size:6,
					},
			name : PlotName
			};
	}
	
	var data = [emptyPlot];
	if(currentNumberofPlots == 0){
		if(Names.length == 0)
			Plotly.newPlot('Graph', data,  {margin:{r:10},title:'', xaxis:{title:'X axis'}, yaxis:{title:'Y axis'},legend: {x:0,y:1}} , {modeBarButtonsToRemove:['sendDataToCloud'],displaylogo: false,scrollZoom: true});
		else if(Names.length == 2)
			Plotly.newPlot('Graph', data,  {margin:{r:10},title:'', xaxis:{title:Names[0]}, yaxis:{title:Names[1]},legend: {x:0,y:1}}, {modeBarButtonsToRemove:['sendDataToCloud'],displaylogo: false,scrollZoom: true});
		else
			Plotly.newPlot('Graph', data,  {margin:{r:10},title:'', xaxis:{title:Names[0]}, yaxis:{title:Names[1]}, zaxis:{title:Names[2]}, legend: {x:0,y:1}}, {modeBarButtonsToRemove:['sendDataToCloud'],displaylogo: false,scrollZoom: true});
		addListner();
	} else {
		Plotly.addTraces('Graph', data);
	}
	
	currentNumberofPlots ++;
	
	// Move used marker type to the end of the list
	markerTypes.push(markerTypes[0]);
	markerTypes.splice(0,1);	
	
	markerColours.push(markerColours[0]);
	markerColours.splice(0,1);
}

//Deletes a plot given its name
function removePlot(plotName) {
	for( i = 0; i < currentNumberofPlots; i ++)
	{	
		if (graphDiv.data[i].name == plotName) {
			Plotly.deleteTraces('Graph', [i]);
			currentNumberofPlots--;
		}
	}

	index = isin(plots,plotName);
	if(index != -1)
	{
		//Delete sidebar
		var element = document.getElementById(plotName);
		element.parentNode.removeChild(element);
		
		//Delete <hr>
		element = document.getElementById(plotName);
		element.parentNode.removeChild(element);
			
		//Clear plot from current plot names
		plots.splice(index,1);
	} 	
	
	index = isin(customPlots,plotName);
	if(index != -1) { customPlots.splice(index,1); }
	index = isin(custom3DPlots,plotName);
	if(index != -1) { custom3DPlots.splice(index,1); }
	
}

//Adds  a plot to the sidebar, adding edit options
function addToSideBar(plotName) {
	var displayString = String(plotName);
	
	if ( displayString.length > 70){
		displayString = displayString.substring(0,60) + "...";
	}
	
	//Grab current sidebar html
	var sideBarHtml = document.getElementById('Plots').innerHTML; 
	
	//Add to the current sidebar code to include the new plot 
	sideBarHtml += '<div class="Plot" id="' + plotName + '">';
	sideBarHtml += '<h5 class="PlotName">' + displayString + '</h5>';
	sideBarHtml += '<div class="Gear" onmouseover="showOptions(' + "'gear_" + plotName + "'" + ')"' + 'onmouseleave="hideOptions(' + "'gear_" + plotName + "'" + ')"></div>';
	sideBarHtml += '<div id="gear_'+plotName+'" onmouseover="showOptions(' + "'gear_" + plotName + "'" + ')" onmouseleave="hideOptions(' + "'gear_" + plotName + "'" + ')" style="display:none">';
	sideBarHtml += '<ul class="dropdown-menu dropdown-menu-sidebar" style="display:block;">';
	sideBarHtml += '<li><a onclick="removePlot(' + "'" + plotName + "'" + ')" href="#">Erase Plot</a></li>';
	sideBarHtml += '<li><a onclick="exportPlot(' + "'" + plotName + "'" + ')" href="#">Export Plot</a></li>';
	sideBarHtml += '<li><a onclick="generateReport(' + "'" + plotName + "'" + ')" ' + 'href="#">Export Stats</a></li>';
	sideBarHtml += '<li class="divider"></li>';
	
	if( isin(externalPlots,plotName) == -1)
	{
		sideBarHtml += '<li><a onclick="addMAvg(' + "'" + plotName + "'" + ')" ' + 'href="#">Add Moving Average</a></li>';
		
		if(custom3DPlots.length == 0)
			sideBarHtml += '<li><a onclick="addCSum(' + "'" + plotName + "'" + ')" ' + 'href="#">Add Cumulative Sum</a></li>';
		
		if(isin(customPlots,plotName) != -1)
			sideBarHtml += '<li><a onclick="addReg(' + "'" + plotName + "'" +')" ' + 'href="#">Fit Data - Polynomial</a></li>';

		sideBarHtml += '<li><a onclick="addSavitzkyGolay(' + "'" + plotName + "'" + ')" ' + 'href="#">Smooth Data</a></li>';
		sideBarHtml += '<li class="divider"></li>';

		sideBarHtml += '<li><span id="sideBarSpan">Marker style:</span><br><select id="sideBarSelect" onchange="changeMarkerStyle(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < ReferanceMarkerTypes.length;i++)
		{		
			sideBarHtml += '<option value="' + ReferanceMarkerTypes[i] + '">' + ReferanceMarkerTypes[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
		sideBarHtml += '<li><span id="sideBarSpan">Graph Type:</span><br><select id="sideBarSelect" onchange="changePlotMode(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < modes.length;i++)
		{		
			sideBarHtml += '<option value="' + modes[i] + '">' + modes[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
	
		sideBarHtml += '<li><span id="sideBarSpan">Marker Colour:</span><br><select id="sideBarSelect" onchange="changePlotColor(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < ReferanceMarkerColours.length;i++)
		{		
			sideBarHtml += '<option value="' + ReferanceMarkerColours[i] + '">' + ReferanceMarkerColours[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
	} 
	else 
	{
		sideBarHtml += '<li><span id="sideBarSpan">Marker style:</span><br><select id="sideBarSelect" onchange="changeMarkerStyle(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < ReferanceMarkerTypes.length;i++)
		{		
			sideBarHtml += '<option value="' + ReferanceMarkerTypes[i] + '">' + ReferanceMarkerTypes[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
		sideBarHtml += '<li><span id="sideBarSpan">Colour Scheme :</span><br><select id="sideBarSelect" onchange="changeColourScheme(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < colourSchemes.length;i++)
		{		
			sideBarHtml += '<option value="' + colourSchemes[i] + '">' + colourSchemes[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
		sideBarHtml += '<li><span id="sideBarSpan">Scale Parameter :</span><br><select id="sideBarSelect" onchange="switchExternalScale(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < scaleModes.length;i++)
		{		
			sideBarHtml += '<option value="' + scaleModes[i] + '">' + scaleModes[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
		sideBarHtml += '<li><span id="sideBarSpan">Varible :</span><br><select id="sideBarSelect" onchange="switchScaleVarible(' + "'" + plotName + "'" + ',this.selectedIndex)"><option></option>';
		for(var i = 0 ; i < externalPlotColourNames.length;i++)
		{		
			sideBarHtml += '<option value="' + externalPlotColourNames[i] + '">' + externalPlotColourNames[i] + '</option>';
		}
		sideBarHtml += '</select></li>';
		sideBarHtml += '<li class="divider"></li>';
		sideBarHtml += '<li><a onclick="rotate()" ' + 'href="#">Rotate</a></li>';
		sideBarHtml += '<li class="divider"></li>';
	}
	sideBarHtml += '<li><span id="sideBarSpan">Marker Size:</span><br>';
	sideBarHtml += '<button type="Button" id="sideBarSizeButton" onclick="changeMarkerSize(' + "'" + plotName + "'" + ', ' + "'-'" + ')"> - </button>';
	sideBarHtml += '<button type="Button" id="sideBarSizeButton" onclick="changeMarkerSize(' + "'" + plotName + "'" + ', ' + "'+'" + ')"> + </button></li>';
	
	sideBarHtml += '</ul>';
	sideBarHtml += '</div>';
	sideBarHtml += '</div>';
	sideBarHtml += '<hr class="sideBarDivider" id="' + plotName + '">';
	
	//Update sidebar with a new plot
	document.getElementById('Plots').innerHTML = sideBarHtml;
}

// Add/Removes an x axis slider to an existing plot
function addSlider(){
	if (typeof graphDiv.layout.xaxis.rangeslider === 'undefined') { graphDiv.layout.xaxis = {rangeslider: {}}; }
	else { graphDiv.layout.xaxis = {}; }
	
	Plotly.redraw(graphDiv);
}

//Changes marker size, either adding one or subtracting one depending on the sign passes
//sign = '+' to add 
//sign = '-' to subtract
function changeMarkerSize(plotName, sign){	
	var index = 0;
	for(var i = 0; i < currentNumberofPlots; i ++) { if(plotName == graphDiv.data[i].name){ index = i;  break; } }
	
	if( isin(externalPlots,plotName) != -1)
	{
		var cSize = graphDiv.data[index].marker.size;
		if (typeof cSize.length === 'undefined') {
			if(sign == '-'){cSize --;} 
			if(sign == '+'){cSize ++;} 
		}
		else{
			if(sign == '-'){ for(var i = 0; i < cSize.length;  i++) { cSize[i] = cSize[i] - 1; }} 
			if(sign == '+'){ for(var i = 0; i < cSize.length;  i++) { cSize[i] = cSize[i] + 1; }} 	
		}
	}
	else
	{
		var cSize = graphDiv.data[index].marker.size;
		if(sign == '-'){cSize --;} 
		if(sign == '+'){cSize ++;} 
	}
	
	graphDiv.data[index].marker.size = cSize;
	Plotly.redraw(graphDiv);
}

//Changes a plots marker style given the plots name and the index of the new style
function changeMarkerStyle(plotName, newStyle){
	newStyle --;
	if(newStyle == -1){return;}
	for(var i = 0; i < currentNumberofPlots; i ++)
	{
		if (graphDiv.data[i].name == plotName) {	
			graphDiv.data[i].marker.symbol = ReferanceMarkerTypes[newStyle];
			Plotly.redraw(graphDiv);
			return;
		}
	}
}

//Changes a plots display mode given the plots name and the index of the new mode
function changePlotMode(plotName, newMode){
	newMode --;
	if(newMode == -1){return;}
	for(var i = 0; i < currentNumberofPlots; i ++)
	{
		if (graphDiv.data[i].name == plotName) {
			graphDiv.data[i].mode = modes[newMode];
			Plotly.redraw(graphDiv);
		}
	}
}

//Changes a plots colour given the plots name and the index of the new colour
function changePlotColor(plotName, newColour){
	newColour --;
	if(newColour == -1){return;}
	for(var i = 0; i < currentNumberofPlots; i ++)
	{
		if (graphDiv.data[i].name == plotName) {
			graphDiv.data[i].marker.color = ReferanceMarkerColours[newColour];
			Plotly.redraw(graphDiv);
		}
	}
}

//Changes a plots colour given the plots name and the index of the new colour
function changeColourScheme(plotName, newColour){
	newColour --;
	if(newColour == -1){return;}
	for(var i = 0; i < currentNumberofPlots; i ++)
	{
		if (graphDiv.data[i].name == plotName) {
			graphDiv.data[i].marker.colorscale = colourSchemes[newColour];
			Plotly.redraw(graphDiv);
		}
	}
}

//Displays plots edit options
function showOptions(id){
	var sideMenu = document.getElementById(id);
	sideMenu.style.display="Block";
}

//Hides plots edit options
function hideOptions(id){
	var sideMenu = document.getElementById(id);
	sideMenu.style.display="None";
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
	
	var plotAllChar = document.getElementById("Checkbox_All");
	var limitDate = document.getElementById("DateLimit");
	var CustomDate = document.getElementById("PullCustomDate");
	
	var RangeDate = document.getElementById("dateByRange");
	var AfterDate = document.getElementById("dateAfter");
	
	if(CustomDate.checked){
		var date = new Date(document.getElementById("dateBeforInput").value);
		if(RangeDate.checked)
		{
			var aDate = new Date(document.getElementById("dateAfterInput").value);
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var year = date.getFullYear();
			
			var Bmonth = aDate.getMonth() + 1;
			var Bday = aDate.getDate();
			var Byear = aDate.getFullYear();
		} 
		else 
		{
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var year = date.getFullYear();
		}
	} else {
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear() - 1;
	}
	
	var pullByDate = document.getElementById("PlotByDate").checked;
	
	if(plotAllChar.checked) {
		var string = 'SELECT NDI_Results_SerialNbr, NDI_Results_CreatedDate, NDI_Results_Details_Value ';
			string += 'FROM NDI_Results INNER JOIN NDI_Results_Details ON NDI_Results_ResultID = NDI_Results_Details_ResultsID ';
			string += "WHERE (((NDI_Results_SerialNbr) Like '%" + cameraType + "%') AND ((NDI_Results_Details_Label)='" + Parameter + "'))";
			if(pullByDate){
				string += "ORDER BY NDI_Results_CreatedDate ASC;";
			}
			else{
				string += "ORDER BY NDI_Results_SerialNbr ASC;";
			}
			
	} else if (!CustomDate.checked && limitDate.checked) {
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
			if(pullByDate){
				string += "ORDER BY NDI_Results_CreatedDate ASC;";
			}
			else{
				string += "ORDER BY NDI_Results_SerialNbr ASC;";
			}
	} else if (CustomDate.checked){
		if(RangeDate.checked)
		{
			var string  = 'SELECT s1.NDI_Results_SerialNbr, s1.NDI_Results_CreatedDate, s1.NDI_Results_TestID, s3.NDI_Results_Details_Value ';
				string += 'FROM NDI_Results s1 ';
				string += 'inner join (select NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID, max(NDI_Results.NDI_Results_CreatedDate) NDI_Results_CreatedDate from NDI_Results group by NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID) s2 ';
				string += 'on s1.NDI_Results_CreatedDate = s2.NDI_Results_CreatedDate ';
				string += 'and s1.NDI_Results_SerialNbr = s2.NDI_Results_SerialNbr ';
				string += 'and s1.NDI_Results_TestID = s2.NDI_Results_TestID ';
				string += 'LEFT JOIN NDI_Results_Details s3 ON s1.NDI_Results_ResultID = s3.NDI_Results_Details_ResultsID ';
				string += "WHERE (((s1.NDI_Results_SerialNbr) LIKE '%" + cameraType + "%') ";
				string += "AND s1.NDI_Results_CreatedDate > CONVERT(varchar,'" + month + "/" + day + "/" + year + "',103) ";				
				string += "AND s1.NDI_Results_CreatedDate < CONVERT(varchar,'" + Bmonth + "/" + Bday + "/" + Byear + "',103) "; 
				string += "AND ((s3.NDI_Results_Details_Label)='" + Parameter + "')) ";
				if(pullByDate){
					string += "ORDER BY NDI_Results_CreatedDate ASC;";
				}
				else{
					string += "ORDER BY NDI_Results_SerialNbr ASC;";
				}
		} else if (AfterDate.checked)
		{
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
				if(pullByDate){
					string += "ORDER BY NDI_Results_CreatedDate ASC;";
				}
				else{
					string += "ORDER BY NDI_Results_SerialNbr ASC;";
				}
		} else
		{
			var string  = 'SELECT s1.NDI_Results_SerialNbr, s1.NDI_Results_CreatedDate, s1.NDI_Results_TestID, s3.NDI_Results_Details_Value ';
				string += 'FROM NDI_Results s1 ';
				string += 'inner join (select NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID, max(NDI_Results.NDI_Results_CreatedDate) NDI_Results_CreatedDate from NDI_Results group by NDI_Results.NDI_Results_SerialNbr, NDI_Results.NDI_Results_TestID) s2 ';
				string += 'on s1.NDI_Results_CreatedDate = s2.NDI_Results_CreatedDate ';
				string += 'and s1.NDI_Results_SerialNbr = s2.NDI_Results_SerialNbr ';
				string += 'and s1.NDI_Results_TestID = s2.NDI_Results_TestID ';
				string += 'LEFT JOIN NDI_Results_Details s3 ON s1.NDI_Results_ResultID = s3.NDI_Results_Details_ResultsID ';
				string += "WHERE (((s1.NDI_Results_SerialNbr) LIKE '%" + cameraType + "%') ";
				string += "AND s1.NDI_Results_CreatedDate < CONVERT(varchar,'" + month + "/" + day + "/" + year + "',103) "; 
				string += "AND ((s3.NDI_Results_Details_Label)='" + Parameter + "')) ";
				if(pullByDate){
					string += "ORDER BY NDI_Results_CreatedDate ASC;";
				}
				else{
					string += "ORDER BY NDI_Results_SerialNbr ASC;";
				}
		}
	} else {
		var string  = 'SELECT NDI_Results_SerialNbr, NDI_Results_CreatedDate, NDI_Results_Details_Value ';
			string += 'FROM NDI_Results U1 INNER JOIN NDI_Results_Details ON NDI_Results_ResultID = NDI_Results_Details_ResultsID ';
			string += "WHERE (((NDI_Results_SerialNbr) Like '%"+cameraType+"%') ";
			string += "AND ((NDI_Results_Details_Label)='"+Parameter+"')) ";
			//string += "AND NDI_Results_CreatedDate = (select max(NDI_Results_CreatedDate) from NDI_Results where NDI_Results_SerialNbr=U1.NDI_Results_SerialNbr ))";
			if(pullByDate){
				string += "ORDER BY NDI_Results_CreatedDate ASC;";
			}
			else{
				string += "ORDER BY NDI_Results_SerialNbr ASC;";
			}
	}
	return string;
}	

//Given a camera and a parameter, returns a plot name
function createPlotName(cameraType,Parameter){
	Parameter = Parameter.replace("\n","");
	Parameter = Parameter.replace("\r","");
	
	if(cameraType == "Spectra")       { return "P7_" + Parameter; }
	else if (cameraType == "AAK")     { return "AAK_" + Parameter; }
	else if (cameraType == "Vega")    { return "P9_" + Parameter; }
	else if (cameraType == "Vicra")   { return "P6_" + Parameter; }
	else if (cameraType == "Astra")   { return "P8_" + Parameter; }
	else if (cameraType == "Certus")  { return "C304_" + Parameter; }
	else if(cameraType == "Optotrak") { return "C306_" + Parameter; } 
	else { return Parameter; }
}

//Returns the index of an element in an array or -1 if the element was not found
function isin(arr,elem){
	for(var i = 0 ; i < arr.length;i++) { if(arr[i] == elem){ return i; } }
	return -1;
} 

//Calls the sever to retrieve test IDs
function displayTestIDs(){
	var cameraType = document.getElementById('CameraType');
	cameraType = cameraType.options[cameraType.selectedIndex].value;
	var fileName = "\\headers\\" + cameraType + "Tests.ini";
	
	var testID = document.getElementById('testID');
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			testID.innerHTML = xmlhttp.responseText;
			displayHeaders();
		}
	};

	xmlhttp.open("GET","php/readINI.php?fileName="+fileName,true);
	xmlhttp.send();
}

//Calls the sever to retrieve headers
function displayHeaders(){
	var cameraType = document.getElementById('CameraType');
	cameraType = cameraType.options[cameraType.selectedIndex].value;
	
	var testID = document.getElementById('testID');
	testID = testID.options[testID.selectedIndex].value.replace("/ ",'') ;
	
	var avalibleTestSelect = document.getElementById('avalibleTestSelect');
	var plottingTestSelect = document.getElementById('plottingTestSelect');
	
	var fileName = "\\headers\\" + cameraType + "\\" + testID + ".ini";
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			avalibleTestSelect.innerHTML = xmlhttp.responseText;
			// Clear all previous plots
			// TODO: allow for multi-test plotting
			plottingTestSelect.innerHTML = ""; 
			pairSelects();
		}
	};

	xmlhttp.open("GET","php/readTestFile.php?fileName="+fileName,true);
	xmlhttp.send();
}

//Moves plot between selects
function ChangeList(){
	if(document.activeElement == document.getElementById('avalibleTestSelect'))
		document.getElementById('keyleft').click();
	else
		document.getElementById('keyright').click(); 
}

//Edits the title of the plot or either of axis
function editTitle(selector){
	var title = prompt("What would you like the title to be?\n\nNote: Html is accepted", "");
	if (title != null) {
		var Graph = document.getElementById('Graph');
		if(selector =="X") {
			Graph.layout.xaxis.title = title;
		} else if(selector =="Y") {
			Graph.layout.yaxis.title = title;
		} else {
			Graph.layout.title = title;	
		}
		Plotly.redraw(Graph);
	}

}

//Clears plot
function purgePlot(){
	while(plots.length != 0) { removePlot(plots[0]); }
	exportPlots = [];
	custom3DPlots = [];
	customPlots = [];
	var Graph = document.getElementById('Graph');
	Plotly.purge(Graph);
	currentNumberofPlots=0;
}

//Listener for the delete button, this is where delete events are implemented
$("body").keyup(function(e){
    if(e.which == 46)
	{
		var offset = [];
		for(z = 0; z < currentNumberofPlots; z++){ offset.push(0); }
		for(j = 0; j < selectedY.length; j ++)
		{
			for(i = 0; i < currentNumberofPlots; i ++)
			{
				// We subtract j because the index was recorded with the 
				// full array and we are removing points from the left 
				// so the indexs go down by J
				if (graphDiv.data[i].y[selectedX[j] - offset[i]] == selectedY[j])
				{
					// Both x and y match this is the point we are removing
					// We cannot leave the loop yet because there might be 2 point over each other
					graphDiv.data[i].y.splice(selectedX[j] - offset[i],1);
					graphDiv.data[i].x.splice(selectedX[j] - offset[i],1);
					offset[i] ++;
				}
			}
		}
	}
	if(event.keyCode == 44) {  takeScreenshot (); }
	Plotly.redraw(graphDiv);
  });

//Implements ploty.js select functions
function addListner() {
	selectedX = [];
	selectedY = [];
	graphDiv.on('plotly_selected', function(data) {
	  //X is the x index of the point and not the value of X
	  data.points.forEach(function(pt) {
		selectedX.push(pt.pointNumber);
		selectedY.push(pt.y);
	  });
	  data=[];
	});
}

//Shows/hides the Date selection dialogue
function showDateDiv(){
	if(document.getElementById('PullCustomDate').checked)
		document.getElementById('DateSelectionDiv').style.display="Block";
	else 
		document.getElementById('DateSelectionDiv').style.display="None";
}

//Shows/hides the second date select box
function updateDateDiv(){
	if(document.getElementById('dateByRange').checked)
		document.getElementById('dateAfterInput').style.display="";		
	else 
		document.getElementById('dateAfterInput').style.display="None";
}

//Plots a moving average given a plot name
function addMAvg (plotName){
	var n = parseInt(prompt("Step?", "0"), 10);

	if(isNaN(n) || n <= 0) { return; }

	var index = 0;
	
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i; break; } }
	
	var newX = graphDiv.data[index].x.slice();
	newX.splice(0,n);
	
	var newY = movingAvg(graphDiv.data[index].y,n);
	
	plotName = "MAvg_" + plotName;
	
	if(isin(plots,plotName) == -1)
	{
		//Add plot to the sidebar to allow for removal 
		addToSideBar( plotName ); 
			
		//Update local table adding the new plot we just added
		plots.push(plotName);
		var emptyPlot = {
			x: newX, 
			y: newY, 
			mode: 'lines+markers',
			marker: { 
					symbol: markerTypes[0],
					color: markerColours[0],
					size:6,
					},
				name : plotName
			};
				
		var data = [emptyPlot];
		Plotly.addTraces('Graph', data);
		
		currentNumberofPlots ++;
				
		// Move used marker type to the end of the list
		markerTypes.push(markerTypes[0]);
		markerTypes.splice(0,1);	
		markerColours.push(markerColours[0]);
		markerColours.splice(0,1);
	}
}

//Returns an array of averages, Given an array and a step
function movingAvg(arr,n){
	// Return one point if step is too high
	if(arr.length<n){ return sum(arr)/arr.length; }
	
	tempArray = []; 
	newY = [];
	
	// Fill the original buffer with the first n points
	for(i = 0; i < n; i++){ tempArray.push(arr[i]); }

	for(i = n; i < arr.length; i++)
	{
		newY.push( sum(tempArray)/n );
		tempArray.push(arr[i]);
		tempArray.splice(0,1);
	}
	return newY;
}

//Returns the sum of an array
function sum(arr){
	var sum = 0;
	for(j = 0; j < arr.length; j++){ if(arr[j] !== undefined) { sum += parseFloat(arr[j]);} }
	return sum;
}

//Plots a smoothed version of a given plot using Savitzky-Golay filter
//method described in numeric recipes
function addSavitzkyGolay(plotName){
	var index = 0;
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i; break; } }
	
	calculatedWindowSize = Math.floor(graphDiv.data[index].y.length*0.25);
	
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
	
	if(isin(customPlots,plotName) != -1)
		var newX = SavitzkyGolay(graphDiv.data[index].x,1,options);
	else 
		var newX = graphDiv.data[index].x.slice();
	
	var newY = SavitzkyGolay(graphDiv.data[index].y,1,options);
		
	if(isin(custom3DPlots,plotName) != -1 ){ var newZ  = SavitzkyGolay(graphDiv.data[index].z,1,options); } 
		
	plotName = "SG_" + plotName;
	
	if(isin(plots,plotName) == -1)
	{
		//Add plot to the sidebar to allow for removal 
		addToSideBar( plotName ); 
			
		//Update local table adding the new plot we just added
		plots.push(plotName);
		
		if(custom3DPlots.length != 0){
			custom3DPlots.push(plotName); 
			var emptyPlot = {
				x: newX, 
				y: newY, 
				z: newZ,
				mode: 'markers',
				type: 'scatter3d',
				marker: { 
					color: markerColours[0],
					symbol: markerTypes[0],
					size:6,
					},
				name : plotName
				};
		} 
		else 
		{
			var emptyPlot = {
				x: newX, 
				y: newY, 
				mode: 'lines+markers',
				marker: { 
						symbol: markerTypes[0],
						color: markerColours[0],
						size:6,
						},
					name : plotName
				};
		}	
		var data = [emptyPlot];
		Plotly.addTraces('Graph', data);
		
		currentNumberofPlots ++;
				
		// Move used marker type to the end of the list
		markerTypes.push(markerTypes[0]);
		markerTypes.splice(0,1);	
		markerColours.push(markerColours[0]);
		markerColours.splice(0,1);
	}
}

//Plot a regression model given a plot's name 
function addReg(Plotname){
	var n = parseInt(prompt("Polynomial Degree?", "0"), 10);
	if(isNaN(n) || n <= 0) return;
	
	var data = []; 
	var x = []; 
	var y = []; 	
	var z = [];
	var hoverText ="";
	
	var index = 0;
	//Find plot index
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == Plotname) { index = i; break; } }
	for(var i = 0; i <graphDiv.data[index].x.length; i ++) { data.push([graphDiv.data[index].x[i],graphDiv.data[index].y[i]]); }
	
	Plotname =  "P"+n+"Reg-" + Plotname;
	var result = regression('polynomial', data,n);
	
	for(var i = 0; i <result.points.length; i ++) { x.push(result.points[i][0]); y.push(result.points[i][1]); }
	
	if(custom3DPlots.length != 0){ 
		hoverText += result.string + "<br>";
		custom3DPlots.push(Plotname); 
		data = [];
		for(var i = 0; i < graphDiv.data[index].x.length; i ++) { data.push([graphDiv.data[index].x[i], graphDiv.data[index].z[i]]); }
		var result = regression('polynomial', data,n);
		for(var i = 0; i <result.points.length; i ++) { z.push(result.points[i][1]);  }
		result.string = result.string.replace("y","z");
	};	
	
	//Plot regression 
	plot(Plotname,x,y,z,[]);
		
	//Add regression to the sidebar to allow for removal 
	addToSideBar( Plotname ); 
			
	//Update local table adding the new regression we just added
	plots.push(Plotname);
	
	hoverText += result.string + "<br>R=" + getCoeffOfDeter(graphDiv.data[index].y,y);
	
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == Plotname) { index = i; break; } }
	
	if(custom3DPlots.length == 0){ 
		var update = {
			mode: 'line',
			type: 'scatter',
			text: hoverText,
			};
		
		Plotly.restyle(graphDiv, update, index);
	} 
	else { Plotly.restyle(graphDiv, { text: hoverText }, index); }
}

//Given a 1-D array of numbers returns the Coefficient of determination
function getCoeffOfDeter(data,exp_data){
	var mean = sum(data)/data.length;
	
	//Calculating total sum of squares
	var totalSumofSquaresData = []; 
	for(var i = 0; i< data.length; i++) { if(data[i] !== undefined) { totalSumofSquaresData.push(Math.pow(data[i]-mean,2)); } }
	var totalSumofSquares = sum(totalSumofSquaresData);

	//Calculating total sum of squares of residuals
	var squareSumofResidualsData = []; 
	for(var i = 0; i< data.length; i++) { if(data[i] !== undefined && exp_data[i] !== undefined) {squareSumofResidualsData.push(Math.pow(data[i]-exp_data[i],2)); }} 
	var squareSumofResiduals = sum(squareSumofResidualsData);
	
	//Calculating the Coefficient	
	return ( 1 - squareSumofResiduals/totalSumofSquares);
}

//Cleans up point that do not appear in all axis 
function removeOrphanedPoints (arr){
	var index; 
	var index2;
	
	if(arr.length == 2){
		//Pass one, remove all points that are in arr[0] and not in arr[1]
		for( var i = 0; i < arr[0].X.length; i++){
			index = isin(arr[1].X,arr[0].X[i]);
			if(index == -1) { arr[0].X.splice(i,1); arr[0].Y.splice(i,1); i --; }
		}
		
		//Pass two, remove all points that are in arr[1] and not in arr[0]
		for( var i = 0; i < arr[1].X.length; i++){
			index = isin(arr[0].X,arr[1].X[i]);
			if(index != -1) { arr[1].X.splice(i,1); arr[1].Y.splice(i,1); i --; }
		}
	} 
	else if (arr.length == 3){
		//Remove all points from arr[0] that are unique to it
		for( var i = 0; i < arr[0].X.length; i++){
			index = isin( arr[1].X, arr[0].X[i] );
			index2 = isin( arr[2].X, arr[0].X[i] );
			if(index == -1 || index2 == -1) { arr[0].X.splice(i,1); arr[0].Y.splice(i,1); i --; }
		}
		
		//Remove all points from arr[1] that are unique to it
		for( var i = 0; i < arr[1].X.length; i++){
			index = isin( arr[0].X, arr[1].X[i] );
			index2 = isin( arr[2].X, arr[1].X[i] );
			if(index == -1 || index2 == -1) { arr[1].X.splice(i,1); arr[1].Y.splice(i,1); i --; }
		}
		
		//Remove all points from arr[1] that are unique to it
		for( var i = 0; i < arr[2].X.length; i++){
			index = isin( arr[0].X, arr[2].X[i] );
			index2 = isin( arr[1].X, arr[2].X[i] );
			if(index == -1 || index2 == -1) { arr[2].X.splice(i,1);  arr[2].Y.splice(i,1); i --; }
		}
	}
	
}

//Drop event section

//Need to prevent default events from occurring, they could be unpredictable and interface with
//the file transfer
$('#Graph').on( 'dragover' , function(e) {e.preventDefault(); e.stopPropagation();})
$('#Graph').on( 'dragenter', function(e) {e.preventDefault(); e.stopPropagation();})

$('#Graph').on('drop', function(e){
        if(e.originalEvent.dataTransfer){
            if(e.originalEvent.dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                upload(e.originalEvent.dataTransfer.files);
            }   
        }
    });

//Reads the file that was dropped into the graphing area
function upload(files){ 
	var readers = [];
	for( var i = 0; i < files.length; i ++)
	{
		var counter = i; 
		readers.push( new FileReader() );
		readers[i].readAsText(files[i]);
		readers[i].addEventListener("load", function () { parseFile(files[counter].name,readers[counter].result); }, false);
	}
}

//Parses a dropped file and plots the data
function parseFile(name, data){
	if(name.indexOf('FitPosAct') !== -1 || name.indexOf('FitPosPsv') !== -1 || name.indexOf('Fit_3D_') !== -1) {
		purgePlot();
		
		data = data.split('\n');
		
		var X = [];
		var Y = [];
		var Z = [];

		externalPlotColourNames = ["X Error","Y Error","Z Error","R Error","LineSep","X Unc","Y Unc","Z Unc","R Unc"]
		
		for(var j = 0; j < externalPlotColourNames.length; j++) { externalPlotColour.push([]); }
		
		for(var i = 2; i < data.length; i ++)
		{
			line = data[i].split(',');
			if(line[5] > badFloat && line[6] > badFloat && line[8] > badFloat) 	
			{
				X.push( parseFloat(line[2]) );
				Y.push( parseFloat(line[3]) );
				Z.push( parseFloat(line[4]) );
				
				externalPlotColour[0].push( line[2] - line[5] );
				externalPlotColour[1].push( line[3] - line[6] );
				externalPlotColour[2].push( line[4] - line[7] );
				externalPlotColour[3].push( Math.sqrt( Math.pow(line[2] - line[5],2) + Math.pow(line[3] - line[6],2) +  Math.pow(line[4] - line[7],2) ));
				
				externalPlotColour[4].push( line[8] );
				
				externalPlotColour[5].push( line[9] );
				externalPlotColour[6].push( line[10] );
				externalPlotColour[7].push( line[11] );
				externalPlotColour[8].push( line[12] );
			}
		}	
		var emptyPlot = {
			x: X, 
			y: Y, 
			z: Z,
			mode: 'markers',
			type: 'scatter3d',
			marker: {
				opacity	: 1,
				symbol: markerTypes[0],
				color: externalPlotColour[3],
				colorscal: 'Rainbow',
				showscale: true,
				size : 6,
				},
			name : name			
			};
			
		var layout = {
			margin:{r:10},
			title:'',
			legend: {x:0,y:1},
			dragmode : 'orbit',
			scene:{
				yaxis:{ mirror:'true', },
				aspectmode:'manual',
				aspectratio: { x:1, y:1, z:1, },
				camera:{ eye:{ x:0, y:0, z:1, } }
			}
		}
		var options = {
			modeBarButtonsToRemove:['sendDataToCloud'],
			displaylogo: false,
			scrollZoom: true,
		}
		
		Plotly.newPlot('Graph', [emptyPlot],  layout, options);
		
		externalPlots.push( name );
		plots.push( name );
		currentNumberofPlots++;
		
		//Add plot to the sidebar to allow for removal 
		addToSideBar( name ); 
		
		setPolarisView();
		externalPlotScalingMethodIndex = 1;
		externalPlotColourIndex = 3;
	}	
	if(name.indexOf('Fit_6D_') !== -1) {
		purgePlot();
		
		data = data.split('\n');
		
		var X = [];
		var Y = [];
		var Z = [];

		externalPlotColourNames = ["X Error","Y Error","Z Error","R Error","Fit Error"]
		
		for(var j = 0; j < externalPlotColourNames.length; j++) { externalPlotColour.push([]); }
		
		for(var i = 2; i < data.length; i ++)
		{
			line = data[i].split(',');
			if(line[5] > badFloat && line[6] > badFloat && line[8] > badFloat) 	
			{
				X.push( parseFloat(line[1]) );
				Y.push( parseFloat(line[2]) );
				Z.push( parseFloat(line[3]) );
				
				externalPlotColour[0].push( line[1] - line[4] );
				externalPlotColour[1].push( line[2] - line[5] );
				externalPlotColour[2].push( line[3] - line[6] );
				externalPlotColour[3].push( Math.sqrt( Math.pow(line[1] - line[4],2) + Math.pow(line[2] - line[5],2) +  Math.pow(line[3] - line[6],2) ));
				
				externalPlotColour[4].push( line[10] );
			}
		}	
		var emptyPlot = {
			x: X, 
			y: Y, 
			z: Z,
			mode: 'markers',
			type: 'scatter3d',
			marker: {
				opacity	: 1,
				symbol: markerTypes[0],
				color: externalPlotColour[3],
				colorscal: 'Rainbow',
				showscale: true,
				size : 6,
				},
			name : name			
			};
			
		var layout = {
			margin:{r:10},
			title:'',
			legend: {x:0,y:1},
			dragmode : 'orbit',
			scene:{
				yaxis:{ mirror:'true', },
				aspectmode:'manual',
				aspectratio: { x:1, y:1, z:1, },
				camera:{ eye:{ x:0, y:0, z:1, } }
			}
		}
		var options = {
			modeBarButtonsToRemove:['sendDataToCloud'],
			displaylogo: false,
			scrollZoom: true,
		}
		
		Plotly.newPlot('Graph', [emptyPlot],  layout, options);
		
		externalPlots.push( name );
		plots.push( name );
		currentNumberofPlots++;
		
		//Add plot to the sidebar to allow for removal 
		addToSideBar( name ); 
		
		setPolarisView();
		externalPlotScalingMethodIndex = 1;
		externalPlotColourIndex = 3;
	}	
	else {
		// We do not know how the file looks like 
		// If it only has 2 column then we should assume its X - Y scatter plot
		// If it only has 3 columns then we should assume its X - Y - Z 3D scatter plot
		// If it only has more than 3 columns then we should assume 
		// its X - Y - Z 3D scatter plot with other parameter like the fit files above 
		// This should all be replace with a dialogue, but running out of time so TODO ?
		
		
		//purgePlot();
		
		data = data.split('\n');
		
		var X = [];
		var Y = [];
		var Z = [];
		var Z2 = [];

		//Can be replaced with a dialogue 
		var headerLength = data[0].split(',').length;
		
		// Hard coded for now, a dialogue should let the user tell the software 
		var headerLines = 1;
		
		var headerNames = [];
		
		// File not in a format we can work with 
		// Dialogue should be able to handle different delimiter char 
		if(headerLength == 0){ return; } 
		
		if ( headerLength > 3 ) {
			
			for(var j = 0; j < headerLength - 3; j++) { 
				externalPlotColourNames.push( data[0].split(',')[j + 3] );
				externalPlotColour.push([]); 
			}
		}
		
		for(var j = 0; j < headerLength; j++) { headerNames.push( data[0].split(',')[j] ); }
		
		for(var i = headerLines; i < data.length; i ++)
		{
			line = data[i].split(',');

			if(headerLength == 1) { X.push( parseFloat( i ) ); Y.push( parseFloat( line[0] ) ); }
			if(headerLength != 1) { X.push( parseFloat( line[0]) ); Y.push( parseFloat( line[1] ) ); } 
			if(headerLength == 3) {	Z.push( parseFloat( line[2]) ); }	
			if( headerLength > 3) { Z2.push( parseFloat( line[3]) ); }
		}
	
		if ( headerLength == 1)
		{
			var emptyPlot = {
			x: X, 
			y: Y, 
			mode: 'markers',
			type: 'scatter',
			marker: {
				color: markerColours[0],
				symbol: markerTypes[0],
				size : 6,
				},
			name : name	
			};
			var layout = {
				margin:{r:10},
				title:name,
				legend: {x:0,y:1},
				xaxis:{title:'Index'},
				yaxis:{title: headerNames[0] },
			}
		}
		else if ( headerLength == 2 )
		{
			var emptyPlot = {
			x: X, 
			y: Y, 
			z: Z,
			mode: 'markers',
			type: 'scatter',
			marker: {
				color: markerColours[0],
				symbol: markerTypes[0],
				size : 6,
				},
			name : name			
			};
			var layout = {
				margin:{r:10},
				title:name,
				legend: {x:0,y:1},
				xaxis:{title: headerNames[0]},
				yaxis:{title: headerNames[1]},
			}
		}
		else if( headerLength == 3 )
		{
			var emptyPlot = {
				x: X, 
				y: Y, 
				z: Z,
				mode: 'markers',
				type: 'scatter3d',
				marker: {
					opacity	: 1,
					symbol: markerTypes[0],
					size : 6,
					},
				name : name		
				};
		} 		
		else if ( headerLength > 3)
		{
			var DZ = [];
			for(var j = 0; j < Z2.length; j++)  { DZ.push(Z2); }
			
			var emptyPlot = {
			x: X, 
			y: Y, 
			z: DZ,
			mode: 'markers',
			type: 'surface',
			name : name			
			};
		}
		
		if(headerLength >= 3)
		{
			var layout = {
				margin:{r:10},
				title:name,
				legend: {x:0,y:1},
				dragmode : 'orbit',
				scene:{
					yaxis:{ mirror:'true', },
					aspectmode:'manual',
					aspectratio: { x:1, y:1, z:1, },
					camera:{ eye:{ x:0, y:0, z:1, } }
				},
				xaxis:{title: headerNames[0]},
				yaxis:{title: headerNames[1]},
				zaxis:{title: headerNames[2]},
			}
		} 
		
		var options = {
			modeBarButtonsToRemove:['sendDataToCloud'],
			displaylogo: false,
			scrollZoom: true,
		}
	
	
	if(graphDiv.data !== undefined)
	{
		Plotly.addTraces('Graph', [emptyPlot]);
	}
	else 
		Plotly.newPlot('Graph', [emptyPlot],  layout, options);
		
		externalPlots.push( name );
		plots.push( name );
		currentNumberofPlots++;
		
		//Add plot to the sidebar to allow for removal 
		addToSideBar( name ); 			
		if(headerLength >= 3) { setPolarisView(); }
	}
}

//Changes the variable that is being plotted ( ex. X error, R error, etc...) 
function switchScaleVarible ( plotName, variIndex ){
	variIndex --;
	if(variIndex == -1){return;}
	externalPlotColourIndex = variIndex;
	switchExternalScale(plotName, externalPlotScalingMethodIndex);
}

//Changes the method in which the parameter is being show, i.e scaling with size 
//vs scaling with colour
function switchExternalScale ( plotName, scaleModeIndex ){
	scaleModeIndex --;
	if(scaleModeIndex == -1){return;}
	
	externalPlotScalingMethodIndex = scaleModeIndex + 1;
	
	var index; 
	for(var i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i;  break; } }
	
	scaleMode = scaleModes[scaleModeIndex];
	
	if(scaleMode == 'colour'){
		graphDiv.data[index].marker.color = externalPlotColour[externalPlotColourIndex];
		graphDiv.data[index].marker.size = 6;
		graphDiv.data[index].marker.showscale = true;
		Plotly.redraw(graphDiv);
		
	} else if(scaleMode == 'size'){
		var newSize = [];
		for(var i = 0; i < externalPlotColour[externalPlotColourIndex].length; i ++) { 
			newSize.push(externalPlotColour[externalPlotColourIndex][i] * 250); 
		}
		graphDiv.data[index].marker.color = 'black';
		graphDiv.data[index].marker.size = newSize;
		graphDiv.data[index].marker.showscale = false;
		Plotly.redraw(graphDiv);
	}
	 else if(scaleMode == 'size+colour'){
		graphDiv.data[index].marker.color = externalPlotColour[externalPlotColourIndex];
		var newSize = [];
		for(var i = 0; i < externalPlotColour[externalPlotColourIndex].length; i ++) { 
			newSize.push(externalPlotColour[externalPlotColourIndex][i] * 250); 
		}
		graphDiv.data[index].marker.size = newSize;
		graphDiv.data[index].marker.showscale = true;
		Plotly.redraw(graphDiv);
	}
	 else if(scaleMode == 'vector'){
		alert("To do add vector plotting");
	}
	
}

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

//Exports all plots into a single file
function exportData(){
	
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

//Rotates a 3D plot
function rotate() {
	var scene = graphDiv._fullLayout.scene._scene;
	var camera = scene.getCamera();
	var X = parseFloat(prompt("X?", "0"), 10);
	var Y = parseFloat(prompt("Y?", "0"), 10);
	var Z = parseFloat(prompt("Z?", "0"), 10);
	camera.eye  = {x:X,y:Y,z:Z};
	scene.setCamera(camera);
}

//Sets the 'standard' view
function setPolarisView (){	
	var scene = graphDiv._fullLayout.scene._scene;
	var camera = scene.getCamera();
	camera.eye  = {x:-1.75,y:0,z:0,};
	scene.setCamera(camera);
}

// Start of controls section 
// In order to keep the html clean of JS,  all controls are added on page load
 function setUpControls (){
	$('#titlebar-menu-erasePlots').click(function(){ purgePlot(); return false; });
	$('#titlebar-menu-editPlotTitle').click(function(){ editTitle('Plot'); return false; });
	$('#titlebar-menu-editXAxisTitle').click(function(){ editTitle('X'); return false; });
	$('#titlebar-menu-editYAxisTitle').click(function(){ editTitle('Y'); return false; });
	$('#titlebar-menu-exportData').click(function(){ exportData(); return false; });		
	$('#titlebar-menu-exportPlots').click(function(){ exportPlots(); return false; });
	$('#titlebar-menu-toggleXSlider').click(function(){ addSlider(); return false; });
	$('#AddPlotBtn').click(function(){ showAddPlotDialog(); });	
	
	$('#PullCustomDate').change(function(){ showDateDiv(); });
	$('#dateByRange').change(function(){ updateDateDiv(); });
	$('#dateBefore').change(function(){ updateDateDiv(); });
	$('#dateAfter').change(function(){ updateDateDiv(); });
	
	$('#add-plot-button').click(function(){ addPlot(); });
	
 }
 
 window.onresize = function() { Plotly.Plots.resize(graphDiv) };
 
 
 
function createCSum(arr)
{
	if(arr.length <= 0) return;

	var mean = sum(arr)/arr.length;
	var CSum = [arr[0] - mean];
	
	for(var i = 1; i < arr.length; i++){ CSum.push( CSum[i-1] + (arr[i] - mean )); }
	return CSum;
}
 
 //Plots a a cumulative sum  given a plot name
function addCSum (plotName){
	var index = 0;
	
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i; break; } }
	
	var newX = graphDiv.data[index].x.slice();
	var newY = createCSum(graphDiv.data[index].y);
	
	plotName = "CAvg_" + plotName;
	
	if(isin(plots,plotName) == -1)
	{
		//Add plot to the sidebar to allow for removal 
		addToSideBar( plotName ); 
			
		//Update local table adding the new plot we just added
		plots.push(plotName);
		var emptyPlot = {
			x: newX, 
			y: newY, 
			mode: 'lines+markers',
			marker: { 
					symbol: markerTypes[0],
					color: markerColours[0],
					size:6,
					},
				name : plotName
			};
				
		var data = [emptyPlot];
		Plotly.addTraces('Graph', data);
		
		currentNumberofPlots ++;
				
		// Move used marker type to the end of the list
		markerTypes.push(markerTypes[0]);
		markerTypes.splice(0,1);	
		markerColours.push(markerColours[0]);
		markerColours.splice(0,1);
	}
}
 
//Calculates the median of an array
function Median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

//Calculates the Standard Deviation of an array 
function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){ var diff = value - avg; var sqrDiff = diff * diff; return sqrDiff; });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

//Returns the average of an array
function average(data){
  var sum = data.reduce(function(sum, value){ return sum + value; }, 0);
  var avg = sum / data.length;
  return avg;
}

//Returns a root mean squared of an array 
function RMS (arr)
{
	var squaredArray = [];
	for( var i = 0; i < arr.length; i++) { squaredArray.push( Math.pow(arr[i],2)); }
	return Math.sqrt( sum(squaredArray) );
}

// Returns the value at a given percentile in a sorted numeric array.
// "Linear interpolation between closest ranks" method
function percentile(arr, p) {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    var index = arr.length * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}

 
 //Creates and downloads a report
function generateReport ( plotName )
 {
	for(i = 0; i < currentNumberofPlots; i ++) { if(graphDiv.data[i].name == plotName) { index = i; break; } }
	
	var arr = graphDiv.data[index].y.slice();
	if( arr.length <= 0) return;
	
	var outputString = '';
	var max = Math.max(...arr);
	var min = Math.min(...arr);
	var mean = sum(arr);
	var average = sum(arr)/arr.length;
	var median = Median(arr);
	var rms = RMS(arr);
	var stdDiv = standardDeviation(arr);
	
	outputString += "Stats for : " + plotName + "\r\n";
	outputString += "Date      : " +  new Date().toJSON().split("T")[0] + "\r\n\r\n";
	
	outputString += "Number of points : " + arr.length + "\r\n\r\n";
	
	outputString += "Average : " + average + "\r\n";
	outputString += "Std-Div : " + stdDiv + "\r\n";
	outputString += "Median  : " + median + "\r\n";
	outputString += "Mean    : " + mean + "\r\n";
	outputString += "Max     : " + max + "\r\n";
	outputString += "Min     : " + min + "\r\n";
	outputString += "RMS     : " + rms + "\r\n\r\n";
	
	outputString += "99.5 Percentile : " + percentile(arr,0.995) + "\r\n";
	outputString += "95.0 Percentile : " + percentile(arr,0.95) + "\r\n";
	outputString += " 5.0 Percentile : " + percentile(arr,0.05) + "\r\n";
	outputString += " 0.5 Percentile : " + percentile(arr,0.005) + "\r\n";
	
	var blob = new Blob([outputString], {type: "text/plain;charset=utf-8"});
	saveAs(blob, plotName + "-Report.txt");
 }
 
 
 // TODO : Finish writing this function, bring up a dialog that lets the user 
 // pick which format and size they want
 function takeScreenshot ()
 {
	return;
	/*
    return Plotly.downloadImage(graphDiv,{
            filename: 'myspecialplot',
            format: 'png', //also can use 'jpeg', 'webp', 'svg'
            height: 1920,
            width: 1080
        });
	*/
 }
 
