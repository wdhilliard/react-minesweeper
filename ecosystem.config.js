// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
    apps : [{
      name: 'minesweeper',
      script: 'yarn',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
    }]
  };
  