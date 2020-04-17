// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
    apps : [{
      name: 'minesweeper',
      script: 'yarn',
      args: 'start',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      },
    }]
  };
  