const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "sgp.cloud.appwrite.io",
        pathname: "/v1/storage/**",
      },
    ],
  },
};

export default nextConfig;