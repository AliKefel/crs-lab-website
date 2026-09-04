---
system: multi-agent
category: "Task Allocation and Scheduling"
title: "Task Allocation"
images:
  - "/images/systems/ta.png"
citation: "Y. Zhang and L. E. Parker. \"Considering Inter-Task Resource Constraints in Task Allocation.\" Journal of Autonomous Agents and Multi-Agent Systems (JAAMAS), 2013."
order: 1
---

Task allocation and scheduling is a well-studied problem in multi-agent systems, dealing with assigning agent resources to different tasks. It has applications well beyond robotics, including airline and post office scheduling and mission planning.

Task allocation with single-task robots, multi-robot tasks, and instantaneous assignment has been shown to be strongly NP-hard. Although this problem has been studied extensively, few efficient approximation algorithms have been provided given its inherent complexity. We provide discussion and analysis of two natural greedy heuristics for solving this problem, then introduce a new greedy heuristic that considers inter-task resource constraints to approximate the influence between different assignments. Instead of only looking at the utility of an assignment, our approach computes the expected loss of utility, due to the assigned robots and task, as an offset, and uses the offset utility for making the greedy choice. A formal analysis of the new heuristic shows that solution quality is bounded by two different factors, and we provide a new algorithm to approximate the heuristic for improved performance.
