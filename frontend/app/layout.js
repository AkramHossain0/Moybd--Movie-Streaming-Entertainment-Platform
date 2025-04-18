import localFont from "next/font/local";
import "./globals.css";
import DisableInspect from "./component/inspect";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MOYBD: Your Ultimate Destination for Movies and Entertainment",
  description:
    "Discover the latest movies, reviews, trailers, and entertainment news on MOYBD. Stay updated with trending content, explore a world of cinema, and enjoy seamless browsing tailored for movie enthusiasts.",
  keywords:
    "movies, entertainment, movie reviews, latest trailers, trending movies, cinema, Hollywood, Bollywood, streaming, entertainment news, free movies, HD movies, movie downloads, Netflix, Amazon Prime, Disney+, Hulu, latest blockbusters, top-rated movies, award-winning films, celebrity news, showbiz, box office hits, TV shows, binge-watch, OTT platforms, movie streaming, web series, 4K movies, animated movies, action movies, romantic comedies, thriller movies, sci-fi films, horror movies, family movies, kids movies, classic films, documentary movies, movie ratings, IMDb, Rotten Tomatoes, streaming platforms, upcoming releases, movie blogs, entertainment gossip, popular TV series, series reviews, latest episodes, fan theories, behind the scenes, casting news, film festivals, Cannes, Oscars, film industry, top grossing movies, regional cinema, Tamil movies, Telugu movies, Korean dramas, anime movies, subbed movies, dubbed movies, movie trailers 2025, must-watch movies, trending now.",
  author: "Akram Hossain",
  robots: "index, follow",
  ogTitle: "MOYBD: Your Ultimate Destination for Movies and Entertainment",
  ogDescription:
    "Stay up-to-date with the latest movies, reviews, trailers, and entertainment news. Explore a wide variety of cinematic content only on MOYBD.",
  ogType: "website",
  ogUrl: "https://moybd.sbs",
  ogImage:
    "https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/banner01.jpeg",
  twitterCard: "summary_large_image",
  twitterTitle: "MOYBD: Your Ultimate Movie and Entertainment Hub",
  twitterDescription:
    "Discover the latest in movies and entertainment with MOYBD. Trailers, reviews, news, and more, all in one place.",
  twitterImage:
    "https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/banner01.jpeg",
  canonical: "https://moybd.sbs",
  language: "en-US",
};

export default function RootLayout({ children }) {
  return (
    <html lang={metadata.language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/m.ico"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:type" content={metadata.ogType} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta name="twitter:card" content={metadata.twitterCard} />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta
          name="twitter:description"
          content={metadata.twitterDescription}
        />
        <meta name="twitter:image" content={metadata.twitterImage} />
        <link rel="canonical" href={metadata.canonical} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <DisableInspect />
      </body>
    </html>
  );
}
