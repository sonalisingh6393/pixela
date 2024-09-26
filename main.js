/*
 * Copyright (c) 2024 NusaTheme
 * Author: NusaTheme
 * This file is made for CURRENT TEMPLATE
*/

var lastScrollPos = window.scrollY;
var lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf);


window.addEventListener('load', function () {
  platformDetection();
  preloader();
  stickyHeader();
  siteMenu();
  initBackToTop();
  Splitting();
  initParallax();
  initSliderS1();
  initSliderS2();
  initSliderS3();
  initSliderS4();
  initSliderS5();
  initParallaxMoveScene();
  initMagneticElements();
  initPortfolioMasonry();
});
window.addEventListener('resize', function () {
  platformDetection();
})
window.addEventListener('scroll', function () {
  stickyHeader();
})


// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

var controller = new ScrollMagic.Controller({
  refreshInterval: 500,
});

var mobileTest;
function platformDetection() {
  const html = document.querySelector('html');
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 992) {
    mobileTest = true;
    html.classList.add("mobile");
  }
  else {
    mobileTest = false;
    html.classList.remove("mobile");
  }
}

const customCursorObject = {
  targets: ['a', '.cursor-pointer', 'button', '[data-cursor]'],
  init: function () {
    const cursorTargets = document.querySelectorAll(this.targets.join(','));
    this.customCursor = document.querySelector('.custom-cursor');
    this.info = this.customCursor.querySelector('.custom-cursor-info');
    this.cursorInner = document.querySelector('.cursor-inner');
    this.cursorOuter = document.querySelector('.cursor-outer');
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    cursorTargets.forEach(target => {
      target.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      target.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  },
  handleMouseMove: function (event) {
    this.animateMove(this.customCursor, event.clientX, event.clientY)
  },
  handleMouseEnter: function (event) {
    this.cursorInner.classList.add('cursor-hover');
    this.cursorOuter.classList.add('cursor-hover');
    if (event.currentTarget.dataset.cursor) {
      this.updateInfo(event.currentTarget.dataset.cursor);
      this.customCursor.classList.add('has-info');
    } else {
      this.info.innerHTML = '';
      this.customCursor.classList.remove('has-info');
    }
    this.info.style.visibility = 'visible';
  },
  updateInfo: function (info) {
    this.info.innerHTML = info;
  },
  handleMouseLeave: function (event) {
    this.cursorInner.classList.remove('cursor-hover');
    this.cursorOuter.classList.remove('cursor-hover');
    this.info.style.removeProperty('visibility');
  },
  animateMove: function (element, positionX, positionY) {
    anime({
      targets: element,
      translateX: `${positionX}px`,
      translateY: `${positionY}px`,
      easing: "easeOutQuint"
    })
  }
}
let customCursorIns = undefined;
if (document.querySelector('.custom-cursor')) {
  customCursorIns = Object.create(customCursorObject);
  customCursorIns.init();
}

function initWow() {
  const wowInstance = new WOW({
    offset: 100,
    mobile: true,
    live: true,
    callback: function (box) {
      if (box.classList.contains('parallax-el')) {
        setTimeout(() => {
          box.classList.remove('wow', 'animated');
          animeChars();
        }, 1000)
      }
    }
  });
  wowInstance.init();

  const wowSPlits = document.querySelectorAll('.wow-split');
  wowSPlits.forEach(w => {
    const delay = w.dataset.wowDelay ? parseFloat(w.dataset.wowDelay) * 1000 : 100;
    setTimeout(() => {
      w.classList.add('animated')
    }, delay)
  })


  const wowImage = new WOW({
    offset: 100,
    mobile: true,
    live: true,
    boxClass: 'wow-img',
    callback: function (box) {
      setTimeout(() => {
        box.classList.remove('wow-img', 'animated', 'fadeZoomIn');
      }, 2200)
    }
  })
  wowImage.init();

  const wowHeader = document.querySelector('.wow-header');
  if (wowHeader) {
    setTimeout(() => {
      wowHeader.classList.add('fadeInDown', 'animated');
    }, 800)
  }

  const wowSlides = document.querySelectorAll('.wow-slider');
  if (wowSlides.length > 0) {
    const wowTimeline = anime.timeline({
    });
    wowTimeline
      .add({
        targets: wowSlides,
        opacity: [0, 1],
        scale: [
          { value: .7, duration: 0 },
          { value: 1, easing: 'cubicBezier(.18,.33,0,.98)', duration: 1500, delay: 1000 }
        ],
        translateX: [
          { value: '150%', duration: 0 },
          { value: '0%', easing: 'easeOutCirc', duration: 2000 }
        ],
        delay: anime.stagger(200, { grid: [wowSlides.length, 1], from: 0 })
      })
  }

  window.odometerOptions = {
    auto: false,
    selector: '.odometer-number',
    duration: 5000
  };
  const wowNumber = new WOW({
    offset: 100,
    mobile: true,
    live: true,
    boxClass: 'wow-num',
    callback: function (box) {
      if (box.querySelector('.odometer-number')) {
        const odometerEl = box.querySelector('.odometer-number');
        od = new Odometer({
          el: odometerEl,
          value: 0,
          format: '',
          theme: 'default'
        });
        setTimeout(() => {
          odometerEl.innerHTML = parseInt(odometerEl.dataset.number);
        }, 600)
      }
    }
  });
  wowNumber.init();

}

function siteMenu() {
  const toggleSiteMenu = document.querySelector('.toggle-site-menu');
  if (!toggleSiteMenu) return;
  const siteMenu = document.querySelector('.site-menu');
  const closeBtn = document.querySelector('.site-menu-close');
  const menuList = siteMenu.querySelectorAll('.menu-list > li');
  const leftBox = siteMenu.querySelector('.left-box');
  const rightBox = siteMenu.querySelector('.right-box');
  const leftBoxItems = leftBox.querySelectorAll('.left-box-container > *');

  function handleOpenSiteMenu() {
    const openMenuTimeline = anime.timeline({
      easing: 'easeOutQuint',
      begin: function () {
        siteMenu.style.visibility = 'visible';
      },
      complete: function () {
        closeBtn.style.opacity = '1';
      }
    })
    if (window.innerWidth < 992) {
      openMenuTimeline
        .add({
          targets: rightBox,
          translateY: ['-100%', '0%']
        })
        .add({
          targets: menuList,
          translateX: ['-10%', '0%'],
          opacity: [0, 1],
          delay: anime.stagger(100)
        })
    } else {
      openMenuTimeline
        .add({
          targets: leftBox,
          translateY: ['100%', '0%']
        })
        .add({
          targets: rightBox,
          translateY: ['-100%', '0%']
        }, '-=800')
        .add({
          targets: leftBoxItems,
          translateY: ['50%', '0%'],
          opacity: [0, 1],
          delay: anime.stagger(200)
        }, '-=500')
        .add({
          targets: menuList,
          translateX: ['-10%', '0%'],
          opacity: [0, 1],
          delay: anime.stagger(100)
        }, '-=800')
    }
  }

  function handleCloseSiteMenu() {
    const closeMenuTimeline = anime.timeline({
      easing: 'easeInQuart',
      begin: function () {
      },
      complete: function () {
        siteMenu.style.visibility = 'hidden';
        closeBtn.style.removeProperty('opacity');
      }
    });
    if (window.innerWidth < 992) {
      closeMenuTimeline
        .add({
          targets: menuList,
          translateX: ['0%', '-10%'],
          opacity: [1, 0],
          delay: anime.stagger(100)
        })
        .add({
          targets: rightBox,
          translateY: ['0%', '-100%']
        })
    } else {
      closeMenuTimeline
        .add({
          targets: menuList,
          translateX: ['0%', '-10%'],
          opacity: [1, 0],
          delay: anime.stagger(100)
        })
        .add({
          targets: leftBoxItems,
          translateY: ['0%', '50%'],
          opacity: [1, 0],
          delay: anime.stagger(200)
        }, '-=500')
        .add({
          targets: rightBox,
          translateY: ['0%', '-100%']
        })
        .add({
          targets: leftBox,
          translateY: ['0%', '100%']
        }, '-=800')
    }
  }

  toggleSiteMenu.addEventListener('click', handleOpenSiteMenu);
  closeBtn.addEventListener('click', handleCloseSiteMenu);

  const menuHasSubMenu = siteMenu.querySelectorAll('.submenu-toggle');
  menuHasSubMenu.forEach(toggle => {
    toggle.addEventListener('click', handleMenuHasSubMenuOnClick)
  })
  function handleMenuHasSubMenuOnClick(event) {
    const toggle = event.currentTarget;
    const hasSubMenuLi = toggle.closest('li.has-submenu');

    if (hasSubMenuLi) {
      event.preventDefault();
      const dropdownIcon = toggle.querySelector('.dropdown-icon');
      const subMenu = hasSubMenuLi.querySelector('.submenu');
      subMenu.classList.toggle('opened');
      if (subMenu.classList.contains('opened')) {
        subMenu.style.display = 'block';
        const subMenuHeight = subMenu.getBoundingClientRect().height;
        subMenu.style.height = 0;
        const openSubMenuTimeline = anime.timeline({
          duration: 800,
          easing: 'easeOutQuad',
          begin: function () {
            subMenu.style.visibility = 'visible';
            toggle.style.pointerEvents = 'none';
          },
          complete: function () {
            subMenu.style.removeProperty('height');
            toggle.style.pointerEvents = '';
          },
        });
        openSubMenuTimeline
          .add({
            targets: subMenu,
            height: `${subMenuHeight}px`,
          })
          .add({
            targets: dropdownIcon,
            rotate: '180deg',
            duration: 400,
          }, '-=800')
      } else {
        const closeSubMenuTimeline = anime.timeline({
          duration: 800,
          easing: 'easeOutQuad',
          begin: function () {
            toggle.style.pointerEvents = 'none';
          },
          complete: function () {
            setTimeout(() => {
              subMenu.style.cssText = '';
              toggle.style.pointerEvents = '';
            }, 300)
          }
        })
        closeSubMenuTimeline
          .add({
            targets: subMenu,
            height: '0px',
            marginBottom: '0px',
          })
          .add({
            targets: dropdownIcon,
            rotate: '0deg',
            duration: 400,
          }, '-=800')
      }
    }
  }
}

const NTParallax = {
  target: undefined,
  speed: 1,
  offset: 0,
  triggeredEl: undefined,
  defaultTween: undefined,
  duration: undefined,
  init: function () {
    const _parallax = this;
    this.speed = this.getSpeed() || this.speed;
    this.triggeredEl = this.triggeredEl || document.querySelector('body');
    this.animOptions = this.getAnimOptions();
    this.defaultTween = this.defaultTween || {
      translateY: function () {
        return '100px'
      },
      offset: 0
    }
    this.tween = Object.assign(
      this.defaultTween, this.animOptions
    )

    this.timeline = anime.timeline({
      targets: _parallax.target,
      autoplay: false,
      loop: false,
      duration: 100,
      easing: 'linear',
    });
    this.timeline.add(this.tween)
      .add(this.animOptions);
    this.addScene();
  },
  elPos: {
    getDocY: function () {
      return window.scrollY || document.documentElement.scrollTop;
    },
    getTop: function (el) {
      return el.getBoundingClientRect().top + this.getDocY - document.documentElement.offsetTop;
    },
    getBottom: function (el) {
      return el.getBoundingClientRect().bottom + this.getDocY() - document.documentElement.offsetTop;
    }
  },
  getDuration: function () {
    const duration = this.target.getAttribute('data-parallax-duration');
    if (duration !== null) {
      return Number(duration)
    }
    return this.elPos.getBottom(this.target);
  },
  getAnimOptions: function () {
    let opts = this.target.getAttribute('data-parallax-animation');
    if (opts !== null) {
      return JSON.parse(opts);
    }
    return {};
  },
  getSpeed: function () {
    const speed = this.target.getAttribute('data-parallax-speed');
    if (speed !== null) {
      return Number(speed)
    }
    return 1;
  },
  enableMobile: function () {
    const enable = this.target.dataset.parallaxMobile;
    if (enable) {
      return enable === "true"
    }
    return true
  },
  addScene: function () {
    this.scene = new ScrollMagic.Scene({
      triggerHook: 'onLeave',
      triggerElement: this.triggeredEl,
      duration: this.getDuration()
    });
    if (this.offset !== 0) {
      this.scene.offset(this.offset);
    }
    if (this.duration) {
      this.scene.duration(this.duration);
    }
    const _parallax = this;
    this.scene.on('progress', function (event) {
      _parallax.timeline.seek(event.progress * 100);
    })
    this.scene.addTo(controller);
    if (mobileTest && !this.enableMobile()) {
      this.scene.remove();
    }
  }
}

function initParallax() {
  const parallaxImgs = document.querySelectorAll('.parallax-img-wrap');
  parallaxImgs.forEach(el => {
    const pi = Object.create(NTParallax);
    const target = el.querySelector('img');
    el.style.height = `${target.getBoundingClientRect().height * 0.85}px`;
    const elHeight = el.getBoundingClientRect().height;
    const translateYTo = target.getBoundingClientRect().height - elHeight;
    const translateYFrom = translateYTo * -1;
    pi.target = target;
    pi.triggeredEl = el;
    pi.offset = window.innerHeight * -1;
    pi.duration = el.getBoundingClientRect().height + window.innerHeight;
    pi.defaultTween = {
      translateY: [`${translateYFrom}px`, `${translateYTo}px`]
    }
    pi.init();
  })

  const parallaxBg = document.querySelectorAll('.parallax-bg');
  parallaxBg.forEach(el => {
    const pi = Object.create(NTParallax);
    pi.target = el;
    pi.triggeredEl = el;
    // pi.offset = 0;
    pi.offset = window.innerHeight * -1;
    pi.duration = el.getBoundingClientRect().height + window.innerHeight;
    pi.defaultTween = {
      backgroundPosition: [`50% 0px`, `50% -100px`]
    }
    pi.init();
  })

  const parallaxEl = document.querySelectorAll('.parallax-el');
  parallaxEl.forEach(el => {
    const pe = Object.create(NTParallax);
    pe.target = el;
    pe.triggeredEl = el.closest('section');
    pe.init();
  })
}

function animeChars() {
  const splittingChars = document.querySelectorAll('.char-effect-1');
  if (splittingChars.length > 0) {
    splittingChars.forEach(el => {
      const charEl = el.querySelectorAll('.char');
      const animeCharEffect1 = anime({
        targets: charEl,
        keyframes: [
          { translateY: '0' },
          { translateY: '-30px' },
          { translateY: '15px' },
          { translateY: '0px' }
        ],
        duration: 1000,
        delay: anime.stagger(50, { start: 2000 }),

        easing: 'easeInOutSine',
        autoplay: true,
        loop: true,
      });
    })
  }
}

const ImageWrap = {
  el: undefined,
  beforeOpenFn: undefined,
  beforeOpenAnimationFn: undefined,
  afterCloseCompleteFn: undefined,
  afterCloseAnimationFn: undefined,
  newWidth: undefined,
  newHeight: undefined,
  init: function () {
    const img = this.el.querySelector('img');
    this.elRect = this.el.getBoundingClientRect();
    this.wrapInitialSize = {
      width: this.elRect.width,
      height: this.elRect.height
    }
    this.newWidth = this.newWidth || 500;
    this.newHeight = this.newHeight || (this.newWidth / this.elRect.width) * this.elRect.height;
    img.addEventListener('click', this.handleImageOnClick.bind(this));
  },
  handleImageOnClick: function (event) {
    const img = event.currentTarget;
    img.classList.toggle('zoomed');
    if (img.classList.contains('zoomed')) {
      this.openImage(img);
    } else {
      this.closeImage(img);
    }
  },
  openImage: function (img) {
    const titleWrap = this.el.querySelector('.title-wrap');
    const imgInfos = this.el.querySelectorAll('.img-info-wrap');
    const imgInfosSpan = this.el.querySelectorAll('.img-info-wrap span');
    const _iw = this;
    const timelineOpen = anime.timeline({
      easing: "easeOutQuint",
      duration: 2000,
      begin: function () {
        if (_iw.beforeOpenFn) {
          _iw.beforeOpenFn();
        }
        titleWrap.style.visibility = 'visible';
        imgInfos.forEach(info => {
          info.style.opacity = '1';
          info.style.visibility = 'visible';
        });
        img.style.pointerEvents = 'none';
      },
      complete: function () {
        img.style.pointerEvents = '';
        _iw.updateCursorInfo('close');
      }
    });

    if (_iw.beforeOpenAnimationFn) {
      _iw.beforeOpenAnimationFn(timelineOpen);
    }

    timelineOpen.add({
      targets: this.el,
      width: `${this.newWidth}px`,
    }, '-=2000')
      // .add({
      //   targets: img,
      //   filter: ['grayscale(1)', 'grayscale(0)'],
      //   duration: 1000,
      // }, '-=1900')
      .add({
        targets: titleWrap.querySelector('.title-container'),
        translateY: ['100%', '0%'],
        duration: 1000,
      }, '-=1200')
      .add({
        targets: imgInfosSpan,
        translateY: ['100%', '0%'],
        duration: 1000,
      }, '-=700')
  },
  closeImage: function (img) {
    const titleWrap = this.el.querySelector('.title-wrap');
    const imgInfos = this.el.querySelectorAll('.img-info-wrap');
    const _iw = this;
    const timelineClose = anime.timeline({
      easing: "easeOutQuint",
      duration: 2000,
      begin: function () {
        img.style.pointerEvents = 'none';
      },
      complete: function () {
        if (_iw.afterCloseCompleteFn) {
          _iw.afterCloseCompleteFn();
        }
        imgInfos.forEach(info => {
          info.style.cssText = '';
        });
        img.style.pointerEvents = '';
        titleWrap.style.removeProperty('visibility');
        _iw.updateCursorInfo('zoom');
      }
    });
    const imgInfosSpan = this.el.querySelectorAll('.img-info-wrap span');
    timelineClose.add({
      targets: imgInfosSpan,
      translateY: ['0%', '100%'],
      duration: 1000
    })
      .add({
        targets: titleWrap.querySelector('.title-container'),
        translateY: ['0%', '100%'],
        duration: 1000
      }, '-=900')
      .add({
        targets: this.el,
        width: this.wrapInitialSize.width,
      }, '-=400')
    // .add({
    //   targets: img,
    //   filter: ['grayscale(0)', 'grayscale(1)'],
    // }, '-=1000');

    if (_iw.afterCloseAnimationFn) {
      _iw.afterCloseAnimationFn(timelineClose);
    }
  },
  updateCursorInfo(info) {
    if (customCursorIns) {
      this.el.dataset.cursor = info;
      customCursorIns.updateInfo(info);
    }
  },
  handleResize() {
    anime({
      targets: this.el,
      width: `${this.newWidth}px`,
      easing: 'cubicBezier(.18,.33,0,.98)',
    })
  }
}

function initParallaxMoveScene() {
  const parallaxMoveScenes = document.querySelectorAll('.parallax-move-scene');
  parallaxMoveScenes.forEach(scene => {
    scene.addEventListener('mousemove', function (e) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const offsetX = 0.5 - (e.pageX - scene.getBoundingClientRect().left) / w;
      const offsetY = 0.5 - (e.pageY - scene.getBoundingClientRect().top) / h;
      const parallaxItems = scene.querySelectorAll('.parallax-move-item:not(.parallax-move-disabled)');
      anime({
        targets: parallaxItems,
        translateX: function (el, i) {
          return `${Math.round(offsetX * parseInt(el.dataset.moveOffset))}px`;
        },
        translateY: function (el, i) {
          return `${Math.round(offsetY * parseInt(el.dataset.moveOffset))}px`;
        },
        easing: 'easeOutCirc',
        duration: 500
      })
    })
  })
}

function initMagneticElements() {
  const magnets = document.querySelectorAll('.magneticEl')
  let strength = 50;
  magnets.forEach((el) => {
    el.addEventListener('mousemove', handleMousemove);
    el.addEventListener('mouseleave', handleMouseleave);
  });

  function handleMousemove(event) {
    var el = event.currentTarget
    var bounding = el.getBoundingClientRect()

    anime({
      targets: el,
      translateX: (((event.clientX - bounding.left) / el.offsetWidth) - 0.5) * strength,
      translateY: (((event.clientY - bounding.top) / el.offsetHeight) - 0.5) * strength,
      easing: 'easeOutCirc',
      duration: 500
    });
  }
  function handleMouseleave(event) {
    var el = event.currentTarget
    anime({
      targets: el,
      translateX: '0px',
      translateY: '0px',
      easing: 'easeOutCirc',
      duration: 500
    });
  }
}

const ImageWrapSlide = {
  slide: undefined,
  sliderEl: undefined,
  swiperInstance: undefined,
  swiperObj: undefined,
  slidePerGroup: 4,
  imageMaxWidth: 500,
  siblingSlideInners: [],
  init: function () {
    if (this.slide) {
      this.wrap = this.slide.querySelector('.img-wrap-s4');
      this.slideInner = this.slide.querySelector('.swiper-slide-inner');
      this.slideInnerInitialStyle = {
        width: this.slideInner.style.getPropertyValue('width'),
        margin: this.slideInner.style.getPropertyValue('margin')
      }
      this.slideInnerInitialSize = {
        with: this.slideInner.getBoundingClientRect().width
      }
      this.slideRect = this.slide.getBoundingClientRect();
      this.slideInitialSize = {
        width: this.slideRect.width,
        height: this.slideRect.height,
      }
      this.siblingSlides = this.swiperObj.slides.filter(s => s != this.slide && !s.classList.contains('swiper-slide-blank'));
      this.siblingSlideInners = this.siblingSlides.map(s => s.querySelector('.swiper-slide-inner'));
      this.slideIndex = this.slide.dataset.swiperSlideIndex;

      this.wrap.style.width = `${this.wrap.getBoundingClientRect().width}px`;

      this.wrapInstance = Object.create(ImageWrap);
      this.wrapInstance.el = this.wrap;
      this.wrapInstance.beforeOpenFn = this.beforeOpen.bind(this);
      this.wrapInstance.afterCloseCompleteFn = this.afterCloseComplete.bind(this);
      this.wrapInstance.beforeOpenAnimationFn = this.beforeOpenAnimation.bind(this);
      this.wrapInstance.afterCloseAnimationFn = this.afterCloseAnimation.bind(this);
      this.wrapInstance.newWidth = this.getWidth();
      this.wrapInstance.init();
    }
  },
  beforeOpen: function () {
    this.slide.style.zIndex = '9';
    this.slide.style.height = `${this.slideInitialSize.height}px`;
    this.sliderEl.classList.add('active');
    this.slideInner.classList.add('active');
    this.swiperInstance.disable();
    this.siblingSlides.forEach(s => {
      s.style.pointerEvents = 'none'
    })
  },
  beforeOpenAnimation: function (timeline) {
    timeline
      .add({
        targets: this.siblingSlideInners,
        opacity: [1, 0.5],
        scale: [1, 0.8],
      })
      .add({
        targets: this.slideInner,
        translateY: this.getSlideInnerPosY.bind(this),
        translateX: this.getSlideInnerPosX.bind(this),
        width: '100%',
        margin: '0% auto',
      }, '-=2000')
  },
  afterCloseComplete: function () {
    this.slide.style.removeProperty('z-index');
    this.slide.style.removeProperty('height');
    this.sliderEl.classList.remove('active');
    this.slideInner.classList.remove('active');
    this.swiperInstance.enable();
    this.siblingSlides.forEach(s => {
      s.style.pointerEvents = ''
    })
  },
  afterCloseAnimation: function (timeline) {
    timeline
      .add({
        targets: this.slideInner,
        translateY: '0px',
        translateX: '0px',
        width: this.slideInnerInitialStyle.width,
        margin: this.slideInnerInitialStyle.margin
      }, '-=1950')
      .add({
        targets: this.siblingSlideInners,
        opacity: [0.5, 1],
        scale: [0.8, 1],
        duration: 1000,
        easing: 'cubicBezier(.58,.42,.14,1.03)',
      }, '-=1100')
  },
  getSlideInnerPosX: function () {
    const slideInnerPosX = this.slide.getBoundingClientRect().x;
    return `${((window.innerWidth - this.getWidth()) / 2) - slideInnerPosX}px`;
  },

  getSlideInnerPosY: function () {
    const extraHeight = window.innerWidth < 992 ? 100 : 0;
    const slideInnerPosY = (window.innerHeight - this.getHeight() - extraHeight) / 2;
    return `${((this.slideRect.y - slideInnerPosY) * -1)}px`;
  },

  getWidth: function () {
    let width = 0.75 * window.innerWidth;
    width = width > this.imageMaxWidth ? this.imageMaxWidth : width;
    return width;
  },

  getHeight: function () {
    return this.slideInitialSize.height * (this.getWidth() / this.slideInitialSize.width)

  },
  handleWindowResize: function () {
    this.wrapInstance.newWidth = this.getWidth();
    if (this.wrap.closest('.swiper-slide-inner.active')) {
      anime({
        targets: this.slideInner,
        translateY: this.getSlideInnerPosY(),
        translateX: this.getSlideInnerPosX(),
        easing: 'cubicBezier(.18,.33,0,.98)',
      });
      anime({
        targets: this.wrap,
        width: `${this.getWidth()}px`,
        easing: 'cubicBezier(.18,.33,0,.98)',
      });
      this.wrapInstance.wrapInitialSize.width = this.slideInner.getBoundingClientRect().width * (parseFloat(this.slideInnerInitialStyle.width) / 100);
      // if image is zoomed
      this.wrapInstance.handleResize();
    } else {
      this.slideInner.style.transform = 'scale(1)';
      anime({
        targets: this.wrap,
        width: `${this.slide.querySelector('.swiper-slide-inner').getBoundingClientRect().width}px`,
        easing: 'cubicBezier(.18,.33,0,.98)',
      });
    }
  }

}

function initSliderS1() {
  const sliders = document.querySelectorAll('.slider-s1');
  sliders.forEach(slider => {
    const nextBtn = slider.querySelector('.nav-next');
    const prevBtn = slider.querySelector('.nav-prev');
    const swiperEl = slider.querySelector('.swiper');
    const paginationEl = slider.querySelector('.swiper-s1-pagination');
    const paginationContainer = slider.querySelector('.swiper-pagination-container');
    const swiperObj = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1500,
      mousewheel: true,
      mousewheelControl: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn
      },
      pagination: {
        el: paginationEl,
        type: 'fraction'
      },
      on: {
        beforeInit: handleBeforeInit,
        afterInit: handleAfterInit,
        scroll: function (swiper) {
          console.log('scroll');
        }
      }
    })
    swiperObj.on('beforeTransitionStart', handleBeforeTransitionStart);
    swiperObj.on('slideChangeTransitionEnd', handleSlideChangeTransitionEnd);

    function handleBeforeInit(swiper) {
      const firstSlide = slider.querySelectorAll('.swiper-slide')[0];
      firstSlide.style.opacity = 0;
    }
    function handleAfterInit(swiper) {
      const activeSlide = swiper.slides.filter(s => s.classList.contains('swiper-slide-active'))[0];
      const spanInfo = activeSlide.querySelectorAll('.img-info span')
      setTimeout(() => {
        const afterInitTimeline = anime.timeline({
          easing: 'easeOutCubic',
          duration: 2000,
          begin: function () {
            activeSlide.classList.add('swiper-slide-showtext');
          }
        });
        afterInitTimeline
          .add({
            targets: activeSlide,
            scale: [0.7, 1],
            opacity: [0, 1]
          })
          .add({
            targets: spanInfo,
            translateY: ['100%', '0%'],
            duration: 1000
          }, '-=500')
      }, 2000);

      setTimeout(() => {
        if (paginationContainer) {
          paginationContainer.classList.remove('opacity-0');
        }
      }, 4000)
    }
    function handleBeforeTransitionStart(swiper) {
      const currentSlide = swiper.slides.filter(s => s.classList.contains('swiper-slide-active'))[0];
      const beforeTransitionStartTimeline = anime.timeline({
        easing: 'easeOutCubic',
        duration: 2000,
        complete: function () {
          swiper.slides.filter(s => s !== currentSlide).forEach(slide => {
            slide.classList.remove('swiper-slide-showtext');
            slide.querySelectorAll('.img-info span').forEach(info => {
              info.style.removeProperty('transform');
            })
          })
        }
      });
      beforeTransitionStartTimeline
        .add({
          targets: currentSlide,
          scale: [1, 0.7],
        })
    }
    function handleSlideChangeTransitionEnd(swiper) {
      const currentSlide = swiper.slides.filter(s => s.classList.contains('swiper-slide-active'))[0];
      const spanInfo = currentSlide.querySelectorAll('.img-info span')
      const transitionEndTimeline = anime.timeline({
        easing: 'easeOutCubic',
        duration: 2000,
        begin: function () {
          setTimeout(() => {

            currentSlide.classList.add('swiper-slide-showtext');
          }, 500)
        }
      });
      transitionEndTimeline
        .add({
          targets: currentSlide,
          scale: [0.7, 1],
        })
        .add({
          targets: spanInfo,
          translateY: ['100%', '0%'],
          duration: 1000
        }, '-=500')
    }
  })
}

