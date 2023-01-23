/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "192.168.43.121",
      "192.168.1.107",
      "172.20.10.4",
      "192.168.62.75",
      "192.168.1.152",
      "192.168.1.113",
      "192.168.1.255",
    ],
  },
};

module.exports = nextConfig;
