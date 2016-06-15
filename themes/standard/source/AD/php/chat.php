<?php
  $myFile = "/data/chat.json";
  $fh = fopen($myFile, 'w');
  $stringData = $_POST["data"];
  fwrite($fh, $stringData);
  fclose($fh);
?>