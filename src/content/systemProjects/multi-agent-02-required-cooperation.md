---
system: multi-agent
category: "Task Allocation and Scheduling"
title: "Required Cooperation"
images:
  - "/images/systems/rc.png"
  - "/images/systems/burglar.png"
citation: "Y. Zhang, S. Sreedharan, and S. Kambhampati. \"A Formal Analysis of Required Cooperation in Multi-Agent Planning.\" International Conference on Automated Planning and Scheduling (ICAPS), 2016."
citationUrl: "http://rakaposhi.eas.asu.edu/yu-zhang-icaps16.pdf"
order: 2
---

It is well understood that, through cooperation, multiple agents can achieve tasks that are unachievable by a single agent. However, there had been no formal characterization of situations where cooperation is required to achieve a goal, thus warranting the use of multiple agents. We provide such a formal characterization for multi-agent planning problems with sequential action execution.

We first show that determining whether there is required cooperation is, in general, intractable even in this limited setting, so we start our analysis with a subset of more restrictive problems where agents are homogeneous. For such problems, we identify two conditions that can cause required cooperation: when neither holds, the problem is single-agent solvable, and otherwise we provide upper bounds on the minimum number of agents required. For the remaining problems with heterogeneous agents, we further divide them into two subsets, and for one of these we propose the concept of a transformer agent to reduce the number of agents that need to be considered, which is used to improve planning performance.
