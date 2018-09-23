const snekfetch = require('snekfetch');
const Error = require('./ErrorHandler');

class Client {
    constructor(id, token) {
        if (typeof id != 'string') throw new TypeError('Bot ID must be a string');
        if (typeof token != 'string') throw new TypeError('Token must be a string');
        this.id = id;
        this.token = token;
        this.baseURL = 'https://discordboats.xyz/api';
    }

    /**
	 * Get information about a specific bot.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {String} id The ID of the bot you want to get information on.
	 */

    getBot(id) {
        if (typeof id != 'string') throw new TypeError('Bot ID must be a string')
        return new Promise((resolve, reject) => {
			snekfetch.get(this.baseURL + '/bot/' + id).then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
				reject(new Error(error));
			});
        });  
    }

    /**
	 * Get information about the current bot.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 */

    getCurrent() {
        return this.getBot(this.id);
    }

    /**
	 * Get information about a specific user.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {String} id The ID of the user you want to get information on.
	 */

    getUser(id) {
        if (typeof id != 'string') throw new TypeError('User ID must be a string')
        return new Promise((resolve, reject) => {
			snekfetch.get(this.baseURL + '/user/' + id).then((users) => {
				resolve(users.body);
			}).catch((error) => {
				reject(new Error(error));
			});
        });  
    }

    /**
	 * Update bot server count..
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {Integer} count The server count
	 */

    updateCount(count) {
        if (typeof count != 'number') throw new TypeError('Count must be a number.');
        return new Promise((resolve, reject) => {
			snekfetch.post(this.baseURL + '/bot/' + this.id).set('Authorization', this.token).send({ server_count: count }).then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
				reject(new Error(error));
			});
		});
    }
}

module.exports = Client;