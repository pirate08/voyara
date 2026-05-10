export interface Destination {
  id: string;
  img: string;
  name: string;
  country: string;
  desc: string;
  longDesc: string;
  price: string;
  tag: string;
  color: string;
  rating: number;
  duration: string;
}

export const destinations: Destination[] = [
  {
    id: "santorini",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
    name: "Santorini",
    country: "Greece",
    desc: "Whitewashed villages perched above the deep Aegean blue.",
    longDesc:
      "Experience the world's most famous sunset in Oia, hike the caldera path from Fira, and relax on unique volcanic black sand beaches.",
    price: "$1,890",
    tag: "Coastal",
    color: "#38bdf8",
    rating: 4.9,
    duration: "7 Days",
  },
  {
    id: "bali",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
    name: "Bali",
    country: "Indonesia",
    desc: "Lush rice terraces, ancient temples & spiritual retreats.",
    longDesc:
      "From the cultural heart of Ubud to the world-class surf breaks of Uluwatu, Bali offers a perfect blend of adventure and serenity.",
    price: "$1,290",
    tag: "Tropical",
    color: "#4ade80",
    rating: 4.8,
    duration: "10 Days",
  },
  {
    id: "swiss-alps",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    name: "Swiss Alps",
    country: "Switzerland",
    desc: "Snow-capped peaks, alpine lakes & crisp mountain air.",
    longDesc:
      "Whether you're skiing in Zermatt or hiking the Eiger Trail, the Swiss Alps provide a backdrop of unparalleled natural beauty.",
    price: "$2,450",
    tag: "Mountain",
    color: "#a78bfa",
    rating: 5.0,
    duration: "6 Days",
  },
  {
    id: "tokyo",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    name: "Tokyo",
    country: "Japan",
    desc: "Neon nights, ramen alleys & cherry blossom days.",
    longDesc:
      "Explore the intersection of futuristic technology and ancient tradition in the world's most organized metropolis.",
    price: "$2,180",
    tag: "City",
    color: "#f472b6",
    rating: 4.9,
    duration: "8 Days",
  },
  {
    id: "maldives",
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    name: "Maldives",
    country: "Indian Ocean",
    desc: "Overwater villas floating in turquoise coral lagoons.",
    longDesc:
      "Pure isolation in luxury. Dive with manta rays, dine under the stars, and wake up to the sound of the ocean beneath your floor.",
    price: "$3,290",
    tag: "Luxury",
    color: "#fb923c",
    rating: 4.9,
    duration: "5 Days",
  },
  {
    id: "iceland",
    img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&q=80",
    name: "Iceland",
    country: "Reykjavík",
    desc: "Northern lights dancing over ancient volcanic glaciers.",
    longDesc:
      "The land of fire and ice. Drive the Golden Circle, bathe in the Blue Lagoon, and witness the power of Skógafoss waterfall.",
    price: "$2,690",
    tag: "Adventure",
    color: "#34d399",
    rating: 4.7,
    duration: "9 Days",
  },
  {
    id: "amalfi",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80",
    name: "Amalfi Coast",
    country: "Italy",
    desc: "Vertical colorful towns and dramatic coastal cliffs.",
    longDesc:
      "Sip limoncello in Positano, cruise the coastline by boat, and enjoy the world's finest pasta overlooking the Mediterranean.",
    price: "$2,300",
    tag: "Coastal",
    color: "#38bdf8",
    rating: 4.9,
    duration: "7 Days",
  },
  {
    id: "kyoto",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    name: "Kyoto",
    country: "Japan",
    desc: "Zen gardens, bamboo forests & golden pavilions.",
    longDesc:
      "Walk through the thousand torii gates of Fushimi Inari and experience a traditional tea ceremony in the Gion district.",
    price: "$1,950",
    tag: "Culture",
    color: "#f472b6",
    rating: 4.8,
    duration: "6 Days",
  },
  {
    id: "patagonia",
    img: "https://images.unsplash.com/photo-1600211906168-fbc6df476b1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGF0YWdvbmlhJTIwYXJnZW50aW5hfGVufDB8fDB8fHww",
    name: "Patagonia",
    country: "Argentina",
    desc: "Untamed wilderness at the end of the world.",
    longDesc:
      "Trek the base of Fitz Roy, witness the calving of Perito Moreno Glacier, and experience the raw power of South American nature.",
    price: "$2,800",
    tag: "Adventure",
    color: "#a78bfa",
    rating: 4.9,
    duration: "12 Days",
  },
  {
    id: "marrakech",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
    name: "Marrakech",
    country: "Morocco",
    desc: "Bustling souks, hidden riads & desert dreams.",
    longDesc:
      "Get lost in the Medina, explore the Jardin Majorelle, and spend a night under the stars in the Sahara Desert.",
    price: "$1,450",
    tag: "Culture",
    color: "#fb923c",
    rating: 4.6,
    duration: "8 Days",
  },
];
