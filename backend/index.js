import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Basic API with sample content used by the frontend
app.get("/api/brand", (req, res) => {
  res.json({
    name: "Xcentric",
    tagline: "Brand Solutions",
    colors: {
      gold: "#F3C740",
      yellow: "#FFC400",
      purple: "#A64CE6",
      teal: "#2AA39A",
      navy: "#0C1A2B"
    },
    sections: [
      {
        id: "hero",
        title: "Inspiring Ideas That Deliver Long‑term Brand Impact",
        subtitle: "Human‑centered strategy. Growth by design.",
      },
      {
        id: "about",
        promiseTitle: "Human‑centricity is the heart of what we do",
        promiseBody: "We champion the voice of consumers in crafting solutions designed to align your business objectives, deliver commercial success and ultimately leading to better products, services and experiences for the people you serve.",
        who: [
          {
            title: "We are NOT a traditional agency",
            copy: "We bring together the tribe & network of experts who are curious by nature, skilled by craft and entrepreneurial by spirit"
          },
          {
            title: "We are PASSIONATE",
            copy: "We are South Africans by birth and African citizens by heart with a shared passion for understanding culture and shaping brands across the continent"
          },
          {
            title: "We TAILOR‑MAKE",
            copy: "We don’t take shortcuts – we approach every brief with a fresh perspective and design customised solutions to deliver the right impact"
          },
          {
            title: "We are your GROWTH PARTNERS",
            copy: "We walk the journey with you and thrive in solving tough problems and we get our hands dirty until the solution is clear to all"
          }
        ]
      },
      {
        id: "services",
        categories: [
          {
            name: "Brand Strategy",
            bullets: [
              "Growth Roadmaps",
              "Brand Positioning & Architecture",
              "Signature Brand Expression",
              "Purpose‑led Narrative",
              "Portfolio Strategy"
            ]
          },
          {
            name: "Big Idea / Campaign Platform",
            bullets: [
              "Campaign Territory & Narrative Development",
              "Brand Idea Articulation",
              "Shopper & Retail Campaign Toolkits",
              "Purpose & Culture‑led Platforms"
            ]
          },
          {
            name: "BTL Loyalty & Engagement Programs",
            bullets: [
              "Consumer Loyalty Program Design",
              "Trade & Shopper Engagement Campaigns",
              "Incentive Mechanics & Reward Structures",
              "Program Tracking & Performance Analysis",
              "Digital + In‑store Integration"
            ]
          },
          {
            name: "Retail Mapping & Strategy",
            bullets: [
              "Whitespace Opportunity Mapping",
              "Route‑to‑market Strategy",
              "Shopper Segmentation & Path‑to‑purchase",
              "Perfect Store Principles"
            ]
          },
          {
            name: "Brand Innovation",
            bullets: [
              "Innovation Programmes",
              "Concept Development",
              "Whitespace Opportunity Mapping",
              "Idea Sprint Facilitation",
              "Launch Pipeline Strategy"
            ]
          },
          {
            name: "Fresh Insight",
            bullets: [
              "Cross‑market Qualitative Research",
              "Consumer Immersions & Ethnographies",
              "Cultural Tension Mapping",
              "Behavioural Decoding",
              "Insight‑led Opportunity Framing"
            ]
          },
          {
            name: "Artwork & Pack Design",
            bullets: [
              "Visual Identity Refresh",
              "NPD Pack Design Direction",
              "Brand Expression Playbooks"
            ]
          },
          {
            name: "Events & Activations",
            bullets: [
              "Brand Ambassadors & Education",
              "Spin & Win Activations",
              "Commuter & In‑store Engagement"
            ]
          },
          {
            name: "Marketing Capability",
            bullets: [
              "Team Building",
              "Capability Uplift Programs",
              "Staff Incentive Design",
              "Brand Immersion Experiences"
            ]
          }
        ]
      },
      {
        id: "work",
        clients: ["Excella", "Melrose", "Grain Field Chickens", "Royco", "BRUT", "Lactalis"]
      }
    ]
  });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});


