package com.lc.ibps.bishes.teacherAndStudent.service;

import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;

public interface TeacherAndStudentService  extends IScript {
	public void save(ActionCmd cmd);
	public void nodeExecutors(String ids);

}
