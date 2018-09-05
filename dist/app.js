'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

var _qqmapWxJssdk = require('./utils/qqmap-wx-jssdk.js');

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this2 = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this2.config = {
      'pages': ['pages/index', 'pages/check', 'pages/service', 'pages/shop', 'pages/order', 'pages/refund_result', 'pages/ucenter/index', 'pages/ucenter/detail', 'pages/ucenter/idcard'],
      'window': {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      'tabBar': {
        'backgroundColor': '#fafafa',
        'borderStyle': 'white',
        'selectedColor': '#b4282d',
        'color': '#666',
        'list': [{
          'pagePath': 'pages/index',
          'text': '首页',
          'iconPath': './static/image/home.png',
          'selectedIconPath': './static/image/home.png'
        }, {
          'pagePath': 'pages/service',
          'text': '服务',
          'iconPath': './static/image/service.png',
          'selectedIconPath': './static/image/service.png'
        }, {
          'pagePath': 'pages/ucenter/index',
          'text': '我的',
          'iconPath': './static/image/ucenter.png',
          'selectedIconPath': './static/image/ucenter.png'
        }]
      },
      // 需要修改为Promise形式的wxAPI
      'promisify': ['scanCode', 'switchTab', 'navigateTo', 'showModal', 'uploadFile', 'chooseImage', 'getLocation']
    };
    _this2.globalData = {
      userInfo: null
    };

    _this2.Format = function (fmt) {
      var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
      }
      return fmt;
    };

    _this2.LeftTimer = function (timestamp) {
      this.time = {};
      // 将0-9的数字前面加上0，例1变为01
      this.checkTime = function (i) {
        if (i < 10) {
          i = '0' + i;
        } else {
          i = '' + i;
        }
        return i;
      };
      // 检测是否为 '00'
      this.isEmpty = function (x) {
        if (x === '00') {
          return true;
        }
      };
      // 如“00小时00分钟10秒”这种格式,将转换为“10秒”
      this.checkZero = function () {
        var _this = this;
        var haveFirstNotEmptyValue = false;

        Object.keys(_this.time).forEach(function (key) {
          if (_this.isEmpty(_this.time[key])) {
            _this[key + '_str'] = '';
            if (haveFirstNotEmptyValue) {
              _this[key + '_str'] = _this[key + '_str'];
            }
          } else {
            _this[key + '_str'] = _this[key + '_str'];
            haveFirstNotEmptyValue = true;
          }
        });
      };

      var _this = this;

      this.time.days = parseInt(timestamp / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
      this.time.hours = parseInt(timestamp / 1000 / 60 / 60 % 24, 10); // 计算剩余的小时
      this.time.minutes = parseInt(timestamp / 1000 / 60 % 60, 10); // 计算剩余的分钟
      this.time.seconds = parseInt(timestamp / 1000 % 60, 10); // 计算剩余的秒数

      Object.keys(_this.time).forEach(function (key) {
        _this.time[key] = _this.checkTime(_this.time[key]);
      });

      this['days_str'] = this.time['days'] + '天';
      this['hours_str'] = this.time['hours'] + '小时';
      this['minutes_str'] = this.time['minutes'] + '分钟';
      this['seconds_str'] = this.time['seconds'] + '秒';

      this.checkZero();
      this.string = '' + this['days_str'] + this['hours_str'] + this['minutes_str'] + this['seconds_str'];
    };

    _this2.use('requestfix');
    return _this2;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var _this3 = this;

      // 函数Promise化
      this.config['promisify'].forEach(function (item) {
        wx[item + 'P'] = _this3.wxPromisify(wx[item]);
      });

      Object.assign(Date.prototype, { Format: this.Format });
      Object.assign(Date.prototype, { LeftTimer: this.LeftTimer });
    }

    // 日期格式化


    // 用时

  }, {
    key: 'wxPromisify',
    value: function wxPromisify(fn) {
      return function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return new Promise(function (resolve, reject) {
          obj.success = function (res) {
            console.log('Promise success 返回参数：', res);
            resolve(res);
          };
          obj.fail = function (res) {
            console.warn('Promise fail 返回参数：', res);
            reject(res);
          };
          fn(obj); // 执行函数，obj为传入函数的参数
        });
      };
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJGb3JtYXQiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJMZWZ0VGltZXIiLCJ0aW1lc3RhbXAiLCJ0aW1lIiwiY2hlY2tUaW1lIiwiaSIsImlzRW1wdHkiLCJ4IiwiY2hlY2taZXJvIiwiX3RoaXMiLCJoYXZlRmlyc3ROb3RFbXB0eVZhbHVlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJkYXlzIiwicGFyc2VJbnQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyaW5nIiwidXNlIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJhc3NpZ24iLCJEYXRlIiwicHJvdG90eXBlIiwiZm4iLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsIndhcm4iLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQStERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBNURmQyxNQTREZSxHQTVETjtB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Q0Q7O0FBRUQ7OztBQXNCQTs7OztnQ0F3RFkyQixFLEVBQUk7QUFDZCxhQUFPLFlBQW9CO0FBQUEsWUFBVkMsR0FBVSx1RUFBSixFQUFJOztBQUN6QixlQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENILGNBQUlJLE9BQUosR0FBYyxVQUFVQyxHQUFWLEVBQWU7QUFDM0JDLG9CQUFRQyxHQUFSLENBQVksdUJBQVosRUFBcUNGLEdBQXJDO0FBQ0FILG9CQUFRRyxHQUFSO0FBQ0QsV0FIRDtBQUlBTCxjQUFJUSxJQUFKLEdBQVcsVUFBVUgsR0FBVixFQUFlO0FBQ3hCQyxvQkFBUUcsSUFBUixDQUFhLG9CQUFiLEVBQW1DSixHQUFuQztBQUNBRixtQkFBT0UsR0FBUDtBQUNELFdBSEQ7QUFJQU4sYUFBR0MsR0FBSCxFQVRzQyxDQVM5QjtBQUNULFNBVk0sQ0FBUDtBQVdELE9BWkQ7QUFhRDs7O2dDQUVXVSxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUs1RCxVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRDRELHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZULGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNaTSxlQUFLNUQsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJxRCxJQUFJckQsUUFBL0I7QUFDQTBELGdCQUFNQSxHQUFHTCxJQUFJckQsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7O0VBckwwQjRELGVBQUtFLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuXHJcbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcclxuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXHJcbmltcG9ydCBRUU1hcFdYIGZyb20gJy4vdXRpbHMvcXFtYXAtd3gtanNzZGsnO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXHJcbnNldFN0b3JlKHN0b3JlKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgJ3BhZ2VzJzogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvY2hlY2snLFxyXG4gICAgICAncGFnZXMvc2VydmljZScsXHJcbiAgICAgICdwYWdlcy9zaG9wJyxcclxuICAgICAgJ3BhZ2VzL29yZGVyJyxcclxuICAgICAgJ3BhZ2VzL3JlZnVuZF9yZXN1bHQnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9pbmRleCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2RldGFpbCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2lkY2FyZCdcclxuICAgIF0sXHJcbiAgICAnd2luZG93Jzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICB9LFxyXG4gICAgJ3RhYkJhcic6IHtcclxuICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICcjZmFmYWZhJyxcclxuICAgICAgJ2JvcmRlclN0eWxlJzogJ3doaXRlJyxcclxuICAgICAgJ3NlbGVjdGVkQ29sb3InOiAnI2I0MjgyZCcsXHJcbiAgICAgICdjb2xvcic6ICcjNjY2JyxcclxuICAgICAgJ2xpc3QnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+mmlumhtScsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvc2VydmljZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmnI3liqEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL3VjZW50ZXIvaW5kZXgnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5oiR55qEJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICAvLyDpnIDopoHkv67mlLnkuLpQcm9taXNl5b2i5byP55qEd3hBUElcclxuICAgICdwcm9taXNpZnknOiBbXHJcbiAgICAgICdzY2FuQ29kZScsXHJcbiAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAnbmF2aWdhdGVUbycsXHJcbiAgICAgICdzaG93TW9kYWwnLFxyXG4gICAgICAndXBsb2FkRmlsZScsXHJcbiAgICAgICdjaG9vc2VJbWFnZScsXHJcbiAgICAgICdnZXRMb2NhdGlvbidcclxuICAgIF1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlh73mlbBQcm9taXNl5YyWXHJcbiAgICB0aGlzLmNvbmZpZ1sncHJvbWlzaWZ5J10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxyXG4gICAgfSlcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLCB7IEZvcm1hdDogdGhpcy5Gb3JtYXQgfSlcclxuICAgIE9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUsIHsgTGVmdFRpbWVyOiB0aGlzLkxlZnRUaW1lciB9KVxyXG4gIH1cclxuXHJcbiAgLy8g5pel5pyf5qC85byP5YyWXHJcbiAgRm9ybWF0ID0gZnVuY3Rpb24oZm10KSB7XHJcbiAgICBjb25zdCBvID0ge1xyXG4gICAgICAnTSsnOiB0aGlzLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAnZCsnOiB0aGlzLmdldERhdGUoKSxcclxuICAgICAgJ2grJzogdGhpcy5nZXRIb3VycygpLFxyXG4gICAgICAnbSsnOiB0aGlzLmdldE1pbnV0ZXMoKSxcclxuICAgICAgJ3MrJzogdGhpcy5nZXRTZWNvbmRzKCksXHJcbiAgICAgICdxKyc6IE1hdGguZmxvb3IoKHRoaXMuZ2V0TW9udGgoKSArIDMpIC8gMyksXHJcbiAgICAgICdTJzogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxyXG4gICAgfVxyXG4gICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIHtcclxuICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpXHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBrIGluIG8pIHtcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmbXQpKSB7XHJcbiAgICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PT0gMSkgPyAob1trXSkgOiAoKCcwMCcgKyBvW2tdKS5zdWJzdHIoKCcnICsgb1trXSkubGVuZ3RoKSkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmbXRcclxuICB9XHJcblxyXG4gIC8vIOeUqOaXtlxyXG4gIExlZnRUaW1lciA9IGZ1bmN0aW9uKHRpbWVzdGFtcCkge1xyXG4gICAgdGhpcy50aW1lID0ge31cclxuICAgIC8vIOWwhjAtOeeahOaVsOWtl+WJjemdouWKoOS4ijDvvIzkvosx5Y+Y5Li6MDFcclxuICAgIHRoaXMuY2hlY2tUaW1lID0gZnVuY3Rpb24oaSkge1xyXG4gICAgICBpZiAoaSA8IDEwKSB7XHJcbiAgICAgICAgaSA9ICcwJyArIGlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpID0gJycgKyBpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGlcclxuICAgIH1cclxuICAgIC8vIOajgOa1i+aYr+WQpuS4uiAnMDAnXHJcbiAgICB0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbih4KSB7XHJcbiAgICAgIGlmICh4ID09PSAnMDAnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5aaC4oCcMDDlsI/ml7YwMOWIhumSnzEw56eS4oCd6L+Z56eN5qC85byPLOWwhui9rOaNouS4uuKAnDEw56eS4oCdXHJcbiAgICB0aGlzLmNoZWNrWmVybyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXNcclxuICAgICAgbGV0IGhhdmVGaXJzdE5vdEVtcHR5VmFsdWUgPSBmYWxzZVxyXG5cclxuICAgICAgT2JqZWN0LmtleXMoX3RoaXMudGltZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChfdGhpcy5pc0VtcHR5KF90aGlzLnRpbWVba2V5XSkpIHtcclxuICAgICAgICAgIF90aGlzW2tleSArICdfc3RyJ10gPSAnJ1xyXG4gICAgICAgICAgaWYgKGhhdmVGaXJzdE5vdEVtcHR5VmFsdWUpIHtcclxuICAgICAgICAgICAgX3RoaXNba2V5ICsgJ19zdHInXSA9IF90aGlzW2tleSArICdfc3RyJ11cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX3RoaXNba2V5ICsgJ19zdHInXSA9IF90aGlzW2tleSArICdfc3RyJ11cclxuICAgICAgICAgIGhhdmVGaXJzdE5vdEVtcHR5VmFsdWUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG5cclxuICAgIHRoaXMudGltZS5kYXlzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCwgMTApIC8vIOiuoeeul+WJqeS9meeahOWkqeaVsFxyXG4gICAgdGhpcy50aW1lLmhvdXJzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAvIDYwIC8gNjAgJSAyNCwgMTApIC8vIOiuoeeul+WJqeS9meeahOWwj+aXtlxyXG4gICAgdGhpcy50aW1lLm1pbnV0ZXMgPSBwYXJzZUludCh0aW1lc3RhbXAgLyAxMDAwIC8gNjAgJSA2MCwgMTApIC8vIOiuoeeul+WJqeS9meeahOWIhumSn1xyXG4gICAgdGhpcy50aW1lLnNlY29uZHMgPSBwYXJzZUludCh0aW1lc3RhbXAgLyAxMDAwICUgNjAsIDEwKSAvLyDorqHnrpfliankvZnnmoTnp5LmlbBcclxuXHJcbiAgICBPYmplY3Qua2V5cyhfdGhpcy50aW1lKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIF90aGlzLnRpbWVba2V5XSA9IF90aGlzLmNoZWNrVGltZShfdGhpcy50aW1lW2tleV0pXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXNbJ2RheXNfc3RyJ10gPSB0aGlzLnRpbWVbJ2RheXMnXSArICflpKknXHJcbiAgICB0aGlzWydob3Vyc19zdHInXSA9IHRoaXMudGltZVsnaG91cnMnXSArICflsI/ml7YnXHJcbiAgICB0aGlzWydtaW51dGVzX3N0ciddID0gdGhpcy50aW1lWydtaW51dGVzJ10gKyAn5YiG6ZKfJ1xyXG4gICAgdGhpc1snc2Vjb25kc19zdHInXSA9IHRoaXMudGltZVsnc2Vjb25kcyddICsgJ+enkidcclxuXHJcbiAgICB0aGlzLmNoZWNrWmVybygpXHJcbiAgICB0aGlzLnN0cmluZyA9IGAke3RoaXNbJ2RheXNfc3RyJ119JHt0aGlzWydob3Vyc19zdHInXX0ke3RoaXNbJ21pbnV0ZXNfc3RyJ119JHt0aGlzWydzZWNvbmRzX3N0ciddfWBcclxuICB9XHJcblxyXG4gIHd4UHJvbWlzaWZ5KGZuKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9KSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnUHJvbWlzZSBzdWNjZXNzIOi/lOWbnuWPguaVsO+8micsIHJlcylcclxuICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignUHJvbWlzZSBmYWlsIOi/lOWbnuWPguaVsO+8micsIHJlcylcclxuICAgICAgICAgIHJlamVjdChyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZuKG9iaikgLy8g5omn6KGM5Ye95pWw77yMb2Jq5Li65Lyg5YWl5Ye95pWw55qE5Y+C5pWwXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19