function initSliderS2() {
  const sliders = document.querySelectorAll('.slider-s2');
  let sliderCurrentWidowWidth = window.innerWidth;
  sliders.forEach(slider => {
    const handleSliderOnResize = function (swiper) {
      if (window.innerWidth !== sliderCurrentWidowWidth) {
        slideElements.forEach(el => {
          el.imageWrapInstance.slideRect = el.slide.getBoundingClientRect();
          el.imageWrapInstance.slidePerGroup = swiper.loopedSlides;
          el.imageWrapInstance.handleWindowResize();
        })
        sliderCurrentWidowWidth = window.innerWidth;
      }
    }
    const swiperEl = slider.querySelector('.swiper');
    const slidePerGroup = 4;
    const slideElements = [];
    const slider6Instance = new Swiper(swiperEl, {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 0,
      loop: true,
      speed: 2000,
      navigation: {
        nextEl: slider.querySelector('.nav-next'),
        prevEl: slider.querySelector('.nav-prev'),
        clickable: true,
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
      },
      breakpoints: {
        768: {
          slidesPerGroup: 3,
          slidesPerView: 3,
          spaceBetween: 0,
        },
        992: {
          slidesPerGroup: slidePerGroup,
          slidesPerView: slidePerGroup,
          spaceBetween: 0,
        }
      },
      on: {
        init: function (swiper) {
          swiper.slides.filter(s => !s.classList.contains('swiper-slide-blank')).forEach((slide, i) => {
            const inner = slide.querySelector('.swiper-slide-inner');
            if ((i + 1) % 2 === 0) {
              inner.style.width = '75%';
              inner.style.margin = '15% auto';
            } else {
              inner.style.width = '100%';
              inner.style.margin = '0';
            }
          })
          setTimeout(() => {
            swiper.slides.filter(s => !s.classList.contains('swiper-slide-blank')).forEach((slide, i) => {
              const ImageWrapSlideInstance = Object.create(ImageWrapSlide);
              ImageWrapSlideInstance.slide = slide;
              ImageWrapSlideInstance.sliderEl = slider;
              ImageWrapSlideInstance.swiperInstance = slider6Instance;
              ImageWrapSlideInstance.swiperObj = swiper;
              ImageWrapSlideInstance.slidePerGroup = swiper.loopedSlides;
              ImageWrapSlideInstance.init();
              slideElements.push({ slide: slide, imageWrapInstance: ImageWrapSlideInstance });
            });
          }, 3500);
        },
        resize: debounce(handleSliderOnResize)
      }
    })
    slider6Instance
      .on('slideChangeTransitionStart', function (swiper) {
        const imgXPos = swiper.realIndex > swiper.previousIndex ? '25px' : '-25px';
        swiper.slides.filter(s => !s.classList.contains('swiper-slide-blank')).forEach(slide => {
          const animeBeforeTransition = anime.timeline({});
          animeBeforeTransition
            .add({
              targets: slide,
              scale: [1, 0.7],
              easing: 'easeOutCirc',
              duration: 2000
            })
            .add({
              targets: slide.querySelector('img'),
              translateX: ['0px', imgXPos],
              easing: 'easeInOutQuart',
              duration: 2000
            }, '-=1900')
        })
      })
      .on('slideChangeTransitionEnd', function (swiper) {
        const imgXPos = swiper.realIndex > swiper.previousIndex ? '25px' : '-25px';
        swiper.slides.filter(s => !s.classList.contains('swiper-slide-blank')).forEach(slide => {
          const animeTransitionEnd = anime.timeline({});
          animeTransitionEnd
            .add({
              targets: slide,
              scale: [0.7, 1],
              easing: 'cubicBezier(.18,.33,0,.98)',
              duration: 2000
            })
            .add({
              targets: slide.querySelector('img'),
              translateX: [imgXPos, '0px'],
              easing: 'cubicBezier(.18,.33,0,.98)',
              duration: 2000
            }, '-=1900')
        })
      });
  });
}

