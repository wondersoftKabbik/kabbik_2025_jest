module.exports = {
  apps: [
    {
      name: 'kabbik-web-2025-jest',
      cwd: '/opt/kabbik-services/kabbik_2025_jest',
      "instances" : "1",
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: "--max-old-space-size=512"
      },
      max_memory_restart: "300M" 
    },
  ],
};
