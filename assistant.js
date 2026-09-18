/**
 * ===================================================
 * SHAMI AI — Authentic Syrian Shawarma Menu Assistant
 * Shawerma El Shami (Temple Terrace, FL)
 * 
 * STRICT TOPIC GUARDRAILS:
 * Exclusively answers food suggestions, menu recommendations,
 * pairings, dietary needs, and restaurant details.
 * Strictly deflects programming, Python, math, homework,
 * trivia, or off-topic queries back to shawarma!
 * ===================================================
 */

(function () {
    'use strict';

    // ==========================================
    // 1. MENU KNOWLEDGE BASE (From menu_items.csv)
    // ==========================================
    const MENU = [
        // Sandwiches
        { name: "Chicken Shawarma Sandwich", price: "$8.99", category: "Sandwiches", tag: "Best Seller", desc: "Thinly sliced halal chicken shawarma wrapped in warm Saj bread with crisp Syrian pickles and legendary house garlic toum." },
        { name: "Beef Shawarma Sandwich", price: "$9.99", category: "Sandwiches", tag: "Customer Favorite", desc: "Tender spiced beef shawarma wrapped in Saj bread with sumac onions, fresh parsley, tomatoes, and nutty tahini." },
        { name: "Chicken Jumbo Sandwich", price: "$12.99", category: "Sandwiches", tag: "Big Appetite", desc: "Generously loaded chicken shawarma sandwich for serious cravings." },
        { name: "Beef Jumbo Sandwich", price: "$13.99", category: "Sandwiches", tag: "Big Appetite", desc: "Extra portion of our spiced halal beef wrapped with sumac onions and tahini." },
        { name: "Chicken Extra Jumbo Sandwich", price: "$14.99", category: "Sandwiches", tag: "Feast Size", desc: "Massive hand-stacked chicken shawarma sandwich toasted on the flat-top griddle." },
        { name: "Beef Extra Jumbo Sandwich", price: "$15.99", category: "Sandwiches", tag: "Feast Size", desc: "Our largest beef sandwich loaded with tender spit-roasted beef." },

        // Combos (Includes seasoned fries & drink/pickles/sauce)
        { name: "Chicken Shawarma Combo", price: "$12.99", category: "Combos", tag: "Top Recommended", desc: "Our signature Chicken Shawarma Sandwich served with seasoned golden fries, house garlic toum, and drink." },
        { name: "Beef Shawarma Combo", price: "$13.99", category: "Combos", tag: "Top Recommended", desc: "Beef Shawarma Sandwich served with seasoned fries, tahini sauce, Syrian pickles, and drink." },
        { name: "Chicken Jumbo Combo", price: "$15.99", category: "Combos", tag: "Value Pick", desc: "Jumbo chicken sandwich with fries, pickles, garlic whip, and a beverage." },
        { name: "Beef Jumbo Combo", price: "$16.99", category: "Combos", tag: "Hearty", desc: "Jumbo beef sandwich paired with fries, pickles, tahini sauce, and drink." },
        { name: "Chicken Extra Jumbo Combo", price: "$17.99", category: "Combos", tag: "Super Value", desc: "Extra jumbo chicken sandwich, golden fries, pickles, drink, and extra sauce." },
        { name: "Beef Extra Jumbo Combo", price: "$18.99", category: "Combos", tag: "Super Value", desc: "Extra jumbo beef sandwich, golden fries, pickles, drink, and tahini." },
        { name: "Chicken Double Combo", price: "$22.99", category: "Combos", tag: "Double Meal", desc: "Two full chicken shawarma sandwiches, double fries, pickles, drinks, and sauces." },
        { name: "Beef Double Combo", price: "$23.99", category: "Combos", tag: "Double Meal", desc: "Two full beef shawarma sandwiches, double fries, pickles, drinks, and sauces." },

        // Platters
        { name: "Chicken Loose Platter", price: "$15.99", category: "Platters", tag: "Low Carb Friendly", desc: "A generous mound of juicy chicken shawarma over fragrant seasoned rice with Saj bread, pickles, and toum." },
        { name: "Beef Loose Platter", price: "$15.99", category: "Platters", tag: "Classic", desc: "Tender beef shawarma strips over fragrant rice, served with sumac salad, tahini, and warm Saj bread." },
        { name: "Mix & Match Platter (Beef + Chicken)", price: "$16.99", category: "Platters", tag: "Best of Both", desc: "Can't decide? Get both beef and chicken shawarma piled high with rice, garlic toum, tahini, and pickles." },
        { name: "Mix Shawarma Family Platter", price: "$80.00", category: "Family", tag: "Feeds 5–7", desc: "Ultimate Syrian feast: heaps of chicken & beef shawarma, large golden fries, hummus, pickles, fresh Saj bread, and assorted sauces." },

        // Appetizers & Sides
        { name: "Hummus w/ Beef Shawarma", price: "$15.99", category: "Appetizers", tag: "Crowd Pleaser", desc: "Silky smooth chickpea hummus topped with warm spiced beef shawarma and olive oil." },
        { name: "Hummus w/ Chicken Shawarma", price: "$14.99", category: "Appetizers", tag: "Crowd Pleaser", desc: "Velvety house hummus topped with hot sliced chicken shawarma, olive oil, and warm bread." },
        { name: "Hummus (Traditional)", price: "$7.99", category: "Appetizers", tag: "Vegetarian", desc: "Authentic Damascus-style creamy hummus with tahini, extra virgin olive oil, and sumac." },
        { name: "Fattoush Salad", price: "$7.99", category: "Appetizers", tag: "Vegetarian / Fresh", desc: "Crisp romaine, fresh herbs, cucumbers, tomatoes, sumac dressing, and crunchy toasted pita crisps." },
        { name: "Fried Kebbeh (4 PC)", price: "$15.00", category: "Appetizers", tag: "Syrian Classic", desc: "Crispy bulgur shells stuffed with spiced minced beef, onions, and toasted pine nuts (1 PC available for $4.00)." },
        { name: "Kebbeh Shawarma (1 PC)", price: "$7.99", category: "Appetizers", tag: "Chef Special", desc: "Crisp fried kebbeh stuffed with juicy shawarma meat." },
        { name: "Beef or Cheese Samosa (1 PC)", price: "$2.99", category: "Appetizers", tag: "Quick Bite", desc: "Golden fried savory pastry stuffed with spiced beef or gooey cheese." },
        { name: "Seasoned Fries", price: "S: $3.99 | M: $4.99 | L: $7.99", category: "Appetizers", tag: "Hot & Crispy", desc: "Golden crinkle-cut fries dusted with Middle Eastern herb seasoning." },

        // Sauces & Drinks
        { name: "House Garlic Toum", price: "$0.75", category: "Sauces", tag: "Legendary", desc: "Whipped fresh daily with fresh garlic, lemon, and oil. Fluffy, creamy, and essential!" },
        { name: "Hot Garlic Sauce", price: "$0.75", category: "Sauces", tag: "Spicy", desc: "Our house garlic whip infused with fiery Levant chili for bold heat." },
        { name: "Pomegranate Molasses Glaze", price: "$0.75", category: "Sauces", tag: "Sweet & Tangy", desc: "Authentic Syrian pomegranate syrup for the classic sour-sweet kick." },
        { name: "Tahini Sauce", price: "$0.75", category: "Sauces", tag: "Creamy", desc: "Nutty roasted sesame paste blended with lemon juice and spices — perfect on beef." },
        { name: "Ayran Yogurt Drink", price: "$3.00", category: "Drinks", tag: "Traditional", desc: "Refreshing chilled salty yogurt beverage that pairs flawlessly with spiced shawarma." }
    ];

    const RESTAURANT_INFO = {
        name: "Shawerma El Shami (شاورما الشامي)",
        address: "11414 N 56th St, Temple Terrace, FL 33617",
        phone: "(813) 769-9231",
        phoneClean: "8137699231",
        hours: "Tuesday to Sunday: 12:00 PM – 9:30 PM (Closed Mondays)",
        doordashUrl: "https://www.doordash.com/store/shawarma-elshami-temple-terrace-25059818/23386373/",
        halal: "100% Certified Halal meats hand-stacked daily. No pork or alcohol."
    };

    // ==========================================
    // 2. STRICT TOPIC GUARDRAILS ENGINE
    // ==========================================
    const OFF_TOPIC_PATTERNS = [
        // Programming & Tech
        /\b(python|javascript|typescript|c\+\+|java\b|golang|rust\b|php|ruby|swift|kotlin|csharp|c#|\.net)\b/i,
        /\b(def\s+[a-z_]|function\s*\(|import\s+[a-z]|from\s+[a-z]+\s+import|console\.log|print\(|var\s+|let\s+|const\s+|class\s+[A-Z]|#include)\b/i,
        /\b(code|coding|script|algorithm|regex|sql|database|query|github|git|api\b|backend|frontend|framework|library|compiler|debugger|stack\s*trace|exception|variable|loop|recursion|pointer|data\s*structure)\b/i,
        /\b(html|css|react|vue|angular|django|flask|node\.js|powershell|bash|linux|ubuntu|windows\s*11|macos)\b/i,

        // Math & Academic Homework
        /\b(solve|derivative|integral|calculus|equation|algebra|pythagorean|hypotenuse|formula|matrix)\b/i,
        /(\d+\s*[\+\-\*\/x]\s*\d+\s*=|\bwhat\s+is\s+\d+\s*[\+\-\*\/x]\s*\d+)/i,
        /\b(write\s+(me\s+)?an\s+essay|homework|write\s+a\s+poem\s+about\s+(?!food|shawarma|meat|chicken|kebab)|write\s+a\s+story\s+about\s+(?!food|shawarma))\b/i,

        // Politics, Non-food general trivia
        /\b(who\s+is\s+the\s+president|election|trump|biden|democrat|republican|senate|congress|war\s+in|crypto|bitcoin|ethereum|stock\s+market|investing)\b/i,
        /\b(capital\s+of\s+(?!syria)|distance\s+to\s+the\s+moon|speed\s+of\s+light|quantum\s+physics)\b/i
    ];

    const GUARDRAIL_REFUSALS = [
        "🥙 **Ahlan! I only have eyes (and tastebuds) for authentic Syrian shawarma!**\n\nI can't write code or solve technical questions, but I'm an expert on what to order today! Are you in the mood for juicy **Chicken**, tender **spiced Beef**, or a crisp **Vegetarian platter**?",
        "👨‍🍳 **Oops! My only programming language is Spices, Garlic Toum, and Saj Bread!**\n\nI strictly answer menu suggestions and food recommendations. Let's find you something incredible to eat—are you craving a quick sandwich, a full combo, or feeding a family?",
        "🌯 **No Python or tech scripts here—only authentic Damascus recipes!**\n\nMy specialty is helping you pick the perfect meal at Shawerma El Shami. Would you like to hear about our **#1 Best-Selling Chicken Combo** or our **Mix Platter**?",
        "🧄 **I'm programmed solely as your Syrian Food Sommelier!**\n\nI don't answer general trivia, homework, or coding questions. But ask me what sauce pairs with beef shawarma or what's under $15, and I have you covered! What sounds good right now?"
    ];

    function isOffTopic(query) {
        return OFF_TOPIC_PATTERNS.some(pattern => pattern.test(query));
    }

    function getRandomRefusal() {
        return GUARDRAIL_REFUSALS[Math.floor(Math.random() * GUARDRAIL_REFUSALS.length)];
    }

    // ==========================================
    // 3. FUZZY SPELL CHECKER & TYPO NORMALIZER
    // ==========================================
    function levenshteinDistance(s1, s2) {
        if (s1.length < s2.length) return levenshteinDistance(s2, s1);
        if (s2.length === 0) return s1.length;
        let prev = [];
        for (let j = 0; j <= s2.length; j++) prev[j] = j;
        for (let i = 0; i < s1.length; i++) {
            let curr = [i + 1];
            for (let j = 0; j < s2.length; j++) {
                let ins = prev[j + 1] + 1;
                let del = curr[j] + 1;
                let sub = prev[j] + (s1[i] !== s2[j] ? 1 : 0);
                curr.push(Math.min(ins, del, sub));
            }
            prev = curr;
        }
        return prev[prev.length - 1];
    }

    const PHONETIC_TYPO_MAP = {
        'shwarma': 'shawarma', 'shawrma': 'shawarma', 'shawerma': 'shawarma', 'shawa': 'shawarma', 'shawarmah': 'shawarma',
        'chiken': 'chicken', 'chikn': 'chicken', 'chickin': 'chicken', 'chickn': 'chicken', 'chikken': 'chicken', 'shicken': 'chicken', 'chikin': 'chicken',
        'beaf': 'beef', 'bef': 'beef', 'beff': 'beef', 'steek': 'beef', 'meet': 'beef', 'meat': 'beef',
        'hommus': 'hummus', 'humus': 'hummus', 'hummous': 'hummus', 'hamos': 'hummus', 'homas': 'hummus',
        'fatoush': 'fattoush', 'fattosh': 'fattoush', 'fatosh': 'fattoush', 'fatoosh': 'fattoush', 'fatus': 'fattoush',
        'kebba': 'kebbeh', 'kibba': 'kebbeh', 'kebeh': 'kebbeh', 'kibbeh': 'kebbeh', 'kebbe': 'kebbeh', 'keba': 'kebbeh',
        'sanwich': 'sandwich', 'sandwhich': 'sandwich', 'samwich': 'sandwich', 'sandwidch': 'sandwich', 'sand': 'sandwich',
        'cmbo': 'combo', 'cambo': 'combo', 'comba': 'combo', 'combos': 'combo',
        'platr': 'platter', 'plater': 'platter', 'plattar': 'platter', 'platters': 'platter',
        'famly': 'family', 'famliy': 'family', 'famlly': 'family',
        'sause': 'sauce', 'soce': 'sauce', 'sauces': 'sauce', 'sos': 'sauce',
        'toom': 'garlic', 'tum': 'garlic', 'garlick': 'garlic', 'garlics': 'garlic', 'tom': 'garlic',
        'spciy': 'spicy', 'spisy': 'spicy', 'spcy': 'spicy', 'hot': 'spicy',
        'vegtarian': 'vegetarian', 'vegitarian': 'vegetarian', 'veggie': 'vegetarian', 'vege': 'vegetarian',
        'reccomend': 'recommend', 'recomnd': 'recommend', 'reccommend': 'recommend', 'recom': 'recommend', 'recomended': 'recommend', 'recomends': 'recommend',
        'sugest': 'suggest', 'sugestion': 'suggest', 'sugguest': 'suggest', 'sugges': 'suggest',
        'ppl': 'people', 'pepole': 'people', 'peopel': 'people', 'peaple': 'people', 'peopl': 'people', 'preson': 'person', 'persons': 'people',
        'wat': 'what', 'wht': 'what', 'shud': 'should', 'shoud': 'should', 'shld': 'should',
        'ordr': 'order', 'ordar': 'order',
        'fav': 'favorite', 'favs': 'favorites', 'favourite': 'favorite',
        'appetizer': 'appetizer', 'appetiser': 'appetizer', 'apps': 'appetizer', 'apetizer': 'appetizer',
        'hungrey': 'hungry', 'hangry': 'hungry', 'starvin': 'hungry', 'starving': 'hungry'
    };

    const TARGET_FOOD_TERMS = [
        'chicken', 'beef', 'shawarma', 'hummus', 'fattoush', 'sandwich', 'combo', 
        'platter', 'family', 'garlic', 'sauce', 'spicy', 'vegetarian', 'kebbeh', 
        'samosa', 'fries', 'hours', 'phone', 'halal', 'recommend', 'popular', 'price',
        'people', 'couple', 'order', 'suggest', 'drink'
    ];

    function normalizeQuery(text) {
        if (!text) return '';
        const words = text.toLowerCase().split(/\s+/);
        const corrected = words.map(w => {
            const clean = w.replace(/[^a-z0-9]/g, '');
            if (!clean) return w;
            if (PHONETIC_TYPO_MAP[clean]) {
                return PHONETIC_TYPO_MAP[clean];
            }
            if (clean.length >= 4) {
                for (const target of TARGET_FOOD_TERMS) {
                    const dist = levenshteinDistance(clean, target);
                    const maxDist = clean.length <= 5 ? 1 : 2;
                    if (dist <= maxDist) {
                        return target;
                    }
                }
            }
            return clean;
        });
        return corrected.join(' ');
    }

    // ==========================================
    // 4. FOOD RECOMMENDATION & INTENT ENGINE
    // ==========================================
    function generateFoodRecommendation(rawQuery) {
        const rawLower = rawQuery.toLowerCase().trim();
        const normalized = normalizeQuery(rawLower);
        // Combine raw and normalized text for maximum fuzzy resilience
        const q = `${rawLower} ${normalized}`;

        // 1. GREETINGS & CASUAL
        if (/^(hi|hello|hey|marhaba|salam|ahlan|hola|yo|good\s+morning|good\s+evening|sup)\b/i.test(q)) {
            return {
                text: "Ahlan wa Sahlan! Welcome to **Shawerma El Shami**! 🥙\n\nI'm your **Shami AI Menu Sommelier**. I'm here to give you personalized dish recommendations, pairing suggestions, and meal tips.\n\nWhat are you craving today?",
                chips: ["👫 2 People Meal", "🔥 Most Popular", "🥩 Beef or Chicken?", "🥗 Vegetarian", "👨‍👩‍👧 Family Feast"]
            };
        }

        // 2. MEAL FOR 2 PEOPLE / COUPLE / PAIR (Direct answer to "we are 2 people what should we get")
        const isTwoPeople = /\b(2\s*(people|person|persons|ppl|of\s*us|guests|adults)|two\s*(people|person|persons|ppl|of\s*us|guests|adults)|couple|pair|date\s*night|both\s*of\s*us|two\s*of\s*us|2\s*of\s*us|for\s*(two|2)|we\s+are\s+(2|two)|dinner\s+for\s+two|lunch\s+for\s+two|me\s+and\s+my\s*(friend|wife|husband|girlfriend|boyfriend|partner|brother|sister|mom|dad|bro))\b/i.test(q) ||
                            /(شخصين|شخصان|اثنين|لشخصين)/.test(q);

        if (isTwoPeople) {
            return {
                text: "Dining as a pair? Here are our top 3 best ways to eat for **2 people**! 👫\n\n" +
                      "🥇 **Option 1 — The Double Combo (Best Value!):**\n" +
                      "Get the **Chicken Double Combo ($22.99)** or **Beef Double Combo ($23.99)**. It comes with **2 full sandwiches**, a mountain of seasoned fries, crisp Syrian pickles, 2 drinks, and plenty of garlic toum & tahini to share!\n\n" +
                      "🥈 **Option 2 — The Best of Both Worlds:**\n" +
                      "Order **1 Chicken Shawarma Combo ($12.99)** + **1 Beef Shawarma Combo ($13.99)** so you both get your own fries and drink, and can trade bites of both authentic spits!\n\n" +
                      "🥉 **Option 3 — Platter & Appetizer Style:**\n" +
                      "Share a **Mix & Match Platter ($16.99)** (beef & chicken over spiced yellow rice) + an order of **Traditional Hummus ($7.99)** or **Fried Kebbeh ($15.00)** with warm Saj bread!",
                items: [
                    MENU.find(i => i.name === "Chicken Double Combo"),
                    MENU.find(i => i.name === "Mix & Match Platter (Beef + Chicken)"),
                    MENU.find(i => i.name === "Hummus w/ Beef Shawarma")
                ],
                extra: "💡 **Pro Tip for 2:** Ask for an extra tub of **House Garlic Toum ($0.75)** and a drizzle of sweet & tangy **Pomegranate Molasses ($0.75)** for the ultimate Damascus feast!",
                chips: ["🍗 Chicken Double Combo", "🥩 Beef Double Combo", "🥙 Mix & Match Platter", "🧄 Best Sauces"]
            };
        }

        // 3. MEAL FOR 3 TO 4 PEOPLE (Small Groups / Trios / Quads)
        const isThreeOrFour = /\b(3\s*(people|person|persons|ppl|of\s*us|guests|adults)|three\s*(people|person|persons|ppl|of\s*us|guests|adults)|4\s*(people|person|persons|ppl|of\s*us|guests|adults)|four\s*(people|person|persons|ppl|of\s*us|guests|adults)|for\s*(3|three|4|four)|(3|4)\s*of\s*us|three\s*of\s*us|four\s*of\s*us|group\s+of\s*(3|4|three|four))\b/i.test(q) ||
                              /(٣|٤|ثلاث|اربع|3\s*اشخاص|4\s*اشخاص)/.test(q);

        if (isThreeOrFour) {
            return {
                text: "Feeding a group of **3 to 4 people**? Here is how to order the ultimate spread! 👨‍👩‍👦\n\n" +
                      "🌟 **The Winning Combination:**\n" +
                      "• **1 Chicken Double Combo ($22.99)** (2 full chicken sandwiches + double fries + drinks)\n" +
                      "• **1 Mix & Match Platter ($16.99)** (beef & chicken over yellow rice with pickles & toum)\n" +
                      "• **1 Traditional Hummus ($7.99)** or **Fried Kebbeh (4 PC - $15.00)** for the table!\n\n" +
                      "💡 *Have big eaters in the group?* You can also jump straight to our **Mix Shawarma Family Platter ($80.00)** for a complete royal banquet!",
                items: [
                    MENU.find(i => i.name === "Chicken Double Combo"),
                    MENU.find(i => i.name === "Mix & Match Platter (Beef + Chicken)"),
                    MENU.find(i => i.name === "Mix Shawarma Family Platter")
                ],
                chips: ["👨‍👩‍👧 Family Feast", "🍗 Chicken Combos", "🥩 Beef Combos", "🥗 Appetizers"]
            };
        }

        // 4. FAMILY / LARGE GROUP / CATERING / PARTY (5+ People)
        const isLargeGroup = /\b(5|five|6|six|7|seven|8|eight|10|ten|\d+)\s*(people|person|persons|ppl|of\s*us|guests)|family|party|gathering|crowd|feed|catering|feast|event|banquet\b/i.test(q);

        if (isLargeGroup) {
            return {
                text: "Feeding a whole crew or family? We have our legendary royal feast ready! 👨‍👩‍👧‍👦\n\n" +
                      "👑 **Mix Shawarma Family Platter ($80.00):**\n" +
                      "Specifically crafted to generously feed **5 to 7 hungry people**! It comes piled high with:\n" +
                      "• Generous mounds of hand-stacked Chicken AND spiced Beef Shawarma\n" +
                      "• Large deep tray of golden seasoned fries\n" +
                      "• Fresh creamy hummus & warm Saj bread rounds\n" +
                      "• Crisp Syrian pickles & assorted garlic toum and tahini sauces!\n\n" +
                      "For custom large event trays, call our dedicated catering specialist at **(813) 330-4632**.",
                items: [
                    MENU.find(i => i.name === "Mix Shawarma Family Platter"),
                    MENU.find(i => i.name === "Fried Kebbeh (4 PC)")
                ],
                chips: ["📞 Call Catering", "🥗 Add Appetizers", "🔥 Most Popular"]
            };
        }

        // 5. BROAD RECOMMENDATION / WHAT SHOULD WE/I GET / WHAT TO ORDER / BEST SELLERS
        const isRecommendation = /\b(recommend|recommendation|recomnd|suggest|suggestion|best\s*seller|popular|signature|must\s*try|first\s*time|favorite|favorites)\b/i.test(q) ||
                                 /\bwhat\s+(should|can|do|could|to)\s+(i|we|you|people|one)?\s*(get|order|eat|try|pick|choose|have)\b/i.test(q) ||
                                 /\bwhat('s|\s+is)\s+(good|best|popular|recommended|fire|special|signature|tasty|hot)\b/i.test(q) ||
                                 /\b(what\s+to\s+(get|order|eat|try|pick|choose))\b/i.test(q) ||
                                 /\b(help\s+(me|us)\s+(choose|pick|order|decide))\b/i.test(q) ||
                                 /\b(what\s+do\s+you\s+have|what('s|\s+is)\s+on\s+the\s+menu)\b/i.test(q) ||
                                 /\b(any\s+(recommendations|suggestions|ideas))\b/i.test(q);

        if (isRecommendation) {
            return {
                text: "Here are our **#1 most-ordered crowd favorites** at Shawerma El Shami! 🏆\n\nOur authentic Syrian shawarma is hand-stacked daily and toasted on the griddle inside warm Saj bread for that signature crackly crunch.",
                items: [
                    MENU.find(i => i.name === "Chicken Shawarma Combo"),
                    MENU.find(i => i.name === "Beef Shawarma Combo"),
                    MENU.find(i => i.name === "Mix & Match Platter (Beef + Chicken)")
                ],
                extra: "💡 **Pro Tip:** Ask for extra **House Garlic Toum ($0.75)** and a splash of **Pomegranate Molasses ($0.75)** for the authentic Damascus street style!",
                chips: ["👫 2 People Meal", "🥩 Beef vs. Chicken", "🍟 What comes with Combos?", "🌶️ Spicy Picks"]
            };
        }

        // 6. COMBOS GUIDE / WHAT COMES WITH A COMBO
        if (q.includes("combo") && (q.includes("come") || q.includes("include") || q.includes("what is") || q.includes("sandwich vs") || q.includes("difference"))) {
            return {
                text: "Here is what makes our **Combos** the best value in town! 🍟🥤\n\n" +
                      "Every Combo includes:\n" +
                      "• **Your Choice of Shawarma Sandwich** (Regular, Jumbo, or Double)\n" +
                      "• **Hot Golden Crinkle-Cut Seasoned Fries** (seasoned with Levant herbs)\n" +
                      "• **Crisp Pickles & Authentic House Sauce** (Garlic Toum for Chicken, Tahini for Beef)\n" +
                      "• **Refreshing Cold Beverage**\n\n" +
                      "Combos start at just **$12.99**—it's a complete, hearty meal!",
                items: [
                    MENU.find(i => i.name === "Chicken Shawarma Combo"),
                    MENU.find(i => i.name === "Beef Shawarma Combo")
                ],
                chips: ["🍗 Chicken Combo", "🥩 Beef Combo", "👫 2 People Meal"]
            };
        }

        // 7. BEEF VS CHICKEN COMPARISON
        if ((q.includes("beef") && q.includes("chicken")) || q.includes("difference") || q.includes("which is better") || q.includes("or chicken") || q.includes("or beef")) {
            return {
                text: "Here is how our two legendary spits compare:\n\n🍗 **Chicken Shawarma:** Marinated in garlic, lemon, coriander, and Levant cardamom. Sliced thin and toasted in Saj with pickles and creamy garlic toum. Juicier, zesty, and lighter!\n\n🥩 **Beef Shawarma:** Marinated in ancestral 7-spice blend, allspice, sumac, and warm aromatics. Sliced tender and served with sumac-dusted onions, fresh parsley, tomatoes, and nutty sesame tahini. Rich and savory!\n\nCan't pick? Get the **Mix & Match Platter** to enjoy both on a single plate!",
                items: [
                    MENU.find(i => i.name === "Mix & Match Platter (Beef + Chicken)")
                ],
                chips: ["🍗 Chicken Sandwiches", "🥩 Beef Sandwiches", "🍟 Check Combos"]
            };
        }

        // 8. CHICKEN SPECIFIC
        if (q.includes("chicken") && !q.includes("beef")) {
            return {
                text: "Our chicken shawarma is hand-stacked fresh every single morning! Tender, golden-caramelized, and legendary with our garlic toum. Here are top chicken picks:",
                items: [
                    MENU.find(i => i.name === "Chicken Shawarma Sandwich"),
                    MENU.find(i => i.name === "Chicken Shawarma Combo"),
                    MENU.find(i => i.name === "Chicken Loose Platter")
                ],
                extra: "💡 Want an upgrade? Get the **Chicken Jumbo Combo ($15.99)** for 50% more hand-carved chicken!",
                chips: ["🥩 What about Beef?", "🧄 What sauces to get?", "🔥 Most Popular"]
            };
        }

        // 9. BEEF SPECIFIC
        if (q.includes("beef") && !q.includes("chicken")) {
            return {
                text: "Our spiced halal beef shawarma is rich, deeply aromatic with sumac, allspice, and clove, wrapped with fresh tomatoes and roasted sesame tahini. Here are top beef picks:",
                items: [
                    MENU.find(i => i.name === "Beef Shawarma Sandwich"),
                    MENU.find(i => i.name === "Beef Shawarma Combo"),
                    MENU.find(i => i.name === "Hummus w/ Beef Shawarma")
                ],
                extra: "💡 **Pairing Suggestion:** Drizzle sweet & tangy **Pomegranate Molasses ($0.75)** over your beef shawarma—it's a Damascus tradition!",
                chips: ["🍗 What about Chicken?", "🧄 House Garlic Toum", "🥗 Appetizers"]
            };
        }

        // 10. HUNGER / PORTION SIZE (Starving, Big, Double, Jumbo)
        if (q.includes("hungry") || q.includes("starving") || q.includes("big") || q.includes("huge") || q.includes("large portion") || q.includes("double") || q.includes("jumbo") || q.includes("giant")) {
            return {
                text: "Got a massive appetite? We have serious heavyweight options for big cravings! 💪",
                items: [
                    MENU.find(i => i.name === "Chicken Double Combo"),
                    MENU.find(i => i.name === "Beef Extra Jumbo Combo"),
                    MENU.find(i => i.name === "Chicken Loose Platter")
                ],
                extra: "The **Double Combo** gives you **two full sandwiches**, double fries, pickles, and sauces! You will not leave hungry.",
                chips: ["👫 2 People Meal", "👨‍👩‍👧 Family Feast", "🍗 Chicken Combos"]
            };
        }

        // 11. VEGETARIAN / VEGAN / MEATLESS / HEALTHY
        if (q.includes("vegetarian") || q.includes("vegan") || q.includes("meatless") || q.includes("no meat") || q.includes("salad") || q.includes("healthy") || q.includes("plant")) {
            return {
                text: "Yes! We have delicious, authentic Middle Eastern vegetarian favorites made fresh daily from scratch 🌱:",
                items: [
                    MENU.find(i => i.name === "Hummus (Traditional)"),
                    MENU.find(i => i.name === "Fattoush Salad"),
                    MENU.find(i => i.name === "Beef or Cheese Samosa (1 PC)"),
                    MENU.find(i => i.name === "Seasoned Fries")
                ],
                extra: "Our **Fattoush Salad** with tangy pomegranate sumac dressing and housemade **Hummus with warm bread** makes a fresh, satisfying vegetarian meal!",
                chips: ["🔥 Most Popular", "🧄 What sauces to get?", "💰 Budget Under $10"]
            };
        }

        // 12. SAUCES & PAIRINGS (Toum, Tahini, Pomegranate)
        if (q.includes("sauce") || q.includes("toum") || q.includes("garlic") || q.includes("tahini") || q.includes("pomegranate") || q.includes("dip") || q.includes("dressing")) {
            return {
                text: "The secret to genuine Syrian shawarma is the authentic house sauces! All made fresh daily for just **$0.75 each**:\n\n🧄 **House Garlic Toum ($0.75):** Fluffy, whipped fresh garlic whip. Creamy, potent, and essential on chicken.\n\n🌶️ **Hot Garlic Sauce ($0.75):** Garlic toum infused with fiery Syrian chili pepper.\n\n🍯 **Pomegranate Molasses ($0.75):** Tart, sweet, and tangy Damascus reduction. Drizzle it over beef!\n\n🥣 **Tahini Sauce ($0.75):** Roasted sesame cream with lemon and spices.\n\n🥛 **Ayran Yogurt ($3.00):** Chilled salty yogurt beverage that cleanses the palate between savory bites!",
                chips: ["🍗 Chicken Picks", "🥩 Beef Picks", "🔥 Most Popular"]
            };
        }

        // 13. SPICY RECOMMENDATIONS
        if (q.includes("spicy") || q.includes("hot") || q.includes("heat") || q.includes("chili") || q.includes("pepper")) {
            return {
                text: "Looking for a spicy kick? 🔥\n\nAll our sandwiches and platters can be kicked into overdrive! Here is the spicy formula:\n\n1. Order the **Chicken or Beef Shawarma Combo**.\n2. Ask for **Hot Garlic Sauce ($0.75)** spread directly onto the Saj bread before pressing.\n3. Add extra pickled Syrian peppers for an authentic Levant crunch!",
                items: [
                    MENU.find(i => i.name === "Chicken Shawarma Combo"),
                    MENU.find(i => i.name === "Hot Garlic Sauce")
                ],
                chips: ["🧄 Best Sauces", "🍗 Chicken Shawarma", "🥩 Beef Shawarma"]
            };
        }

        // 14. DRINKS & BEVERAGES (Ayran, Sodas, Water)
        if (q.includes("drink") || q.includes("beverage") || q.includes("soda") || q.includes("coke") || q.includes("water") || q.includes("ayran") || q.includes("yogurt")) {
            return {
                text: "Quench your thirst with our beverages! 🥤\n\n" +
                      "⭐ **Ayran Yogurt Drink ($3.00):**\n" +
                      "The quintessential Middle Eastern pairing! A cold, lightly salted yogurt beverage that cuts right through rich spices and garlic.\n\n" +
                      "• **Assorted Fountain & Canned Sodas** (Coca-Cola, Diet Coke, Sprite, etc.)\n" +
                      "• **Bottled Water**\n\n" +
                      "*Remember:* All Combos come with your choice of beverage included!",
                items: [
                    MENU.find(i => i.name === "Ayran Yogurt Drink")
                ],
                chips: ["🍟 Check Combos", "🍗 Chicken Combo", "🥩 Beef Combo"]
            };
        }

        // 15. BUDGET / UNDER $10 / CHEAP / INEXPENSIVE
        if (q.includes("cheap") || q.includes("budget") || q.includes("affordable") || q.includes("under 10") || q.includes("under $10") || q.includes("under 15") || q.includes("under $15") || q.includes("price") || q.includes("cost") || q.includes("deal")) {
            return {
                text: "You can eat like royalty on any budget at Shawerma El Shami! 💰 Here are great value options:",
                items: [
                    MENU.find(i => i.name === "Chicken Shawarma Sandwich"),
                    MENU.find(i => i.name === "Beef Shawarma Sandwich"),
                    MENU.find(i => i.name === "Chicken Shawarma Combo"),
                    MENU.find(i => i.name === "Hummus (Traditional)")
                ],
                extra: "Sandwiches start at only **$8.99**, and full combos with seasoned fries and drink start at **$12.99**!",
                chips: ["🍗 Chicken Combo", "🥩 Beef Combo", "🔥 Most Popular"]
            };
        }

        // 16. APPETIZERS / SIDES / FRIES / SAMOSA / KEBBEH
        if (q.includes("appetizer") || q.includes("side") || q.includes("fries") || q.includes("kebbeh") || q.includes("kibbeh") || q.includes("samosa") || q.includes("hummus")) {
            return {
                text: "Don't miss our authentic Syrian starters and handmade sides! 🧆",
                items: [
                    MENU.find(i => i.name === "Hummus w/ Beef Shawarma"),
                    MENU.find(i => i.name === "Fried Kebbeh (4 PC)"),
                    MENU.find(i => i.name === "Fattoush Salad"),
                    MENU.find(i => i.name === "Beef or Cheese Samosa (1 PC)")
                ],
                extra: "💡 **Kebbeh Tip:** Our fried kebbeh shells are hand-shaped from bulgur and stuffed with spiced minced beef and pine nuts!",
                chips: ["🔥 Most Popular", "🥗 Vegetarian Options", "🍗 Main Dishes"]
            };
        }

        // 17. ALLERGIES & DIETARY (Halal, Gluten, Dairy, Nuts)
        if (q.includes("halal") || q.includes("zabiha") || q.includes("pork") || q.includes("meat source") || q.includes("kosher") || q.includes("allergy") || q.includes("gluten") || q.includes("dairy") || q.includes("nut")) {
            return {
                text: "🕌 **Dietary & Halal Guidelines:**\n\n" +
                      "• **100% Certified Zabiha Halal:** All chicken and beef are hand-stacked and prepared to the strictest halal standards. Zero pork, zero lard, zero alcohol on premises.\n" +
                      "• **Gluten-Sensitive:** Enjoy our **Chicken or Beef Loose Platters** over fragrant yellow rice and salad (ask for no Saj bread)!\n" +
                      "• **Dairy:** Our house garlic toum is dairy-free (whipped garlic, lemon, oil, salt). Cheese samosas and Ayran drink contain dairy.\n" +
                      "• **Nuts/Sesame:** Fried Kebbeh contains pine nuts. Tahini contains sesame.",
                chips: ["🍗 Chicken Platter", "🥩 Beef Platter", "🥗 Vegetarian Options"]
            };
        }

        // 18. RESTAURANT HOURS / LOCATION / ADDRESS / PHONE / HOW TO ORDER
        if (q.includes("hour") || q.includes("open") || q.includes("close") || q.includes("time") || q.includes("address") || q.includes("where") || q.includes("location") || q.includes("phone") || q.includes("call") || q.includes("order") || q.includes("doordash") || q.includes("delivery")) {
            return {
                text: `📍 **Shawerma El Shami Info & Ordering:**\n\n` +
                      `• **Address:** 11414 N 56th St, Temple Terrace, FL 33617\n` +
                      `• **Phone:** [(813) 769-9231](tel:${RESTAURANT_INFO.phoneClean})\n` +
                      `• **Hours:** Tue–Sun: 12:00 PM – 9:30 PM *(Closed Mondays)*\n` +
                      `• **Dine-In, Takeout, & DoorDash Delivery** available!`,
                action: {
                    label: "🛵 Order on DoorDash",
                    url: RESTAURANT_INFO.doordashUrl
                },
                chips: ["🔥 What should I order?", "🍗 Chicken Combo", "🥩 Beef Combo"]
            };
        }

        // 19. ARABIC LANGUAGE SUPPORT (مساعدة بالعربي)
        if (/[\u0600-\u06FF]/.test(q)) {
            if (q.includes("شخصين") || q.includes("اثنين") || q.includes("شخصان")) {
                return {
                    text: "أهلاً وسهلاً بك! لشخصين أنصحكم بأحد الخيارات التالية: 👫\n\n" +
                          "🥇 **دبل كومبو دجاج أو لحم ($22.99 - $23.99):** يحتوي على ساندويشين كاملين مع بطاطا دبل ومشروبين وثومية وطحينية.\n\n" +
                          "🥈 **صحن مشكل شاورما ($16.99):** كمية وفيرة من شاورما الدجاج واللحم على الرز المبهر مع صحن حمص ومخللات وخبر صاج ساخن!",
                    chips: ["🍗 دبل كومبو دجاج", "🥩 دبل كومبو لحم", "🥙 صحن مشكل"]
                };
            }
            if (q.includes("تنصح") || q.includes("اطلب") || q.includes("شو") || q.includes("افضل") || q.includes("احسن") || q.includes("وجبة")) {
                return {
                    text: "أهلاً وسهلاً بك في **شاورما الشامي**! 🥙\n\nأنصحك بشدة بـ **كومبو شاورما الدجاج** بخبز الصاج المحمص مع صلصة الثومية الشامية الأصيلة والبطاطا المقرمشة.\n\nوإذا كنت ترغب باللحم، فـ **كومبو شاورما اللحم** بالبهارات الدمشقية مع الطحينية والبقدونس والبصل بالسماق خيار رائع!\n\nهل تفضل دجاج أم لحم؟",
                    chips: ["🍗 شاورما دجاج", "🥩 شاورما لحم", "👨‍👩‍👧 وجبة عائلية"]
                };
            }
            return {
                text: "أهلاً بك في شاورما الشامي! 🌯\n\nنحن نقدم الشاورما السورية الأصيلة على أصولها في تمبل تيراس، فلوريدا. جميع لحومنا حلال 100%.\n\nيسعدني اقتراح أفضل الوجبات لك، تفضل بالسؤال!",
                chips: ["🔥 الأكثر طلباً", "🍗 شاورما دجاج", "🥩 شاورما لحم", "🥗 مقبلات"]
            };
        }

        // 20. MENU KEYWORD MATCHING
        const matchingItems = MENU.filter(item => 
            q.includes(item.name.toLowerCase()) || 
            q.includes(item.category.toLowerCase())
        );

        if (matchingItems.length > 0) {
            return {
                text: "Here is what we have matching your cravings at Shawerma El Shami! 🥙",
                items: matchingItems.slice(0, 3),
                chips: ["👫 2 People Meal", "🔥 Most Popular", "🧄 What sauces to get?"]
            };
        }

        // 21. SMART RECOVERY FALLBACK (Handles unrecognized typos & gibberish)
        return {
            text: "I didn't quite catch that, but I'm here to help you pick the best food! 🥙\n\nDid you mean to ask about one of these favorites?",
            chips: ["👫 2 People Meal", "🔥 Most Popular", "🍗 Chicken Shawarma", "🥩 Beef Shawarma", "🍟 Combos with Fries", "👨‍👩‍👧 Family Feast"]
        };
    }

    // ==========================================
    // 4. UI CREATION & INJECTION
    // ==========================================
    function initShamiAI() {
        // Create widget markup
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'shamiAiWidget';
        widgetContainer.innerHTML = `
            <!-- Launcher Button -->
            <button id="shamiAiLauncher" class="shami-ai-launcher" aria-label="Open Shami AI Food Assistant">
                <div class="shami-ai-pill">
                    <span class="shami-ai-pill-gold">✨ Need suggestions?</span> Ask Shami AI
                </div>
                <div class="shami-ai-launcher-btn">
                    <span class="shami-ai-launcher-icon">🥙</span>
                    <span class="shami-ai-pulse" aria-hidden="true"></span>
                </div>
            </button>

            <!-- Chat Drawer Window -->
            <div id="shamiAiDrawer" class="shami-ai-drawer" role="dialog" aria-modal="true" aria-label="Shami AI Chat Window">
                <!-- Header -->
                <div class="shami-ai-header">
                    <div class="shami-ai-header-left">
                        <div class="shami-ai-avatar">👨‍🍳</div>
                        <div class="shami-ai-title-wrap">
                            <span class="shami-ai-name">Shami AI <span class="shami-ai-badge">Menu Sommelier</span></span>
                            <span class="shami-ai-subtitle">
                                <span class="shami-ai-status-dot"></span> Online · Authentic Syrian Food Guide
                            </span>
                        </div>
                    </div>
                    <div class="shami-ai-header-actions">
                        <button id="shamiAiResetBtn" class="shami-ai-btn-icon" title="Reset Conversation" aria-label="Reset chat">🔄</button>
                        <button id="shamiAiCloseBtn" class="shami-ai-btn-icon" title="Close" aria-label="Close assistant">✕</button>
                    </div>
                </div>

                <!-- Guardrail Notice -->
                <div class="shami-ai-guard-notice">
                    <span>🥙</span> Dedicated to Shawerma El Shami dish &amp; combo recommendations.
                </div>

                <!-- Messages Stream -->
                <div id="shamiAiMessages" class="shami-ai-messages"></div>

                <!-- Quick Suggestion Chips -->
                <div class="shami-ai-chips-wrap">
                    <div class="shami-ai-chips-label">Quick Suggestions:</div>
                    <div id="shamiAiChips" class="shami-ai-chips-scroll">
                        <button class="shami-ai-chip" data-query="What's your most popular item?">🔥 Most Popular</button>
                        <button class="shami-ai-chip" data-query="Beef or Chicken shawarma?">🥩 Beef vs. Chicken</button>
                        <button class="shami-ai-chip" data-query="What vegetarian options do you have?">🥗 Vegetarian</button>
                        <button class="shami-ai-chip" data-query="What is the family feast?">👨‍👩‍👧 Family Feast</button>
                        <button class="shami-ai-chip" data-query="What sauces should I get?">🧄 Best Sauces</button>
                        <button class="shami-ai-chip" data-query="Give me a spicy suggestion">🌶️ Spicy Picks</button>
                        <button class="shami-ai-chip" data-query="What can I get under $15?">💰 Under $15</button>
                    </div>
                </div>

                <!-- Input Form -->
                <form id="shamiAiForm" class="shami-ai-input-wrap">
                    <input 
                        type="text" 
                        id="shamiAiInput" 
                        class="shami-ai-input" 
                        placeholder="Ask about dishes, combos, sauces..." 
                        autocomplete="off"
                        maxlength="200"
                    />
                    <button type="submit" id="shamiAiSendBtn" class="shami-ai-send-btn" aria-label="Send message">
                        ➤
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(widgetContainer);

        // Elements
        const launcher = document.getElementById('shamiAiLauncher');
        const drawer = document.getElementById('shamiAiDrawer');
        const closeBtn = document.getElementById('shamiAiCloseBtn');
        const resetBtn = document.getElementById('shamiAiResetBtn');
        const form = document.getElementById('shamiAiForm');
        const input = document.getElementById('shamiAiInput');
        const messagesBox = document.getElementById('shamiAiMessages');
        const chipsContainer = document.getElementById('shamiAiChips');

        let isOpen = false;

        // Toggle Drawer
        function toggleDrawer(open) {
            isOpen = typeof open === 'boolean' ? open : !isOpen;
            drawer.classList.toggle('open', isOpen);
            launcher.style.display = isOpen ? 'none' : 'flex';
            if (isOpen) {
                setTimeout(() => input.focus(), 250);
                if (messagesBox.children.length === 0) {
                    sendBotGreeting();
                }
            }
        }

        launcher.addEventListener('click', () => toggleDrawer(true));
        closeBtn.addEventListener('click', () => toggleDrawer(false));

        // Reset Conversation
        resetBtn.addEventListener('click', () => {
            messagesBox.innerHTML = '';
            sendBotGreeting();
        });

        // Close on Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                toggleDrawer(false);
            }
        });

        // Render Bot Greeting
        function sendBotGreeting() {
            renderBotMessage({
                text: "Marhaba & Welcome to **Shawerma El Shami**! 🥙\n\nI'm **Shami AI**, your Syrian culinary assistant. Whether it's your first time or you're looking for the best combo for your hunger level, I'm here to suggest the perfect meal!\n\nWhat are you in the mood for?",
                chips: ["🔥 Most Popular", "🥩 Beef or Chicken?", "🥗 Vegetarian Options", "👨‍👩‍👧 Family Feast", "🧄 Best Sauces"]
            });
        }

        // Render User Message
        function renderUserMessage(text) {
            const msgEl = document.createElement('div');
            msgEl.className = 'shami-ai-msg user';
            msgEl.innerHTML = `
                <div class="shami-ai-msg-bubble">${escapeHTML(text)}</div>
            `;
            messagesBox.appendChild(msgEl);
            scrollToBottom();
        }

        // Render Bot Message with formatting & optional rich cards
        function renderBotMessage(data, isWarning = false) {
            const msgEl = document.createElement('div');
            msgEl.className = 'shami-ai-msg bot';

            let itemsHtml = '';
            if (data.items && data.items.length > 0) {
                itemsHtml = data.items.map(item => `
                    <div class="shami-dish-card">
                        <div class="shami-dish-header">
                            <span class="shami-dish-name">🥙 ${item.name}</span>
                            <span class="shami-dish-price">${item.price}</span>
                        </div>
                        <p class="shami-dish-desc">${item.desc}</p>
                        ${item.tag ? `<span class="shami-dish-tag">${item.tag}</span>` : ''}
                    </div>
                `).join('');
            }

            let actionHtml = '';
            if (data.action) {
                actionHtml = `<a href="${data.action.url}" target="_blank" rel="noopener" class="shami-action-btn">${data.action.label}</a>`;
            }

            let extraHtml = '';
            if (data.extra) {
                extraHtml = `<div style="margin-top: 6px; font-size: 0.8rem; color: #D4A853;">${formatMarkdown(data.extra)}</div>`;
            }

            const formattedText = formatMarkdown(data.text);

            msgEl.innerHTML = `
                <div class="shami-ai-msg-avatar">👨‍🍳</div>
                <div class="shami-ai-msg-bubble ${isWarning ? 'shami-guard-warning' : ''}">
                    ${formattedText}
                    ${itemsHtml}
                    ${extraHtml}
                    ${actionHtml}
                </div>
            `;

            messagesBox.appendChild(msgEl);
            scrollToBottom();

            // Update suggestion chips if provided
            if (data.chips && data.chips.length > 0) {
                updateChips(data.chips);
            }
        }

        // Show Typing Indicator
        function showTypingIndicator() {
            const typingEl = document.createElement('div');
            typingEl.id = 'shamiAiTyping';
            typingEl.className = 'shami-ai-msg bot';
            typingEl.innerHTML = `
                <div class="shami-ai-msg-avatar">👨‍🍳</div>
                <div class="shami-ai-typing">
                    <span></span><span></span><span></span>
                </div>
            `;
            messagesBox.appendChild(typingEl);
            scrollToBottom();
        }

        function removeTypingIndicator() {
            const el = document.getElementById('shamiAiTyping');
            if (el) el.remove();
        }

        function scrollToBottom() {
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }

        // Update Suggestion Chips
        function updateChips(chipList) {
            chipsContainer.innerHTML = '';
            chipList.forEach(text => {
                const btn = document.createElement('button');
                btn.className = 'shami-ai-chip';
                btn.textContent = text;
                btn.setAttribute('data-query', text);
                btn.addEventListener('click', () => {
                    handleUserSubmit(text);
                });
                chipsContainer.appendChild(btn);
            });
        }

        // Process query
        function handleUserSubmit(userText) {
            const cleanText = userText.trim();
            if (!cleanText) return;

            renderUserMessage(cleanText);
            input.value = '';

            showTypingIndicator();

            // Simulate natural AI thinking delay (400 - 700ms)
            setTimeout(() => {
                removeTypingIndicator();

                // 1. STRICT GUARDRAIL CHECK: Off-topic / Python / Tech / Math
                if (isOffTopic(cleanText)) {
                    renderBotMessage({
                        text: getRandomRefusal(),
                        chips: ["🔥 Most Popular", "🍗 Chicken Combo", "🥩 Beef Combo", "🧄 Best Sauces"]
                    }, true);
                    return;
                }

                // 2. FOOD RECOMMENDATION
                const response = generateFoodRecommendation(cleanText);
                renderBotMessage(response);

            }, 450);
        }

        // Form Submit Handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUserSubmit(input.value);
        });

        // Initialize default chips click handler
        chipsContainer.querySelectorAll('.shami-ai-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                handleUserSubmit(btn.getAttribute('data-query'));
            });
        });
    }

    // Basic markdown helper for bold and line breaks
    function formatMarkdown(text) {
        if (!text) return '';
        let escaped = escapeHTML(text);
        // Bold
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Line breaks
        escaped = escaped.replace(/\n\n/g, '<br><br>');
        escaped = escaped.replace(/\n/g, '<br>');
        return escaped;
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Auto-init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShamiAI);
    } else {
        initShamiAI();
    }
})();
