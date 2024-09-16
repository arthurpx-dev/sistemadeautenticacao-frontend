const PROXY_CONFIG = {
  "/auth": {
    target: "http://sistemadeautenticacao:8080",
    secure: false,
    logLevel: "debug",
  },
};

module.exports = PROXY_CONFIG;
