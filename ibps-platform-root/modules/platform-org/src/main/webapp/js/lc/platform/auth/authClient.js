/**
 * 第三方授权
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-24 18:20:51
 *</pre>
 */
$(function() {
	authClient  = new AuthClient();
	authClient.init();
	
	formUrl = authClient.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#authClientGrid",// 列表对象
			PAGER : "#authClientPager",// 列表分页
			FORM : '#authClientForm',// 表单form
			AUDIT_FORM : '#authClientAuditForm',// 表单form
			FORMGET : '#authClientFormGet'// 表单form
	};
	/**
	 * 第三方授权 对象
	 * @returns {AuthClient}
	 */
	AuthClient = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	AuthClient.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._initListBts();
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.AUDIT_FORM).length > 0){//表单
				this._initAuditForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/auth/authClient/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','标识','名称','Domain','作用域','授权类型','状态','创建人','过期时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'clientKey',
				                	   index: 'client_key_'

				                	 					                	 	}, {
				                 	   name:'clientName',
				                	   index: 'client_name_'

				                	 					                	 	}, {
				                 	   name:'clientUri',
				                	   index: 'client_uri_'

				                	 					                	 	}, {
				                 	   name:'scope',
				                	   index: 'scope_',
				                	   formatter: function(value,row,index){
											if(value)
										    	return value.replace("sso","单点登录").replace("api","API调用");
										    else 
										    	return '';
										}

				                	 					                	 	}, {
				                 	   name:'grantTypes',
				                	   index: 'grant_types_',
				                	   formatter: function(value,row,index){
											if(value)
										    	return value.replace("code","授权码").replace("password","密码");
										    else 
										    	return '';
										}

				                	 					                	 	}, {
				                 	   name:'status',
				                	   index: 'status_',
				                	   formatter: 'dataFormat',
			                            formatoptions: {
			                            	value : [{
												name:'pendding',
												value:'待审核',
												css:'red'
											},{
												name:'nopass',
												value:'不通过',
												css:'red'
											},{
												name:'effect',
												value:'生效',
												css:'green'
											},{
												name:'expired',
												value:'过期',
												css:'gray'
											}
										]}
				                	 					                	 	}, {
				                 	   name:'creator',
				                	   index: 'creator_'

				                	 					                	 	}, {
				                 	   name:'expireTime',
				                	   index: 'expire_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	},  {
									name : '__manage',
									width : 50,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/auth/authClient/edit.htm?id={id}',
										hidden : function(opts, rowData){
											if(rowData.status == 'effect') return true;
											if(__currentUserId != rowData.createBy) return true;
											return false;
										}
									},{
										label:'API授权申请',
										classes:'btn btn-primary fa fa-ticket',
										action:__ctx+'/platform/auth/authApiGrant/list.htm?clientKey={clientKey}',
										hidden : function(opts, rowData){
											if(rowData.status == 'effect' 
												&& (rowData.scope.indexOf("api")>-1 || rowData.scope.indexOf("API")>-1) 
												&& __currentUserId == rowData.createBy) return false;
											return true;
										}
									},{
										label:'审核',
										classes:'btn btn-primary fa fa-legal fa-audit',
										action:__ctx+'/platform/auth/authClient/audit.htm?id={id}',
										hidden : function(opts, rowData){
											if(rowData.status != 'pendding') return true;
											if(__currentUserId == rowData.createBy) return true;
											if(!__isSuper) return true;
											return false;
										}
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/auth/authClient/remove.htm?id={id}',
										hidden : function(opts, rowData){
											if(rowData.status == 'effect') return true;
											if(__isSuper) return false;
											if(__currentUserId != rowData.createBy) return true;
											return false;
										}
									},{
										label:'重置密钥',
										classes:'btn btn-primary fa fa-reset',
										action:'javascript:authClient._reset("{id}");',
										hidden : function(opts, rowData){
											if(rowData.status != 'effect') return true;
											if(__isSuper) return false;
											if(__currentUserId != rowData.createBy) return true;
											return false;
										}
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/auth/authClient/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		_reset : function(id){
			var me = this, 
				url = __ctx + '/platform/auth/authClient/reset.htm';
			$.ajax({
				type : "POST",
				url : url,
				data : {clientSecret: me.uuid(), id : id},
				success : function(responseText) {
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						DialogUtil.toastr(msg.getMessage());
						window.location.reload(true);
					} else {
						DialogUtil.error(msg.getMessage());
					}
				},
				errror:function(){
					
				}
			});
		},
		_initListBts : function(){
			var me = this;
			if(!__isSuper){
				$(".fa-audit-batch").hide();
				$(".fa-audit-batch-nopass").hide();
			}else{
				// 处理表单保存
				$(document).on('click', 'a.fa-audit-batch', function() {
					var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
					if(null == ids || ids.length == 0){
						DialogUtil.warn("请选择数据！");
						return;
					}
					
					var $el = $(this);
					$el.button('loading');
					var url = __ctx + "/platform/auth/authClient/doAuditBatch.htm";
					$.ajax({
						type : "POST",
						url : url,
						data : {"ids" : ids.join(",")},
						success : function(responseText) {
							$el.button('reset');
							var msg = new com.lc.form.ResultMessage(responseText);
							if (msg.isSuccess()) {
								DialogUtil.toastr(msg.getMessage());
								window.location.reload(true);
							} else {
								DialogUtil.error(msg.getMessage());
							}
						},
						error : function(){
							$el.button('reset');
						}
					});
				});
				
				// 处理表单保存
				$(document).on('click', 'a.fa-audit-batch-nopass', function() {
					var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
					if(null == ids || ids.length == 0){
						DialogUtil.warn("请选择数据！");
						return;
					}
					
					var $el = $(this);
					DialogUtil.prompt({
						formType: 0,
						value: '',
						title: '请输入审核不通过原因'
					}, function(value, index, elem){
						if('' === value){
							DialogUtil.warn("原因不能为空");
							return;
						}
						DialogUtil.closeAll();
						$el.button('loading');
						var url = __ctx + "/platform/auth/authClient/doAuditBatch.htm";
						$.ajax({
							type : "POST",
							url : url,
							data : {"ids" : ids.join(","), "nopass" : "0", "cause" : value},
							success : function(responseText) {
								$el.button('reset');
								var msg = new com.lc.form.ResultMessage(responseText);
								if (msg.isSuccess()) {
									DialogUtil.toastr(msg.getMessage());
									window.location.reload(true);
								} else {
									DialogUtil.error(msg.getMessage());
								}
							},
							error : function(){
								$el.button('reset');
							}
						});
					});
				});
			}
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			if('' == $("#clientSecret").val()){
				$("#clientSecret").val(me.uuid());
			}
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-reset', function() {
				$("#clientSecret").val(me.uuid());
			});
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var sl = $("[name='m:authClient:scope']:checked").length;
				if(sl < 1){
					DialogUtil.warn("请选择作用域！");
					return;
				}
				var gl = $("[name='m:authClient:grantTypes']:checked").length;
				if(gl < 1){
					DialogUtil.warn("请选择授权类型！");
					return;
				}
				
				var $el = $(this);
				$el.button('loading');
				
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse, $el);
			});
		},
		_initAuditForm : function(){
			var me = this, form = $(this.consts.AUDIT_FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-audit', function() {
				var $el = $(this);
				$el.button('loading');
				$("#cause").val('');
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showAuditResponse, $el);
			});
			// 处理表单保存
			$(document).on('click', 'a.fa-nopass', function() {
				var $el = $(this);
				DialogUtil.prompt({
					formType: 0,
					value: '',
					title: '请输入审核不通过原因'
				}, function(value, index, elem){
					if('' === value){
						DialogUtil.warn("原因不能为空");
						return;
					}
					DialogUtil.closeAll();
					$el.button('loading');
					$("#cause").val(value);
					// office提交
					OfficePlugin.submit();
					me.formUrl.submit(me._showAuditResponse, $el);
				});
			});
		},
		uuid: function() {
           return 'xxxxxxxx-xxxx-0xxx-yxxx-xxxxxyxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showAuditResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.toastr(msg.getMessage());
				window.location.href = __ctx+'/platform/auth/authClient/list.htm';
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
					function(rtn) {
					if(rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx+'/platform/auth/authClient/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


