const Router = require("express").Router;
const {
  GOOGLE_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  SERVER_ROOT_URI,
  GOOGLE_CLIENT_SECRET,
} = require("../config");

const axios = require("axios");

const authRouter = Router();

function getGoogleAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}${GOOGLE_REDIRECT_URI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const params = new URLSearchParams(options).toString();

  return `${rootUrl}?${params}`;
}

function getTokens(authCode) {
  const url = "https://oauth2.googleapis.com/token";
  const options = {
    code: authCode,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: `${SERVER_ROOT_URI}${GOOGLE_REDIRECT_URI}`,
    grant_type: "authorization_code",
  };

  return axios.post(url, new URLSearchParams(options).toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

authRouter.get("/auth/google", (req, res) => {
  res.redirect(getGoogleAuthUrl());
});

authRouter.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

authRouter.get(GOOGLE_REDIRECT_URI, (req, res) => {
  const authCode = req.query.code;

  getTokens(authCode)
    .then((response) => {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id_token: idToken,
      } = response.data;

      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then((response) => {
          req.session.user = response.data;

          res.redirect("/");
        });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = authRouter;
