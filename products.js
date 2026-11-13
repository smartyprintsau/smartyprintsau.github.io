/* ============================================================
   SMARTY PRINTS - shop details and product list
   Edit this file to change what the website shows.
   - price: a number in AUD, or null for "Ask for a quote"
   - from: true shows "from $x"
   - unit: small words after the price, e.g. "each"
   - img: put a photo in the images folder and write e.g. "images/first-then.jpg"
          (until then a drawn picture is shown, chosen by "icon")
   ============================================================ */
window.SHOP = {
  key: "smarty",
  name: "Smarty Prints",
  email: "smartyprintsau@gmail.com",
  minOrder: 15,
  notePlaceholder: "Name, words or colours you'd like",
  socials: [
    { name: "Instagram", handle: "@smartyprintsau", url: "https://www.instagram.com/smartyprintsau/" },
    { name: "Facebook", handle: "", url: "" },   /* paste your Page link here */
    { name: "TikTok", handle: "", url: "" },     /* e.g. https://www.tiktok.com/@smartyprintsau */
    { name: "Etsy", handle: "", url: "" }        /* paste your Etsy shop link here */
  ],
  allBlurb: "Everything is designed and 3D printed by us in Queensland, and made to order with your names, words and colours.",
  categories: [
    { id: "visual", name: "Visual supports", blurb: "Picture routine boards for kids with autism, ADHD and additional needs. The tiles slot into little pockets, so you can change the routine every day." },
    { id: "learning", name: "Home-school & learning", blurb: "Hands-on maths, literacy and play pieces for home-schoolers, classrooms and therapy rooms." },
    { id: "classroom", name: "Classroom & school", blurb: "Name plates, tags, labels and signs to get a classroom, home-school room or school bag sorted." },
    { id: "garden", name: "Garden & outdoors", blurb: "Plant stakes and hang tags, with cute pictures of over 100 veggies, herbs, fruits and flowers." },
    { id: "gifts", name: "Gifts & keyrings", blurb: "Personalised teacher gifts, baby keepsakes and keyrings." },
    { id: "digital", name: "Printables", blurb: "Instant printable PDF sets to print and cut at home. For personal and classroom use." }
  ]
};

