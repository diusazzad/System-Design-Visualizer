# 🏛️ System Design Visualizer

An interactive and beautifully crafted educational tool to learn, visualize, and practice **System Design** and large-scale architectural patterns. This is the logical next step after the SDLC Visualizer, tailored for Software Engineers and FAANG interview preparation.

<!-- <div align="center">
  <img src="public/screenshots/demo.webp" alt="System Design Visualizer Demo" width="100%" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
</div> -->

## ✨ Highlights

- 🧠 **Design Interview Mode**: An interactive step-by-step wizard that asks you system requirements (DAU, Read/Write Ratio, Consistency needs) and auto-generates the ideal architecture.
  
  <img src="public/screenshots/interview.png" alt="Interview Mode" width="100%" style="border-radius: 8px;"/>
  
- 🚦 **Traffic Simulation**: Watch data flow through your load balancers, caching layers, and databases with animated edges and React Flow.
  
  <img src="public/screenshots/simulator.png" alt="Traffic Simulator" width="100%" style="border-radius: 8px;"/>
   
- 📚 **Concept Explorer**: Deep dive into core concepts like *Horizontal vs Vertical Scaling*, *Load Balancing Algorithms*, and *Caching Strategies* with interactive side-by-side diagrams and code snippets.
- 📸 **1-Click Export**: Export any generated architecture diagram to a high-quality PNG for your notes or presentations.

## 🚀 Tech Stack
- React 18 + Vite + TypeScript 
- React Flow (for Architecture Canvas)
- Framer Motion (for Node Animations)
- Tailwind CSS v4
- Zustand
- Lucide React

## 📦 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>
cd system-design-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` (or the port specified by Vite) to view it in the browser.
