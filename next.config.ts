import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "api.producthunt.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  outputFileTracingRoot: process.cwd(),
  experimental: {
    turbo: {
      rules: {
        "*.pdf": {
          loaders: ["file-loader"],
          as: "*.js",
        },
        "*.woff": {
          loaders: ["file-loader"],
          as: "*.js",
        },
        "*.woff2": {
          loaders: ["file-loader"],
          as: "*.js",
        },
        "*.eot": {
          loaders: ["file-loader"],
          as: "*.js",
        },
        "*.ttf": {
          loaders: ["file-loader"],
          as: "*.js",
        },
        "*.otf": {
          loaders: ["file-loader"],
          as: "*.js",
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    if (!isServer) {
      config.module.rules.push({
        test: /\.map$/,
        use: "null-loader",
      });
    }

    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            publicPath: "/_next/static/files",
            outputPath: "static/files/",
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
