const userModel = require('../models/main.js');
const admin = require('firebase-admin')
const serviceAccount = require("../service-account-key.json");

// Initialize Firebase Admin =>
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// firebase notifications =>
exports.firebaseNotifications = async (_id, msgPayload = "") => {
    try {
        let { firebaseToken: registrationTokens } = await userModel.findById(_id);
        // message body =>
        const message = {
            notification: {
                title: 'Holi offers!',
                body: 'Upto 50% OFF on shirts, bags and Accessories',
                image: 'https://c8.alamy.com/comp/KG34JA/christmas-sale-poster-holiday-discount-offer-shop-market-KG34JA.jpg',
            },
            tokens: [registrationTokens]
        };
        //  send message =>
        admin.messaging().sendEachForMulticast(message)
            .then((response) => {
                console.log(response, " <---- notification sent successfully!")
            })
            .catch((error) => {
                console.log(error, " <---- notification not sent!")
            })
    } catch (error) {
        console.log(error, " <---- Error firebase notifications!")
    }
}