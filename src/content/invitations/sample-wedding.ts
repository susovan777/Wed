import type { Invitation } from "@/types/invitation";

const venue = {
  name: "Venue name",
  address: "Address line, Kolkata",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
};

// Placeholder content. Replace with your own details.
export const sampleWedding: Invitation = {
  slug: "sample-wedding",

  opening: {
    background: "/opening/bg.png",
    envelope: "/opening/envelop.png",
    flowerBorder: "/opening/flower-border.png",
    subhoBibaha: "/opening/subho-bibaha.png",
  },

  hero: {
    background: "/invitations/hero-bg.webp",
    couple: "/invitations/hero-couple.webp",
    ganesha: "/invitations/ganesha.svg",
    invocation: "|| Shri Ganeshay Namah ||",
    tagline: "Are getting married",
    corners: {
      topLeft: "/invitations/corner-top-left.webp",
      topRight: "/invitations/corner-top-right.webp",
      bottomLeft: "/invitations/corner-bottom-left.webp",
      bottomRight: "/invitations/corner-bottom-right.webp",
    },
  },

  countdown: {
    background: "/invitations/countdown-bg.png",
    divider: "/invitations/c-divider.png",
    corners: {
      topLeft: "/invitations/c-top-left.png",
      topRight: "/invitations/c-top-right.png",
      bottomLeft: "/invitations/c-bottom-left.png",
      bottomRight: "/invitations/c-bottom-right.png",
    },
    lotus: "/invitations/lotus.png",
    flourish: "/invitations/countdown-flourish.png",
  },

  celebrations: {
    subtitle:
      "Join us for a celebration filled with love, laughter and Bengali traditions.",
    lotus: "/invitations/events-lotus.png",
    corners: {
      topLeft: "/invitations/events-tl.png",
      topRight: "/invitations/events-tr.png",
      bottomLeft: "/invitations/events-bl.png",
      bottomRight: "/invitations/events-br.png",
    },
  },

  couple: {
    bride: {
      name: "Puspalata",
      banglaName: "পুষ্পলতা",
      fullName: "Puspalata Sahoo",
      parents: "Mr. Subir Sahoo & Mrs. Mala Sahoo",
    },
    groom: {
      name: "Susovan",
      banglaName: "সুশোভন",
      fullName: "Susovan Sahoo",
      parents: "Mr. Amit Sahoo & Mrs. Rina Sahoo",
    },
    hashtag: "#AnanyaWedsRishav",
  },

  wedding: {
    date: "2026-11-24T19:00:00+05:30",
    city: "Kolkata",
  },

  invite: {
    blessing: "With the blessings of our elders",
    message:
      "Together with our families, we invite you to celebrate our wedding and share in our joy.",
  },

  events: [
    {
      id: "gaye-holud",
      title: "Gaye Holud",
      startsAt: "2026-11-22T16:00:00+05:30",
      venue,
      description: "A splash of colors,\ntraditions and happiness!",
      image: "/invitations/gaye-holud.png",
    },
    {
      id: "aashirbaad",
      title: "Aashirbaad",
      startsAt: "2026-11-23T10:00:00+05:30",
      venue,
      description: "Blessings for\na beautiful future",
      image: "/invitations/aashirbaad.png",
    },
    {
      id: "wedding",
      title: "Wedding",
      startsAt: "2026-11-24T19:00:00+05:30",
      venue,
      description: "Two hearts, one promise\nfor a lifetime!",
      image: "/invitations/wedding.png",
    },
    {
      id: "reception",
      title: "Reception",
      startsAt: "2026-11-25T19:00:00+05:30",
      venue,
      description: "An evening of\ncelebration and togetherness!",
      image: "/invitations/reception.png",
    },
  ],

  story: {
    eyebrow: "Our Story",
    title: "Different paths,\none beautiful\nbeginning.",
    intro:
      "From our first conversation to the plans we are making now, it has been the everyday moments that made this feel like us.",
    image: "/invitations/story-couple.webp",
    closing: "Two stories, and so much still to write together.",
    corners: {
      topLeft: "/invitations/story-tl.webp",
      topRight: "/invitations/story-tr.webp",
      bottomLeft: "/invitations/story-bl.webp",
      bottomRight: "/invitations/story-br.webp",
    },
    steps: [
      {
        title: "We Met",
        icon: "cap",
        image: "/invitations/story-we-met.png",
        text: "A college event brought us together. We stayed long after it ended, talking about everything except the reason we had come.",
      },
      {
        title: "We Grew",
        icon: "heart",
        image: "/invitations/story-we-grew.png",
        text: "There were shared playlists, long calls and plenty of coffee. Little by little, we became the first person the other wanted to tell.",
      },
      {
        title: "We Explored",
        icon: "plane",
        image: "/invitations/story-we-explored.png",
        text: "From quiet hill stations to busy city streets, we found new places and new reasons to enjoy doing life together.",
      },
      {
        title: "Now, Forever",
        icon: "rings",
        image: "/invitations/story-now-forever.png",
        text: "One very happy yes, and here we are. Our next adventure begins with our favourite people beside us, and that includes you.",
      },
    ],
  },

  note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Ananya & Rishav | Wedding Invitation",
    description: "You are invited to the wedding of Ananya and Rishav.",
  },
};
