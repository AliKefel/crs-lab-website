---
system: human-robot
category: "Human Modeling"
title: "Capability Modeling"
images:
  - "/images/systems/hmodeling.png"
  - "/images/systems/cap-modeling.jpeg"
citation: "Y. Zhang, S. Sreedharan, and S. Kambhampati. \"Capability Models and Their Applications in Planning.\" International Conference on Autonomous Agents and Multiagent Systems (AAMAS), 2015."
order: 1
---

The tasks in human modeling include enabling automated systems to learn about the humans they work with in terms of knowledge, capabilities, intents, and preferences.

One important challenge for a set of agents to achieve more efficient collaboration is for these agents to maintain proper models of each other. An important aspect of these models is that they are often not provided, and hence must be learned from plan execution traces. As a result, these models of other agents are inherently partial and incomplete. Most existing agent models are based on action modeling and do not naturally allow for incompleteness.

We introduce a modeling approach based on the representation of capabilities, which has several unique advantages. First, we show that the structures of capability models can be learned or easily specified, and both model structure and parameter learning are robust to high degrees of incompleteness in plan traces (for example, with only start and end states partially observed). Furthermore, parameter learning can be performed efficiently online via Bayesian learning. While high degrees of incompleteness in plan traces present learning challenges for traditional, complete models, capability models can still learn to extract useful information. As a result, capability models are useful in applications where traditional models are difficult to obtain, or where models must be learned from incomplete plan traces, such as robots learning human models from observations and interactions.
