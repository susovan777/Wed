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
    background: "/opening/bg.webp",
    envelope: "/opening/envelop.webp",
    flowerBorder: "/opening/flower-border.webp",
    subhoBibaha: "/opening/subho-bibaha.webp",
  },

  hero: {
    background: "/invitations/hero-bg1.webp",
    couple: "/invitations/hero-couple.webp",
    ganesha: "/invitations/ganesha.svg",
    invocation: "|| Shri Ganeshay Namah ||",
    tagline: "Are getting married",
    corners: {
      topLeft: "/invitations/hero-tl.webp",
      topRight: "/invitations/hero-tr.webp",
      bottomLeft: "/invitations/hero-bl.webp",
      bottomRight: "/invitations/hero-br.webp",
    },
  },

  countdown: {
    background: "/invitations/countdown-bg.png",
    divider: "/invitations/c-divider.png",
    corners: {
      topLeft: "/invitations/countdown-tl.webp",
      topRight: "/invitations/countdown-tr.webp",
      bottomLeft: "/invitations/countdown-bl.webp",
      bottomRight: "/invitations/countdown-br.webp",
    },
    lotus: "/invitations/lotus.webp",
    flourish: "/invitations/countdown-flourish.webp",
  },

  celebrations: {
    subtitle:
      "Join us for a celebration filled with love, laughter and Bengali traditions.",
    lotus: "/invitations/events-lotus.webp",
    corners: {
      topLeft: "/invitations/events-tl.webp",
      topRight: "/invitations/events-tr.webp",
      bottomLeft: "/invitations/events-bl.webp",
      bottomRight: "/invitations/events-br.webp",
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
      image: "/invitations/gaye-holud.webp",
    },
    {
      id: "aashirbaad",
      title: "Aashirbaad",
      startsAt: "2026-11-23T10:00:00+05:30",
      venue,
      description: "Blessings for\na beautiful future",
      image: "/invitations/aashirbaad.webp",
    },
    {
      id: "wedding",
      title: "Wedding",
      startsAt: "2026-11-24T19:00:00+05:30",
      venue,
      description: "Two hearts, one promise\nfor a lifetime!",
      image: "/invitations/wedding.webp",
    },
    {
      id: "reception",
      title: "Reception",
      startsAt: "2026-11-25T19:00:00+05:30",
      venue,
      description: "An evening of\ncelebration and togetherness!",
      image: "/invitations/reception.webp",
    },
  ],

  // OLD Story section. Replaced by the new Story section below.
  // story: {
  //   eyebrow: "Our Story",
  //   title: "Different paths,\none beautiful\nbeginning.",
  //   intro:
  //     "From our first conversation to the plans we are making now, it has been the everyday moments that made this feel like us.",
  //   image: "/invitations/story-couple.webp",
  //   closing: "Two stories, and so much still to write together.",
  //   corners: {
  //     topLeft: "/invitations/story-tl.webp",
  //     topRight: "/invitations/story-tr.webp",
  //     bottomLeft: "/invitations/story-bl.webp",
  //     bottomRight: "/invitations/story-br.webp",
  //   },
  //   steps: [
  //     {
  //       title: "We Met",
  //       icon: "cap",
  //       image: "/invitations/story-we-met.png",
  //       text: "A college event brought us together. We stayed long after it ended, talking about everything except the reason we had come.",
  //     },
  //     {
  //       title: "We Grew",
  //       icon: "heart",
  //       image: "/invitations/story-we-grew.png",
  //       text: "There were shared playlists, long calls and plenty of coffee. Little by little, we became the first person the other wanted to tell.",
  //     },
  //     {
  //       title: "We Explored",
  //       icon: "plane",
  //       image: "/invitations/story-we-explored.png",
  //       text: "From quiet hill stations to busy city streets, we found new places and new reasons to enjoy doing life together.",
  //     },
  //     {
  //       title: "Now, Forever",
  //       icon: "rings",
  //       image: "/invitations/story-now-forever.png",
  //       text: "One very happy yes, and here we are. Our next adventure begins with our favourite people beside us, and that includes you.",
  //     },
  //   ],
  // },

  story: {
    title: "Our Story",
    subtitle: "Two hearts, one beautiful journey.",
    intro:
      "What started as a simple conversation, turned into endless talks, shared dreams and a bond that only grew stronger with time. Through every moment, big or small, we found a home in each other. Now, we're ready to begin our forever, together.",
    ornament: "/invitations/story-lotus.webp",
    photos: [
      { src: "/invitations/couple-l.webp" },
      { src: "/invitations/couple-r.webp" },
    ],
    corners: {
      topLeft: "/invitations/story-tl.webp",
      topRight: "/invitations/story-tr.webp",
      bottomLeft: "/invitations/countdown-bl.webp",
      bottomRight: "/invitations/countdown-br.webp",
    },
    bottom: "/invitations/story-bottom.webp",
    steps: [
      {
        title: "First Conversation",
        icon: "chat",
        text: "A simple hello sparked a beautiful connection.",
      },
      {
        title: "Growing Together",
        icon: "heart",
        text: "With every moment, we found more reasons to stay.",
      },
      {
        title: "The Proposal",
        icon: "ring",
        text: "A special moment that made it all real.",
      },
      {
        title: "Our Forever",
        icon: "hearts",
        text: "Now, we begin a new chapter, hand in hand.",
      },
    ],
  },

  gallery: {
    subtitle: "A few precious moments from our journey...",
    lotus: "/invitations/events-lotus.png",
    footer: "Moments of our journey",
    corners: {
      topLeft: "/invitations/gallery-tl.webp",
      topRight: "/invitations/gallery-tr.webp",
      bottomLeft: "/invitations/gallery-bl.webp",
      bottomRight: "/invitations/gallery-br.webp",
    },
    photos: [
      {
        src: "/invitations/gallery/photo-1.jpg",
        caption: { style: "tape", text: "Where it all began", place: "top" },
      },
      {
        src: "/invitations/gallery/photo-2.jpg",
        caption: {
          style: "note",
          text: "Running hand in hand,\nchasing waves and\ndreams together",
          place: "top",
        },
      },
      {
        src: "/invitations/gallery/photo-3.jpg",
        caption: { style: "brush", text: "the best day", place: "bl" },
      },
      {
        src: "/invitations/gallery/photo-4.jpg",
        caption: { style: "brush", text: "Favorite moment", place: "br" },
      },
      {
        src: "/invitations/gallery/photo-5.jpg",
        caption: { style: "tape", text: "Perfect happiness", place: "bottom" },
      },
    ],
  },

  brideGroom: {
    modalFrame: "/invitations/modal-frame.webp",
    title: "Bride & Groom",
    subtitle:
      "Two families, one beautiful journey.\nGet to know the Bride and Groom.",
    ornament: "/invitations/bg-lotus.webp",
    // background: "/invitations/bg-floral.png",
    button: "/invitations/role-button.webp",
    borders: {
      top: "/invitations/bg-border-t.png",
      bottom: "/invitations/bg-border-b.webp",
    },
    corners: {
      topLeft: "/invitations/bg-tl.webp",
      topRight: "/invitations/bg-tr.webp",
      bottomLeft: "/invitations/bg-bl.webp",
      bottomRight: "/invitations/bg-br.webp",
    },

    bride: {
      photo: "/invitations/bride.png",
      details: {
        subtitle: "Daughter of Mr. Subir Sen & Mrs. Mala Sen",
        about:
          "A kind hearted, cheerful and ambitious person \n who loves music, travel and fuchka (panipuri)",
        facts: [
          // { label: "Education", value: "Add details" },
          // { label: "Profession", value: "Add details" },
          // { label: "Loves", value: "Add details" },
          // { label: "Hometown", value: "Kolkata" },
        ],
      },
    },
    groom: {
      photo: "/invitations/groom.png",
      details: {
        subtitle: "Son of Mr. Amit Banerjee & Mrs. Rina Banerjee",
        about:
          "A cool, kind, and ambitious person who believes in lifelong learning, \nmeaningful work and creating beautiful memories together.",
        facts: [
          // { label: "Education", value: "Add details" },
          // { label: "Profession", value: "Add details" },
          // { label: "Loves", value: "Add details" },
          // { label: "Hometown", value: "Kolkata" },
        ],
      },
    },
  },

  note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Ananya & Rishav | Wedding Invitation",
    description: "You are invited to the wedding of Ananya and Rishav.",
  },
};
