// simple-genre-classifier.js
// Simple keyword-based genre classifier. Export classifyTextByKeywords() and classifyVideo().

const NICHES = {
    tech: ["programming","javascript","node","react","python","tutorial","coding","sdk","api","linux","computer","typing", "hardware","chip","arduino","electronics","ece"],
    music: ["music","song","cover","acoustic","guitar","piano","album","beat","melody","rap","singer","vocals","studio","live"],
    comedy: ["comedy","funny","meme","prank","sketch","roast","standup","joke","hilarious"],
    education: ["lecture","tutorial","explain","how to","lesson","study","physics","math","chemistry","exam","jee","lesson","course","class"],
    gaming: ["game","gameplay","walkthrough","let's play","lets play","fps","minecraft","fortnite","pubg","valorant","dota","league"],
    vlog: ["vlog","day in the life","daily","travel","trip","journey","diary","montage","routine","haul"],
    fitness: ["workout","gym","exercise","fitness","yoga","calisthenics","training","run","cardio","abs","strength"],
    food: ["recipe","cooking","cook","kitchen","chef","eat","food","bake","baking","restaurant","dish","cuisine"],
    beauty: ["makeup","skincare","beauty","tutorial","haul","cosmetics","haircut","hairstyle","style","fashion"],
    finance: ["investment","stocks","crypto","money","finance","economy","budget","trading","ipo","personal finance","tax"],
    news: ["news","breaking","headline","report","interview","press","update"]
  };
  
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  
  function classifyTextByKeywords(text) {
    if (!text || !text.trim()) return { genre: null, score: 0, matches: {} };
  
    const s = text.toLowerCase();
    const matches = {};
  
    for (const [genre, kws] of Object.entries(NICHES)) {
      let score = 0;
      for (const kw of kws) {
        const regex = new RegExp(`\\b${esc(kw)}\\b`, 'gi');
        const found = (s.match(regex) || []).length;
        const weight = kw.split(' ').length > 1 ? 2 : 1;
        score += found * weight;
      }
      if (score > 0) matches[genre] = score;
    }
  
    if (Object.keys(matches).length === 0) return { genre: null, score: 0, matches };
  
    const entries = Object.entries(matches).sort((a,b)=>b[1]-a[1]);
    const bestGenre = entries[0][0];
    const bestScore = entries[0][1];
    const sum = entries.reduce((acc,[,v])=>acc+v,0);
    const dominance = bestScore / sum;
    const strength = Math.min(1, Math.log(bestScore + 1) / Math.log(10 + 1));
    const confidence = Math.round(Math.min(1, dominance * 0.7 + strength * 0.3) * 100) / 100;
  
    return { genre: bestGenre, score: confidence, matches };
  }
  
  function classifyVideo(video) {
    const tags = (video.tags || []).join(' ').toLowerCase();
    if (tags && tags.trim()) {
      const tagResult = classifyTextByKeywords(tags);
      if (tagResult.genre && tagResult.score >= 0.5) {
        return { genre: tagResult.genre, score: tagResult.score, method: 'tags' };
      }
      if (tagResult.genre) {
        var fallbackFromTags = { genre: tagResult.genre, score: tagResult.score, method: 'tags' };
      }
    }
  
    if (video.description && video.description.trim()) {
      const descResult = classifyTextByKeywords(video.description);
      if (descResult.genre) {
        const boosted = Math.min(1, descResult.score + 0.15);
        return { genre: descResult.genre, score: boosted, method: 'description' };
      }
    }
  
    if (video.title && video.title.trim()) {
      const titleResult = classifyTextByKeywords(video.title);
      if (titleResult.genre) {
        const adjusted = Math.min(1, titleResult.score + 0.05);
        return { genre: titleResult.genre, score: adjusted, method: 'title' };
      }
    }
  
    if (typeof fallbackFromTags !== 'undefined') return fallbackFromTags;
  
    return { genre: 'other', score: 0, method: 'none' };
  }
  
  module.exports = { classifyTextByKeywords, classifyVideo };
  