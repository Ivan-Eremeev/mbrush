/*!
 *
 * Ivan Eremeev - 2019
 * Skype: ivan.eremeev_1
 * Telegram: IvanMessage
 * Email: ivan.frontcoder@gmail.com
 *
 */

// @prepros-append mailto-ajax.js

// Брэйкпоинты js
var	breakXl = 1400,
		breakLg = 1200,
		breakMd = 1025,
		breakSm = 769,
		breakXs = 500;

$(document).ready(function () {			

	// Отмена перехода по ссылкам
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	myMenu($('#menu'));
	
	// Модальное окно
	// Задать кнопке, по которой открывается окно класс ".modal-trigger" и атрибут "data-modal", с id окна.
	// Пример <button>(class="modal-trigger" data-modal="#modal-1")</button>
	modal();
	
});

// Мобильное меню
function myMenu(menu) {
	var menuBtn = $('#menu-btn')
			over = menu.find('.menu_over'),
			html = $('html');
	menuBtn.click(function () {
		html.toggleClass('lock');
		menu.toggleClass('open');
		menuBtn.toggleClass('is-active');
		over.click(function() {
			html.removeClass('lock');
			menu.removeClass('open');
			menuBtn.removeClass('is-active');
		});
		menu.find('a').click(function() {
			html.removeClass('lock');
			menu.removeClass('open');
			menuBtn.removeClass('is-active');
		});
	});	
};

// Модальное окно
function modal(modal) {
	$('.modal-trigger').on('click', function() {
		var $this = $(this),
				data = $this.data('modal'),
				thisModal = $(data);
		modalShow(thisModal);
	});
};
// Открытие модального окна
function modalShow(thisModal) {
	var html = $('html'),
			modalClose = thisModal.find($('.modal_close')),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			scrollbarWidth = windowsWidth - documentWidth;
	thisModal.show(0, function() {
		setTimeout(thisModal.addClass('open'),500);
	});
	html.addClass('lock').css('padding-right',scrollbarWidth);
	modalClose.on('click', function() {
		modalHide(thisModal);
	});
	thisModal.on('click', function(e) {
		if (thisModal.has(e.target).length === 0) {
			modalHide(thisModal);
		}
	});
};
// Закрытие модального окна
function modalHide(thisModal) {
	var html = $('html');
	thisModal.removeClass('open');
	thisModal.hide();
	html.removeClass('lock').css('padding-right',0);
};
// Простая проверка форм на заполненность и отправка аяксом
// function formSubmit() {
$("[type=submit]").on('click', function (e){ 
  e.preventDefault();
  // Заводим переменные
  // Ищем родительскую фору для того чтобы манипулировать элементами находящимися только внутри неё
  var form = $(this).closest('.form');
  // Запоминаем путь к php обработчику формы
  var url = form.attr('action');
  // Собираем все данные с полей формы для отправки
  var form_data = form.serialize();
  // Выбираем все поля
  var field = form.find('[required]');

  // Задаем количество пустых полей по умолчанию
  empty = 0;

  // Перебираем каждое обязательное поле
  field.each(function() {
    // Если поля пустые
    if ($(this).val() == "") {
      // Добавляем класс invalid
      $(this).parent().addClass('invalid');
      // Увеличиваем счеткик пустых полей
      empty++;
    // Если поля не пустые
    } else {
      // Убираем класс invalid
      $(this).removeClass('invalid');
      // Добавляем класс valid если необходимо для стилизации
      $(this).addClass('valid');
    }  
  });

  // Можно проверить пересчет пустых полей в консоли
  // console.log(empty);

  // Если пустых полей больше 0
  if (empty > 0) {
    // Останавливаем работу скрипта запрещая отправку формы
    return false;
  // Если пустых полей нет
  } else {        
    // Запускаем отправку формы без перезагрузки страницы
    $.ajax({
      // Используем переменные в параметрах для отправки формы
      url: url,
      type: "POST",
      dataType: "html",
      data: form_data,
      // При успешной отправке
      // В аргумент response(произвольное название) можно записать и видеть результат ответа сервера
      success: function (response) {
        console.log(response);
        // Дальше несколько вариантов
        // Открываем окно с сообщением
        // modalShow($('#success'));
        // Открываем какую то страницу. как правило так называемую "страницу спасибо"
        document.location.href = "success.html";
      },
      // При ошибке отправки
      error: function (response) {
        console.log(response);
        // Тоже что нибудь делаем
        // modalShow($('#error'));
        // Выводим в заготовленный блок какое то сообщение
        // $('#rezult').text('Проверте корректность заполнения полей формы.');
      }
    });
  }
});
// Убираем класс invalid при снятии фокуса если поле не пустое
$('[required]').on('blur', function() {
  if ($(this).val() != '') {
    $(this).parent().removeClass('invalid');
  }
});
// Если есть чекбокс с политикой можно отключать кнопку при снятом чекбоксе добавляя к кнопке атрибут disabled 
// $('.form__privacy input').on('change', function(event) {
//   event.preventDefault();
//   var btn = $(this).closest('.form').find('.btn');
//   if ($(this).prop('checked')) {
//     btn.removeAttr('disabled');
//     // console.log('checked');
//   } else {
//     btn.attr('disabled', true);
//   }
// });
