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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJGb3JtYXQiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJMZWZ0VGltZXIiLCJ0aW1lc3RhbXAiLCJ0aW1lIiwiY2hlY2tUaW1lIiwiaSIsImlzRW1wdHkiLCJ4IiwiY2hlY2taZXJvIiwiX3RoaXMiLCJoYXZlRmlyc3ROb3RFbXB0eVZhbHVlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJkYXlzIiwicGFyc2VJbnQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyaW5nIiwidXNlIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJhc3NpZ24iLCJEYXRlIiwicHJvdG90eXBlIiwiY29uc29sZSIsImxvZyIsImZuIiwib2JqIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsIndhcm4iLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUE4REUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxXQTNEZkMsTUEyRGUsR0EzRE47QUFDUCxlQUFT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WUgsS0FBS0MsU0FBakI7QUFDRDs7QUFFRDs7O0FBc0JBOzs7O2dDQXdEWUcsRSxFQUFJO0FBQ2QsYUFBTyxZQUFvQjtBQUFBLFlBQVZDLEdBQVUsdUVBQUosRUFBSTs7QUFDekIsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDSCxjQUFJSSxPQUFKLEdBQWMsVUFBVUMsR0FBVixFQUFlO0FBQzNCUixvQkFBUUMsR0FBUixDQUFZLHVCQUFaLEVBQXFDTyxHQUFyQztBQUNBSCxvQkFBUUcsR0FBUjtBQUNELFdBSEQ7QUFJQUwsY0FBSU0sSUFBSixHQUFXLFVBQVVELEdBQVYsRUFBZTtBQUN4QlIsb0JBQVFVLElBQVIsQ0FBYSxvQkFBYixFQUFtQ0YsR0FBbkM7QUFDQUYsbUJBQU9FLEdBQVA7QUFDRCxXQUhEO0FBSUFOLGFBQUdDLEdBQUgsRUFUc0MsQ0FTOUI7QUFDVCxTQVZNLENBQVA7QUFXRCxPQVpEO0FBYUQ7OztnQ0FFV1EsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLNUQsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0Q0RCxxQkFBS0MsV0FBTCxDQUFpQjtBQUNmUCxlQURlLG1CQUNOQyxHQURNLEVBQ0Q7QUFDWkksZUFBSzVELFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCdUQsSUFBSXZELFFBQS9CO0FBQ0EwRCxnQkFBTUEsR0FBR0gsSUFBSXZELFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQXBMMEI0RCxlQUFLRSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcblxyXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXHJcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXHJcbnNldFN0b3JlKHN0b3JlKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgJ3BhZ2VzJzogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvY2hlY2snLFxyXG4gICAgICAncGFnZXMvc2VydmljZScsXHJcbiAgICAgICdwYWdlcy9zaG9wJyxcclxuICAgICAgJ3BhZ2VzL29yZGVyJyxcclxuICAgICAgJ3BhZ2VzL3JlZnVuZF9yZXN1bHQnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9pbmRleCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2RldGFpbCcsXHJcbiAgICAgICdwYWdlcy91Y2VudGVyL2lkY2FyZCdcclxuICAgIF0sXHJcbiAgICAnd2luZG93Jzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICB9LFxyXG4gICAgJ3RhYkJhcic6IHtcclxuICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICcjZmFmYWZhJyxcclxuICAgICAgJ2JvcmRlclN0eWxlJzogJ3doaXRlJyxcclxuICAgICAgJ3NlbGVjdGVkQ29sb3InOiAnI2I0MjgyZCcsXHJcbiAgICAgICdjb2xvcic6ICcjNjY2JyxcclxuICAgICAgJ2xpc3QnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+mmlumhtScsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvaG9tZS5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvc2VydmljZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmnI3liqEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL3NlcnZpY2UucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL3VjZW50ZXIvaW5kZXgnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5oiR55qEJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS91Y2VudGVyLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICAvLyDpnIDopoHkv67mlLnkuLpQcm9taXNl5b2i5byP55qEd3hBUElcclxuICAgICdwcm9taXNpZnknOiBbXHJcbiAgICAgICdzY2FuQ29kZScsXHJcbiAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAnbmF2aWdhdGVUbycsXHJcbiAgICAgICdzaG93TW9kYWwnLFxyXG4gICAgICAndXBsb2FkRmlsZScsXHJcbiAgICAgICdjaG9vc2VJbWFnZSdcclxuICAgIF1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlh73mlbBQcm9taXNl5YyWXHJcbiAgICB0aGlzLmNvbmZpZ1sncHJvbWlzaWZ5J10uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgd3hbaXRlbSArICdQJ10gPSB0aGlzLnd4UHJvbWlzaWZ5KHd4W2l0ZW1dKVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUsIHsgRm9ybWF0OiB0aGlzLkZvcm1hdCB9KVxyXG4gICAgT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSwgeyBMZWZ0VGltZXI6IHRoaXMuTGVmdFRpbWVyIH0pXHJcbiAgICBjb25zb2xlLmxvZyhEYXRlLnByb3RvdHlwZSlcclxuICB9XHJcblxyXG4gIC8vIOaXpeacn+agvOW8j+WMllxyXG4gIEZvcm1hdCA9IGZ1bmN0aW9uKGZtdCkge1xyXG4gICAgY29uc3QgbyA9IHtcclxuICAgICAgJ00rJzogdGhpcy5nZXRNb250aCgpICsgMSxcclxuICAgICAgJ2QrJzogdGhpcy5nZXREYXRlKCksXHJcbiAgICAgICdoKyc6IHRoaXMuZ2V0SG91cnMoKSxcclxuICAgICAgJ20rJzogdGhpcy5nZXRNaW51dGVzKCksXHJcbiAgICAgICdzKyc6IHRoaXMuZ2V0U2Vjb25kcygpLFxyXG4gICAgICAncSsnOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxyXG4gICAgICAnUyc6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgIH1cclxuICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSB7XHJcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgayBpbiBvKSB7XHJcbiAgICAgIGlmIChuZXcgUmVnRXhwKCcoJyArIGsgKyAnKScpLnRlc3QoZm10KSkge1xyXG4gICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT09IDEpID8gKG9ba10pIDogKCgnMDAnICsgb1trXSkuc3Vic3RyKCgnJyArIG9ba10pLmxlbmd0aCkpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm10XHJcbiAgfVxyXG5cclxuICAvLyDnlKjml7ZcclxuICBMZWZ0VGltZXIgPSBmdW5jdGlvbih0aW1lc3RhbXApIHtcclxuICAgIHRoaXMudGltZSA9IHt9XHJcbiAgICAvLyDlsIYwLTnnmoTmlbDlrZfliY3pnaLliqDkuIow77yM5L6LMeWPmOS4ujAxXHJcbiAgICB0aGlzLmNoZWNrVGltZSA9IGZ1bmN0aW9uKGkpIHtcclxuICAgICAgaWYgKGkgPCAxMCkge1xyXG4gICAgICAgIGkgPSAnMCcgKyBpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaSA9ICcnICsgaVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpXHJcbiAgICB9XHJcbiAgICAvLyDmo4DmtYvmmK/lkKbkuLogJzAwJ1xyXG4gICAgdGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oeCkge1xyXG4gICAgICBpZiAoeCA9PT0gJzAwJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOWmguKAnDAw5bCP5pe2MDDliIbpkp8xMOenkuKAnei/meenjeagvOW8jyzlsIbovazmjaLkuLrigJwxMOenkuKAnVxyXG4gICAgdGhpcy5jaGVja1plcm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGxldCBoYXZlRmlyc3ROb3RFbXB0eVZhbHVlID0gZmFsc2VcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKF90aGlzLnRpbWUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBpZiAoX3RoaXMuaXNFbXB0eShfdGhpcy50aW1lW2tleV0pKSB7XHJcbiAgICAgICAgICBfdGhpc1trZXkgKyAnX3N0ciddID0gJydcclxuICAgICAgICAgIGlmIChoYXZlRmlyc3ROb3RFbXB0eVZhbHVlKSB7XHJcbiAgICAgICAgICAgIF90aGlzW2tleSArICdfc3RyJ10gPSBfdGhpc1trZXkgKyAnX3N0ciddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF90aGlzW2tleSArICdfc3RyJ10gPSBfdGhpc1trZXkgKyAnX3N0ciddXHJcbiAgICAgICAgICBoYXZlRmlyc3ROb3RFbXB0eVZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcclxuXHJcbiAgICB0aGlzLnRpbWUuZGF5cyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgLyA2MCAvIDYwIC8gMjQsIDEwKSAvLyDorqHnrpfliankvZnnmoTlpKnmlbBcclxuICAgIHRoaXMudGltZS5ob3VycyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgLyA2MCAvIDYwICUgMjQsIDEwKSAvLyDorqHnrpfliankvZnnmoTlsI/ml7ZcclxuICAgIHRoaXMudGltZS5taW51dGVzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAvIDYwICUgNjAsIDEwKSAvLyDorqHnrpfliankvZnnmoTliIbpkp9cclxuICAgIHRoaXMudGltZS5zZWNvbmRzID0gcGFyc2VJbnQodGltZXN0YW1wIC8gMTAwMCAlIDYwLCAxMCkgLy8g6K6h566X5Ymp5L2Z55qE56eS5pWwXHJcblxyXG4gICAgT2JqZWN0LmtleXMoX3RoaXMudGltZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBfdGhpcy50aW1lW2tleV0gPSBfdGhpcy5jaGVja1RpbWUoX3RoaXMudGltZVtrZXldKVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzWydkYXlzX3N0ciddID0gdGhpcy50aW1lWydkYXlzJ10gKyAn5aSpJ1xyXG4gICAgdGhpc1snaG91cnNfc3RyJ10gPSB0aGlzLnRpbWVbJ2hvdXJzJ10gKyAn5bCP5pe2J1xyXG4gICAgdGhpc1snbWludXRlc19zdHInXSA9IHRoaXMudGltZVsnbWludXRlcyddICsgJ+WIhumSnydcclxuICAgIHRoaXNbJ3NlY29uZHNfc3RyJ10gPSB0aGlzLnRpbWVbJ3NlY29uZHMnXSArICfnp5InXHJcblxyXG4gICAgdGhpcy5jaGVja1plcm8oKVxyXG4gICAgdGhpcy5zdHJpbmcgPSBgJHt0aGlzWydkYXlzX3N0ciddfSR7dGhpc1snaG91cnNfc3RyJ119JHt0aGlzWydtaW51dGVzX3N0ciddfSR7dGhpc1snc2Vjb25kc19zdHInXX1gXHJcbiAgfVxyXG5cclxuICB3eFByb21pc2lmeShmbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmogPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1Byb21pc2Ugc3VjY2VzcyDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1Byb21pc2UgZmFpbCDov5Tlm57lj4LmlbDvvJonLCByZXMpXHJcbiAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmbihvYmopIC8vIOaJp+ihjOWHveaVsO+8jG9iauS4uuS8oOWFpeWHveaVsOeahOWPguaVsFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==