---
system: robot-robot
category: "IQ-ASyMTRe"
title: "Solution Space"
images:
  - "/images/systems/reason.jpg"
citation: "Y. Zhang and L. E. Parker. \"IQ-ASyMTRe: Synthesizing Coalition Formation and Execution for Tightly-Coupled Multirobot Tasks.\" IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2010."
citationUrl: "http://www.cs.utk.edu/~parker/publications/IROS_10-Zhang.pdf"
order: 2
---

In IQ-ASyMTRe, robot capabilities are built as schemas based on schema theory, where each schema represents a motor, sensory, computational, or communication capability of the agent. Given a task, we must determine how to connect the different schemas of different robots to satisfy the task's requirements.

To create the solution space of potential connection solutions for a task, the reasoning algorithm first checks all components that can output the required information instances for the task, then checks recursively for the inputs of those components until each path either ends in a source component (such as a sensor) or in a conflict with the referent instantiation constraint, which requires the referents of certain information instances to be instantiated to the same entity in the environment. In a second phase, the robots temporarily activate their capabilities to dynamically instantiate the information flows from sources to sinks.
