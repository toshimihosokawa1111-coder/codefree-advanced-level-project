jQuery(function ($) {

  // ページトップボタンとお問い合わせボタン:ヘッダーの下端がFVの下端に触れたら表示
  $(window).on('scroll', function() {
    let scrollTop = $(this).scrollTop();
    let headerHeight = $('.p-header').outerHeight();
    let $fv = $('.p-fv, .c-page-fv, .c-breadcrumb');
    let targetTop = $fv.offset().top + $fv.outerHeight() - headerHeight;
    if (scrollTop >= targetTop) {
      $('.js-fixed-btn').addClass('is-show');
    } else {
      $('.js-fixed-btn').removeClass('is-show');
    }
  });

  // ページトップボタンのクリック
  $('.js-pagetop').on('click', function() {
    $('html, body').stop(true).animate({ scrollTop: 0 }, 300, 'swing');
    return false;
  });

  // ロゴクリックでトップへ
  $('.p-header__logo a, .p-footer__logo a').on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({ scrollTop: 0 }, 300, 'swing');
  });

  // ドロワーを閉じる(スクロール時)
  $(window).on('scroll', function() {
    if ($('.js-drawer').hasClass('is-open')) {
      $('.js-drawer').removeClass('is-open');
      $('.js-hamburger').removeClass('is-open');
      $('.js-hamburger').attr('aria-expanded', false);
      $('.js-drawer').attr('aria-hidden', true);
      $('.js-hamburger').attr('aria-label', 'メニューを開く');
    }
  });

  // Swiper
  const voiceSwiper = new Swiper(".p-voice__swiper", {
    loop: true,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 20,
    // 前後の矢印
    navigation: {
      nextEl: ".p-voice__next",
      prevEl: ".p-voice__prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },
  });

  // ハンバーガーメニュー単体の開閉
  $('.js-hamburger').on('click', function() {
    const isOpen = $('.js-drawer').toggleClass('is-open').hasClass('is-open');
    $(this).toggleClass('is-open');
    $(this).attr('aria-expanded', isOpen);
    $('.js-drawer').attr('aria-hidden', !isOpen);
    $(this).attr('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // アコーディオン
  $('.js-faq-button').on('click', function() {
    const $item = $(this);
    const isOpen = $item.toggleClass('is-open').hasClass('is-open');

    $item.find('.p-faq-item__panel').slideToggle(400);
    $item.find('.p-faq-item__button').attr('aria-expanded', isOpen);
  });

  // 表のスクロールバー(SP):スクロールに合わせて、つまみを動かす
  const $tableScroll = $('.p-plan-detail__scroll');
  const $thumb = $('.p-plan-detail__bar-thumb');

  if ($tableScroll.length) {
    $tableScroll.on('scroll', function() {
      const el = $tableScroll[0];
      const scrollable = el.scrollWidth - el.clientWidth;
      if (scrollable <= 0) return;

      const track = $('.p-plan-detail__bar-track').width() - $thumb.width();
      const left = (el.scrollLeft / scrollable) * track;

      $thumb.css('left', left + 'px');
    });
  }


});