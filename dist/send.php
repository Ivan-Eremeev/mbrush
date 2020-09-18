<?php
if ((isset($_POST['name']) || $_POST['tel'] || $_POST['email'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
  $to = 'ivan.eremeev@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
  $subject = ''.$_POST['subject'].'';
  $message = '
  <html>
    <head>
      <title>' . $subject . '</title>
    </head>
    <body>
      <p>Имя: ' . $_POST['name'] . '</p>
      <p>Телефон: ' . $_POST['tel'] . '</p>
      <p>Email: ' . $_POST['email'] . '</p>
    </body>
  </html>';
  $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
  $headers .= "From: Отправитель <".$to.">\r\n"; //Наименование и почта отправителя
  if (mail($to, $subject, $message, $headers)) {
    echo 'success';
  } else {
    echo 'error';
  }
}?>