function initSliderS3() {
  const slider3Els = document.querySelectorAll('.slider-s3');
  slider3Els.forEach(slider => {
    const swiperEl = slider.querySelector('.swiper');
    const slider3Instance = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      // autoplay: {
      //   delay: 5000,
      // },
      speed: 1000,
      navigation: {
        nextEl: slider.querySelector('.nav-next'),
        prevEl: slider.querySelector('.nav-prev'),
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 32,
        }
      },
    })
  })
}

function initSliderS4() {
  const slider4Els = document.querySelectorAll('.slider-s4');
  slider4Els.forEach(slider => {
    const swiperEl = slider.querySelector('.swiper');
    const slider4Instance = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      speed: 1000,
      navigation: {
        nextEl: slider.querySelector('.nav-next'),
        prevEl: slider.querySelector('.nav-prev'),
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        }
      },
    })
  });
}

function initSliderS5() {
  const slider5Els = document.querySelectorAll('.slider-s5');
  slider5Els.forEach(slider => {
    const swiperEl = slider.querySelector('.swiper');
    const slider4Instance = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 32,
      centeredSlides: true,
      loop: true,
      speed: 2000,
      navigation: {
        nextEl: slider.querySelector('.nav-next'),
        prevEl: slider.querySelector('.nav-prev'),
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 0,
        }
      },
    })
  });
}

