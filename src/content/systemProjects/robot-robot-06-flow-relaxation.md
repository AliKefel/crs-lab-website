---
system: robot-robot
category: "FLOW"
title: "Flow Relaxation"
images:
  - "/images/systems/block.jpg"
citation: "Y. Zhang and L. E. Parker. \"Solution Space Reasoning to Improve IQ-ASyMTRe in Tightly-Coupled Multirobot Tasks.\" IEEE International Conference on Robotics and Automation (ICRA), 2011."
citationUrl: "http://web.eecs.utk.edu/~parker/publications/ICRA_11.pdf"
order: 6
---

In FLOW, when an information flow is interrupted, or when flow quality no longer satisfies the task's requirements, the task robot can initiate a flow relaxation process for the affected coalition. Since this process can update the set of sensor constraints, the coordination solution also needs to be recreated. This only needs to be performed on the initiating coalition and any coalitions set up after it in the previous coordination process, unless a new coordination solution cannot be found with these coalitions after relaxation.

FLOW further improves on this by reasoning about the solution space, providing a more robust and flexible flow relaxation process.
