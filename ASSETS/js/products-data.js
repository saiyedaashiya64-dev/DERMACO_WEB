/* ===============================
   PRODUCT DATA (Dynamic)
   =============================== */

const PRODUCTS = {

  "toner-purifying": {
    title: "DermaCo Purifying Toner (Alcohol-Free)",
    image: "../../ASSETS/images/products/product1.png",
    description:
      "Designed for oily and acne-prone skin, this alcohol-free toner gently cleanses pores and refines skin texture without drying.",
    ingredients: [
      "Niacinamide – Minimizes pores and improves skin tone",
      "Mandelic Acid – Gentle exfoliation for smoother skin",
      "Botanical Extracts – Calm and refresh the skin"
    ],
    bestFor: ["Oily Skin", "Combination Skin", "Acne-prone Skin"],
    concerns: ["Acne", "Oily Skin", "Large Pores"],
    size: "100 ml",
    treatments: ["acne", "acne-scar"]

  },

  "cleansing-gel": {
    title: "DermaCo Soothing Cleansing Gel",
    image: "../../ASSETS/images/products/product2.png",
    description:
      "A gentle soap-free gel cleanser suitable for daily use. Cleanses without stripping and maintains hydration.",
    ingredients: [
      "Niacinamide – Supports skin barrier",
      "Glycerin – Long-lasting hydration",
      "Mild Cleansing Agents – Remove impurities gently"
    ],
    bestFor: ["All Skin Types", "Sensitive Skin"],
    concerns: ["Dehydration", "Dullness", "Clogged Pores"],
    size: "50 ml",
    treatments: ["acne", "acne-scar"]
  },

  "scrub-vitc": {
    title: "DermaCo Salicylic Acid Vit C Scrub",
    image: "../../ASSETS/images/products/product3.png",
    description:
      "A gentle exfoliating scrub that unclogs pores, controls oil, and helps reduce acne and marks.",
    ingredients: [
      "Salicylic Acid – Unclogs pores",
      "Vitamin C – Reduces acne marks",
      "CICA – Soothes irritated skin",
      "Witch Hazel – Controls oil"
    ],
    bestFor: ["Oily Skin", "Combination Skin"],
    concerns: ["Acne", "Blemishes", "Excess Oil"],
    size: "100 ml",
    treatments: ["acne", "acne-scar"]
  },

  "spot-serum": {
    title: "DermaCo Spot On Spot Gone Serum",
    image: "../../ASSETS/images/products/product4.png",
    description:
      "A fast-acting spot treatment that targets active acne, reduces redness, and prevents future breakouts.",
    ingredients: [
      "Salicylic Acid – Clears clogged pores",
      "Glycolic Acid – Mild exfoliation",
      "Zinc PCA – Controls oil",
      "Tea Tree – Antibacterial action"
    ],
    bestFor: ["Acne-prone Skin"],
    concerns: ["Active Acne", "Clogged Pores"],
    size: "8 ml",
    treatments: ["acne", "acne-scar"]
  },
  /* ===== ADD BELOW YOUR EXISTING PRODUCTS ===== */

  "cleansing-balm": {
    title: "Barrier Renew Cleansing Balm",
    image: "../../ASSETS/images/products/product5.png",
    description:
      "A gentle yet effective cleansing balm that melts away makeup and impurities while protecting the skin barrier.",
    ingredients: [
      "5 Ceramides – Strengthen and restore skin barrier",
      "Algae Extract – Antioxidant hydration",
      "Macadamia Nut Oil – Nourishes and softens skin",
      "CICA Oil – Soothes and repairs barrier"
    ],
    bestFor: ["Acne-prone Skin", "Sensitive Skin"],
    concerns: ["Skin Barrier Damage", "Wrinkles", "Ageing"],
    size: "110 ml",
    treatments: ["anti-age"]
  },

  "collagen-peptides": {
    title: "Nutra+ Collagen Peptides",
    image: "../../ASSETS/images/products/product6.png",
    description:
      "Orange-flavored collagen supplement that supports skin elasticity, hair, nails, and joint health.",
    ingredients: [
      "Hydrolyzed Marine Collagen – Improves elasticity",
      "Hyaluronic Acid – Deep hydration",
      "Glutathione – Brightens skin",
      "Biotin – Strengthens hair & nails",
      "Vitamin C & E – Antioxidant support"
    ],
    bestFor: ["All Skin Types"],
    concerns: ["Wrinkles", "Loss of Firmness", "Low Collagen"],
    size: "270 gm",
    treatments: ["anti-age"]
  },

  "dreamy-glow-serum": {
    title: "Dreamy Glow Serum",
    image: "../../ASSETS/images/products/product7.png",
    description:
      "Advanced serum with Alpha Arbutin and Tranexamic Acid to visibly reduce pigmentation and dark spots.",
    ingredients: [
      "Alpha Arbutin 2% – Reduces pigmentation",
      "Tranexamic Acid 3% – Evens skin tone"
    ],
    bestFor: ["Oily Skin", "Normal Skin"],
    concerns: ["Dark Spots", "Pigmentation"],
    size: "100 ml",
    treatments: ["anti-age"]
  },

  "stemness-cream": {
    title: "Derma Stemness Restoring Cream",
    image: "../../ASSETS/images/products/product8.png",
    description:
      "Anti-ageing cream with plant stem cell technology that firms, tightens, and protects skin.",
    ingredients: [
      "Argan Stem Cell Extract – Skin renewal",
      "UVA & UVB Filters – Sun protection"
    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Fine Lines",
      "Wrinkles",
      "Sagging Skin",
      "Age Spots",
      "Advanced Ageing"
    ],
    size: "100 gm",
    treatments: ["anti-age"]
  },
  "RetinoBoost-Face-Serum": {
    title: "DermaCo RetinoBoost Face Serum",
    image: "../../ASSETS/images/products/product9.png",
    description:
      "DermaCo RetinoBoost Face Serum is a powerful anti-ageing serum formulated to visibly reduce fine lines and wrinkles while improving skin firmness. Enriched with Retinol, Matrixyl 3000, and Niacinamide, it boosts collagen, smoothens skin texture, and restores a youthful, tighter appearance with regular use. Suitable for a complete day & night skincare routine.",
    ingredients: [
      "Retinol: Helps reduce fine lines and wrinkles by boosting cell turnover and improving skin texture.",
      "Matrixyl 3000: A powerful peptide that supports collagen production, improving skin firmness and elasticity.",
      "Niacinamide: Strengthens the skin barrier, evens skin tone, and helps reduce signs of ageing."
    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Wrinkles",
      "Uneven skin tone",
      "Ageing skin",
      "Dryness"
    ],
    size: "30 ml",
    treatments: ["anti-wrinkle"]
  },
  "Stemness-Restoring-Serum": {
    title: "DermaCo Stemness Restoring Serum",
    image: "../../ASSETS/images/products/product10.png",
    description:
      "A lightweight, oil-free serum powered by Argan plant stem cells to boost skin regeneration and repair. It helps firm, tighten, and rejuvenate skin for a youthful, radiant appearance. Dermatologically tested and free from parabens, sulphates, fragrance, silicones, and oils. Suitable for all skin types.",
    ingredients: [
      "Argan Plant Stem Cells: Help protect and reinforce the skin’s regenerative cells, supporting repair, firmness, and youthful skin renewal.",
      "Advanced Liposome Technology: Enhances deep penetration of active ingredients, allowing them to reach hard-to-target regenerative skin cells and accelerate natural repair.",

    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Wrinkles",
      "Ageing skin",
      "Dryness",
      "Fine lines",
      "Age spots",
      "Sagging skin",
      "Advanced signs of ageing",
      "Hydration"
    ],
    size: "30 ml",
    treatments: ["anti-wrinkle"]
  },
  "eye-gel": {
    title: "DermaCo Lighten & Smooth Under Eye Gel",
    image: "../../ASSETS/images/products/product11.png",
    description:
      "lighten & Smooth Under Eye Gel is designed to hydrate, brighten, and care for delicate under-eye skin. Powered with Haloxyl™, it helps reduce dark circles, improve blood circulation, and minimize under-eye discoloration. The lightweight gel delivers deep hydration, making the skin look smoother, firmer, and more youthful with regular use. Suitable for all skin types.",
    ingredients: [
      "Haloxyl™: An advanced under-eye complex that helps reduce dark circles by improving blood circulation, reducing iron accumulation, and dissolving pigments that cause under-eye darkening. It also supports a brighter, smoother, and more refreshed eye area."

    ],
    bestFor: ["Oily Skin","Combination Skin","Dry Skin","Normal Skin"],
    concerns: [
      "Fine lines and wrinkles under eye","Puffiness","Discoloration","Dark circles"
    ],
    size: "15 ml",
    treatments: ["eye-circle"]
  },
  "eye-serum": {
    title: "DermaCo Brightening & Firming Eye Serum ",
    image: "../../ASSETS/images/products/product12.png",
    description:
      "A lightweight, fast-absorbing under-eye serum that brightens, tightens, and hydrates delicate under-eye skin. Helps reduce the appearance of dark circles, puffiness, fine lines, and under-eye bags while improving firmness and radiance. Powered by a synergistic blend of soy & rice peptides with seaweed extracts, it boosts circulation, reduces water loss, and soothes tired eyes for an even-toned, refreshed, and youthful-looking under-eye area. Suitable for all skin types and dermatologically tested.",
    ingredients: [
      "Soy Peptides: Help improve skin firmness and elasticity while supporting smoother, tighter under-eye skin.",
      "Rice Peptides: Aid in brightening the under-eye area and reducing the appearance of fine lines and wrinkles.",
      "Seaweed Extracts: Help reduce puffiness, detoxify the skin, and improve hydration while soothing tired under-eyes.",
      "Botanical Extracts: Provide multi-action benefits by calming inflammation, reducing under-eye bags, and promoting a youthful appearance."

    ],
    bestFor: ["Oily Skin","Combination Skin"],
    concerns: [
      "Fine lines and wrinkles under eye","Puffiness","Discoloration","Dark circles"
    ],
    size: "10 ml",
    treatments: ["eye-circle"]
  },


};