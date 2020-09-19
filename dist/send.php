<?php
if ((isset($_POST['name']) && $_POST['tel'] || $_POST['email'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
  $to = 'avs.smartix@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
  $subject = 'Заказ с mbrushprinter.ru';
  $message = '
  <html>
    <head>
      <title>Заказ MBrush</title>
    </head>
    <body>
      <p>Имя: ' . $_POST['name'] . '</p>
      <p>Телефон: ' . $_POST['tel'] . '</p>
      <p>Email: ' . $_POST['email'] . '</p>
    </body>
  </html>';
  $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
  $headers .= "From: mbrushprinter.ru <".$to.">\r\n"; //Наименование и почта отправителя
  if (mail($to, $subject, $message, $headers)) {
    echo 'success';
  } else {
    echo 'error';
  }
}?>
