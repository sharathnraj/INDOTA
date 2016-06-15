<?php
  $jsonurl = htmlspecialchars_decode($_POST['url'], ENT_NOQUOTES);
  $json = file_get_contents($jsonurl);

  $file = fopen('../json/' . $_POST['file'] . '.json', 'w');
  fwrite($file, $json);
  fclose($file);
?>