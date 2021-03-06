var  Namespace;
if(!Namespace){
	 Namespace = new Object();

	Namespace.register = function(path) {
		var arr = path.split(".");
		var ns = "";
		for ( var i = 0; i < arr.length; i++) {
			if (i > 0)
				ns += ".";
			ns += arr[i];
			eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
		}
	};
}

Namespace.register("com.lc.form");  
/**
 * 动态创建form类。
 * 使用方法如下：
 * var frm=new com.lc.form.Form();
 * frm.creatForm("表单名","提交到的页面");
 *清除表单元素
 * frm.clearFormEl();
 * 添加需要提交的表单元素。
 * frm.addFormEl("name","value");
 * 表单提交
 * frm.submit();
 */
com.lc.form.Form=function(){
	this.creatForm=function(formName,action)
	{
		var  frm=document.getElementById(formName);
		if(frm==null || frm==undefined){
			frm = document.createElement("FORM");  
			document.body.appendChild(frm);  
		}
		//frm.action=action;
		this.form=frm;
		this.form.method="post";
		this.parseAction(action);
	};
	
	this.parseAction=function( _action_){
		var idx=_action_.indexOf("?");
		if(idx==-1){
			this.form.action=_action_;
		}
		else{
			var aryStr=_action_.split("?");
			var action=aryStr[0];
			this.form.action=action;
			var queryString=aryStr[1];
			var aryQ=queryString.split("&");
			for(var i=0;i<aryQ.length;i++){
				var pv=aryQ[i].split("=");
				this.addFormEl(pv[0],pv[1]);
			}
		}
		
	};
	
	
	/**
	 * 设置方法
	 * 值：get,post
	 */
	this.setMethod=function(_method){
		this.form.method=_method;
	};
	
	this.setTarget=function(_target){
		this.form.target=_target;
	};
	
	this.clearFormEl=function()
	{
		var childs=this.form.childNodes;
		for(var i=childs.length;i>=0;i--){
			var node=childs[i];
			this.form.removeNode(node);
		}
	};
	/**
	 * 添加字段
	 */
	this.addFormEl=function(name,value){
		 var el = document.createElement("input");  
		 el.setAttribute("name",name);  
		 el.setAttribute("type","hidden");  
		 el.setAttribute("value",value);  
		 this.form.appendChild(el);  
	};
	
	this.submit=function(){
		this.form.submit();
	};
};



$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


    
/**
 * ResponseObject对象
 * @param data
 */
com.lc.form.ResultMessage = function(data) {
	{
		this.data = eval('(' + data + ')');
	}	
	//如果 ajax 超时 就弹出登陆框。
	if(this.data['result'] == -2){
		this.toLogin();
		throw  "AJAX 超时了！";  
	}
	
	/**
	 * 操作是否成功
	 * @returns {Boolean}
	 */
	this.isSuccess = function() {
		
		return this.data['result'] == 1;
	};
	/**
	 * 操作是否警告
	 * @returns {Boolean}
	 */
	this.isWarn= function() {
		
		return this.data['result'] == 2;
	};
	/**
	 * 操作是否成功 
	 * @returns {int}1:表示成功,0：表示失败，-1：表示错误（或者异常）
	 */
	this.getResult = function() {
		return this.data['result'];
	};
	
	/**
	 * 获取响应信息
	 * @returns
	 */
	this.getMessage = function() {
		return this.data['message'];
	};
	
	/**
	 * 获取堆栈信息
	 */
	this.getCause = function(){
		return this.data['cause'];
	};
	/**
	 * 获取变量信息
	 */
	this.getVar = function(key){
		return this.data[key];
	};
	/***
	 * 登陆超时，弹出框 
	 */
	this.toLogin =function (){ 
		//TODO  弹出框 登录
	};
	
};


