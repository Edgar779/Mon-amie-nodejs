module.exports = {
  apps: [
    {
      name: 'API',
      script: 'bin/www',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      exec_interpreter: 'babel-node'
    }
  ],

  deploy: {
    development: {
      user: 'monamie',
      host: '5.9.1.58',
      ref: 'origin/dev',
      repo: 'git@gitlab.com:exio.tech/mon-amie/mon-amie-api.git',
      path: '/home/monamie/app',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env development'
    },
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
