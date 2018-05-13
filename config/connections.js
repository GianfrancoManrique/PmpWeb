/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  /*
  connAdminMunicipal: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'usrAdmMunicipal',
    password: 'usrMuni@@',
    database: 'bdmunicipalidades'
  },
  */

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  /*
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },
  */
  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  // ***************************************************************************/

  /*
  conBDMunicipios: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    port:5432,
    database: 'BDMunicipios',
    user: 'usrpmp',
    password: '12345abcD@'
  },
  */
  
  conMunicipiosBD:{
     adapter: 'sails-postgresql',
     host:'ec2-23-23-234-118.compute-1.amazonaws.com',
     port:5432,
     database:'d26873s1uckhhk',
     user:'pwvstojjjvygft',
     password:'9472cd8725b95566d7b5d75256f6ec95b9dd5599f7d8dae612d71b60548641d7',
     ssl:'true'
  },

  conProdPMP:{
    adapter: 'sails-postgresql',
    host:'ec2-50-16-196-238.compute-1.amazonaws.com',
    port:5432,
    database:'d2hj34dm7dh31i',
    user:'pzbmzpztoucjee',
    password:'87a86a166dc78961fc1795554730e010d3ddd73f31ffa4a566d71962c753823c',
    ssl:'true'
  }

  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};
