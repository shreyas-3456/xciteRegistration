import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

import { SEND_MAIL } from '../action/index';
import { validateEmail } from '../utils/validate';

const client = new SESClient({
	region: process.env.REACT_APP_AWS_REGION,
	credentials: {
		accessKeyId: process.env.REACT_APP_KEY_ID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	},
});

const reducer = (state, action) => {
	switch (action.type) {
		case SEND_MAIL:
			const mail = action.payload;
			if (!validateEmail(mail)) {
				console.log('mail not valid');
				return {
					...state,
					formError: true,
					formSuccess: false,
					text: 'Enter valid email',
				};
			}

			let params = {
				Destination: {
					/* required */
					CcAddresses: [
						mail,
						/* more items */
					],
					ToAddresses: [
						mail,
						/* more items */
					],
				},
				Message: {
					/* required */
					Body: {
						/* required */
						Html: {
							Charset: 'UTF-8',
							Data: 'Registration',
						},
						Text: {
							Charset: 'UTF-8',
							Data: 'TEXT_FORMAT_BODY',
						},
					},
					Subject: {
						Charset: 'UTF-8',
						Data: `Succesfully registered `,
					},
				},
				Source: 'shreyas.nigam25@gmail.com' /* need to change */,
				ReplyToAddresses: [
					'shreyas.nigam25@gmail.com', //need to change
					/* more items */
				],
			};

			const sendMail = new SendEmailCommand(params);
			const send = (async () => {
				try {
					return await client.send(sendMail);
				} catch (error) {
					return console.log(error);
				}
			})();
			if (send) {
				return {
					...state,
					formSuccess: true,
					formError: false,

					text: 'Message sent',
				};
			}
			break;

		default:
			throw new Error(`No matching ${action.type} found`);
	}
};

export default reducer;
