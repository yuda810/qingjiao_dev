(function() {
	var defaults = {
			title:'logo选择',
			url:__ctx+'/platform/common/icon/logo.htm'
	};
	/**
	 * 图标选择
	 * @param options
	 * @returns {LogoDialog}
	 */
	LogoDialog = function(options){
		this.options = $.extend({}, defaults, options);
	};

	LogoDialog.prototype = {
		/**
		 * 显示窗口
		 */
		show:function(){
			var me=  this;
			DialogUtil.dialog({
				title:this.options.title,
				content:this.options.url,
				area:['50%','50%'],
				  btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  var  data = DialogUtil.getChildFrameWindow(index).getIcon();
		              	  if($.isEmpty(data)){
		              		  DialogUtil.toastr("请选择Logo！");
		              		  return;
		              	  }
		              	  if(!me.options.callback){
		              		 DialogUtil.toastr("传入参数必须包含【callback】");
		              		 return;
		              	  }
		                me.options.callback(data,dialog,index);
		                }
		            },{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
			});
		}
	};
})();
	