function debounce(func, timeout = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => func.apply(this, args), timeout);
  };
}

function initBackToTop() {
  const btnBack = document.querySelector('.back-to-top');
  if (btnBack) {
    btnBack.addEventListener('click', function () {
      lenis.scrollTo('main');
    });
  }
}

function preloader() {
  const preloader = document.querySelector('.preloader');
  const finishedAnim = function () {
    initWow();
    setTimeout(() => {
      preloader.classList.add('d-none');
      preloader.remove();
    }, 1000);
  }

  const loaderAnimation = anime.timeline({
    targets: preloader,
    delay: 1000,
    duration: 1000,
    // easing: 'easeOutExpo',
    easing: 'easeInQuart',
  }).add({
    translateY: '-100%'
  });
  loaderAnimation.finished.then(finishedAnim);
}

function stickyHeader() {
  const siteHeader = document.querySelector('.site-header')
  const easing = 'easeOutCubic';
  if (siteHeader) {
    if (window.scrollY > 0) {
      if (window.scrollY < lastScrollPos) {
        anime({
          targets: siteHeader,
          top: '0',
          easing: easing,
        })
        siteHeader.classList.add('body-scrolled');
      } else {
        siteHeader.classList.remove('body-scrolled');
        anime({
          targets: siteHeader,
          top: '-100%',
          easing: easing,
        })
      }
    } else {
      anime({
        targets: siteHeader,
        top: '0',
        easing: easing,
      })
      siteHeader.classList.remove('body-scrolled');
    }
    lastScrollPos = window.scrollY;
  }
}

function initPortfolioMasonry() {
  // init Masonry
  const portfolioMasonry = document.querySelector('.portfolio-masonry');
  if (portfolioMasonry) {

    var msnry = new Masonry(portfolioMasonry, {
      itemSelector: '.grid-item',
      // columnWidth: '.grid-sizer',
      percentPosition: true
    });

    // imagesLoaded(grid).on('progress', function () {
    //   // layout Masonry after each image loads
    // });
    msnry.layout();
  }
}