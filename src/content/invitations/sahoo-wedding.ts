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
      fullName: "Puspalata Sahoo",
      parents: "Late Ramesh Sahoo & Smt. Shantilata Sahoo",
    },
    groom: {
      name: "Susovan",
      fullName: "Susovan Sahoo",
      parents: "Sr. Manilal Sahoo & Smt. Jahnabi Sahoo",
    },
    hashtag: "#PuspalataWedsSusovan",
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
      startsAt: "2026-11-23T10:00:00+05:30",
      venue,
      description: "A splash of colors,\ntraditions and happiness!",
      image: "/invitations/events/gaye-holud.webp",
    },
    {
      id: "aashirbaad",
      title: "Aashirbaad",
      startsAt: "2026-11-23T16:00:00+05:30",
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
      startsAt: "2026-11-25T12:00:00+05:30",
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
        src: "/invitations/gallery/photo-4.webp",
        caption: { style: "brush", text: "Favorite moment", place: "br" },
      },
      {
        src: "/invitations/gallery/photo-5.jpg",
        caption: { style: "tape", text: "Perfect happiness", place: "bottom" },
      },
    ],
  },

  venue: {
    name: "Haraprasad Bhavan, \nDigha, East Midnapur",
    address: "Bidyadharpur, Chandanpurhat, \nRamnagar, West Bengal, 721446",
    mapUrl:
      "https://www.google.com/maps/place/BidyadharPur+J.+High+School/@21.7164828,87.5097496,17.25z/data=!4m15!1m8!3m7!1s0x3a1cd3120f9637df:0xcfc9255d4d3349a4!2sBidyadharpur,+West+Bengal+721446!3b1!8m2!3d21.7155224!4d87.5117999!16s%2Fg%2F12hlzbm9x!3m5!1s0x3a1cd30025e8ec1d:0x11acee2212fbf68f!8m2!3d21.7175641!4d87.5113047!16s%2Fg%2F11vpylsg90?entry=ttu&g_ep=EgoyMDI2MTAxNC4wIKXMDSoASAFQAw%3D%3D",
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

  letter: {
    // invocation: "॥ With the Divine Blessings of Lord Prajapati ॥",
    invocation: "॥ Sri Sri Prajapataye Namah ॥",
    title: "A Humble Invitation",
    salutation: "Respected Sir / Madam,",
    paragraphs: [
      "With the divine blessings of Lord Prajapati, we are delighted to announce the auspicious wedding of **Puspalata**, beloved daughter of Late Ramesh Sahoo and Smt. Shantilata Sahoo, with **Susovan**, son of Shri Manilal Sahoo and Smt. Jahnabi Sahoo.",
      // "The wedding ceremony will take place on **Thursday, 25 December 2026** (8th Poush, 1433 Bengali calendar) at the auspicious time of the wedding lagna.",
      "---",
      "On this joyous occasion, we cordially invite you and your family to join us for the wedding and the accompanying celebratory feast on **Wednesday evening**.",
      "Your gracious presence and heartfelt blessings will make this special occasion even more memorable for the newlyweds.",
      // "We humbly request you to overlook any shortcomings in this invitation and honour us with your presence.",
    ],
    closing: "With warm regards,",
    signature: "The Sahoo Family",
    // contact: "Contact: [Mobile Number]",
    ornament: "/invitations/arts/bg-lotus.webp",
    lotus: "/invitations/arts/lotus-art.webp",
    art: "/invitations/arts/temple.png",
    corners: {
      topLeft: "/invitations/corners/gallery-tl.webp",
      topRight: "/invitations/corners/gallery-tr.webp",
      bottomLeft: "/invitations/corners/invite-bl.webp",
      bottomRight: "/invitations/corners/invite-br.webp",
    },
  },

  gift: {
    title: "Gifts & Blessings",
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

  footer: {
    eyebrow: "With love",
    message:
      "Thank you for being a part of our story. \nWe can't wait to celebrate with you!",
    quote: "Here's to love, laughter, and a lifetime together.",
    // art: {
    //   left: "/invitations/footer-art-left.png",
    //   right: "/invitations/footer-art-right.png",
    // },
    background: "/invitations/footer-bg.webp",
    logo: "/invitations/arts/s&p.webp",
    social: {
      instagram: "https://www.instagram.com/_sushovan.777_/",
      facebook: "https://www.facebook.com/susovan.sahoo777",
      whatsapp: "+918535961611",
    },
    developer: {
      name: "Susovan",
      url: "https://susovan-sahoo.vercel.app/",
    },
  },

  music: {
    src: "/invitations/bgm.mp3",
    title: "Background music",
    volume: 0.6,
  },

  // note: "Your presence and blessings are the greatest gift we could ask for.",

  seo: {
    title: "Puspalata & Susovan | Wedding Invitation",
    description: "You are invited to the wedding of Puspalata and Susovan.",
  },
};
