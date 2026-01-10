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
  "restorist-serum": {
    title: "DermaCo restorist Serum ",
    image: "../../ASSETS/images/products/product13.png",
    description:
      "A lightweight hair serum designed to revive dry, damaged hair and restore its natural shine. Powered by Abyssinian Oil and a Fermented Hair Complex, it deeply nourishes, smoothens frizz, and improves hair strength without weighing it down. Regular use helps make hair softer, healthier, and more manageable with a glossy finish.",
    ingredients: [
      "Sweet Almond Oil: Softens hair and enhances smoothness while reducing dryness.",
      "Argan Oil: Rich in essential fatty acids that help repair damage, reduce frizz, and boost shine.",
      "Green Tea Seed Oil: Provides antioxidant protection and supports scalp and hair health.",
      "Tocopheryl Acetate (Vitamin E): Protects hair from oxidative damage and improves overall hair vitality.",
      "Butylated Hydroxytoluene (BHT): Antioxidant that helps maintain formula stability."

    ],
    bestFor: ["All hair types"],
    concerns: [
      "Damaged Hair"
    ],
    size: "50 ml",
    treatments: ["hair"]
  },
  "restorist-conditioner": {
    title: "DermaCo restorist conditioner ",
    image: "../../ASSETS/images/products/product14.png",
    description:
      "DermaCo Restorist Conditioner deeply nourishes and softens dry, damaged hair while reducing breakage and boosting shine. Powered by Abyssinian Oil, Fermented Hair Complex, Hydrolyzed Pea Protein, and Shea Butter, it delivers intense moisture, strengthens hair fibers, and restores smoothness for healthier-looking hair.",
    ingredients: [
      "Shea Butter: Deeply moisturizes and softens dry hair while protecting against damage and frizz.",
      "Panthenol (Pro-Vitamin B5): Hydrates hair, improves smoothness, and adds a healthy-looking shine.",
      "Sunflower Seed Oil: Helps lock in moisture and protects hair from environmental stressors.",
      "Guar Conditioning Agents (Guar Hydroxypropyltrimonium Chloride): Improve manageability, detangling, and smoothness."

    ],
    bestFor: ["All hair types"],
    concerns: [
      "Dull Hair","Dry Hair","Damaged Hair","Frizzy Hair","Lack Of Shine"
    ],
    size: "200 ml",
    treatments: ["hair"]
  },
  "restorist-shampoo": {
    title: "DermaCo restorist shampoo",
    image: "../../ASSETS/images/products/product15.png",
    description:
      "Revive dry and damaged hair with DermaCo Restorist Hair Shampoo. This sulfate- and silicone-free formula gently cleanses while restoring lost moisture and strength. Powered by Abyssinian Oil and a Fermented Hair Complex, it helps nourish the scalp, reinforce weak strands, and improve overall hair texture. Hair feels softer, healthier, and visibly revitalized with every wash—without weighing it down.",
    ingredients: [
      "Vitamin B5 (Panthenol): Provides long-lasting hydration, smoothens hair texture, and enhances shine while reducing dryness.",
      "Glycerin & Propylene Glycol: Humectants that attract and retain moisture, keeping hair soft and hydrated..",
      "Linseed & Chia Seed Extracts: Help strengthen hair structure and improve hair elasticity and smoothness.",
      "Citric Acid & EDTA: Help maintain product stability and support scalp-friendly pH balance."

    ],
    bestFor: ["All hair types"],
    concerns: [
      "Dull Hair","Dry Hair","Damaged Hair","Frizzy Hair"
    ],
    size: "250 ml",
    treatments: ["hair"]
  },
  "restorist-shampoo": {
    title: "DermaCo 3% Redensyl, 4% Anagain & 5% Capilia Stem Cell Complex Advanced Hair Growth Serum",
    image: "../../ASSETS/images/products/product16.png",
    description:
      "Advanced Hair Growth Serum 2.0 is a clinically tested formula proven to promote new hair growth in just 28 days. Powered by 3% Redensyl, 4% Anagain, and 5% Capilia Stem Cell Complex, it helps rebalance the hair growth cycle to reduce hair fall and support thicker, fuller-looking hair. Enhanced with 12 advanced hair growth boosters and penetration enhancers, this lightweight serum delivers faster, deeper results for visibly healthier hair.",
    ingredients: [
      "Redensyl (3%): A clinically proven hair growth active that helps reactivate hair follicles and reduce hair fall.",
      "Anagain (4%): Supports the natural hair growth cycle by stimulating hair roots and promoting denser hair.",
      "Capilia Stem Cell Complex (5%): Strengthens hair follicles and helps improve hair thickness and vitality.",
      "Korean Black Rice Extract: Rich in antioxidants that nourish the scalp and support stronger, healthier hair growth."

    ],
    bestFor: ["All hair types"],
    concerns: [
      "Dull Hair","Dry Hair","Damaged Hair","Frizzy Hair"
    ],
    size: "250 ml",
    treatments: ["hair"]
  },
  "Brightening-Serum": {
    title: "DermaCo Fade Away Brightening Serum",
    image: "../../ASSETS/images/products/product18.png",
    description:
      "A gentle brightening serum with Alpha Arbutin, Kojic Acid & Licorice Root that visibly reduces dark spots and evens skin tone—without irritation.",
    ingredients: [
      "Kojic Acid – Targets uneven tone and stubborn marks",
      "Alpha Arbutin – Helps reduce excess melanin to visibly fade dark spots and pigmentation",
      "Red Algae Extract – Helps protect skin from UV-induced pigmentation.",
      

    ],
    bestFor: ["Oily Skin","Combination Skin","Normal Skin"],
    concerns: [
      "Dull Skin","Age spots","Uneven skin tone","Dark Spots","Pigmentation"
    ],
    size: "50 ml",
    treatments: ["brightening"]
  },
  "Brightening-duo": {
    title: "DermaCo Brighten and Smooth Duo",
    image: "../../ASSETS/images/products/product19.png",
    description:
      "A powerful day-and-night regimen designed to visibly brighten skin, smooth texture, and refine pores. The Vitamin C serum works during the day to boost radiance and even out skin tone, while the Glycolic Acid cream renews skin overnight by gently exfoliating and improving texture. With consistent use, skin looks clearer, smoother, and more luminous in as little as 100 days.",
    ingredients: [
      "Glow Maker (Vitamin C Serum) – L-Ascorbic Acid (15% Vitamin C), Vitamin E, Ferulic Acid, Hyaluronic Acid, Aloe Vera Extract, Vitis Vinifera (Grape) Extract, Magnolia Extract",
      "Night Renewer (Glycolic Acid Cream) – Glycolic Acid (10%)"
      

    ],
    bestFor: ["Dry Skin"],
    concerns: [
      "Dark Spots","Pigmentation"
    ],
    size: "50 ml , 100ml",
    treatments: ["brightening"]
  },
  "Brightening-BHA-serum": {
    title: "DermaCo Super Smooth AHA + BHA Resurfacing Serum",
    image: "../../ASSETS/images/products/product20.png",
    description:
      "Super Smooth gently resurfaces skin to reduce texture, bumps, and visible pores—without irritation. Powered by mild exfoliating acids and a skin-smoothing peptide, it clears buildup and refines skin texture, leaving your skin visibly smoother, brighter, and more even with regular use.",
    ingredients: [
      "Perfection Peptide P3 (Hexanoyl Dipeptide-3 Norleucine Acetate) – Gently loosens dead skin cells to enable safer, more comfortable exfoliation without irritation",
      "Lactic Acid – Smooths rough texture and improves skin clarity by exfoliating the skin’s surface",
      "Glycolic Acid – Refines skin texture and boosts radiance by removing built-up dead skin cells",
      "Hyaluronic Acid – Hydrates and plumps skin, reducing the risk of irritation and tightness"
    ],
    bestFor: ["Dry Skin"],
    concerns: [
      "Dark Spots","Pigmentation"
    ],
    size: "30 ml",
    treatments: ["facial"]
  },


};