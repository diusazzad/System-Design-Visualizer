# Contributing to System Design Visualizer

First off, thank you for considering contributing to System Design Visualizer! It's people like you that make this tool a great resource for the engineering community.

## Where to Start?

You can contribute in several ways:
1. **Reporting Bugs:** File issues if you find any unexpected behavior.
2. **Suggesting Features:** Have an idea? Create a feature request issue!
3. **Adding Content:** We are always looking for new System Design Concepts or Case Studies.
4. **Code Contributions:** Check out our open issues tagged with \`good first issue\` or \`help wanted\`.

## How to Add a New Concept / Case Study

All concepts and case studies are managed in the \`src/utils/mockData.ts\` or \`src/utils/mockCommunityData.ts\` files for the MVP.

1. Fork the repository.
2. Create a new branch: \`git checkout -b add/new-case-study\`
3. Open \`src/utils/mockData.ts\`.
4. Add your new concept or case study following the existing TypeScript interfaces (\`SystemConcept\` or \`CaseStudy\`).
5. Run the development server (\`npm run dev\`) and verify it renders beautifully on the frontend.
6. Commit your changes: \`git commit -m "feat: add [Name] case study"\`
7. Push to the branch: \`git push origin add/new-case-study\`
8. Submit a Pull Request!

## Development Guidelines

- **TypeScript:** We strictly enforce TypeScript. Please ensure your code passes \`npm run build\` without type errors.
- **Styling:** We use TailwindCSS. Avoid custom CSS unless absolutely necessary.
- **Components:** Keep components small, functional, and reusable.

Thank you!
