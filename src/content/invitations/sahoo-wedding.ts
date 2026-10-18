import type { Invitation } from "@/types/invitation";

const venue = {
  name: "Venue name",
  address: "Ramnagar, Digha",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Kolkata",
};

// Placeholder content. Replace with your own details.
export const sahooWedding: Invitation = {
  slug: "sahoo-wedding",
  opening: {
    background: "/opening/bg.webp",
    envelope: "/opening/envelop.webp",
    flowerBorder: "/opening/flower-border.webp",
    subhoBibaha: "/opening/subho-bibaha.webp",
  },

  hero: {
    background: "/invitations/hero-bg1.webp",
    couple: "/invitations/couple/hero-couple.webp",
    ganesha: "/invitations/arts/ganesha.svg",
    invocation: "|| Shri Ganeshay Namah ||",
    tagline: "Are getting married",
    corners: {
      topLeft: "/invitations/corners/hero-tl.webp",
      topRight: "/invitations/corners/hero-tr.webp",
      bottomLeft: "/invitations/corners/hero-bl.webp",
      bottomRight: "/invitations/corners/hero-br.webp",
    },
  },

  countdown: {
    background: "/invitations/countdown-bg.png",
    divider: "/invitations/c-divider.png",
    corners: {
      topLeft: "/invitations/corners/countdown-tl.webp",
      topRight: "/invitations/corners/countdown-tr.webp",
      bottomLeft: "/invitations/corners/countdown-bl.webp",
      bottomRight: "/invitations/corners/countdown-br.webp",
    },
    lotus: "/invitations/art/lotus.webp",
    flourish: "/invitations/countdown-flourish.webp",
  },

  brideGroom: {
    modalFrame: "/invitations/arts/modal-frame.webp",
    title: "Bride & Groom",
    subtitle:
      "Two families, one beautiful journey.\nGet to know the Bride and Groom.",
    ornament: "/invitations/couple/parvati&shiva.webp",
    // background: "/invitations/bg-floral.png",
    button: "/invitations/arts/role-button.webp",
    borders: {
      top: "/invitations/arts/bg-border-t.png",
      bottom: "/invitations/arts/bg-border-b.webp",
    },
    corners: {
      topLeft: "/invitations/corners/bg-tl.webp",
      topRight: "/invitations/corners/bg-tr.webp",
      bottomLeft: "/invitations/corners/bg-bl.webp",
      bottomRight: "/invitations/corners/bg-br.webp",
    },

    bride: {
      photo: "/invitations/couple/bride.png",
      details: {
        subtitle: "Daughter of Late Ramesh Sahoo & Mrs. Shantilata Sahoo",
        about:
          "A kind hearted, cheerful and ambitious person \n who loves music, travel and fuchka (panipuri)",
        facts: [
          // { label: "Education", value: "B.A." },
          // { label: "Profession", value: "Add details" },
          // { label: "Loves", value: "Add details" },
          // { label: "Hometown", value: "Digha" },
        ],
      },
    },
    groom: {
      photo: "/invitations/couple/groom.png",
      details: {
        subtitle: "Son of Mr. Manilal Sahoo & Mrs. Jahnabi Sahoo",
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

  celebrations: {
    title: "Wedding Events",
    subtitle:
      "Join us for a celebration filled with love, laughter and Bengali traditions.",
    lotus: "/invitations/art/events-lotus.webp",
    corners: {
      topLeft: "/invitations/corners/events-tl.webp",
      topRight: "/invitations/corners/events-tr.webp",
      bottomLeft: "/invitations/corners/events-bl.webp",
      bottomRight: "/invitations/corners/events-br.webp",
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
    city: "Ramnagar, WB",
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
      image: "/invitations/events/gaye-holud.webp",
    },
    {
      id: "aashirbaad",
      title: "Aashirbaad",
      startsAt: "2026-11-23T10:00:00+05:30",
      venue,
      description: "Blessings for\na beautiful future",
      image: "/invitations/events/aashirbaad.webp",
    },
    {
      id: "wedding",
      title: "Wedding",
      startsAt: "2026-11-24T19:00:00+05:30",
      venue,
      description: "Two hearts, one promise\nfor a lifetime!",
      image: "/invitations/events/wedding.webp",
    },
    {
      id: "reception",
      title: "Reception",
      startsAt: "2026-11-25T19:00:00+05:30",
      venue,
      description: "An evening of\ncelebration and togetherness!",
      image: "/invitations/events/reception.webp",
    },
  ],

  story: {
    title: "Our Story",
    subtitle: "Two hearts, one beautiful journey.",
    intro:
      "What started as a simple conversation, turned into endless talks, shared dreams and a bond that only grew stronger with time. Through every moment, big or small, we found a home in each other. Now, we're ready to begin our forever, together.",
    ornament: "/invitations/arts/story-lotus.webp",
    photos: [
      { src: "/invitations/couple/couple-l.webp" },
      { src: "/invitations/couple/couple-r.webp" },
    ],
    corners: {
      topLeft: "/invitations/corners/story-tl.webp",
      topRight: "/invitations/corners/story-tr.webp",
      bottomLeft: "/invitations/corners/countdown-bl.webp",
      bottomRight: "/invitations/corners/countdown-br.webp",
    },
    bottom: "/invitations/arts/story-bottom.webp",
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
    lotus: "/invitations/arts/events-lotus.png",
    footer: "Moments of our journey",
    corners: {
      topLeft: "/invitations/corners/gallery-tl.webp",
      topRight: "/invitations/corners/gallery-tr.webp",
      bottomLeft: "/invitations/corners/gallery-bl.webp",
      bottomRight: "/invitations/corners/gallery-br.webp",
    },
    photos: [
      {
        src: "/invitations/gallery/photo-1.webp",
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
        src: "/invitations/gallery/photo-3.png",
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

  venue: {
    name: "Shiv Mahal Palace",
    address: "23, Old Airport Road,\nBengaluru, Karnataka 560008",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Shiv+Mahal+Palace+Bengaluru",
    lotus: "/invitations/arts/events-lotus.png",
    image: "/invitations/couple/bedi.webp",
    imageAlt:
      "A couple sitting together in-front of a fire, with a garden and a fountain in the background.",
    corners: {
      topLeft: "/invitations/corners/venue-tl.webp",
      topRight: "/invitations/corners/venue-tr.webp",
      bottomLeft: "/invitations/corners/venue-bl.webp",
      bottomRight: "/invitations/corners/venue-br.webp",
    },
  },

  gift: {
    title: "Send a Gift",
    eyebrow: "A little gift, a lot of love",
    message:
      "Your presence and blessings mean more to us than anything. For those who wish to send a gift, we have included a digital gifting option as a token of your love and support.",
    lotus: "/invitations/arts/lotus-art.webp",
    payeeName: "Susovan Sahoo",
    upiId: "sahoo.611@ptaxis",
    qr: "/invitations/ptm-qr.webp",
    apps: [
      { name: "PhonePe", icon: "/invitations/payment/p-pe.png" },
      { name: "GPay", icon: "/invitations/payment/g-pay.png" },
      { name: "Paytm", icon: "/invitations/payment/ptm.png" },
      { name: "BHIM", icon: "/invitations/payment/bhim.png" },
    ],
    corners: {
      topLeft: "/invitations/corners/gift-tl.webp",
      topRight: "/invitations/corners/gift-tr.webp",
      bottomLeft: "/invitations/corners/gift-box.webp",
      bottomRight: "/invitations/corners/kalash.webp",
    },
  },

  rsvp: {
    title: "Kindly RSVP",
    message:
      "Your presence will make our celebration even more special.\nPlease let us know if you'll be joining us.",
    endpoint: "PASTE_YOUR_WEB_APP_URL_HERE",
    // whatsapp: "919876543210",
    art: {
      left: "/invitations/arts/women.webp",
      right: "/invitations/arts/dhaki.webp",
    },
  },

  note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Puspalata & Susovan | Wedding Invitation",
    description: "You are invited to the wedding of Puspalata and Susovan.",
  },
};
