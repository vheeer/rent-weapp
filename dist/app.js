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
      'pages': ['pages/index', 'pages/check', 'pages/service', 'pages/shop', 'pages/order', 'pages/refund_result', 'pages/ucenter/index', 'pages/ucenter/detail', 'pages/ucenter/test', 'pages/ucenter/idcard'],
      'window': {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#E92D24',
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
      'promisify': ['scanCode', 'switchTab', 'navigateTo', 'showModal', 'uploadFile', 'chooseImage']
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
      console.log(Date.prototype);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJGb3JtYXQiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJMZWZ0VGltZXIiLCJ0aW1lc3RhbXAiLCJ0aW1lIiwiY2hlY2tUaW1lIiwiaSIsImlzRW1wdHkiLCJ4IiwiY2hlY2taZXJvIiwiX3RoaXMiLCJoYXZlRmlyc3ROb3RFbXB0eVZhbHVlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJkYXlzIiwicGFyc2VJbnQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyaW5nIiwidXNlIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJhc3NpZ24iLCJEYXRlIiwicHJvdG90eXBlIiwiY29uc29sZSIsImxvZyIsImZuIiwib2JqIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsIndhcm4iLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUErREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxXQTVEZkMsTUE0RGUsR0E1RE47QUFDUCxlQUFT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UUMsR0FBUixDQUFZSCxLQUFLQyxTQUFqQjtBQUNEOztBQUVEOzs7QUFzQkE7Ozs7Z0NBd0RZRyxFLEVBQUk7QUFDZCxhQUFPLFlBQW9CO0FBQUEsWUFBVkMsR0FBVSx1RUFBSixFQUFJOztBQUN6QixlQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENILGNBQUlJLE9BQUosR0FBYyxVQUFVQyxHQUFWLEVBQWU7QUFDM0JSLG9CQUFRQyxHQUFSLENBQVksdUJBQVosRUFBcUNPLEdBQXJDO0FBQ0FILG9CQUFRRyxHQUFSO0FBQ0QsV0FIRDtBQUlBTCxjQUFJTSxJQUFKLEdBQVcsVUFBVUQsR0FBVixFQUFlO0FBQ3hCUixvQkFBUVUsSUFBUixDQUFhLG9CQUFiLEVBQW1DRixHQUFuQztBQUNBRixtQkFBT0UsR0FBUDtBQUNELFdBSEQ7QUFJQU4sYUFBR0MsR0FBSCxFQVRzQyxDQVM5QjtBQUNULFNBVk0sQ0FBUDtBQVdELE9BWkQ7QUFhRDs7O2dDQUVXUSxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUs1RCxVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRDRELHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZQLGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNaSSxlQUFLNUQsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJ1RCxJQUFJdkQsUUFBL0I7QUFDQTBELGdCQUFNQSxHQUFHSCxJQUFJdkQsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7O0VBckwwQjRELGVBQUtFLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuXHJcbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcclxuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXHJcblxyXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcclxuc2V0U3RvcmUoc3RvcmUpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICAncGFnZXMnOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jaGVjaycsXHJcbiAgICAgICdwYWdlcy9zZXJ2aWNlJyxcclxuICAgICAgJ3BhZ2VzL3Nob3AnLFxyXG4gICAgICAncGFnZXMvb3JkZXInLFxyXG4gICAgICAncGFnZXMvcmVmdW5kX3Jlc3VsdCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvZGV0YWlsJyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvdGVzdCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2lkY2FyZCdcclxuICAgIF0sXHJcbiAgICAnd2luZG93Jzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0U5MkQyNCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICB9LFxyXG4gICAgJ3RhYkJhcic6IHtcclxuICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICcjZmFmYWZhJyxcclxuICAgICAgJ2JvcmRlclN0eWxlJzogJ3doaXRlJyxcclxuICAgICAgJ3NlbGVjdGVkQ29sb3InOiAnI2I0MjgyZCcsXHJcbiAgICAgICdjb2xvcic6ICcjNjY2JyxcclxuICAgICAgJ2xpc3QnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+mmlumhtScsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvc2VydmljZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmnI3liqEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL3VjZW50ZXIvaW5kZXgnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5oiR55qEJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICAvLyDpnIDopoHkv67mlLnkuLpQcm9taXNl5b2i5byP55qEd3hBUElcclxuICAgICdwcm9taXNpZnknOiBbXHJcbiAgICAgICdzY2FuQ29kZScsXHJcbiAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAnbmF2aWdhdGVUbycsXHJcbiAgICAgICdzaG93TW9kYWwnLFxyXG4gICAgICAndXBsb2FkRmlsZScsXHJcbiAgICAgICdjaG9vc2VJbWFnZSdcclxuICAgIF1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlh73mlbBQcm9taXNl5YyWXHJcbiAgICB0aGlzLmNvbmZpZ1sncHJvbWlzaWZ5J10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUsIHsgRm9ybWF0OiB0aGlzLkZvcm1hdCB9KVxyXG4gICAgT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSwgeyBMZWZ0VGltZXI6IHRoaXMuTGVmdFRpbWVyIH0pXHJcbiAgICBjb25zb2xlLmxvZyhEYXRlLnByb3RvdHlwZSlcclxuICB9XHJcblxyXG4gIC8vIOaXpeacn+agvOW8j+WMllxyXG4gIEZvcm1hdCA9IGZ1bmN0aW9uKGZtdCkge1xyXG4gICAgY29uc3QgbyA9IHtcclxuICAgICAgJ00rJzogdGhpcy5nZXRNb250aCgpICsgMSxcclxuICAgICAgJ2QrJzogdGhpcy5nZXREYXRlKCksXHJcbiAgICAgICdoKyc6IHRoaXMuZ2V0SG91cnMoKSxcclxuICAgICAgJ20rJzogdGhpcy5nZXRNaW51dGVzKCksXHJcbiAgICAgICdzKyc6IHRoaXMuZ2V0U2Vjb25kcygpLFxyXG4gICAgICAncSsnOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxyXG4gICAgICAnUyc6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgIH1cclxuICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSB7XHJcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgayBpbiBvKSB7XHJcbiAgICAgIGlmIChuZXcgUmVnRXhwKCcoJyArIGsgKyAnKScpLnRlc3QoZm10KSkge1xyXG4gICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT09IDEpID8gKG9ba10pIDogKCgnMDAnICsgb1trXSkuc3Vic3RyKCgnJyArIG9ba10pLmxlbmd0aCkpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm10XHJcbiAgfVxyXG5cclxuICAvLyDnlKjml7ZcclxuICBMZWZ0VGltZXIgPSBmdW5jdGlvbih0aW1lc3RhbXApIHtcclxuICAgIHRoaXMudGltZSA9IHt9XHJcbiAgICAvLyDlsIYwLTnnmoTmlbDlrZfliY3pnaLliqDkuIow77yM5L6LMeWPmOS4ujAxXHJcbiAgICB0aGlzLmNoZWNrVGltZSA9IGZ1bmN0aW9uKGkpIHtcclxuICAgICAgaWYgKGkgPCAxMCkge1xyXG4gICAgICAgIGkgPSAnMCcgKyBpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaSA9ICcnICsgaVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpXHJcbiAgICB9XHJcbiAgICAvLyDmo4DmtYvmmK/lkKbkuLogJzAwJ1xyXG4gICAgdGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oeCkge1xyXG4gICAgICBpZiAoeCA9PT0gJzAwJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOWmguKAnDAw5bCP5pe2MDDliIbpkp8xMOenkuKAnei/meenjeagvOW8jyzlsIbovazmjaLkuLrigJwxMOenkuKAnVxyXG4gICAgdGhpcy5jaGVja1plcm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGxldCBoYXZlRmlyc3ROb3RFbXB0eVZhbHVlID0gZmFsc2VcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKF90aGlzLnRpbWUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBpZiAoX3RoaXMuaXNFbXB0eShfdGhpcy50aW1lW2tleV0pKSB7XHJcbiAgICAgICAgICBfdGhpc1trZXkgKyAnX3N0ciddID0gJydcclxuICAgICAgICAgIGlmIChoYXZlRmlyc3ROb3RFbXB0eVZhbHVlKSB7XHJcbiAgICAgICAgICAgIF90aGlzW2tleSArICdfc3RyJ10gPSBfdGhpc1trZXkgKyAnX3N0ciddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF90aGlzW2tleSArICdfc3RyJ10gPSBfdGhpc1trZXkgKyAnX3N0ciddXHJcbiAgICAgICAgICBoYXZlRmlyc3ROb3RFbXB0eVZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcclxuXHJcbiAgICB0aGlzLnRpbWUuZGF5cyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgLyA2MCAvIDYwIC8gMjQsIDEwKSAvLyDorqHnrpfliankvZnnmoTlpKnmlbBcclxuICAgIHRoaXMudGltZS5ob3VycyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgLyA2MCAvIDYwICUgMjQsIDEwKSAvLyDorqHnrpfliankvZnnmoTlsI/ml7ZcclxuICAgIHRoaXMudGltZS5taW51dGVzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAvIDYwICUgNjAsIDEwKSAvLyDorqHnrpfliankvZnnmoTliIbpkp9cclxuICAgIHRoaXMudGltZS5zZWNvbmRzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAlIDYwLCAxMCkgLy8g6K6h566X5Ymp5L2Z55qE56eS5pWwXHJcblxyXG4gICAgT2JqZWN0LmtleXMoX3RoaXMudGltZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBfdGhpcy50aW1lW2tleV0gPSBfdGhpcy5jaGVja1RpbWUoX3RoaXMudGltZVtrZXldKVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzWydkYXlzX3N0ciddID0gdGhpcy50aW1lWydkYXlzJ10gKyAn5aSpJ1xyXG4gICAgdGhpc1snaG91cnNfc3RyJ10gPSB0aGlzLnRpbWVbJ2hvdXJzJ10gKyAn5bCP5pe2J1xyXG4gICAgdGhpc1snbWludXRlc19zdHInXSA9IHRoaXMudGltZVsnbWludXRlcyddICsgJ+WIhumSnydcclxuICAgIHRoaXNbJ3NlY29uZHNfc3RyJ10gPSB0aGlzLnRpbWVbJ3NlY29uZHMnXSArICfnp5InXHJcblxyXG4gICAgdGhpcy5jaGVja1plcm8oKVxyXG4gICAgdGhpcy5zdHJpbmcgPSBgJHt0aGlzWydkYXlzX3N0ciddfSR7dGhpc1snaG91cnNfc3RyJ119JHt0aGlzWydtaW51dGVzX3N0ciddfSR7dGhpc1snc2Vjb25kc19zdHInXX1gXHJcbiAgfVxyXG5cclxuICB3eFByb21pc2lmeShmbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1Byb21pc2Ugc3VjY2VzcyDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1Byb21pc2UgZmFpbCDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmbihvYmopIC8vIOaJp+ihjOWHveaVsO+8jG9iauS4uuS8oOWFpeWHveaVsOeahOWPguaVsFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==