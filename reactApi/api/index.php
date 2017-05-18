<?php
$data = [];
$name= $_GET['name'];
$des= $_GET['description'];

$data=[
	'name'=>$name,
	'des'=>$des
];

echo json_encode($data);
