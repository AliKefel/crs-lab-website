---
system: multi-agent
category: "Task Allocation and Scheduling"
title: "Distributed Pathfinding"
images:
  - "/images/systems/multi-agent.png"
citation: "Y. Zhang, K. Kim, and G. Fainekos. \"DisCoF: Cooperative Pathfinding in Distributed Systems with Limited Sensing and Communication Range.\" International Symposium on Distributed Autonomous Robotic Systems (DARS), 2014."
citationUrl: "http://www.public.asu.edu/~yzhan442/DARS2014.pdf"
order: 3
---

This project addresses the multi-agent pathfinding problem in distributed systems that are subject to limited sensing and communication range. Cooperative pathfinding is typically addressed in one of two ways in the literature: fully coupled approaches consider all robots together and construct plans simultaneously, while decoupled approaches construct plans for only a subset of robots at a time. Decoupled approaches can be much faster, but are often suboptimal and incomplete, and the few decoupled approaches that do achieve completeness typically assume access to global information, which may not be available in distributed robotic systems.

We provide a window-based approach to cooperative pathfinding with limited sensing and communication range, called DisCoF. Robots are assumed to be fully decoupled initially, and may gradually increase their level of coupling online and in a distributed fashion; in cases where global information is needed to solve a problem instance, DisCoF eventually couples all robots together. DisCoF represents an inherently online approach, since robots may only be aware of a subset of robots in the environment at any given time and therefore lack enough information to determine non-conflicting plans with all other robots. A completeness analysis of DisCoF is provided.
