<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/tree.jsp" %>
  
<title>角色选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/roleDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyRoleDialog.js"></script>
</head>
<body  >
	<form id="roleForm"  class="form-horizontal" >
	
		<table class="table table-bordered"   cellspacing="1">
			<tr class="radiorow">
				<th style="width:20%">
					<label for="startManRole">发起人角色</label>
					<input id="startManRole" type="radio" name="source" value="start">
				</th>
				<td></td>
			</tr>
			<tr class="radiorow">
				<th style="width:20%">
					<label for="prevManRole">上一步执行人角色</label>
					<input id="prevManRole" type="radio" name="source" value="prev">
				</th>
				<td></td>
			</tr>
			<tr >
				<th style="width:20%">
					<label for="specManRole">指定角色</label>
					<input id="specManRole" type="radio" name="source" value="spec">
				</th>
				<td>
                    <div class="input-group">
	           			<input type="hidden" name="roleKey">
                       	<textarea class="form-control" readonly name="roleName"></textarea> 
                       	<span class="input-group-btn">
                        	<button type="button" class="btn btn-primary" onclick="roleDialog._choiceUser(this)"> 请选择</button> 
                       	</span>
                    </div>
				</td>
			</tr>
			<tr >
				<th style="width:20%">
					<label for="nodeMan">相同节点执行人角色</label>
					<input id="nodeMan"  type="radio" name="source" value="node">
				</th>
				<td>
                    <div class="input-group">
                        <input name="nodeId1" id="nodeId1" type="hidden" >
                        <input type="text" id="nodeName1" readonly class="form-control"> 
                        <span class="input-group-btn">
                        <button type="button" class="btn btn-primary" onclick="roleDialog._getNode(this)"> 请选择</button> 
                        </span>
                    </div>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>


