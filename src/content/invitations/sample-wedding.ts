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

  // events: [
  //   {
  //     id: "gaye-holud",
  //     title: "Gaye Holud",
  //     startsAt: "2027-01-23T11:00:00+05:30",
  //     endsAt: "2027-01-23T14:00:00+05:30",
  //     venue: {
  //       name: "Venue name",
  //       address: "Address line, Kolkata",
  //       mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
  //     },
  //   },
  //   {
  //     id: "shubho-bibaha",
  //     title: "Shubho Bibaha",
  //     startsAt: "2027-01-24T19:00:00+05:30",
  //     endsAt: "2027-01-24T23:30:00+05:30",
  //     venue: {
  //       name: "Venue name",
  //       address: "Address line, Kolkata",
  //       mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
  //     },
  //   },
  //   {
  //     id: "bou-bhaat",
  //     title: "Bou Bhaat",
  //     startsAt: "2027-01-25T19:30:00+05:30",
  //     endsAt: "2027-01-25T22:30:00+05:30",
  //     venue: {
  //       name: "Venue name",
  //       address: "Address line, Kolkata",
  //       mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
  //     },
  //   },
  // ],

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

  note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Ananya & Rishav | Wedding Invitation",
    description: "You are invited to the wedding of Ananya and Rishav.",
  },
};
