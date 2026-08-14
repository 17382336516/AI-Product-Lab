# 群策（AI Customer Intelligence Agent）项目详情页设计 Prompt


这是一个 AI Product Portfolio 网站中的项目详情页。

用户从首页点击「群策 AI Customer Intelligence Agent」项目卡片进入该页面。


整体视觉风格需要与首页保持一致：

- 暖米白背景
- 低饱和度配色
- 极简高级 AI 产品案例展示风格
- Soft UI
- Human-centered AI
- Premium Product Case Study
- 有一点可爱元素，但不能像插画作品


整体目标：

让 AI 产品经理面试官在 10 秒内理解：

群策不是普通 Chatbot。

它通过：

Data Grounded AI

+

Controlled Multi-Agent System

+

Business Growth


帮助企业从真实用户数据生成可信营销策略。


视觉关键词：

AI Product Case Study

Human-centered AI

Premium Minimal

Soft UI

Product Thinking

Low Saturation

Enterprise AI



================================================

# 全局设计规范


## 背景

整个页面：

暖白色：

#FAF8F3


不要纯白背景。


加入非常淡的手绘装饰：

- 小星星
- 细线
- 点状元素


透明度：

10%-15%


只用于增加品牌氛围。

不要影响内容阅读。



---

## 字体颜色


标题：

#332D28


正文：

#756B62


辅助文字：

#A79C90


避免：

- 纯黑
- 高饱和颜色
- 大面积彩色背景



================================================

# 页面结构


共两个页面：


PAGE 1:

Why Choose It?


PAGE 2:

How It Works?


每个页面固定一屏。


页面之间使用自然滚动转场。



================================================

# PAGE 1

# Why Choose It?


页面目标：

第一屏快速回答：

1. 企业为什么需要群策？
2. 传统 AI 方案有什么问题？
3. 群策的三个核心价值是什么？



================================================

# Header


左上：

← Back


顶部中央：

群策

AI Customer Intelligence Agent


副标题：

一个面向企业增长场景的 AI Customer Intelligence Agent，

通过真实用户数据与企业知识，

帮助团队生成更精准、更可信的营销策略。



================================================

# PAGE 1 页面布局


不要严格网格。


整体比例：

左侧 35%

企业痛点区域


右侧 65%

Core Value 区域


右下角：

小狗 IP 装饰



================================================

# 左侧 Pain Point


标题：

Why existing AI solutions fail?


中文：

企业 AI 应用中的两个核心问题



---

## Pain Point Card 01


标题：

数据隔离导致 AI 缺乏真实业务依据


尺寸：

300 × 190px


样式：

背景：

#FFFCF7


边框：

1px solid #E8DCCB


圆角：

20px


阴影：

0 8px 20px rgba(80,60,40,0.05)



内容：

业务数据：

- 用户行为
- 消费记录
- 交易信息


说明：

由于数据安全限制，

无法直接输入通用 LLM。


底部增加小流程：


传统 LLM：

购买手机

↓

猜测兴趣：

旅游？

豪车？

科技生活？


↓

泛化建议


节点：

浅米灰圆角标签。


不要大面积灰色。



---

## Pain Point Card 02


标题：

缺少企业知识背景，

AI 难以理解业务语境


内容：

企业定位

产品特点

历史策略

行业经验


导致：

策略不符合业务目标

缺少执行价值


样式保持一致。



================================================

# 右侧 Core Value


标题：

Core Value


三个价值卡片垂直排列。



卡片：

宽度：

420px


高度：

150px



背景：

#FFFCF7


不要整块彩色。


颜色只用于：

- 编号
- 小 icon
- 边框
- 标签



================================================

# Value Card 01


标题：

Data Grounded AI


中文：

数据驱动，降低 AI 幻觉


内容：

左右对比。



左侧：

Traditional LLM


颜色：

浅灰。


流程：

买手机

↓

猜测兴趣

↓

泛化建议



右侧：

群策


使用浅绿色强调：

真实行为数据

↓

消费频率

品牌偏好

品类偏好

↓

可信用户洞察



绿色：

#B8D8C4


只用于结果节点。

不要填充整个卡片。



================================================

# Value Card 02


标题：

Controlled Multi-Agent System


中文：

专业 Agent 分工，而非单一 Chatbot


说明：

通过 Orchestrator 调度多个专业 Agent，

实现可控、可解释的业务分析流程。



加入小型架构缩略图。


尺寸：

220 × 100px



结构：

                 Orchestrator


          /          |          \


 Data Agent   Insight Agent   Strategy Agent



线条：

#B7CEDD


节点：

白色背景

浅蓝描边


不要复杂。



================================================

# Value Card 03


标题：

Business Growth


中文：

从洞察到策略闭环


流程：

用户分群

↓

用户画像

↓

营销策略

↓

增长决策


使用：

细线连接。


节点：

小圆点。


颜色：

#E8C8A8



不要整个流程橙色。



