<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/resources.js"></script>
	</head>
	<body class="gray-bg">
		<div class="ui-layout-west">
				<div class="layout-header ">
        				<h5>菜单管理</h5>
        				<div class="layout-tools">
        					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
                      </div>
         		</div>
				<select id="subSystem"  class="form-control">  
		              <c:forEach var="subSystemItem" items="${subSystemList}">  
		         			<option value="${subSystemItem.id}"  <c:if test="${subSystemItem.id== curSubsysId}">selected="selected"</c:if> >${subSystemItem.name}</option>  
		        	  </c:forEach>
		        </select>
				<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
					<a class="btn btn-primary fa fa-expand" title="展开"></a> 
					<a class="btn btn-primary fa fa-compress" title="收缩"></a>
				</div>
				<div id="resourcesTree" class="ztree" ></div>	
		</div>
		<div class="ui-layout-center"> 
			 <div class="treeFrame">
					  <iframe id="listFrame" src="get.htm"  frameborder="no" width="100%" height="100%"></iframe>
				</div>
		</div>
		
		<div id="foldMenu"  class="bootstrap-contextmenu" >
	          <ul class="dropdown-menu" role="menu">
	              <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;增加节点</a></li>
	              <li><a  data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑节点</a></li>
	              <li><a data-action="node_del"  tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除节点</a></li>
	              <li class="divider"></li>
	              <li><a  data-action="node_export" tabindex="-1"><i class="fa fa-export"></i>&nbsp;&nbsp;导出</a></li>
	              <li><a  data-action="node_import" tabindex="-1"><i class="fa fa-import"></i>&nbsp;&nbsp;导入</a></li>
	              <li class="divider"></li>
	              <li><a data-action="node_sort" tabindex="-1"><i class="fa fa-sort"></i>&nbsp;&nbsp;节点排序</a></li>
	             <li><a data-action="node_move" tabindex="-1"><i class="fa fa-arrows-v"></i>&nbsp;&nbsp;移动节点</a></li>
	          </ul>
	      </div>
	      
	      <div id="subSysMenu"   class="bootstrap-contextmenu" >
	          <ul class="dropdown-menu" role="menu">
	               <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;增加节点</a></li>
	               <li class="divider"></li>
	              <li><a  data-action="node_export" tabindex="-1"><i class="fa fa-export"></i>&nbsp;&nbsp;导出</a></li>
	              <li><a  data-action="node_import" tabindex="-1"><i class="fa fa-import"></i>&nbsp;&nbsp;导入</a></li>
	               <li class="divider"></li>
	              <li><a data-action="node_sort" tabindex="-1"><i class="fa fa-sort"></i>&nbsp;&nbsp;节点排序</a></li>
	          </ul>
	      </div>
	      
	      <div id="leafMenu"   class="bootstrap-contextmenu" >
	          <ul class="dropdown-menu" role="menu">
	              <li><a  data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑节点</a></li>
	              <li><a data-action="node_del"  tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除节点</a></li>
	              <!-- <li><a data-action="node_edit_url"  tabindex="-1"><i class="fa fa-times-circle"></i>&nbsp;&nbsp;编辑URL </a></li> -->
	              <li class="divider"></li>
	              <li><a  data-action="node_export" tabindex="-1"><i class="fa fa-export"></i>&nbsp;&nbsp;导出</a></li>
	              <li><a  data-action="node_import" tabindex="-1"><i class="fa fa-import"></i>&nbsp;&nbsp;导入</a></li>
	              <li class="divider"></li>
	             <li><a data-action="node_move" tabindex="-1"><i class="fa fa-arrows-v"></i>&nbsp;&nbsp;移动节点</a></li>
	          </ul>
	      </div>
	</body>
</html>