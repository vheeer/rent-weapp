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
      if (!timestamp || typeof timestamp !== 'number' || timestamp < 0) {
        this.string = '0分钟';
        return false;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJGb3JtYXQiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJMZWZ0VGltZXIiLCJ0aW1lc3RhbXAiLCJzdHJpbmciLCJ0aW1lIiwiY2hlY2tUaW1lIiwiaSIsImlzRW1wdHkiLCJ4IiwiY2hlY2taZXJvIiwiX3RoaXMiLCJoYXZlRmlyc3ROb3RFbXB0eVZhbHVlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJkYXlzIiwicGFyc2VJbnQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwidXNlIiwid3giLCJpdGVtIiwid3hQcm9taXNpZnkiLCJhc3NpZ24iLCJEYXRlIiwicHJvdG90eXBlIiwiZm4iLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsIndhcm4iLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUErREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxXQTVEZkMsTUE0RGUsR0E1RE47QUFDUCxlQUFT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QW5CLEVBQThCLEVBQUU3QyxRQUFRLEtBQUtBLE1BQWYsRUFBOUI7QUFDQThCLGFBQU9hLE1BQVAsQ0FBY0MsS0FBS0MsU0FBbkIsRUFBOEIsRUFBRTFCLFdBQVcsS0FBS0EsU0FBbEIsRUFBOUI7QUFDRDs7QUFFRDs7O0FBc0JBOzs7O2dDQTREWTJCLEUsRUFBSTtBQUNkLGFBQU8sWUFBb0I7QUFBQSxZQUFWQyxHQUFVLHVFQUFKLEVBQUk7O0FBQ3pCLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0gsY0FBSUksT0FBSixHQUFjLFVBQVVDLEdBQVYsRUFBZTtBQUMzQkMsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ0YsR0FBckM7QUFDQUgsb0JBQVFHLEdBQVI7QUFDRCxXQUhEO0FBSUFMLGNBQUlRLElBQUosR0FBVyxVQUFVSCxHQUFWLEVBQWU7QUFDeEJDLG9CQUFRRyxJQUFSLENBQWEsb0JBQWIsRUFBbUNKLEdBQW5DO0FBQ0FGLG1CQUFPRSxHQUFQO0FBQ0QsV0FIRDtBQUlBTixhQUFHQyxHQUFILEVBVHNDLENBUzlCO0FBQ1QsU0FWTSxDQUFQO0FBV0QsT0FaRDtBQWFEOzs7Z0NBRVdVLEUsRUFBSTtBQUNkLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBSzVELFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNENEQscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZlQsZUFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1pNLGVBQUs1RCxVQUFMLENBQWdCQyxRQUFoQixHQUEyQnFELElBQUlyRCxRQUEvQjtBQUNBMEQsZ0JBQU1BLEdBQUdMLElBQUlyRCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUF6TDBCNEQsZUFBS0UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xyXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcclxuXHJcbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxyXG5zZXRTdG9yZShzdG9yZSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgICdwYWdlcyc6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2NoZWNrJyxcclxuICAgICAgJ3BhZ2VzL3NlcnZpY2UnLFxyXG4gICAgICAncGFnZXMvc2hvcCcsXHJcbiAgICAgICdwYWdlcy9vcmRlcicsXHJcbiAgICAgICdwYWdlcy9yZWZ1bmRfcmVzdWx0JyxcclxuICAgICAgJ3BhZ2VzL3VjZW50ZXIvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9kZXRhaWwnLFxyXG4gICAgICAncGFnZXMvdWNlbnRlci9pZGNhcmQnXHJcbiAgICBdLFxyXG4gICAgJ3dpbmRvdyc6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgICd0YWJCYXInOiB7XHJcbiAgICAgICdiYWNrZ3JvdW5kQ29sb3InOiAnI2ZhZmFmYScsXHJcbiAgICAgICdib3JkZXJTdHlsZSc6ICd3aGl0ZScsXHJcbiAgICAgICdzZWxlY3RlZENvbG9yJzogJyNiNDI4MmQnLFxyXG4gICAgICAnY29sb3InOiAnIzY2NicsXHJcbiAgICAgICdsaXN0JzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAndGV4dCc6ICfpppbpobUnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL2hvbWUucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJy4vc3RhdGljL2ltYWdlL2hvbWUucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL3NlcnZpY2UnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5pyN5YqhJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS9zZXJ2aWNlLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICcuL3N0YXRpYy9pbWFnZS9zZXJ2aWNlLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy91Y2VudGVyL2luZGV4JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+aIkeeahCcsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvdWNlbnRlci5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnLi9zdGF0aWMvaW1hZ2UvdWNlbnRlci5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgLy8g6ZyA6KaB5L+u5pS55Li6UHJvbWlzZeW9ouW8j+eahHd4QVBJXHJcbiAgICAncHJvbWlzaWZ5JzogW1xyXG4gICAgICAnc2NhbkNvZGUnLFxyXG4gICAgICAnc3dpdGNoVGFiJyxcclxuICAgICAgJ25hdmlnYXRlVG8nLFxyXG4gICAgICAnc2hvd01vZGFsJyxcclxuICAgICAgJ3VwbG9hZEZpbGUnLFxyXG4gICAgICAnY2hvb3NlSW1hZ2UnLFxyXG4gICAgICAnZ2V0TG9jYXRpb24nXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgLy8g5Ye95pWwUHJvbWlzZeWMllxyXG4gICAgdGhpcy5jb25maWdbJ3Byb21pc2lmeSddLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIHd4W2l0ZW0gKyAnUCddID0gdGhpcy53eFByb21pc2lmeSh3eFtpdGVtXSlcclxuICAgIH0pXHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSwgeyBGb3JtYXQ6IHRoaXMuRm9ybWF0IH0pXHJcbiAgICBPYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLCB7IExlZnRUaW1lcjogdGhpcy5MZWZ0VGltZXIgfSlcclxuICB9XHJcblxyXG4gIC8vIOaXpeacn+agvOW8j+WMllxyXG4gIEZvcm1hdCA9IGZ1bmN0aW9uKGZtdCkge1xyXG4gICAgY29uc3QgbyA9IHtcclxuICAgICAgJ00rJzogdGhpcy5nZXRNb250aCgpICsgMSxcclxuICAgICAgJ2QrJzogdGhpcy5nZXREYXRlKCksXHJcbiAgICAgICdoKyc6IHRoaXMuZ2V0SG91cnMoKSxcclxuICAgICAgJ20rJzogdGhpcy5nZXRNaW51dGVzKCksXHJcbiAgICAgICdzKyc6IHRoaXMuZ2V0U2Vjb25kcygpLFxyXG4gICAgICAncSsnOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxyXG4gICAgICAnUyc6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgIH1cclxuICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSB7XHJcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgayBpbiBvKSB7XHJcbiAgICAgIGlmIChuZXcgUmVnRXhwKCcoJyArIGsgKyAnKScpLnRlc3QoZm10KSkge1xyXG4gICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT09IDEpID8gKG9ba10pIDogKCgnMDAnICsgb1trXSkuc3Vic3RyKCgnJyArIG9ba10pLmxlbmd0aCkpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm10XHJcbiAgfVxyXG5cclxuICAvLyDnlKjml7ZcclxuICBMZWZ0VGltZXIgPSBmdW5jdGlvbih0aW1lc3RhbXApIHtcclxuICAgIGlmICghdGltZXN0YW1wIHx8IHR5cGVvZiB0aW1lc3RhbXAgIT09ICdudW1iZXInIHx8IHRpbWVzdGFtcCA8IDApIHtcclxuICAgICAgdGhpcy5zdHJpbmcgPSAnMOWIhumSnydcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWUgPSB7fVxyXG4gICAgLy8g5bCGMC0555qE5pWw5a2X5YmN6Z2i5Yqg5LiKMO+8jOS+izHlj5jkuLowMVxyXG4gICAgdGhpcy5jaGVja1RpbWUgPSBmdW5jdGlvbihpKSB7XHJcbiAgICAgIGlmIChpIDwgMTApIHtcclxuICAgICAgICBpID0gJzAnICsgaVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgPSAnJyArIGlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaVxyXG4gICAgfVxyXG4gICAgLy8g5qOA5rWL5piv5ZCm5Li6ICcwMCdcclxuICAgIHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgaWYgKHggPT09ICcwMCcpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDlpoLigJwwMOWwj+aXtjAw5YiG6ZKfMTDnp5LigJ3ov5nnp43moLzlvI8s5bCG6L2s5o2i5Li64oCcMTDnp5LigJ1cclxuICAgIHRoaXMuY2hlY2taZXJvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICBsZXQgaGF2ZUZpcnN0Tm90RW1wdHlWYWx1ZSA9IGZhbHNlXHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhfdGhpcy50aW1lKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKF90aGlzLmlzRW1wdHkoX3RoaXMudGltZVtrZXldKSkge1xyXG4gICAgICAgICAgX3RoaXNba2V5ICsgJ19zdHInXSA9ICcnXHJcbiAgICAgICAgICBpZiAoaGF2ZUZpcnN0Tm90RW1wdHlWYWx1ZSkge1xyXG4gICAgICAgICAgICBfdGhpc1trZXkgKyAnX3N0ciddID0gX3RoaXNba2V5ICsgJ19zdHInXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfdGhpc1trZXkgKyAnX3N0ciddID0gX3RoaXNba2V5ICsgJ19zdHInXVxyXG4gICAgICAgICAgaGF2ZUZpcnN0Tm90RW1wdHlWYWx1ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcblxyXG4gICAgdGhpcy50aW1lLmRheXMgPSBwYXJzZUludCh0aW1lc3RhbXAgLyAxMDAwIC8gNjAgLyA2MCAvIDI0LCAxMCkgLy8g6K6h566X5Ymp5L2Z55qE5aSp5pWwXHJcbiAgICB0aGlzLnRpbWUuaG91cnMgPSBwYXJzZUludCh0aW1lc3RhbXAgLyAxMDAwIC8gNjAgLyA2MCAlIDI0LCAxMCkgLy8g6K6h566X5Ymp5L2Z55qE5bCP5pe2XHJcbiAgICB0aGlzLnRpbWUubWludXRlcyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgLyA2MCAlIDYwLCAxMCkgLy8g6K6h566X5Ymp5L2Z55qE5YiG6ZKfXHJcbiAgICB0aGlzLnRpbWUuc2Vjb25kcyA9IHBhcnNlSW50KHRpbWVzdGFtcCAvIDEwMDAgJSA2MCwgMTApIC8vIOiuoeeul+WJqeS9meeahOenkuaVsFxyXG5cclxuICAgIE9iamVjdC5rZXlzKF90aGlzLnRpbWUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgX3RoaXMudGltZVtrZXldID0gX3RoaXMuY2hlY2tUaW1lKF90aGlzLnRpbWVba2V5XSlcclxuICAgIH0pXHJcblxyXG4gICAgdGhpc1snZGF5c19zdHInXSA9IHRoaXMudGltZVsnZGF5cyddICsgJ+WkqSdcclxuICAgIHRoaXNbJ2hvdXJzX3N0ciddID0gdGhpcy50aW1lWydob3VycyddICsgJ+Wwj+aXtidcclxuICAgIHRoaXNbJ21pbnV0ZXNfc3RyJ10gPSB0aGlzLnRpbWVbJ21pbnV0ZXMnXSArICfliIbpkp8nXHJcbiAgICB0aGlzWydzZWNvbmRzX3N0ciddID0gdGhpcy50aW1lWydzZWNvbmRzJ10gKyAn56eSJ1xyXG5cclxuICAgIHRoaXMuY2hlY2taZXJvKClcclxuICAgIHRoaXMuc3RyaW5nID0gYCR7dGhpc1snZGF5c19zdHInXX0ke3RoaXNbJ2hvdXJzX3N0ciddfSR7dGhpc1snbWludXRlc19zdHInXX0ke3RoaXNbJ3NlY29uZHNfc3RyJ119YFxyXG4gIH1cclxuXHJcbiAgd3hQcm9taXNpZnkoZm4pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBvYmouc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdQcm9taXNlIHN1Y2Nlc3Mg6L+U5Zue5Y+C5pWw77yaJywgcmVzKVxyXG4gICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdQcm9taXNlIGZhaWwg6L+U5Zue5Y+C5pWw77yaJywgcmVzKVxyXG4gICAgICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgZm4ob2JqKSAvLyDmiafooYzlh73mlbDvvIxvYmrkuLrkvKDlhaXlh73mlbDnmoTlj4LmlbBcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=