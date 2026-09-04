---
system: robot-robot
category: "IQ-ASyMTRe"
title: "IQ-ASyMTRe"
images:
  - "/images/systems/IQ-ASyMTRe.png"
citation: "Y. Zhang and L. E. Parker. \"IQ-ASyMTRe: Forming Executable Coalitions for Tightly Coupled Multirobot Tasks.\" IEEE Transactions on Robotics, 29(2):400-416, 2013."
citationUrl: "http://web.eecs.utk.edu/~parker/publications/TRO-13.pdf"
order: 1
---

While most previous research on forming coalitions concentrates mainly on loosely coupled multirobot tasks, a more challenging problem is to address tightly coupled multirobot tasks that involve close robot coordination, which often requires capability sharing. General methods for autonomous capability sharing have been shown to greatly improve the flexibility of distributed systems. However, in addition to the interaction constraints between the robots and the environment required by the tasks, these methods may introduce additional interaction constraints between robots based on how the capabilities are shared. The satisfiability of these constraints in the current situation determines the feasibility of potential coalitions.

To achieve system autonomy, the ability to identify potential coalitions that are feasible for task execution is critical. We introduce a general approach that incorporates this capability, extending the ASyMTRe architecture into IQ-ASyMTRe, which is able to find coalitions in which these required constraints are satisfied. When used to form coalitions, IQ-ASyMTRe sets up only feasible coalitions, enabling tasks to be executed autonomously. We have formally proven that IQ-ASyMTRe is sound and complete for forming executable coalitions.
