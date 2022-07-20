'use strict';
var WEBSITE = (function () {
  var d = {},
    a = {},
    t = {},
    i = {},
    o = {},
    n = {},
    e = {},
    r = {},
    s = {},
    l = CustomEase.create('custom', 'M0,0,C0.504,0,-0.068,1,1,1'),
    c = CustomEase.create('custom', 'M0,0 C0.44,0.002 0,1 1,1 ');
  (d.body = document.body),
    (d.url = document.URL),
    (d.winW = window.innerWidth),
    (d.winH = window.innerHeight),
    (d.breakPoint = 768),
    (d.isDesktop = !0),
    (d.isFirst = !0),
    (d.animationFrame = null),
    d.breakPoint >= d.winW && (d.isDesktop = !1);
  var u = function () {
      (t = {
        top: !!$('.page-top').length,
        service: !!$('.page-service').length,
        works: !!$('.page-works').length,
        worksDetail: !!$('.page-works-detail').length,
        company: !!$('.page-company').length,
        contact: !!$('.page-contact').length,
      }),
        $('.nv').removeClass('no-link'),
        t.top
          ? $('.l-top').addClass('no-link')
          : t.service
          ? $('.l-service').addClass('no-link')
          : t.works
          ? $('.l-works').addClass('no-link')
          : t.company
          ? $('.l-company').addClass('no-link')
          : t.contact && $('.l-contact').addClass('no-link');
    },
    p = function () {
      for (
        var e = 0, t = $('.lang-area .is-current .cell'), o = 0;
        o < t.length;
        o++
      )
        e += t.eq(o).outerHeight(!0);
      $('.lang-area').css('height', e),
        $('.lang span').on('click', function () {
          var e = $(this).index();
          $('.lang span')
            .removeClass('is-current')
            .eq(e)
            .addClass('is-current'),
            $('.lang-target')
              .removeClass('is-current')
              .eq(e)
              .addClass('is-current');
          for (
            var t = 0, o = $('.lang-area .is-current .cell'), n = 0;
            n < o.length;
            n++
          )
            t += o.eq(n).outerHeight(!0);
          $('.lang-area').css('height', t);
        });
    },
    g = function () {
      t.top ||
        t.worksDetail ||
        gsap.to('.in-target', { opacity: 1, duration: 0.4, ease: 'linear' }),
        $('#l-img').length && !t.worksDetail
          ? (gsap.to('#l-img .panel', {
              skewY: -4,
              duration: 0.8,
              ease: 'Power3.easeInOut',
            }),
            gsap.to('#l-img h2 span i', {
              y: '0%',
              duration: 1,
              ease: c,
              stagger: 0.02,
            }),
            gsap.to('#l-img img', {
              opacity: 0,
              duration: 0.3,
              ease: 'linear',
              delay: 0.6,
            }),
            gsap.to('#l-img .video', {
              opacity: 1,
              duration: 0.3,
              ease: 'linear',
              delay: 0.6,
            }))
          : $('#l-img').length && t.worksDetail
          ? (gsap.to('#l-img img', {
              scale: 1,
              duration: 1.8,
              ease: 'Power3.easeInOut',
            }),
            t.works &&
              (gsap.to('.cell', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.2,
                stagger: 0.05,
                ease: c,
              }),
              gsap.to('.cell .in', {
                y: 0,
                duration: 1.2,
                delay: 0.2,
                stagger: 0.05,
                ease: c,
              })))
          : t.top ||
            (gsap.to('h2 span i', {
              y: '0%',
              duration: 1,
              ease: c,
              stagger: 0.02,
            }),
            t.works &&
              (gsap.to('.cell', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.2,
                stagger: 0.05,
                ease: c,
              }),
              gsap.to('.cell .in', {
                y: 0,
                duration: 1.2,
                delay: 0.2,
                stagger: 0.05,
                ease: c,
              })));
    },
    m = function (e, t, o) {
      var n = { y: 0 },
        i = { y: 0 };
      gsap.fromTo(
        [n, i],
        { y: d.winH },
        {
          y: 0,
          duration: function (e) {
            return 0 === e ? 1.2 : 1;
          },
          ease: c,
          onStart: function () {
            if (void 0 !== o) return o();
          },
          onUpdate: function () {
            e.setAttribute(
              'points',
              '0 ' +
                Math.floor(n.y) +
                ',' +
                d.winW +
                ' ' +
                Math.floor(i.y) +
                ',' +
                d.winW +
                ' ' +
                d.winH +
                ',0 ' +
                d.winH,
            );
          },
          onComplete: function () {
            if (void 0 !== t) return t();
          },
        },
      );
    },
    f = function (e, t, o) {
      var n = { y: d.winH },
        i = { y: d.winH };
      gsap.fromTo(
        [n, i],
        { y: d.winH },
        {
          y: 0,
          duration: function (e) {
            return 0 === e ? 1.2 : 1;
          },
          ease: c,
          onStart: function () {
            if (void 0 !== o) return o();
          },
          onUpdate: function () {
            e.setAttribute(
              'points',
              '0 0,' +
                d.winW +
                ' 0,' +
                d.winW +
                ' ' +
                Math.floor(n.y) +
                ',0 ' +
                Math.floor(i.y),
            );
          },
          onComplete: function () {
            if (void 0 !== t) return t();
          },
        },
      );
    },
    v = {
      init: function () {
        (o.panel = document.getElementById('menu-panel')),
          (o.polygon = document.getElementById('menu-panel-polygon')),
          v.set(),
          v.update(),
          v.rectSet(),
          v.spReset(),
          setTimeout(function () {
            v.set();
          }, 1e3),
          console.log('!-- resize init --!');
      },
      set: function () {
        t.top ? W.resize() : t.worksDetail && A.resize(),
          h.resize(),
          v.rectSet();
      },
      update: function () {
        $(window).off('resize');
        var e = !1;
        $(window).resize(function () {
          !1 !== e && clearTimeout(e),
            (e = setTimeout(function () {
              (d.winW = window.innerWidth),
                (d.winH = window.innerHeight),
                d.breakPoint > d.winW
                  ? d.isDesktop && ((d.isDesktop = !1), location.reload())
                  : d.isDesktop || ((d.isDesktop = !0), location.reload()),
                v.set();
            }, 1600));
        });
      },
      rectSet: function () {
        o.panel.setAttribute('viewBox', '0, 0, ' + d.winW + ', ' + d.winH),
          o.polygon.setAttribute('points', '0 0,0 0,0 0,0 0'),
          s.panel.setAttribute('viewBox', '0, 0, ' + d.winW + ', ' + d.winH),
          s.polygon.setAttribute('points', '0 0,0 0,0 0,0 0');
      },
      spReset: function () {
        d.isDesktop ||
          ($('body').css('height', d.winH), $('#f').css('height', d.winH));
      },
    },
    h = {
      init: function () {
        (i.target = document.getElementById('scroll')),
          (i.delta = 0),
          (i.lastY = 0),
          (i.velocity = 0.1),
          (i.targetY = 0),
          (i.translateY = 0),
          (i.currentY = 0),
          (i.secH = 0),
          (i.section = document.querySelectorAll('section')),
          (i.parallaxB = document.querySelectorAll('.p-img-b')),
          (i.parallaxT = document.querySelectorAll('.p-img-t')),
          (i.bounce = document.querySelectorAll('.bounce')),
          (i.bounceY = 0),
          (i.colorArr = []),
          (i.colorArrOffset = []),
          (i.colorMargin = d.winH / 2),
          (i.head = document.getElementById('t-head')),
          h.set(),
          h.observer(),
          setTimeout(function () {
            h.resize();
          }, 600),
          console.log('!-- scroll init --!');
      },
      set: function () {
        d.isDesktop
          ? $(window).on('scroll', function (e) {
              i.targetY = $(e.currentTarget).scrollTop();
            })
          : ($('html,body').attr('style', ''),
            $('#scroll').attr('style', '').off('scroll'),
            (i.targetY = 0),
            (i.translateY = 0),
            (i.currentY = 0),
            $('#scroll').on('scroll', function (e) {
              (i.currentY = Math.abs($('#scroll-wrap').offset().top)),
                t.top ? W.colorThemeSP() : (h.headIn(), h.colorTheme());
            }));
      },
      resize: function () {
        if (void 0 !== i.target) {
          d.isDesktop &&
            ((i.secH = i.target.getBoundingClientRect().height),
            gsap.set('body', { height: Math.floor(i.secH) })),
            (i.colorArr = []),
            (i.colorArrOffset = []);
          for (var e = 0; e < i.section.length; e++)
            i.colorArr.push(i.section[e].getAttribute('data-color')),
              d.isDesktop,
              i.colorArrOffset.push(
                Math.floor(i.section[e].getBoundingClientRect().top) +
                  Math.floor(i.currentY),
              );
        }
      },
      colorTheme: function () {
        for (var e = 0; e < i.section.length; e++)
          if (i.currentY + i.colorMargin > i.colorArrOffset[e])
            if (void 0 === i.colorArrOffset[e + 1]) {
              if (i.colorNum === e) return;
              (i.colorNum = i.section.length - 1),
                $('body').attr('class', i.colorArr[i.colorNum]);
            } else if (i.currentY + i.colorMargin < i.colorArrOffset[e + 1]) {
              if (i.colorNum === e) return;
              (i.colorNum = e), $('body').attr('class', i.colorArr[e]);
            }
      },
      update: function () {
        (i.currentY = h.easing(i.currentY, i.targetY, i.velocity)),
          (document.body.style.height = Math.floor(i.secH) + 'px'),
          (i.translateY =
            'translateY(-' + Math.floor(i.currentY) + 'px) translateZ(0)'),
          (i.target.style.transform = i.translateY),
          h.headIn();
      },
      easing: function (e, t, o) {
        return (1 - o) * e + o * t;
      },
      observer: function () {
        var e = Array.from(document.querySelectorAll('.s-in')),
          t = new IntersectionObserver(h.observerCallback, {
            rootMargin: '0px 0px',
          });
        e.forEach(function (e) {
          t.observe(e);
        });
      },
      observerCallback: function (e, o) {
        e.forEach(function (e, t) {
          e.isIntersecting &&
            (e.target.classList.add('is-in'), o.unobserve(e.target));
        });
      },
      bounce: function () {
        for (var e = 0; e < i.bounce.length; e++) {
          i.bounce[e].getBoundingClientRect();
          var t = i.bounce[e].getAttribute('data-scale');
          (i.bounceY = 0.15 * (i.targetY - i.currentY) * t),
            gsap.to(i.bounce[e], { y: i.bounceY, duration: 0.3 });
        }
      },
      headIn: function () {
        i.currentY > d.winH / 2
          ? i.head.classList.add('is-in')
          : i.head.classList.remove('is-in');
      },
      parallaxB: function () {
        for (var e = 0; e < i.parallaxB.length; e++) {
          var t = i.parallaxB[e].getBoundingClientRect(),
            o = i.parallaxB[e].getAttribute('data-scale');
          if (d.winH > t.top) {
            if (0 < t.top + t.height) {
              var n = Math.floor((-t.top + d.winH) * o);
              h.tweenY(i.parallaxB[e], n);
            }
          } else h.tweenY(i.parallaxB[e], 0);
        }
      },
      parallaxT: function () {
        for (var e = 0; e < i.parallaxT.length; e++) {
          var t = i.parallaxT[e].getBoundingClientRect(),
            o = i.parallaxT[e].getAttribute('data-scale');
          if (d.winH > t.top) {
            if (0 < t.top + t.height) {
              var n = Math.floor((t.top - d.winH) * o);
              h.tweenY(i.parallaxT[e], n);
            }
          } else h.tweenY(i.parallaxT[e], 0);
        }
      },
    },
    y = {
      init: function () {
        (n.cursor = document.getElementById('cursor')),
          (n.x = 0),
          (n.y = 0),
          (n.tx = 0),
          (n.ty = 0),
          (n.dx = 0),
          (n.dy = 0),
          (n.ease = 0.09),
          (n.isHover = !1),
          (n.dot = { x: 0, y: 0, w: 0, h: 0 }),
          y.set();
      },
      set: function () {
        $(window).off('mousemove'),
          d.isDesktop &&
            $(window).on('mousemove', function (e) {
              (n.x = e.clientX), (n.y = e.clientY);
            });
      },
      fit: function () {
        $('.cursor-fit').off('mouseleave mouseenter'),
          $('.cursor-fit').on('mouseleave mouseenter', function (e) {
            var t = $(this);
            (n.hoverTarget = $(this).find('.cursor-pos')),
              'mouseenter' === e.type
                ? ((n.isHover = !0),
                  'basic' === t.attr('data-type')
                    ? n.cursor.classList.add('is-basic')
                    : 'menu' === t.attr('data-type') &&
                      n.cursor.classList.add('is-menu'))
                : ((n.isHover = !1), n.cursor.classList.remove('is-basic'));
          }),
          $('.cursor-in').on('mouseleave mouseenter', function (e) {
            var t = $(this);
            'mouseenter' === e.type
              ? 'detail' === t.attr('data-type')
                ? n.cursor.classList.add('is-detail')
                : 'close' === t.attr('data-type')
                ? n.cursor.classList.add('is-close')
                : 'play' === t.attr('data-type') &&
                  n.cursor.classList.add('is-play')
              : (n.cursor.classList.remove('is-detail'),
                n.cursor.classList.remove('is-close'),
                n.cursor.classList.remove('is-play'));
          });
      },
      update: function () {
        (n.tx = n.x),
          (n.ty = n.y),
          (n.dot.x += (n.tx - n.dot.x) * n.ease),
          (n.dot.y += (n.ty - n.dot.y) * n.ease),
          gsap.set(n.cursor, { x: n.dot.x, y: n.dot.y });
      },
    },
    w = {
      init: function () {
        (s.href = null),
          (s.cont = null),
          (s.popstate = !1),
          (s.lastElementClicked = null),
          (s.offset = 0),
          (s.index = 0),
          (s.nameSpace = null),
          (s.param = { t: 0 }),
          (s.panel = document.getElementById('p-panel')),
          (s.polygon = document.getElementById('p-panel-polygon')),
          Barba.Pjax.init(),
          Barba.Prefetch.init(),
          this.set();
      },
      set: function () {
        Barba.Dispatcher.on('linkClicked', function (e) {
          (s.href = $(e).attr('href')),
            (s.cont = '#pjax-container'),
            (s.lastElementClicked = e),
            b.close(),
            null !== a.interval && clearInterval(a.interval);
        }),
          Barba.Dispatcher.on('initStateChange', function () {}),
          Barba.Dispatcher.on('newPageReady', function (e, t, o) {}),
          Barba.Dispatcher.on('transitionCompleted', function () {
            cancelAnimationFrame(d.animationFrame);
          });
        var e = Barba.BaseTransition.extend({
            start: function () {
              Promise.all([
                this.newContainerLoading,
                this.ready(this.newContainer),
              ]).then(this.fadeIn.bind(this));
            },
            ready: function (e) {
              var t = Barba.Utils.deferred();
              return o.ready(t), t.promise;
            },
            fadeIn: function () {
              var e = $(this.oldContainer),
                t = $(this.newContainer);
              o.fadeIn(e, t, this);
            },
          }),
          o = {
            ready: function (e) {
              e.resolve();
            },
            fadeIn: function (e, t, o) {
              var n = this;
              w.navChange(0),
                m(s.polygon, function () {
                  $('body').attr('class', 'theme-black'),
                    $('html,body').animate({ scrollTop: 0 }, 10),
                    $('#ttl-head').text(''),
                    $('#t-head').text('').removeClass('force-in'),
                    e.hide(),
                    o.done(),
                    setTimeout(function () {
                      n.fadeOut();
                    }, 400);
                });
            },
            fadeOut: function () {
              if ((i.head.classList.remove('is-in'), u(), t.top)) {
                f(
                  s.polygon,
                  void 0,
                  void setTimeout(function () {
                    w.navChange(1), M.set(), T.first();
                  }, 400),
                );
              } else if (t.service || t.company) w.imgOut();
              else {
                f(
                  s.polygon,
                  void setTimeout(function () {
                    w.navChange(1),
                      g(),
                      setTimeout(function () {
                        M.set();
                      }, 400);
                  }, 400),
                );
              }
            },
          };
        Barba.Pjax.getTransition = function () {
          return e;
        };
      },
      imgOut: function () {
        var e = document.getElementById('mv-panel'),
          t = document.getElementById('mv-panel-polygon'),
          o = d.winW,
          n = d.isDesktop
            ? Math.floor(0.357 * d.winW)
            : Math.floor(1.134 * d.winW);
        gsap.set('#l-img', { y: Math.floor(d.winH / 2 - n / 2), scale: 1.1 }),
          e.setAttribute('viewBox', '0, 0, ' + o + ', ' + n),
          t.setAttribute(
            'points',
            '0 0,' + o + ' 0,' + o + ' ' + n + ',0 ' + n,
          ),
          s.polygon.setAttribute('points', '0 0,0 0,0 0,0 0');
        f(
          t,
          void 0,
          void gsap.to('#l-img', {
            y: 0,
            scale: 1,
            duration: 1.6,
            delay: 0.6,
            ease: l,
            onStart: function () {
              setTimeout(function () {
                w.navChange(1),
                  g(),
                  setTimeout(function () {
                    M.set();
                  }, 400);
              }, 800);
            },
          }),
        );
      },
      navChange: function (e) {
        gsap.to(['#h', '#nv-copy', '#nv-contact'], {
          opacity: e,
          duration: 0.4,
          ease: 'linear',
        });
      },
    },
    b = {
      init: function () {
        (o.btn = $('.btn-menu')),
          (o.close = $('#close')),
          (o.target = $('#menu')),
          (o.isOpen = !1),
          b.set();
      },
      set: function () {
        o.btn.on('click', function (e) {
          o.isOpen || b.open();
        }),
          o.close.on('click', function (e) {
            o.isOpen && b.close();
          });
      },
      open: function () {
        o.target.addClass('is-in');
        m(o.polygon, function () {
          o.isOpen = !0;
        }),
          gsap.fromTo(
            '#menu .in span',
            { y: '120%' },
            { y: '0%', duration: 0.8, delay: 0.2, ease: c, stagger: 0.04 },
          ),
          gsap.fromTo(
            '#menu .op',
            { opacity: 0 },
            { opacity: 1, duration: 0.2, delay: 0.6, ease: 'none' },
          );
      },
      close: function () {
        o.target.removeClass('is-in'),
          setTimeout(function () {
            o.polygon.setAttribute('points', '0 0,0 0,0 0,0 0'),
              (o.isOpen = !1);
          }, 400);
      },
    },
    x = function () {
      $('.anchor').on('click', function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
        var t = $(this).attr('data-href'),
          o = '#' === t ? 0 : $(t).offset().top,
          n = $('#scroll');
        n.position().top;
        d.isDesktop
          ? $('html,body').animate({ scrollTop: o }, 100)
          : n.stop().animate({ scrollTop: 0 }, 800);
      });
    },
    k = function () {
      var t = new Swiper('.swiper-container', {
        slidesPerView: d.isDesktop ? 2 : 1,
        spaceBetween: d.isDesktop ? 0 : 100,
        centeredSlides: !0,
        responsive: !0,
        navigation: { nextEl: '.next', prevEl: '.prev' },
        grabCursor: !0,
        resize: function () {
          setTimeout(function () {
            t.update();
          }, 2e3);
        },
      });
      t.on('transitionStart', function () {
        $('.slide-nav span')
          .removeClass('is-current')
          .eq(t.activeIndex)
          .addClass('is-current');
      }),
        t.on('touchStart', function () {
          $('.swiper-slide').removeClass('swiper-slide-active'),
            $('#slider-ttl strong').removeClass('is-current'),
            $('#slider-cat strong').removeClass('is-current');
        }),
        t.on('touchEnd', function () {
          setTimeout(function () {
            $('.swiper-slide')
              .eq(t.activeIndex)
              .addClass('swiper-slide-active'),
              $('#slider-ttl strong').eq(t.activeIndex).addClass('is-current'),
              $('#slider-cat strong').eq(t.activeIndex).addClass('is-current'),
              d.isDesktop ||
                $('.slide-nav').animate(
                  { scrollLeft: (0.5 * d.winW + 12) * t.activeIndex },
                  400,
                );
          }, 200);
        }),
        $('.slide-nav span').on('click', function () {
          var e = $(this).index();
          t.slideTo(e),
            $('.swiper-slide').removeClass('swiper-slide-active'),
            $('#slider-ttl strong').removeClass('is-current'),
            $('#slider-cat strong').removeClass('is-current'),
            setTimeout(function () {
              $('.swiper-slide')
                .eq(t.activeIndex)
                .addClass('swiper-slide-active'),
                $('#slider-ttl strong')
                  .eq(t.activeIndex)
                  .addClass('is-current'),
                $('#slider-cat strong')
                  .eq(t.activeIndex)
                  .addClass('is-current');
            }, 200);
        });
    },
    C = {
      init: function () {
        (e.target = $('.hover-rotate')), C.events();
      },
      events: function () {
        e.target.on('mouseenter mouseleave', function (e) {
          var t = $(this).find('span').eq(0).find('i'),
            o = $(this).find('span').eq(1).find('i');
          'mouseenter' === e.type
            ? (gsap.fromTo(
                t,
                { y: '0%' },
                { y: '-101%', duration: 0.6, ease: c, stagger: 0.02 },
              ),
              gsap.fromTo(
                o,
                { y: '101%' },
                { y: '0%', duration: 0.6, ease: c, stagger: 0.02 },
              ))
            : (gsap.to(t, { y: '0%', duration: 0.6, ease: c, stagger: 0.02 }),
              gsap.to(o, { y: '101%', duration: 0.6, ease: c, stagger: 0.02 }));
        });
      },
      footerLink: function () {
        var t = !1,
          o = { x: 0.1 },
          n = null;
        $('#f .next').on('mouseenter mouseleave', function (e) {
          'mouseenter' === e.type
            ? ((o.x = 0.1),
              (n = gsap.to(o, {
                x: 1,
                duration: 2.4,
                ease: 'Power2.easeOut',
                onUpdate: function () {
                  $('#f .progress').css(
                    'transform',
                    'translate3d(0,0,0) scale(' + o.x + ',1)',
                  );
                },
                onComplete: function () {
                  1 === o.x &&
                    (t ||
                      ((t = !0), document.querySelector('#f .next').click()));
                },
              })))
            : (n.pause(), n.reverse());
        });
      },
    },
    T = {
      init: function () {
        (a.txt = $('#mv-t-box .in span')),
          (a.num = $('#mv-num-box span')),
          (a.gradL = $('#mv-panel-grad-l span')),
          (a.gradR = $('#mv-panel-grad-r span')),
          (a.video = document.getElementById('mv-video')),
          (a.play = document.getElementById('play')),
          a.play.addEventListener('click', function () {
            a.video.play();
          }),
          (a.current = 0),
          (a.prev = 0),
          (a.len = 5),
          (a.interval = null),
          (a.isFirst = !0),
          a.video.pause(),
          (a.video.currentTime = 0);
      },
      first: function () {
        gsap.fromTo(
          a.txt.eq(0).find('i'),
          { y: '101%' },
          { y: '0%', duration: 0.6, ease: c, stagger: 0.02 },
        ),
          gsap.fromTo(
            a.num.eq(0).find('i'),
            { y: '101%' },
            { y: '0%', duration: 0.6, ease: c, stagger: 0.04 },
          ),
          T.scroll(),
          T.panelMove(),
          (a.interval = setInterval(T.interval, 3650)),
          setTimeout(function () {
            a.video.play(),
              gsap.to(a.video, { opacity: 1, duration: 0.4, ease: 'linear' });
          }, 600),
          console.log('!-- canplay --!');
      },
      scroll: function () {
        gsap.fromTo(
          '.scroll .l1 i',
          { y: '0%' },
          { y: '-100%', duration: 1, ease: c, stagger: 0.02 },
        ),
          gsap.fromTo(
            '.scroll .l2 i',
            { y: '100%' },
            { y: '0%', duration: 1, ease: c, stagger: 0.02 },
          );
      },
      interval: function () {
        (a.prev = a.current),
          a.current++,
          a.current > a.len && ((a.prev = 5), (a.current = 0)),
          T.txtChange(),
          T.scroll();
      },
      txtChange: function () {
        gsap.fromTo(
          a.txt.eq(a.prev).find('i'),
          { y: '0%' },
          { y: '-101%', duration: 0.6, delay: 0.4, ease: c, stagger: 0.02 },
        ),
          gsap.fromTo(
            a.txt.eq(a.current).find('i'),
            { y: '101%' },
            { y: '0%', duration: 0.6, delay: 0.4, ease: c, stagger: 0.02 },
          ),
          T.numChange(),
          T.panelMove();
      },
      numChange: function () {
        if (0 === a.current || 2 === a.current || 4 === a.current) {
          var e = 0,
            t = 0;
          0 === a.current
            ? ((e = 2), (t = 0))
            : 2 === a.current
            ? ((e = 0), (t = 1))
            : 4 === a.current && ((e = 1), (t = 2)),
            gsap.fromTo(
              a.num.eq(e).find('i'),
              { y: '0%' },
              { y: '-101%', duration: 0.6, delay: 0.4, ease: c, stagger: 0.04 },
            ),
            gsap.fromTo(
              a.num.eq(t).find('i'),
              { y: '101%' },
              { y: '0%', duration: 0.6, delay: 0.4, ease: c, stagger: 0.04 },
            );
        }
      },
      panelMove: function () {
        var e = 0,
          t = 0,
          o = 0,
          n = 0,
          i = [0.61, 0, 0, 1];
        n =
          0 === a.current || 2 === a.current || 4 === a.current
            ? ((e = ['-60%', '60%']),
              (t = d.isDesktop
                ? [-0.88 * d.winW, 0.92 * d.winW]
                : [-0.88 * d.winW, 0.96 * d.winW]),
              (o = d.isDesktop
                ? [-0.04 * d.winW, 1.6 * d.winW]
                : [-0.04 * d.winW, 1.4 * d.winW]),
              [-90, 90])
            : ((e = ['60%', '-60%']),
              (t = d.isDesktop
                ? [0.88 * d.winW, -0.92 * d.winW]
                : [0.96 * d.winW, -0.94 * d.winW]),
              (o = d.isDesktop
                ? [1.7 * d.winW, -0.04 * d.winW]
                : [1.8 * d.winW, -0.04 * d.winW]),
              [90, -90]);
        anime({
          targets: '#mv-panel-box-in',
          translateX: e,
          rotateY: n,
          duration: 1400,
          easing: i,
        }),
          anime({
            targets: '#mv-panel-grad-l',
            translateX: t,
            duration: 1400,
            easing: i,
            update: function () {
              T.randomNoise(a.gradL);
            },
          }),
          anime({
            targets: '#mv-panel-grad-r',
            translateX: o,
            duration: 1400,
            easing: i,
            update: function () {
              T.randomNoise(a.gradR);
            },
          });
      },
      randomNoise: function (e) {
        e.css('width', 0);
        var t = Math.floor(5 * Math.random()),
          o = d.isDesktop ? 30 * Math.random() : 10 * Math.random(),
          n = 6 * Math.random();
        gsap.set(e.eq(t), { width: o, x: n });
      },
    },
    H = {
      init: function () {
        (d.videoPanel = $('#video-panel')),
          (d.videoPanelCell = $('#video-panel .video')),
          H.events();
      },
      events: function () {
        $('.s2 .works-cell').off('mouseenter mouseleave'),
          $('.s2 .works-cell').on('mouseenter mouseleave', function (e) {
            var t = $(this).index();
            'mouseenter' === e.type
              ? (d.videoPanelCell.removeClass('is-current'),
                d.videoPanelCell.eq(t).addClass('is-current'))
              : d.videoPanelCell.removeClass('is-current');
          });
      },
      update: function () {
        var e = n.x - 0.31 * d.winW,
          t = n.y - 0.131 * d.winW,
          o = n.x - n.dot.x;
        gsap.to(d.videoPanel, {
          x: e,
          y: t,
          rotation: 0.03 * o,
          duration: 0.4,
          ease: 'none',
        });
      },
    },
    B = {
      init: function () {
        (modal.trigger = $('.modal-trigger')),
          (modal.target = $('#modal')),
          (modal.inner = $('#modal .in')),
          (modal.close = $('#modal .close')),
          (modal.video = document.getElementById('modal-video')),
          (modal.ratio = 1920 / 1080),
          (modal.isOpen = !1),
          B.set();
      },
      set: function () {
        modal.trigger.on('click', function () {
          if (!modal.isOpen) {
            modal.target.addClass('is-in'),
              $('body').addClass('hidden'),
              (modal.isOpen = !0);
            var e = $(this).attr('data-modal-src');
            B.play(e);
          }
        }),
          modal.close.on('click', function () {
            B.close();
          }),
          d.isDesktop || $('#modal-video').attr('controls', !0);
      },
      close: function () {
        modal.target.addClass('is-loading'),
          modal.video.pause(),
          $('#modal-video').attr('src', ''),
          (modal.isOpen = !1),
          modal.target.removeClass('is-in'),
          $('body').removeClass('hidden');
      },
      play: function (e) {
        $('#modal-video').attr('src', e),
          d.isDesktop
            ? ($('#modal-video').on('canplay', function () {
                modal.target.removeClass('is-loading'), modal.video.play();
              }),
              $('#modal-video').on('ended', function () {
                setTimeout(function () {
                  B.close();
                }, 600);
              }))
            : modal.target.removeClass('is-loading');
      },
      resize: function () {
        modal.isOpen
          ? modal.target.css(
              'clip',
              'rect(0 ' + d.winW + 'px ' + d.winH + 'px 0)',
            )
          : modal.target.css('clip', 'rect(0 ' + d.winW + 'px 0px 0)'),
          modal.inner.css(
            'clip',
            'rect(0 ' + d.winW + 'px ' + d.winH + 'px 0)',
          );
      },
    },
    W = {
      init: function () {
        (d.trigger1 = document.getElementById('trigger1')),
          (d.triggerPanel = document.getElementById('trigger-panel')),
          (d.video = document.getElementById('top-video')),
          (d.trigger1Opacity = 0),
          (d.stopper1 = !1),
          (d.stopper2 = !1),
          (d.stopper3 = !1),
          (d.stopper4 = !1),
          (d.mvRatio = d.isDesktop ? 1920 / 1080 : 750 / 1334),
          W.resize(),
          T.init(),
          H.init(),
          setTimeout(function () {
            d.isDesktop && W.updates();
          }, 1e3);
      },
      resize: function () {
        d.mvRatio > d.winW / d.winH
          ? $('#top-video .video').css({
              width: Math.floor(d.winH * d.mvRatio),
              height: d.winH,
              top: 0,
              left: Math.floor((d.winW - d.winH * d.mvRatio) / 2),
            })
          : $('#top-video .video').css({
              width: d.winW,
              height: Math.floor(d.winW / d.mvRatio),
              top: Math.floor((d.winH - d.winW / d.mvRatio) / 2),
              left: 0,
            });
      },
      colorThemePC: function () {
        if (
          ((d.trigger1Rect = d.trigger1.getBoundingClientRect()),
          i.currentY >= d.trigger1Rect.height - d.winH - 200)
        ) {
          var e = Math.max(
              0,
              1 -
                Math.abs(
                  0.05 * (i.currentY - d.trigger1Rect.height + d.winH + 200),
                ),
            ),
            t = Math.max(
              0,
              1 -
                Math.abs(
                  0.005 * (i.currentY - d.trigger1Rect.height + d.winH + 200),
                ),
            );
          gsap.set([a.video, d.video], { opacity: e }),
            gsap.set(d.trigger1, { opacity: t });
        } else {
          var o = Math.abs(0.01 * d.trigger1Rect.top),
            n = 2.5 - Math.abs(0.01 * d.trigger1Rect.top);
          gsap.set(d.trigger1, { opacity: o }),
            gsap.set(d.triggerPanel, { opacity: n }),
            -100 <= d.trigger1Rect.top
              ? gsap.set(a.video, { opacity: 1 })
              : (gsap.set(a.video, { opacity: 0.8 }),
                gsap.set(d.video, { opacity: 1 }));
        }
        if (i.currentY + d.winH / 2 > i.secH - d.winH) {
          if (d.stopper1) return;
          (d.stopper2 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !1),
            (d.stopper1 = !0),
            $('body').attr('class', 'theme-white');
        } else if (i.currentY > d.trigger1Rect.height - d.winH - 200) {
          if (d.stopper2) return;
          (d.stopper1 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !1),
            (d.stopper2 = !0),
            $('body').attr('class', 'theme-black');
        } else if (200 < i.currentY) {
          if (d.stopper3) return;
          (d.stopper1 = !1),
            (d.stopper2 = !1),
            (d.stopper4 = !1),
            (d.stopper3 = !0),
            $('body').attr('class', 'theme-white'),
            gsap.to(['#mv-panel-box', '#mv-t-box'], 0.4, { opacity: 0 });
        } else {
          if (d.stopper4) return;
          (d.stopper1 = !1),
            (d.stopper2 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !0),
            $('body').attr('class', 'theme-black'),
            gsap.to(['#mv-panel-box', '#mv-t-box'], 0.4, { opacity: 1 });
        }
      },
      colorThemeSP: function () {
        d.trigger1Rect = d.trigger1.getBoundingClientRect();
        var e = $('#scroll-wrap').outerHeight();
        if (Math.abs(i.currentY) + 1.5 * d.winH > e) {
          if (d.stopper1) return;
          (d.stopper2 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !1),
            (d.stopper1 = !0),
            $('body').attr('class', 'theme-white'),
            gsap.to(d.video, 0.4, { opacity: 0 });
        } else if (i.currentY > d.trigger1Rect.height - d.winH - 400) {
          var t = 0.005 * (d.trigger1Rect.top + d.trigger1Rect.height - d.winH),
            o =
              0.005 *
              (d.trigger1Rect.top + d.trigger1Rect.height - d.winH - 200);
          if (
            (gsap.set(d.trigger1, { opacity: t }),
            gsap.set(a.video, { opacity: o }),
            d.stopper2)
          )
            return;
          (d.stopper1 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !1),
            (d.stopper2 = !0),
            $('body').attr('class', 'theme-black'),
            gsap.to(d.video, 0.4, { opacity: 0 });
        } else if (20 < i.currentY) {
          if (d.stopper3) return;
          (d.stopper1 = !1),
            (d.stopper2 = !1),
            (d.stopper4 = !1),
            (d.stopper3 = !0),
            $('body').attr('class', 'theme-white'),
            gsap.to(d.video, 0.4, { opacity: 1 }),
            gsap.to(a.video, { opacity: 0.8 }),
            gsap.to(['#mv-panel-box', '#mv-t-box'], 0.4, { opacity: 0 }),
            gsap.to(d.trigger1, 0.4, { opacity: 1 });
        } else {
          if (d.stopper4) return;
          (d.stopper1 = !1),
            (d.stopper2 = !1),
            (d.stopper3 = !1),
            (d.stopper4 = !0),
            $('body').attr('class', 'theme-black'),
            gsap.to(['#mv-panel-box', '#mv-t-box', a.video], 0.4, {
              opacity: 1,
            }),
            gsap.to(d.trigger1, 0.4, { opacity: 0 });
        }
      },
      updates: function () {
        (d.animationFrame = window.requestAnimationFrame(W.updates)),
          h.update(),
          h.bounce(),
          W.colorThemePC(),
          y.update(),
          H.update();
      },
    },
    I = {
      init: function () {
        $('#t-head').text('Service'),
          k(),
          p(),
          B.init(),
          d.isDesktop && I.updates();
      },
      updates: function () {
        (d.animationFrame = window.requestAnimationFrame(I.updates)),
          h.update(),
          h.colorTheme(),
          h.bounce(),
          y.update(),
          d.sliderIsReady && slider.render();
      },
    },
    D = {
      init: function () {
        $('#t-head').text('Works'),
          (d.worksImg = document.querySelectorAll('.pjax-img')),
          (d.worksImgInner = $('.pjax-img .in')),
          D.toggleList(),
          d.isDesktop && (D.videoPlay(), D.updates());
      },
      videoFit: function (e) {
        var t = $('.works-list .cell .in').eq(e).width(),
          o = $('.works-list .cell .in').eq(e).height(),
          n =
            o *
            ($('.works-list .cell .in').eq(e).find('.video').width() /
              $('.works-list .cell .in').eq(e).find('.video').height());
        $('.works-list .cell')
          .eq(e)
          .find('.video')
          .css({ width: n, height: o, top: 0, left: (t - n) / 2 });
      },
      toggleList: function () {
        var e = document.querySelectorAll('.toggle-list .cell'),
          t = 0,
          o = d.isDesktop ? 60 : 0;
        if (d.isDesktop)
          for (var n = 0; n < 16; n++) {
            var i = e[n].getBoundingClientRect().height + o;
            (0 !== n && 3 !== n && 6 !== n && 9 !== n) || (t += i);
          }
        else
          for (var a = 0; a < 10; a++) {
            var r = e[a].getBoundingClientRect().height + o;
            (0 !== a && 2 !== a && 4 !== a && 6 !== a && 8 !== a) || (t += r);
          }
        $('.toggle').css('height', t);
        var s = { x: 1 },
          l = null,
          c = null;
        $('.btn-more').on('mouseenter mouseleave', function (e) {
          'mouseenter' === e.type
            ? ((s.x = 1),
              (l = gsap.to(s, {
                x: 0,
                duration: 2.4,
                ease: 'Power4.easeOut',
                onUpdate: function () {
                  $('.c-w').attr('style', 'stroke-dashoffset:' + 314 * s.x);
                },
                onComplete: function () {
                  0 === s.x &&
                    (c ||
                      ((c = !0), document.querySelector('.btn-more').click()));
                },
              })))
            : (l.pause(), l.reverse());
        }),
          $('.btn-more').on('click', function (e) {
            var t = $('.toggle-list').height();
            gsap.to('.toggle', {
              height: t,
              duration: 0.4,
              onComplete: function () {
                $('.btn-more').remove(),
                  setTimeout(function () {
                    h.resize();
                  }, 400);
              },
            });
          });
      },
      videoPlay: function () {
        for (
          var t = document.querySelectorAll('.play-target'),
            e = function (o) {
              t[o].addEventListener('mouseenter', function () {
                var e = this.children[0].children[0].children[1],
                  t = o;
                e.load(),
                  e.addEventListener(
                    'canplay',
                    function () {
                      D.videoFit(t), n(), e.play();
                    },
                    !1,
                  );
              });
            },
            o = 0;
          o < t.length;
          o++
        )
          e(o);
        var n = function () {
          for (var e = 0; e < t.length; e++)
            t[e].children[0].children[0].children[1].pause();
        };
      },
      updates: function () {
        (d.animationFrame = window.requestAnimationFrame(D.updates)),
          h.colorTheme(),
          h.update(),
          y.update();
      },
    },
    A = {
      init: function () {
        var e = $('#main-ttl').text();
        $('#ttl-head').text(e),
          $('#t-head').text('Works').addClass('force-in'),
          B.init(),
          A.resize(),
          d.isDesktop && (D.videoPlay(), A.updates());
      },
      resize: function () {
        $('.detail-head').width() === $('#ttl-head').width()
          ? $('.detail-head').addClass('is-short')
          : $('.detail-head').removeClass('is-short');
      },
      updates: function () {
        (d.animationFrame = window.requestAnimationFrame(A.updates)),
          h.colorTheme(),
          h.bounce(),
          h.update(),
          y.update();
      },
    },
    q = {
      init: function () {
        t.contact
          ? $('#t-head').text('Contact')
          : t.company && $('#t-head').text('About'),
          d.isDesktop && q.updates();
      },
      updates: function () {
        (d.animationFrame = window.requestAnimationFrame(q.updates)),
          h.colorTheme(),
          h.bounce(),
          h.update(),
          y.update();
      },
    },
    Y = {
      init: function () {
        (r.logo = document.getElementById('load-logo')),
          (r.panel = document.getElementById('load-panel')),
          (r.polygon = document.getElementById('load-panel-polygon')),
          r.panel.setAttribute('viewBox', '0, 0, ' + d.winW + ', ' + d.winH),
          r.polygon.setAttribute(
            'points',
            '0 0,' + d.winW + ' 0,' + d.winW + ' ' + d.winH + ',0 ' + d.winH,
          ),
          gsap.to(r.logo, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: l,
            onComplete: function () {
              if (t.top) Y.topIn();
              else {
                gsap.to(r.logo, {
                  scale: 1.1,
                  opacity: 0,
                  duration: 0.4,
                  ease: l,
                }),
                  f(r.polygon, void 0, g());
              }
            },
          });
      },
      topIn: function () {
        if ((a.video.pause(), (a.video.currentTime = 0), d.isDesktop))
          a.video.addEventListener(
            'canplay',
            function () {
              if (a.isFirst) {
                (a.isFirst = !1),
                  gsap.to(r.logo, {
                    scale: 1.1,
                    opacity: 0,
                    duration: 0.4,
                    ease: l,
                  });
                f(r.polygon, void 0, T.first);
              }
            },
            !1,
          );
        else {
          gsap.to(r.logo, { scale: 1.1, opacity: 0, duration: 0.4, ease: l });
          f(r.polygon, void 0, T.first);
        }
      },
    },
    M = {
      init: function () {
        Y.init(), u(), y.init(), b.init(), w.init(), M.set();
      },
      reset: function () {
        $('#ttl-head').text(''),
          $('#t-head').text('').removeClass('force-in'),
          n.cursor.classList.remove('is-detail'),
          n.cursor.classList.remove('is-close'),
          n.cursor.classList.remove('is-play');
      },
      set: function () {
        M.reset(),
          v.init(),
          h.init(),
          x(),
          y.fit(),
          d.isDesktop && (C.init(), C.footerLink()),
          t.top
            ? W.init()
            : t.service
            ? I.init()
            : t.company
            ? q.init()
            : t.works
            ? D.init()
            : t.worksDetail
            ? A.init()
            : t.contact && q.init();
      },
    };
  setTimeout(function () {
    M.init();
  }, 400);
})();
