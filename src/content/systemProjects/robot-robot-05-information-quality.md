---
system: robot-robot
category: "FLOW"
title: "Information Quality"
images:
  - "/images/systems/maze.jpg"
citation: "Y. Zhang and L. E. Parker. \"A General Information-Quality-Based Approach for Satisfying Sensor Constraints in Multirobot Tasks.\" IEEE International Conference on Robotics and Automation (ICRA), 2010."
citationUrl: "http://www.cs.utk.edu/~parker/publications/icra10.pdf"
order: 5
---

As coalitions are formed in FLOW, sensor constraints among robots are also established. How to keep these constraints satisfied throughout execution, from initial configuration to task completion, remains an open issue, and environmental factors, both static and dynamic, can influence whether the constraints continue to hold. Problems also arise when the constraints become unsatisfiable given current circumstances.

FLOW proposes a general method to address these issues across applications with different sensors. The method combines sensor models, environment sampling, and a measure of information quality with a sampled motion model. Local information-quality measures are then combined systematically to compute an overall flow quality.
