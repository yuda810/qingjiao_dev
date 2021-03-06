package com.lc.ibps.lyzygls.XiaoBan.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.XiaoBan.domain.XiaoBan;
import com.lc.ibps.lyzygls.XiaoBan.repository.XiaoBanRepository;
import com.lc.ibps.lyzygls.XiaoBan.persistence.dao.XiaoBanQueryDao;
import com.lc.ibps.lyzygls.XiaoBan.persistence.entity.XiaoBanPo;

/**
 * t_xb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 16:05:58
 *</pre>
 */
@Repository
public class XiaoBanRepositoryImpl extends AbstractRepository<String, XiaoBanPo,XiaoBan> implements XiaoBanRepository{
	  
	@Resource
	private  XiaoBanQueryDao xiaoBanQueryDao;

	public XiaoBan newInstance() {
		XiaoBanPo po = new XiaoBanPo();
		XiaoBan xiaoBan = AppUtil.getBean(XiaoBan.class);
		xiaoBan.setData(po);
		return xiaoBan;
	}

	public XiaoBan newInstance(XiaoBanPo po) {
		XiaoBan xiaoBan = AppUtil.getBean(XiaoBan.class);
		xiaoBan.setData(po);
		return xiaoBan;
	} 
	
	@Override
	protected IQueryDao<String, XiaoBanPo> getQueryDao() {
		return xiaoBanQueryDao;
	}
	

	
}
