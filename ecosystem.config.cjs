/**
 * PM2 Configuration for SelectCareOS
 * German Select Health Platform
 * 
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 restart selectcareos
 *   pm2 logs selectcareos --nostream
 *   pm2 stop selectcareos
 */

module.exports = {
  apps: [
    {
      name: 'selectcareos',
      script: 'npx',
      // Use D1 local database for development
      args: 'wrangler pages dev dist --d1=selectcareos-production --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      // Restart settings
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 1000,
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Memory management
      max_memory_restart: '500M'
    }
  ]
}
