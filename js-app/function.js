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