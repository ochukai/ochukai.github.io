title: tmp in weaver research
tags:
  - null
categories:
  - null
---

/eb/research					              调查问卷列表入口
/eb/research/save				            调查问卷保存
/eb/research/remove?ids=id1,id2			调查问卷批量删除
/eb/research/query				          调查问卷分页查询

/eb/research/question/{researchId}		    调查问卷问题列表入口
/eb/research/question/save			          调查问卷问题保存
/eb/research/question/remove?ids=id1,id2	调查问卷问题批量删除
/eb/research/question/query/{researchId}	调查问卷问题查询（未分页），question.options为对应的所有选项

/eb/research/category				              调查问卷类别列表入口
/eb/research/category/save			          调查问卷类别保存
/eb/research/category/remove?ids=id1,id2	调查问卷类别批量删除（tenantid="1"的禁止删除）
/eb/research/category/query			          调查问卷类别分页查询
