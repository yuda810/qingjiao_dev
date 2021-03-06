<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/job/schedulerTrig.js"></script>
		<title>qrtz_triggers管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/job/scheduler/trigEdit.htm?jobName=${param.jobName }&group=${param.group}" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-times" href="javascript:void(0);"  action="${ctx}/platform/job/scheduler/trigRemove.htm"><span>删除</span></a>
								<a class="btn btn-primary fa fa-back"   href="${ctx}/platform/job/scheduler/jobList.htm" ><span>返回</span></a>
							</div>
							<!-- 收缩 -->
							<div class="tools">
								<a href="javascript:void(0);" class="collapse">
									<i class="bigger-180 fa  fa-angle-double-up"></i>
								</a>
							</div>
						</div>
					</div>
				</div><!--/ 操作、查询-->
				<input type="hidden" id="jobName"  value="${param.jobName}"/>
				<input type="hidden" id="group"  value="${param.group}"/>
				<div class="jqGrid_wrapper">
					<table id="schedulerTrigGrid" ></table>
					<div id="schedulerTrigPager"></div>
				</div>
		</div>
	
	</body>
	
</html>