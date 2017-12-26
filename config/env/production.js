/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  hookTimeout: 40000,
  
  models: {
     connection: 'conMunicipiosHeroku'
  },

  connections:{

    conMunicipiosHeroku: {
      adapter: 'sails-postgresql',
      url:process.env.DATABASE_URL||'postgres://pwvstojjjvygft:9472cd8725b95566d7b5d75256f6ec95b9dd5599f7d8dae612d71b60548641d7@ec2-23-23-234-118.compute-1.amazonaws.com:5432/d26873s1uckhhk',
      ssl:true
    },
    
  }

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }
  
};
