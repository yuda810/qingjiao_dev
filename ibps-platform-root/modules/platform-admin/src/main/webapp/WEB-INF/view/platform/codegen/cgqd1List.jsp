<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgqd1.js"></script>
		<title>采购需求表示：1，采购清单：2；1对多关系管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/codegen/cgqd1/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/codegen/cgqd1/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/codegen/cgqd1/remove.htm"><span>删除</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label   class="search-label">外键</label>:
									<input type="text"  name="Q^PARENT_ID_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">IP地址</label>:
									<input type="text"  name="Q^IP_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">更新人</label>:
									<input type="text"  name="Q^UPDATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">更新时间 </label>:
									<input type="text" name="Q^UPDATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^UPDATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">采购项品目</label>:
									<input type="text"  name="Q^PUR_GOODS_ITEM_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购项名称</label>:
									<input type="text"  name="Q^PUR_GOODS_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购数量</label>:
									<input type="text"  name="Q^PUR_NUMBER_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">市场参考价</label>:
									<input type="text"  name="Q^PUR_MARKET_PRICE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">需求时间 </label>:
									<input type="text" name="Q^PUR_REQUIRE_DATE_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^PUR_REQUIRE_DATE_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">说明</label>:
									<input type="text"  name="Q^PUR_EXPLAIN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">操作人</label>:
									<input type="text"  name="Q^CREATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">操作时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="cgqd1Grid" ></table>
				<div id="cgqd1Pager"></div>
			</div>
		</div>
	
	</body>
	
</html>