================================================

# 小狗 IP


使用提供的小狗透明 PNG。


要求：

- 不添加 AI icon
- 不添加软件 logo
- 不改变颜色


位置：

右下角。


尺寸：

约页面 10%-15%。


作用：

增加品牌温度。


状态：

小狗坐着看数据。


动画：

只允许：

上下轻微漂浮 2-4px。


禁止：

- 眨眼
- 表情变化
- 复杂动画



================================================

# PAGE 1 → PAGE 2 转场


不要复杂动画。


使用：

smooth fade transition


效果：

- Pain Point 卡片淡出
- Core Value 缩小
- Agent 架构线条逐渐出现


自然进入第二页。



================================================

# PAGE 2

# How It Works?


副标题：

从用户数据分析，到营销策略生成


辅助说明：

通过 Controlled Multi-Agent System，

将真实用户数据转化为可执行业务策略。



目标：

展示：

产品链路

+

AI 架构能力

+

真实产品落地



================================================

# PAGE 2 页面布局


固定一屏。


采用上下结合布局。


上方：

40%

Controlled Multi-Agent Architecture


下方：

60%

Product Demo



不要左右分割。

因为截图需要较大展示。



================================================

# 上半部分：Controlled Multi-Agent System


标题：

Controlled Multi-Agent System


说明：

多个专业 Agent 协作，

通过统一调度完成：

数据分析 → 用户洞察 → 策略生成。



---

## 架构图


结构：



                 User Query


                      ↓


              Orchestrator

          任务理解 / Agent 调度


                      ↓


------------------------------------------------


        Data Agent


        Insight Agent


        Strategy Agent


------------------------------------------------


                      ↓


              Business Outcome



---

每个 Agent 节点包含：

名称

一句功能说明



Data Agent：

数据清洗

用户分群


Insight Agent：

用户画像

消费洞察


Strategy Agent：

营销策略

增长建议



颜色：

Data：

#B8D8C4


Insight：

#B7CEDD


Strategy：

#E8C8A8



线条：

细线。

不要科技感。



================================================

# 下半部分：Product Demo


标题：

Product Flow


展示真实产品截图。


不要：

- 浏览器窗口
- 电脑 mockup
- 虚假 UI



使用真实截图。



布局：

三个截图横向排列。



结构：


[01 Data Understanding]


[02 Customer Insight]


[03 Strategy Generation]



每张截图：

圆角：

24px


背景：

#FFFCF7


边框：

#E8DCCB


阴影：

轻柔。



================================================

# Screenshot 01


标题：

01 Data Understanding


中文：

数据理解与用户分群


截图：

上传数据页面。



旁边小介绍：


Data Agent


输入：

用户交易数据


处理：

数据清洗

行为分析

用户分群


输出：

User Segments



高亮：

上传区域

数据检测区域



颜色：

浅绿色。



================================================

# Screenshot 02


标题：

02 Customer Insight


中文：

用户洞察生成


截图：

用户分析页面。


介绍：


Insight Agent


输入：

User Segments


处理：

消费趋势分析

用户画像生成

行为解释


输出：

Customer Profile



高亮：

用户分群

消费趋势

用户画像区域



颜色：

雾蓝色。



================================================

# Screenshot 03


标题：

03 Strategy Generation


中文：

营销策略输出


截图：

业务分析记录页面。


介绍：


Strategy Agent

+

Knowledge Retrieval(RAG)


输入：

Customer Insight

+

Business Context


输出：

Marketing Strategy



高亮：

业务问题

策略卡片

营销建议



颜色：

浅米橙。



================================================

# Screenshot Interaction


不要复杂滚动动画。


采用轻量切换：


用户滚动：

当前截图放大。


当前状态：

scale 1

opacity 100%


其他截图：

scale 0.9

opacity 50%



切换：

300-500ms ease-out。



同时：

对应 Agent 节点高亮。



例如：

截图01：

Data Agent 高亮。


截图02：

Insight Agent 高亮。


截图03：

Strategy Agent 高亮。



================================================

# AI Engine


位置：

左下角。


小区域。


标题：

AI Engine


内容：

LLM Reasoning

RAG Knowledge Retrieval

Agent Orchestration

Data Grounding


样式：

白底

细边框

圆角。



================================================

# Try Button


按钮：

Try 群策 →


保持和 Offer 到一致。


样式：

背景：

#FFFCF7


边框：

#D9CBB8


文字：

#332D28



Hover：

轻微上浮。



================================================

# 最终设计目标


用户看到第一页：

理解：

为什么企业需要群策。


用户看到第二页：

理解：

群策如何通过：

真实数据

↓

Controlled Multi-Agent

↓

用户洞察

↓

营销策略


完成企业增长闭环。



设计优先级：

1. 产品价值清晰
2. AI 产品思维
3. 技术架构可信
4. 真实产品落地
5. 视觉统一


不要为了动画牺牲信息表达。