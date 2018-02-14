/* eslint-disable */
window.onload = () => {
	document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://vimchat-development.firebaseapp.com/css/vimchat-button.css" type="text/css"/>';
	
	const btn = ` <div class="btn-block" style="z-index:1000; position:fixed; bottom:10px">
        <a hrer="#" class="btn-send show-modal" data-handle="ggg" data-production="true">Instant message</a>
    </div>`;
	
	document.body.innerHTML += btn;
	
	
	
	
  const ua = navigator.userAgent.toLowerCase();
  const bots = (/(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i);
  class BrowserDetect {
    constructor() {
      this.browsers = {
        opera: (/opera/i.test(ua) || /opr/i.test(ua)),
        msie: ((/msie/i.test(ua) && !/opera/i.test(ua)) || /trident\//i.test(ua)) || /edge/i.test(ua),
        msie6: (/msie 6/i.test(ua) && !/opera/i.test(ua)),
        msie7: (/msie 7/i.test(ua) && !/opera/i.test(ua)),
        msie8: (/msie 8/i.test(ua) && !/opera/i.test(ua)),
        msie9: (/msie 9/i.test(ua) && !/opera/i.test(ua)),
        msie_edge: (/edge/i.test(ua) && !/opera/i.test(ua)),
        mozilla: /firefox/i.test(ua),
        chrome: /chrome/i.test(ua) && !/edge/i.test(ua),
        safari: (!(/chrome/i.test(ua)) && /webkit|safari|khtml/i.test(ua)),
        iphone: /iphone/i.test(ua),
        ipod: /ipod/i.test(ua),
        iphone4: /iphone.*OS 4/i.test(ua),
        ipod4: /ipod.*OS 4/i.test(ua),
        ipad: /ipad/i.test(ua),
        android: /android/i.test(ua),
        bada: /bada/i.test(ua),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(ua),
        msie_mobile: /iemobile/i.test(ua),
        safari_mobile: /iphone|ipod|ipad/i.test(ua),
        opera_mobile: /opera mini|opera mobi/i.test(ua),
        opera_mini: /opera mini/i.test(ua),
        mac: /mac/i.test(ua),
        search_bot: bots.test(ua),
      };

      (ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[/: ]([\d.]+)/) || [0, '0'])[1] = this.version;
    }

    isBrowser() {
      const browserKeys = Object.keys(this.browsers);
      let browserName;

      for (let i = 0; i < browserKeys.length; i += 1) {
        if (this.browsers[browserKeys[i]]) browserName = browserKeys[i];
      }

      return browserName;
    }

    isIos() {
      return !!((
        this.browsers.iphone ||
        this.browsers.ipod ||
        this.browsers.iphone4 ||
        this.browsers.ipod4 ||
        this.browsers.ipad));
    }

    isAndroid() {
      return !!this.browsers.android;
    }

    isMobile() {
      return !!this.browsers.mobile;
    }

    isIe(versionIe) {
      if (!versionIe) {
        return !!this.browsers.msie;
      }

      if (versionIe >= 6 && versionIe <= 9) {
        return !!this.browsers[`msie${versionIe}`];
      }
      throw new Error('BrowserDetect dont support this version ie.');
    }

    isEdge() {
      return !!this.browsers.msie_edge;
    }

    isOpera() {
      return !!this.browsers.opera;
    }

    isChrome() {
      return !!this.browsers.chrome;
    }

    isMozilla() {
      return !!this.browsers.mozilla;
    }

    isSafari() {
      return !!this.browsers.safari;
    }
  }
  const browserDetect = new BrowserDetect();
  const showModal = document.querySelector('.show-modal');

  const developSettings = {
    link: 'http://fakseurl/getSmsToShortCode',
    number: '+18442031976',
  };

  const productionSettings = {
    link: 'https://fakseurl/api/sms/getSmsToShortCode',
    number: '77888',
  };

  const search = window.location.search.substr(1);
  const parametersUrl = {};

  search.split('&').forEach((item) => {
    const itemLink = item.split('=');
    const key = itemLink[0];
    const value = itemLink[1];
    parametersUrl[key] = value;
  });

  const handle = parametersUrl.handle || showModal.dataset.handle;

  if (!handle) {
    alert('Please write in link handle business');
    return false;
  }

  const isProduction = showModal.dataset.production;
  let settings;

  if (isProduction === 'false') {
    settings = developSettings;
  } else if (isProduction === 'true') {
    settings = productionSettings;
  } else {
    alert('No correct settings');
    return false;
  }

  const openModal = () => {
    localStorage.removeItem('vimchat-modal-status');
    const win = window.open('', 'myWindow', 'width=540,height=480');
    win.document.body.innerHTML = `
  <html>
  <head>
    <title>Text us!</title>
    <link rel='stylesheet' type='text/css' href='https://vimchat-development.firebaseapp.com/css/vimchat-button.css'>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>
    <body>
      <section class='window'>
        <div class="flex-center">
        <p class="vimchat-paragraph">Add your mobile phone number<br>
        and we will send you a secure text<br>
        to get the conversation started.
        </p>
          <form enctype='application/json' action='${settings.link}' method='post'>
            <input type="hidden" name="To" value='${settings.number}' >
            <input
              type="hidden"
              name="Body"
              value="@${handle} customer contacted you through website"
            />
            <input
              type='text'
              name='From'
              class='tel'
              placeholder='Enter mobile number'
              required
             />
            <button type='submit'>send</button>
            <div class='error'></div>
            <div id='loading-vimchat' style='text-align: center; display: none;'>
              <img src='https://firebasestorage.googleapis.com/v0/b/vimchat-development.appspot.com/o/index.ajax-spinner-preloader.gif?alt=media&token=df7f1836-4ec4-4d64-8cc8-28bebf2f96d6' />
            </div>
          </form>
          <p><small>powered by</small></p>
          <img src='https://firebasestorage.googleapis.com/v0/b/vimchat-development.appspot.com/o/logo.png?alt=media&token=2f2160a5-3a51-401b-9342-ca0e925c1dd4' alt='logo vimchat' class='logo'>
        </div>
      </section>
    </body>
  </html>
     `;
	 
	 
	
    const error = win.document.querySelector('.error');
    const form = win.document.querySelector('form');
    const phone = win.document.querySelector('.tel');

    const validate = (e) => {
      const reg = /(\d{3})(\d{3})(\d{2})(\d{2})/;
      const x = e.target.value.replace(/\D/g, '').match(reg);

      if (!x) {
        return false;
      }

      if (e.target.value.length >= 10) {
        e.target.value = `(${x[1]}) ${x[2]}-${x[3]}${x[4]}`;
      }

      return e.target.value;
    };

    phone.onkeyup = e => validate(e);

    const formating = (phoneNumber) => {
      const numbers = [];
      for (let i = 0; i < phoneNumber.length; i += 1) {
        const letter = phoneNumber[i];
        const num = parseInt(letter, 10);
        if (!(letter === ' ') && !Number.isNaN(num)) {
          numbers.push(num);
        }
      }
      return `+1${numbers.join('')}`;
    };

    const post = (url, requestuestBody) => new Promise((succeed, fail) => {
      const request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.addEventListener('load', () => {
        if (request.status < 400) {
          succeed(request.responseText);
        } else {
          fail(new Error(request.responseText));
        }
      });
      request.addEventListener('error', () => {
        fail(new Error('Network error'));
      });
      request.send(requestuestBody);
    });

    form.onsubmit = (e) => {
      e.preventDefault();
      const reg = /(\d{3})(\d{3})(\d{2})(\d{2})/;
      const x = phone.value.replace(/\D/g, '').match(reg);
      if (!x) {
        error.innerHTML = 'Please enter format (234) 567-8901';
        return false;
      }

      const elements = e.target;
      phone.value = formating(phone.value);

      const body = {
        To: elements[0].value,
        Body: elements[1].value,
        From: phone.value,
      };

      const json = JSON.stringify(body);
      const loading = win.document.querySelector('#loading-vimchat');
      loading.style.display = 'block';
      post(settings.link, json).then(() => {
        loading.style.display = 'none';
        localStorage.setItem('vimchat-modal-status', 'closed');
        win.close();
        // setTimeout(() => {
        //   localStorage.setItem('vimchat-modal-status', 'close');
        //   win.close();
        // }, 2000);
        error.innerHTML = '';
      }).catch((e) => {
        const res = JSON.parse(e.message);
        if (res.error) {
          error.innerHTML = res.error;
          return false;
        }

        if (res.code === 21211) {
          error.innerHTML = 'The number is not valid.';
          return false;
        }
        return false;
      });

      return true;
    };
    return null;
  };
  const messageText = `@${handle} `;

  if (browserDetect.isAndroid()) {
    showModal.href = `sms:${settings.number}?body=${encodeURI(messageText)}`;
    showModal.textContent = 'Questions? Text Us';
  } else if (browserDetect.isIos()) {
    showModal.href = `sms://${settings.number}/&body=${encodeURI(messageText)}`;
    showModal.textContent = 'Questions? Text Us';
  } else {
    // showModal.textContent = 'Instant message';
    showModal.addEventListener('click', openModal);
  }

  return null;
};
