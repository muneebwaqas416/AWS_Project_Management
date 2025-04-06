module.exports = {
  apps: [
    {
      name: "project-management",  // You can keep the same name or change it if you want
      script: "npm",               // The script to run is npm
      args: "run start",           // Change from 'run dev' to 'run start' for NestJS
      env: {
        NODE_ENV: "development",  // Keep the environment as development
      },
      env_production: {
        NODE_ENV: "production",  // You can add a production environment too
      },
    },
  ],
};
