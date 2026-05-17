// Database Seed Script
// Run with: npx tsx scripts/seed.ts

import mongoose from "mongoose";
import { readFileSync } from "fs";
import path from "path";

// Parse .env.local manually (avoids dotenv dependency)
const envPath = path.resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    process.env[key.trim()] = rest.join("=").trim();
  }
} catch {
  console.error("Could not read .env.local file");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// ─── Schemas (inline for seed script) ────────────────────────────────────────
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#c0392b" },
  },
  { timestamps: true }
);

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    socialLinks: {
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, trim: true },
    language: { type: String, default: "en" },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    coverImageAlt: { type: String, default: "" },
    coverImageWidth: { type: Number, default: 1200 },
    coverImageHeight: { type: Number, default: 630 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String, trim: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", default: null },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 1 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    isBreaking: { type: Boolean, default: false },
    accessType: { type: String, default: "Free" },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Author = mongoose.models.Author || mongoose.model("Author", AuthorSchema);
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

// ─── Seed Data ───────────────────────────────────────────────────────────────
const categories = [
  { name: "Technology", slug: "technology", description: "Latest tech news and innovations", color: "#3b82f6" },
  { name: "Politics", slug: "politics", description: "Political news and analysis", color: "#ef4444" },
  { name: "Sports", slug: "sports", description: "Sports news and updates", color: "#22c55e" },
  { name: "Business", slug: "business", description: "Business and finance news", color: "#f59e0b" },
  { name: "Entertainment", slug: "entertainment", description: "Movies, music, and pop culture", color: "#a855f7" },
  { name: "Science", slug: "science", description: "Scientific discoveries and research", color: "#06b6d4" },
  { name: "Health", slug: "health", description: "Health and wellness news", color: "#10b981" },
  { name: "World", slug: "world", description: "International news", color: "#6366f1" },
];

const authors = [
  {
    name: "Alex Rivera",
    slug: "alex-rivera",
    bio: "Senior tech correspondent covering AI, startups, and digital transformation.",
    avatar: "",
    socialLinks: { twitter: "https://twitter.com/alexrivera" },
  },
  {
    name: "Sarah Chen",
    slug: "sarah-chen",
    bio: "Political analyst and investigative journalist with 10 years of experience.",
    avatar: "",
    socialLinks: { twitter: "https://twitter.com/sarachen" },
  },
  {
    name: "Marcus Johnson",
    slug: "marcus-johnson",
    bio: "Sports editor covering football, basketball, and international athletics.",
    avatar: "",
    socialLinks: { twitter: "https://twitter.com/marcusjohnson" },
  },
];

const sampleContent = `
<h2 id="introduction">Introduction</h2>
<p>This is a sample article demonstrating the full capabilities of the NewsNova content rendering system. The article includes various HTML elements to showcase the typography and formatting.</p>

<h2 id="key-highlights">Key Highlights</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

<blockquote>
  <p>"Innovation distinguishes between a leader and a follower." — Steve Jobs</p>
</blockquote>

<h3 id="detailed-analysis">Detailed Analysis</h3>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

<ul>
  <li>First important point about this topic</li>
  <li>Second key takeaway from the research</li>
  <li>Third insight from industry experts</li>
  <li>Fourth consideration for the future</li>
</ul>

<h2 id="what-comes-next">What Comes Next</h2>
<p>Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>

<h3 id="expert-opinions">Expert Opinions</h3>
<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

<h2 id="conclusion">Conclusion</h2>
<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.</p>
`;

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅ Connected!");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await Category.deleteMany({});
  await Author.deleteMany({});
  await Post.deleteMany({});

  // Seed categories
  console.log("📁 Seeding categories...");
  const createdCategories = await Category.insertMany(categories);
  console.log(`   Created ${createdCategories.length} categories`);

  // Seed authors
  console.log("👤 Seeding authors...");
  const createdAuthors = await Author.insertMany(authors);
  console.log(`   Created ${createdAuthors.length} authors`);

  // Seed posts
  console.log("📝 Seeding posts...");
  const postTemplates = [
    { title: "AI Revolution: How Machine Learning is Transforming Industries", cat: 0, isBreaking: true, views: 15420, tags: ["AI", "Machine Learning", "Technology"] },
    { title: "Global Summit 2025: World Leaders Agree on Climate Action Plan", cat: 1, isBreaking: true, views: 23100, tags: ["Climate", "Politics", "Global"] },
    { title: "Premier League Final: Dramatic Last-Minute Winner Seals Title", cat: 2, views: 45000, tags: ["Football", "Premier League", "Sports"] },
    { title: "Tech Giants Report Record Revenue Amid AI Investment Surge", cat: 3, views: 12300, tags: ["Tech", "Revenue", "AI Investment"] },
    { title: "Marvel Announces Phase 7 Lineup at Comic-Con 2025", cat: 4, views: 67800, tags: ["Marvel", "Movies", "Comic-Con"] },
    { title: "Breakthrough in Quantum Computing: 1000 Qubit Processor Achieved", cat: 5, isBreaking: true, views: 8900, tags: ["Quantum", "Computing", "Science"] },
    { title: "New Study Reveals Benefits of Mediterranean Diet for Heart Health", cat: 6, views: 5600, tags: ["Diet", "Heart Health", "Study"] },
    { title: "United Nations Peacekeeping Force Deployed to Eastern Region", cat: 7, views: 34500, tags: ["UN", "Peacekeeping", "International"] },
    { title: "SpaceX Successfully Launches First Commercial Moon Mission", cat: 0, views: 89000, tags: ["SpaceX", "Moon", "Space"] },
    { title: "Election 2026: Latest Polls Show Tight Race in Key States", cat: 1, views: 56700, tags: ["Election", "Polls", "Politics"] },
    { title: "Olympic Committee Announces New Sports for 2028 Games", cat: 2, views: 23400, tags: ["Olympics", "Sports", "2028"] },
    { title: "Startup Raises $500M to Build Next-Gen Electric Aircraft", cat: 3, views: 11200, tags: ["Startup", "Electric", "Aviation"] },
    { title: "Streaming Wars: Netflix Hits 300 Million Subscribers", cat: 4, views: 45600, tags: ["Netflix", "Streaming", "Entertainment"] },
    { title: "CRISPR Gene Therapy Shows Promise in Treating Rare Diseases", cat: 5, views: 7800, tags: ["CRISPR", "Gene Therapy", "Medicine"] },
    { title: "WHO Releases Updated Guidelines on Mental Health in the Workplace", cat: 6, views: 4300, tags: ["WHO", "Mental Health", "Workplace"] },
    { title: "Trade Agreement Between US and EU Set to Reshape Global Markets", cat: 7, views: 28900, tags: ["Trade", "US", "EU", "Markets"] },
  ];

  const posts = postTemplates.map((template, i) => ({
    title: template.title,
    slug: template.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    excerpt: `Breaking coverage of ${template.title.toLowerCase()}. Stay informed with in-depth analysis and expert commentary.`,
    language: "en",
    content: sampleContent,
    coverImage: `https://images.unsplash.com/photo-${1504711434969 + i * 1000}-e7ef4ec${5089 + i}c?w=1200&h=630&fit=crop`,
    coverImageAlt: template.title,
    coverImageWidth: 1200,
    coverImageHeight: 630,
    category: createdCategories[template.cat]._id,
    tags: template.tags,
    author: createdAuthors[i % createdAuthors.length]._id,
    published: true,
    views: template.views,
    readTime: Math.floor(Math.random() * 8) + 3,
    isBreaking: template.isBreaking || false,
    accessType: "Free",
  }));

  await Post.insertMany(posts);
  console.log(`   Created ${posts.length} posts`);

  console.log("\n🎉 Seed completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
