/*! author Hans.Wu http://www.hanswu.com
 * project: https://github.com/woodhans/loading
 require jquery 1.6+*/
(function($, window, document) {
  var Loading = function() {
    return {
      init: function(el, options) {
        var base=this;
        base.$opt = options;
        base.$elem = el;
        options.beforeLoading && typeof(options.beforeLoading)=="function" &&options.beforeLoading.call();
        if(options.cancel){
          timestamps=[];
          $(document).on("keydown",function(e){
            if(e.keyCode==27){
              timestamps.push(new Date().getTime())
            }
            if(timestamps.length>=2){
              timediff=timestamps[timestamps.length-1]-timestamps[timestamps.length-2];
              if(timediff<2500)
              base.canceled();
            }
          })
        }
        base._setup();
      },
      _setup: function() {
        var base = this;
        
        
          base._generateHtml();
          
          // n = 0;
          // len = base.$opt.items.length;
        
          base.loadItem(0);
          
          // for (i = 0; i < len; i++) {
            // _type=base.filetype(base.$opt.items[n]);
            // if (_type) {
            //   $.ajax({url:base.$opt.items[i],async:false,success:function(){
            //     n++;
            //     console.log(n);
            //     base.$opt.loadingPercent && base.$elem.find(".loading-percent").html("<span>" + parseInt(n / len * 100, 10) + "</span> %");
            //     base.$opt.loadingImg && base.$elem.find(".loading-img img").data("percent",(n / len * 100) + "%");
            //     base.$opt.loadingAnimate && base.$elem.find(".loading-animate").width((n / len * 100) + "%");
            //     if (n == len) {
            //       base.remove();
                  
            //       typeof(base.$opt.loaded)=="function" && base.$opt.loaded.call();
            //     }
            //     return;
            //   },error:function(){
            //     n++;
            //     console.log("未找到该文件："+base.$opt.items[i]);
            //   }})
              
            // }else {
            //   n++;
            //   console.log("文件格式不对："+base.$opt.items[i]);
            // }
            
          // }
          

        
      },
      loadItem:function(loadcounts){
        var base = this;
        all=base.$opt.items.length;
        console.log(base.filetype(base.$opt.items[loadcounts]));
        if(base.filetype(base.$opt.items[loadcounts])){
          $.ajax({url:base.$opt.items[loadcounts],async:false,success:function(){
            loadcounts++;
            base.loaditem(loadcounts,all);
          },error:function(){
            loadcounts++;
            base.loaditem(loadcounts,all)
          }})
        }else{
          loadcounts++;
          base.loaditem(loadcounts,all)
        }
      },
      loaditem:function(loadcounts,all){
        var base=this;
        
        base.$opt.loadingPercent && base.$elem.find(".loading-percent").html("<span>" + parseInt(loadcounts / all * 100, 10) + "</span> %");
            base.$opt.loadingImg && base.$elem.find(".loading-img img").data("percent",parseInt(loadcounts / all * 100) + "%");
            base.$opt.loadingAnimate && base.$elem.find(".loading-animate").width((loadcounts / all * 100) + "%");
            
            if (base.$opt.customAnimate) {
              base.$elem.find(".loading-custom").data("percent",(loadcounts / all * 100) + "%");
              if (typeof(base.$opt.customAnimate) == "function") base.$opt.customAnimate.call();
            }

            if(loadcounts==all){
              
              base.$opt.loadingPercent && base.$elem.find(".loading-percent").html("<span>100</span> %");
            base.$opt.loadingImg && base.$elem.find(".loading-img img").data("percent","100%");
            base.$opt.loadingAnimate && base.$elem.find(".loading-animate").width("100%");
            
            setTimeout(function(){base.remove();
              typeof(base.$opt.loaded)=="function" && base.$opt.loaded.call();},50)
              
            }else{
              setTimeout(function(){base.loadItem(loadcounts);},10)
              
            }
      },
      _generateHtml: function() {
        var base = this;
        var html = [];
        
        html.push("<div class='loading-wrapper'><div class='loading-inner'>");
        
        if (base.$opt.loadingImg)
          html.push("<div class='loading-img'><img data-percent='0%' src='" + (typeof(base.$opt.loadingImg) == "string" && base.filetype(base.$opt.loadingImg)=="IMG" ? "" + base.$opt.loadingImg + "" : "./loading.gif") + " '/></div>");
        if (base.$opt.loadingAnimate)
          html.push("<div class='loading-animate-bg'><div class='loading-animate'></div></div>");
        if (base.$opt.loadingPercent)
          html.push("<div class='loading-percent'></div>");
        if (base.$opt.loadingTime)
          html.push("<div class='loading-time'></div>");
        
        if (base.$opt.customAnimate)
          html.push("<div class='loading-custom' data-percent='0%'></div>");
        html.push("</div></div>");
        base.$elem.addClass("loading-body").append(html.join(''));
        if (base.$opt.loadingTime) {
          $loadTime = base.$elem.find(".loading-time");
          start = 0;
          clearInterval(base.$timeout);
          base.$timeout = setInterval(function() {
            start += .1;
            $loadTime.html("<span>"+start.toFixed(1) + "</span> s");
          }, 100);
        }
      },
      remove: function() {
        var base = this;
        clearTimeout();
        if (base.$opt.loadingTime)
          clearInterval(base.$timeout);
        
        base.$elem.removeClass("loading-body").find('.loading-wrapper').hide().remove();
      },
      canceled:function(){
        var base = this;
        $(document).off("keydown");
        base.remove();
        typeof (base.$opt.cancel)=="function" && base.$opt.cancel.call();
      },
      filetype:function(string){
        _type=string.split('.').pop().toLowerCase();
        
        if(/^(jpg|gif|png|jpeg|ico)/.test(_type)){
          return "IMG";
        }
        if(/^(mp3|ogg|wav)/.test(_type))
        return "AUDIO";
        if(/^(mp4|webm)/.test(_type))
        return "VIDEO";
        if(/^css/.test(_type))
        return "STYLE";
        if(/^js/.test(_type))
        return "SCRIPT";
        return !1;
      }
    }
  };
  $.fn.loading = function(options) {
    options = $.extend({}, $.fn.loading.options, options);
    //options.A=options.items;
    if (typeof(options.loaded) != "function") options.loaded = null;

    if (typeof(options.customAnimate) != "function"&&typeof(options.customAnimate) != "boolean") options.customAnimate = false;
    if (typeof(options.items) == "string") options.items = options.toLowerCase().split("A");
    if (!Array.isArray(options.items))  options.items = [];
    
    
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
    beforeLoading:null,
    cancel:false
  };
}(jQuery, window, document));