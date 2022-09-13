// ローディング判定
jQuery(window).on("load", function () {
	jQuery("body").attr("data-loading", "true");
});


// スクロール判定
jQuery(window).on("scroll", function () {
	if (100 < jQuery(this).scrollTop()) {
		jQuery("body").attr("data-scroll", "true");
		jQuery(".js-header").addClass("is-scroll");
	} else {
		jQuery("body").attr("data-scroll", "false");
		jQuery(".js-header").removeClass("is-scroll");
	}
});

//375px 未満は JS で viewport を固定する
(function () {
	const viewport = document.querySelector('meta[name="viewport"]');

	function switchViewport() {
		const value =
			window.outerWidth > 375 ?
			"width=device-width,initial-scale=1" :
			"width=375";
		if (viewport.getAttribute("content") !== value) {
			viewport.setAttribute("content", value);
		}
	}
	addEventListener("resize", switchViewport, false);
	switchViewport();
})();

//スクロールアニメーション
jQuery.fn.acs = function (options) {
	const elements = this;
	const defaults = {
		screenPos: 0.9,
		className: "is-animated",
	};
	const setting = jQuery.extend(defaults, options);
	jQuery(window).on("load scroll", function () {
		add_class_in_scrolling();
	});

	function add_class_in_scrolling() {
		const winScroll = jQuery(window).scrollTop();
		const winHeight = jQuery(window).height();
		const scrollPos = winScroll + winHeight * setting.screenPos;

		if (elements.offset().top < scrollPos) {
			elements.addClass(setting.className);
		}
	}
};
jQuery('.anm, [class*="anm-"]').each(function () {
	jQuery(this).acs();
});
jQuery.fn.anmDelay = function (options) {
	const elements = this;
	const defaults = {
		delay: 0.2,
		property: "animation-delay",
	};
	const setting = jQuery.extend(defaults, options);
	const index = elements.index();
	const time = index * setting.delay;
	elements.css(setting.property, time + "s");
};

// スムーススクロール
jQuery("a[href^=\"#\"]").click(function () {
	let header = jQuery(".js-header").innerHeight();
	let speed = 300;
	let id = jQuery(this).attr("href");
	let target = jQuery("#" == id ? "html" : id);
	let position = jQuery(target).offset().top - header;
	if ("fixed" !== jQuery(".js-header").css("position")) {
		position = jQuery(target).offset().top;
	}
	if (0 > position) {
		position = 0;
	}
	jQuery("html, body").animate({
			scrollTop: position,
		},
		speed
	);
	return false;
});

// ハンバーガーメニュー
jQuery(".js-btn-drawer").click(function () {
	jQuery(".js-btn-drawer").toggleClass("is-open");
	jQuery(".js-contents-drawer, .p-drawer__bg").toggleClass("is-open");
	jQuery("html").toggleClass("is-fixed");
});
jQuery(".js-contents-drawer li a").click(function () {
	jQuery(".js-drawer-button").trigger("click");
});

// フォーカスを移動をハンバーガーメニュー内に限定
jQuery('.js-focus-trap').focus(function () {
	jQuery('.js-btn-drawer').focus();
});

//トップへ戻るスクロール検知
jQuery(window).on("scroll", function () {
	if (400 < jQuery(this).scrollTop()) {
		jQuery(".js-top").addClass("is-show");
	} else {
		jQuery(".js-top").removeClass("is-show");
	}
});
