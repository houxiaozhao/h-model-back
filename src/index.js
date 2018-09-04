let hModelBack = {};
hModelBack.install = function(Vue, options) {
  Vue.directive('h-model-back', {
    bind(el, binding, vnode, oldVnode) {
      let getPushURL = () => {
        let array = [window.location.href.split('#')[0], window.location.hash];
        array.push(window.location.hash ? (window.location.href.indexOf('?') === -1 ? '?' : '&') : '#');
        array.push(
          'popup=' +
            Math.random()
              .toString(36)
              .substr(2)
        );
        return array.join('');
      };
      let handlePopstate = () => {
        vnode.context[binding.expression] = false;
        window.removeEventListener('popstate', handlePopstate);
      };
      let pushHistory = () => {
        if (window.location.href.indexOf('popup=') > -1) {
          window.history.back();
        }
        setTimeout(() => {
          window.history.pushState({}, '', getPushURL());
          window.addEventListener('popstate', handlePopstate);
        }, 16);
      };
      vnode.context.$watch(binding.arg, function(n) {
        if (n) {
          pushHistory();
        } else {
          window.removeEventListener('popstate', handlePopstate);
          window.location.href.indexOf('popup=') > -1 && history.back();
        }
      });
    }
  });
};
export default hModelBack;
