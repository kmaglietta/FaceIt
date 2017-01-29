<?php
$url = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";
$data = ["url" => "http://www.drodd.com/images15/face9.jpg"];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFEILDS, json_encode($data));
curl_setopt($ch, CURLPOT_HTTPHEADER,
  array('Content-Type: application/json','Ocp-Apim-Subscription-Key: a3e04d48ce244b59a583478dd998f5da')
);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
// var_dump($results);
?>
