import type { Invitation } from "@/types/invitation";

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

  couple: {
    bride: {
      name: "Ananya",
      fullName: "Ananya Sen",
      parents: "Mr. Subir Sen & Mrs. Mala Sen",
    },
    groom: {
      name: "Rishav",
      fullName: "Rishav Banerjee",
      parents: "Mr. Amit Banerjee & Mrs. Rina Banerjee",
    },
    hashtag: "#AnanyaWedsRishav",
  },

  wedding: {
    date: "2027-01-24T19:00:00+05:30",
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
      startsAt: "2027-01-23T11:00:00+05:30",
      endsAt: "2027-01-23T14:00:00+05:30",
      venue: {
        name: "Venue name",
        address: "Address line, Kolkata",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
      },
    },
    {
      id: "shubho-bibaha",
      title: "Shubho Bibaha",
      startsAt: "2027-01-24T19:00:00+05:30",
      endsAt: "2027-01-24T23:30:00+05:30",
      venue: {
        name: "Venue name",
        address: "Address line, Kolkata",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
      },
    },
    {
      id: "bou-bhaat",
      title: "Bou Bhaat",
      startsAt: "2027-01-25T19:30:00+05:30",
      endsAt: "2027-01-25T22:30:00+05:30",
      venue: {
        name: "Venue name",
        address: "Address line, Kolkata",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
      },
    },
  ],

  note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Ananya & Rishav | Wedding Invitation",
    description: "You are invited to the wedding of Ananya and Rishav.",
  },
};
