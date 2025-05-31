import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './dictionary/en.json'
  }
});

const config: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false; // 🔧 turn off caching for debugging
    return config;
  }
};

export default withNextIntl(config);
