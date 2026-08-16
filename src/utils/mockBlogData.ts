export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-ace-system-design-interview',
    title: 'How to Ace Your System Design Interview in 2024',
    excerpt: 'A comprehensive guide to cracking the hardest interview rounds at FAANG companies.',
    date: 'Oct 24, 2026',
    author: 'Sazzad',
    readTime: '8 min read',
    content: `
# Mastering the System Design Interview

System design interviews are notoriously difficult because they are open-ended. Unlike LeetCode questions where there is a clear "optimal" solution, system design is about **trade-offs**.

## The 4-Step Framework

1. **Clarify Requirements:** Never start drawing boxes immediately. Ask about DAU (Daily Active Users), Read/Write ratio, and Data volume. Are we building Instagram for 1,000 users or 1 Billion? The architecture changes completely.
2. **Back-of-the-envelope Estimation:** Calculate bandwidth, storage, and memory requirements. If you need to store 1TB of images per day, you know a single MySQL instance won't cut it.
3. **High-Level Design:** Draw the core components. Client -> Load Balancer -> Web Server -> Database. Add Caches where appropriate.
4. **Deep Dive:** Discuss bottlenecks. What happens if the cache goes down? What if a celebrity posts a photo and causes a "Cache Stampede"?

## Conclusion
Use tools like our System Design Visualizer to practice. Practice makes perfect!
    `
  },
  {
    slug: 'consistent-hashing-explained',
    title: 'Understanding Consistent Hashing visually',
    excerpt: 'Why traditional modulo hashing fails at scale and how consistent hashing solves it.',
    date: 'Oct 18, 2026',
    author: 'Alex',
    readTime: '5 min read',
    content: `
# Consistent Hashing

When you have a distributed cache (like Memcached or Redis) spread across multiple servers, you need a way to determine which server holds which key.

## The Problem with Modulo

Traditionally, you might use \`server_index = hash(key) % N\` where N is the number of servers.
But what happens when you add or remove a server? \`N\` changes. Suddenly, almost every single key hashes to a different server. This causes a massive cache miss storm, potentially crashing your database!

## The Solution: A Hash Ring

Consistent hashing maps both the data keys and the servers onto a circular ring (usually from 0 to 2^32 - 1). 
To find which server holds a key, you hash the key to find its position on the ring, and then move clockwise until you find the first server.

When a server is added or removed, only the keys immediately adjacent to it are affected. 99% of your cache remains intact!
    `
  },
  {
    slug: 'redis-vs-memcached',
    title: 'Redis vs Memcached: Which one should you choose?',
    excerpt: 'A deep dive into the two most popular caching solutions.',
    date: 'Sep 29, 2026',
    author: 'Sarah',
    readTime: '6 min read',
    content: `
# Choosing a Distributed Cache

Caching is critical for scaling read-heavy applications. The two big players are Redis and Memcached. Which one should you use?

## Memcached: The Simple Key-Value Store
Memcached is incredibly fast, multi-threaded, and simple. It does one thing well: stores strings against keys in memory. 
**Use it when:** You have a massive, simple key-value workload and need multi-threaded performance out of the box.

## Redis: The Data Structure Server
Redis is single-threaded but incredibly feature-rich. It supports strings, lists, sets, sorted sets, hashes, bitmaps, and hyperloglogs. It also supports persistence (saving to disk) and pub/sub messaging.
**Use it when:** You need complex data types (e.g., a leaderboard using Sorted Sets), durability, or queueing mechanisms.

## Verdict
In 2024, Redis is the default choice for 95% of use cases due to its rich feature set. However, Memcached still shines in massive-scale, simple caching scenarios (like Facebook's early architecture).
    `
  }
];