window.PRODUCTS = [
  /* ---------- Visual supports ---------- */
  { id: "first-then", cat: "visual", icon: "firstthen", badge: "Start here", name: "First / Then board", price: 32, desc: "A simple 'first this, then that' board to make transitions easier. Includes 6 picture tiles and your child's name across the top.", tags: ["Personalised", "6 tiles", "Magnetic option"] },
  { id: "choice", cat: "visual", icon: "choice", name: "Choice board", price: 45, desc: "An 'I want…' board with 8 picture tiles so your child can point to show what they'd like.", tags: ["Personalised", "8 tiles"] },
  { id: "routine", cat: "visual", icon: "strip", name: "Routine strip board", price: 55, desc: "Morning, bedtime or school-day steps in order, across or down. Includes 10 picture tiles.", tags: ["Personalised", "10 tiles", "Across or down"] },
  { id: "weekly", cat: "visual", icon: "weekly", name: "Weekly planner board", price: 95, desc: "Monday to Sunday with room for 30 picture tiles. Great for therapy days, school days and visits.", tags: ["Personalised", "30 tiles"] },
  { id: "token", cat: "visual", icon: "token", name: "Reward token board", price: null, desc: "Earn the stars, then get the reward. Round star tokens slot into the board, and there's a pocket for the reward picture.", tags: ["Personalised"] },
  { id: "feelings", cat: "visual", icon: "feelings", name: "Feelings board", price: null, desc: "A 'how am I feeling?' board with a feelings thermometer and picture tiles.", tags: ["Personalised"] },
  { id: "tiles", cat: "visual", icon: "tiles", name: "Extra picture tiles", price: 2.5, unit: "each", desc: "Choose from over 150 cute pictures: meals, toileting, chores, feelings, places, pets, sensory and more. Pick the word on each tile.", tags: ["150+ pictures", "Raised & braille options"] },
  { id: "board-magnets", cat: "visual", icon: "custom", name: "Fridge magnets add-on", price: 8, desc: "Sealed magnets printed inside the board so it sticks to the fridge. Tile magnets are also available.", tags: ["Add-on"] },

  /* ---------- Home-school & learning ---------- */
  { id: "ten-frame", cat: "learning", icon: "tenframe", name: "Ten frame & counters", price: 14, desc: "A sturdy ten frame with counters for early number sense. A double ten frame is also available ($22).", tags: ["Maths"] },
  { id: "clock", cat: "learning", icon: "clock", name: "Learning clock", price: 34, desc: "A clock face with moving hands to learn to tell the time.", tags: ["Maths", "Moving hands"] },
  { id: "tangram", cat: "learning", icon: "tangram", name: "Tangram puzzle", price: 18, desc: "The classic 7-piece shape puzzle for problem solving and geometry.", tags: ["Maths", "Puzzle"] },
  { id: "geoboard", cat: "learning", icon: "geoboard", name: "Geoboard", price: 26, desc: "Stretch rubber bands over the pegs to make shapes, angles and patterns.", tags: ["Maths"] },
  { id: "base-ten", cat: "learning", icon: "baseten", name: "Base-ten blocks", price: 32, desc: "Ones, tens and hundreds to see place value.", tags: ["Maths"] },
  { id: "fractions", cat: "learning", icon: "fractions", name: "Fraction circles", price: 9, from: true, desc: "Pieces that fit together to make a whole. A fraction wall is also available.", tags: ["Maths"] },
  { id: "number-line", cat: "learning", icon: "numberline", name: "Number line", price: 16, desc: "A hands-on number line for counting on, counting back and skip counting.", tags: ["Maths"] },
  { id: "dominoes", cat: "learning", icon: "dominoes", name: "Dominoes (28 set)", price: 39, desc: "A full double-six set for counting, matching and family game night.", tags: ["Game"] },
  { id: "name-puzzle", cat: "learning", icon: "puzzle", badge: "Personalised", name: "Name puzzle", price: 35, desc: "Your child's name as lift-out letters in a tray. Lovely for learning to spell their name.", tags: ["Literacy", "Personalised"] },
  { id: "tracing", cat: "learning", icon: "letters", name: "Letter tracing board", price: 29, desc: "Finger-tracing grooves to practise letter formation. Single tracing tiles are $6 each.", tags: ["Literacy", "Sensory"] },
  { id: "letter-tiles", cat: "learning", icon: "letters", name: "Letter & number tiles", price: 1.4, unit: "each", desc: "Alphabet, numbers and phonics tiles. Sight-word tiles are $1.80 each.", tags: ["Literacy", "Magnetic option"] },
  { id: "spelling", cat: "learning", icon: "puzzle", name: "Picture spelling board", price: 12, desc: "A picture with spaces to build the word, with its own letter tiles.", tags: ["Literacy"] },
  { id: "match", cat: "learning", icon: "tiles", name: "Memory pairs & alphabet match-up", price: 4, from: true, unit: "a pair", desc: "Matching games for memory, letters and sounds. Counting cards are $3 each.", tags: ["Game", "Literacy"] },
  { id: "xo", cat: "learning", icon: "xo", name: "Noughts & crosses", price: 26, desc: "A travel-friendly noughts and crosses game.", tags: ["Game"] },

  /* ---------- Classroom & school ---------- */
  { id: "desk-plate", cat: "classroom", icon: "deskplate", name: "Desk name plate", price: 22, desc: "A name plate for a desk or home-school table. Add a stand for $6.", tags: ["Personalised", "9 designs"] },
  { id: "door-sign", cat: "classroom", icon: "doorsign", name: "Classroom door sign", price: 45, desc: "A hanging sign for the classroom, home-school room or bedroom door.", tags: ["Personalised"] },
  { id: "bag-tag", cat: "classroom", icon: "tag", name: "School bag tag", price: 14, desc: "A tough name tag with a strap slot for school bags.", tags: ["Personalised"] },
  { id: "pencil-tag", cat: "classroom", icon: "tag", name: "Pencil case tag", price: 9, desc: "A small zip tag so pencil cases come home.", tags: ["Personalised"] },
  { id: "cubby-tag", cat: "classroom", icon: "label", name: "Cubby & locker tag", price: 8.5, desc: "Name tags for cubbies, lockers and hooks.", tags: ["Personalised", "Magnetic option"] },
  { id: "drawer-label", cat: "classroom", icon: "label", name: "Drawer & tub label", price: 7.5, desc: "Labels with a picture and word for drawers, tubs and trays.", tags: ["Picture + word"] },
  { id: "basket-label", cat: "classroom", icon: "label", name: "Basket label", price: 9.5, desc: "Labels with ribbon slots for baskets.", tags: ["Picture + word"] },
  { id: "reward-tokens", cat: "classroom", icon: "token", name: "Reward tokens", price: 1.8, unit: "each", desc: "Stars, ticks and fun shapes for reward systems.", tags: ["Magnetic option"] },
  { id: "stamp", cat: "classroom", icon: "stamp", name: "Teacher stamp", price: 26, desc: "A personalised stamp: 'Checked by Miss Smith', 'Great work!' and more. Round or oblong.", tags: ["Personalised"] },

  /* ---------- Garden & outdoors ---------- */
  { id: "plant-stake", cat: "garden", icon: "stake", badge: "Popular gift", name: "Plant stake", price: 6.5, unit: "each", desc: "A garden stake with your plant's name and a cute picture. Over 100 veggies, herbs, fruits and flowers to choose from. 10% off 6+, 15% off 12+.", tags: ["5 shapes", "700+ pictures"] },
  { id: "plant-tag", cat: "garden", icon: "gardentag", name: "Plant hang tag", price: 5, unit: "each", desc: "A hanging tag for pots, fruit trees and climbers.", tags: ["Picture + name"] },
  { id: "garden-sets", cat: "garden", icon: "stake", name: "Garden label sets", price: 35, from: true, desc: "Ready-made sets like Herb garden (6), Veggie patch (10) and Kids' first garden (4).", tags: ["Gift idea"] },
  { id: "garden-magnet", cat: "garden", icon: "gardentag", name: "Fridge magnet plant labels", price: 9.5, unit: "each", from: true, desc: "Plant labels with sealed magnets - handy for seed tins and the fridge.", tags: ["Magnetic"] },

  /* ---------- Gifts & keyrings ---------- */
  { id: "teacher-gift", cat: "gifts", icon: "stake", name: "Teacher gift plant stake", price: 8, from: true, desc: "'Thanks for helping me grow' and other teacher gift wordings with the teacher's and child's names.", tags: ["Personalised", "Gift wrap $5"] },
  { id: "bookmark", cat: "gifts", icon: "bookmark", name: "Personalised bookmark", price: 14, desc: "A name bookmark with a tassel hole.", tags: ["Personalised"] },
  { id: "keyring", cat: "gifts", icon: "tag", name: "Name keyring", price: 12, desc: "A name keyring in your choice of colours and shapes.", tags: ["Personalised"] },
  { id: "plate-keyring", cat: "gifts", icon: "keychain", name: "Number plate keyring", price: 12, from: true, desc: "A mini number plate keyring with your name or word. Lots of colour styles, plus picture and scene options. 10% off 3+.", tags: ["Personalised", "Gift idea"] },
  { id: "milestone", cat: "gifts", icon: "milestone", name: "Baby milestone discs", price: 4.5, unit: "each", desc: "Monthly milestone discs for baby photos.", tags: ["Baby"] },
  { id: "birth-plaque", cat: "gifts", icon: "plaque", name: "Birth announcement plaque", price: 32, desc: "Baby's name, date, weight and time on a keepsake plaque.", tags: ["Personalised", "Baby"] },

  /* ---------- Printables ---------- */
  { id: "printables", cat: "digital", icon: "pdf", name: "Printable picture cards (PDF)", price: 7.95, desc: "Printable visual cards, labels and learning sets to print and cut at home. Sent as a digital file.", tags: ["Digital download", "A4"] }
];
