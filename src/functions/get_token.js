const twilio = require("twilio");

exports.handler = async function (context, event, callback) {
  // Create a custom Twilio Response
  const response = new Twilio.Response();
  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  const accessToken = new twilio.jwt.AccessToken(
    context.ACCOUNT_SID,
    context.API_KEY_SID,
    context.API_KEY_SECRET
  );
  accessToken.identity = event.username;
  const videoGrant = new twilio.jwt.AccessToken.VideoGrant({
    room: event.room,
  });
  accessToken.addGrant(videoGrant);
  response.appendHeader("Content-Type", "application/json");
  response.setBody({
    token: accessToken.toJwt(),
  });
  return callback(null, response);
};
