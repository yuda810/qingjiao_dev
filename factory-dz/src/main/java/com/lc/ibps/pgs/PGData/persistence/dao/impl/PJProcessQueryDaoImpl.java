
package com.lc.ibps.pgs.PGData.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.PJProcessQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJProcessPo;

/**
 *t_p_pjgc 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:42:08
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class PJProcessQueryDaoImpl extends MyBatisQueryDaoImpl<String, PJProcessPo> implements PJProcessQueryDao{

    @Override
    public String getNamespace() {
        return PJProcessPo.class.getName();
    }
}
