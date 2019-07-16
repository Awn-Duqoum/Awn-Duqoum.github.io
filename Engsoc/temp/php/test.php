 <?php
//$command = $_GET["sqlCommand"];

$command  = 'SELECT NDI_Results_SerialNbr, NDI_Results_Details_Value ';
$command .= 'FROM NDI_Results U1 INNER JOIN NDI_Results_Details ON NDI_Results_ResultID = NDI_Results_Details_ResultsID ';
$command .= "WHERE (((NDI_Results_SerialNbr) Like 'P7') ";
$command .= "AND ((NDI_Results_Details_Label)='Maximum Peak') ";
$command .= "AND NDI_Results_CreatedDate > '01-01-2016'";
$command .= ");";
//$command .= "AND (NDI_Results_CreatedDate in (select max(NDI_Results_CreatedDate) from NDI_Results where NDI_Results_SerialNbr = U1.NDI_Results_SerialNbr )));";


/*
$command  = 'SELECT NDI_Results_SerialNbr, NDI_Results_Details_Value ';
$command .= 'FROM NDI_Results U1 INNER JOIN NDI_Results_Details ON NDI_Results_ResultID = NDI_Results_Details_ResultsID ';
$command .= "WHERE (((NDI_Results_SerialNbr) Like '%P9%') ";
$command .= "AND ((NDI_Results_Details_Label)='Vol.1.Psv.RMS') );";
*/
$serverName = "THORIN";
$connectionInfo = array( "Database"=>"HUGO", "UID"=>"readhugo", "PWD"=>"hugoread");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
    $server_info = sqlsrv_server_info( $conn);
    
	$stmt = sqlsrv_query($conn, $command);
                
	if( $stmt === false) {
    	die( print_r( sqlsrv_errors(), true));
    }
				
	$X = array();
	$Y = array();
				
	while( $line = sqlsrv_fetch_object ($stmt)) {
		echo $line->NDI_Results_SerialNbr."<br>";
	}

	$returnJSON = array("X"=>$X ,"Y"=>$Y );
	
	echo json_encode($returnJSON);
	
	sqlsrv_free_stmt( $stmt);
	sqlsrv_close( $conn );
	
} else {
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>