const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl({
  typescript: {
    ignoreBuildErrors: true,
  },
});
