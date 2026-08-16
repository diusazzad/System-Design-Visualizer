# Dev.to / Hashnode Article

**Title:** How I Built an Interactive System Design Visualizer using React Flow

## Introduction
System design interviews are often the most intimidating part of the software engineering hiring loop. Why? Because unlike algorithms, there is no "correct" answer—only trade-offs.

I noticed that most engineers (including myself) learn system design by staring at static diagrams in books or blogs. I wanted something better. I wanted a tool that would *react* to my decisions. 

So, I built **System Design Visualizer**: an open-source, interactive tool for practicing system architecture. Here's how I built it.

## The Problem with Static Learning
When you read that "Twitter uses Redis for caching," it's easy to nod and move on. But *why* do they use it? What happens if the cache goes down? What if they switch to Memcached? Static diagrams can't answer "What if?" questions.

I wanted to build a tool that could:
1. Generate architectures based on user constraints (e.g., 50M DAU vs 10k DAU).
2. Allow users to drag-and-drop components interactively.
3. Simulate a real interview with grading.

## The Tech Stack
Since I wanted this to be highly accessible, I decided to build it entirely on the frontend. No backend, no databases, just blazing fast client-side code.

- **React 18 & TypeScript:** The core foundation.
- **Vite:** For instant HMR and optimized builds.
- **React Flow:** The absolute best library for building node-based UIs and diagrams.
- **Zustand:** For dead-simple state management across the complex Interview Simulator.
- **Tailwind CSS:** For rapid, beautiful UI development.

## Building the Scenario Engine
The most complex part was the "Rules Engine" inside the Scenario Builder. 
If a user selects "500 Million DAU" and "Sub-millisecond Latency", the engine needs to know that a single PostgreSQL instance won't work. It dynamically constructs a JSON payload of Nodes and Edges, injecting components like Global Load Balancers, Edge CDNs, and Redis Clusters based on boolean logic.

*(Insert Code Snippet of Rules Engine here)*

## The Interview Simulator
I structured the interview simulator into 4 distinct phases, mimicking a real FAANG interview:
1. Requirements Clarification
2. High-Level Design Canvas
3. Deep Dive Questions
4. Trade-offs

Using Zustand, I maintained the state across all 4 phases, and at the end, a "Scoring Engine" calculates a grade based on the decisions made on the canvas versus the initial requirements. 

## The Open Source Journey
This project is completely open-source. Building it has been an incredible learning experience in frontend state management, diagramming algorithms, and system design itself.

If you are preparing for interviews, give it a spin! 
🔗 [Live Demo Link]
🔗 [GitHub Repo]

I'd love to hear your thoughts. What features should I add next? If you like the project, a star on GitHub goes a long way! 🌟
