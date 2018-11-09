/*! author Hans.Wu http://www.hanswu.com
 * project: https://github.com/woodhans/loading
 require jquery 1.6+*/
(function($, window, document) {
  var Loading = function() {
    return {
      init: function(el, options) {
        this.$opt = options;
        this.$elem = el;
        this.beforeLoading && typeof(this.beforeLoading)=="function" &&this.beforeLoading.call();
        this._setup();
      },
      _setup: function() {
        var base = this;
        if (typeof(base.$opt.items) == "string") {
          base.$opt.items = base.$opt.items.toLowerCase().split("A");
        }
        if (Array.isArray(base.$opt.items)) {
          base._generateHtml();
          n = 0;
          len = base.$opt.items.length;

          
          for (i = 0; i < len; i++) {
            _type=base.filetype(base.$opt.items[i]);
            if (_type) {
              $.ajax({url:base.$opt.items[i],async:false,success:function(){
                n++;
                
                base.$opt.loadingPercent && base.$elem.find(".loading-percent").html("<span>" + parseInt(n / len * 100, 10) + "</span> %");
                
                base.$opt.loadingAnimate && base.$elem.find(".loading-animate").width((n / len * 100) + "%");
                if (n == len) {
                  base.remove();
                  
                  typeof(base.$opt.loaded)=="function" && base.$opt.loaded.call();
                }
              },error:function(){
                n++;
                console.log("未找到该文件："+base.$opt.items[i]);
              }})
              
            }else {
              n++;
              console.log("文件格式不对："+base.$opt.items[i]);
            }
            
          }
          

        }
      },
      

      _generateHtml: function() {
        var base = this;
        var html = [];
        html.push("<div class='loading-wrapper'><div class='loading-inner'>");

        if (base.$opt.loadingImg)
          html.push("<div class='loading-img'>" + (typeof(base.$opt.loadingImg) == "string" && base.filetype(base.$opt.loadingImg)=="IMG" ? "<img src='" + base.$opt.loadingImg + "'/>" : "") + "</div>");
        if (base.$opt.loadingAnimate)
          html.push("<div class='loading-animate-bg'><div class='loading-animate'></div></div>");
        if (base.$opt.loadingPercent)
          html.push("<div class='loading-percent'></div>");
        if (base.$opt.loadingTime)
          html.push("<div class='loading-time'></div>");
        if (base.$opt.customAnimate)
          html.push("<div class='loading-custom'></div>");
        html.push("</div></div>");
        base.$elem.addClass("loading-body").append(html.join(''));
        if (base.$opt.loadingTime) {
          $loadTime = base.$elem.find(".loading-time");
          start = 0;
          clearTimeout(base.$timeout);
          base.$timeout = setTimeout(function() {
            start += .1;
            $loadTime.html(start + " s");
          }, 100);
        }
        if (base.$opt.customAnimate) {
          $custom = base.$elem.find(".loading-custom");
          if (typeof(base.$opt.customAnimate) == "function") base.$opt.customAnimate.call();
        }
      },
      remove: function() {
        var base = this;
        if (base.$opt.loadingTime)
          clearTimeout(base.$timeout);
        base.$elem.removeClass("loading-body").find('.loading-wrapper').hide().remove();
      },
      filetype:function(string){
        _type=string.split('.').pop().toLowerCase().split("?")[0];
        
        switch(_type){
          case "jpg" || "png" || "gif" || "jpeg" || "ico":
          res="IMG";
          break;
          case "mp3" || "ogg" || "wav":
          res="AUDIO";
          break;
          case "mp4" || "webm":
          res="VIDEO";
          break;
          case "css":
          res="STYLE";
          break;
          case "js":
          res="SCRIPT";
          break;
          default:
          res=!1;
          break;
        }
        
        return res;
      }
    }
  };
  $.fn.loading = function(options) {
    options = $.extend({}, $.fn.loading.options, options);
    if (typeof(options.loaded) != "function") options.loaded = null;
    if (typeof(options.customAnimate) != "function"||typeof(options.customAnimate) != "boolean") options.customAnimate = false;
    var loads = new Loading();
    loads.init(this, options)
  };
  $.fn.loading.options = {
    items: [],
    loaded: null,
    loadingTime: false,
    loadingPercent: true,
    loadingAnimate: true,
    loadingImg: true,
    customAnimate:false,
    beforeLoading:null
  };
}(jQuery, window, document));