---
system: robot-robot
category: "FLOW"
title: "FLOW"
images:
  - "/images/systems/FLOW.jpeg"
citation: "Y. Zhang and L. E. Parker. \"FLOW: Information Flow-Based Coalition Execution for Tightly Coupled Multirobot Tasks.\" Submitted to the International Journal of Robotics Research, 2014."
order: 3
---

A robot assigned to a task may need to form a coalition due to capability and physical constraints, and for a multirobot task, multiple coalitions may need to be formed. Although approaches exist to form coalitions, no general architecture previously existed to execute these coalitions when they can overlap.

In FLOW, we identify three main challenges to achieving such an architecture for tightly coupled multirobot tasks: creating and validating coordination solutions with potentially overlapping coalitions; executing the task while maintaining the coalitions subject to environmental influences; and relaxing the coalitions and coordination solution when they become infeasible. The proposed architecture is built on the concept of information flow, which defines the interactions among basic functional units, or schemas, on robots. FLOW addresses the first challenge by formalizing coalitions as information flows that specify configuration constraints to be satisfied in the coordination solution; the second is converted to monitoring and maintaining a measure of flow quality, computed systematically from the flow structure; and the third is associated with flow relaxation, which allows information to flow in alternative ways.
