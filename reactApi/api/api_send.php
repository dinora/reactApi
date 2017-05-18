<?php
var messagebird = require('messagebird')('apK8p6emk55oaPy5UkPTzcouu');

$params= [];
$originator= $_POST['originator'];
$recipients= $_POST['recipients'];
$body= $_POST['body'];

$params = {
  'originator': $originator,
  'recipients': [
    $recipients
  ],
  'body': $body
};

die(json_encode($params));
