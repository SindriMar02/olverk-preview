/* Ölverk prototype data. Every fact here is harvested from olverk.is on 2026-10-14
   (Shopify products.json, /pages/our-beers, /pages/tours, /pages/opening-hours, /pages/about-us,
   /pages/festival and the 16 menu images). Beer stories are faithful English renderings of their
   own Icelandic text. Nothing is invented: no heat scores, no ratings, no stock counts. */

window.OLVERK = {
  contact: {
    address: 'Breiðumörk 2, 810 Hveragerði',
    phone: '483 3030', tel: '+3544833030',
    email: 'olverk@olverk.is',
    maps: 'https://www.google.com/maps/place/%C3%96lverk+Pizza+%26+Brewery/@63.9975944,-21.1890779,15z',
    instagram: 'https://www.instagram.com/olverkbrugghus/',
    facebook: 'https://www.facebook.com/olverkbrugghus'
  },
  hours: [
    ['Monday', '11:30-22:00'], ['Tuesday', '11:30-22:00'], ['Wednesday', '11:30-22:00'],
    ['Thursday', '11:30-22:00'], ['Friday', '11:30-23:00'], ['Saturday', '11:30-23:00'], ['Sunday', '11:30-22:00']
  ],

  /* The five core cans, each named after a hot spring. ink = sampled off the can's label band. */
  springs: [
    { slug: 'eilifur', box: [0.30944, 0.16278, 0.36111, 0.67278], px: [650, 1211], name: 'Eilífur', style: 'Pilsner', abv: '5,2%', ink: '#C3850E',
      spring: 'Eilífur, Hveragerði',
      story: 'Eilífur in Hveragerði is the people’s geyser, and it erupts fairly regularly with a little help. Golden, with floral fruit drifting through the malt and a clean balance of sweet and bitter. Something for everyone.' },
    { slug: 'graenihver', box: [0.32167, 0.16222, 0.35056, 0.67278], px: [631, 1211], name: 'Grænihver', style: 'Skyr sour', abv: '4,2%', ink: '#355624',
      spring: 'Grænihver, Hveravellir',
      story: 'Grænihver is named for the pale green water you see when you look straight down into it. This light sour is sweet and sour at once, with a little of Hveragerði’s most famous ice lolly and a splash of skyr in the recipe.' },
    { slug: 'litlihver', box: [0.32222, 0.15944, 0.34889, 0.67611], px: [628, 1217], name: 'Litlihver', style: 'Léttöl, dark mild', abv: '2,0%', ink: '#214865',
      spring: 'Litlihver, Brúará in Biskupstungur',
      story: 'Litlihver simmers quietly on the bed of the Brúará river. A dark, full-flavoured light beer in the dark mild style, with roasted caramel and a hint of vanilla. A brewer’s beer for the one who drives home.' },
    { slug: 'raudihver', box: [0.32333, 0.15889, 0.34833, 0.67556], px: [627, 1216], name: 'Rauðihver', style: 'Red ale', abv: '5,5%', ink: '#671C1D',
      spring: 'Rauðihver, Hveravellir',
      story: 'Rauðihver at Hveravellir is a big, clay-red spring that splashes now and then, just to remind you it is there. A full, layered red ale where soft caramel meets lightly toasted malt.' },
    { slug: 'rotandi', box: [0.31611, 0.16056, 0.35556, 0.67556], px: [640, 1216], name: 'Rótandi', style: 'IPA', abv: '6,5%', ink: '#802263',
      spring: 'Rótandi, Hveravellir',
      story: 'Rótandi is a young spring. Coarse sand churns on its floor and turns the water beautifully cloudy, just like this bright IPA. Citrus and tropical fruit on the nose, hops playing against a light body.' }
  ],

  /* Seasonal cans, their own colour posters. Release notes from /pages/our-beers. */
  seasonals: [
    { slug: 'sodi', name: 'Sóði', style: 'Belgian pale ale', abv: '7,0%', season: 'Þorri', note: 'Named after a lively geyser in Haukadalur that spat filthy water when it first erupted, around 1940. Cloudy too, but brewed with spotless water.' },
    { slug: 'katur', name: 'Kátur', style: 'Pastry cream ale', abv: '5,0%', season: 'Easter', note: 'Kátur on Hrafntinnusker erupts almost without pause, a bottomless source of joy. Madagascan cacao husk and coconut give it a fruity chocolate note.' },
    { slug: 'cuexcomate', name: 'Cuexcomate', style: 'Table saison', abv: '4,9%', season: 'Summer', note: 'A dormant geyser in Mexico, ringed by prickly pear. A summer saison with melon and red berries.' },
    { slug: 'hrekkur', name: 'Hrekkur', style: 'Festbier', abv: '6,1%', season: 'Autumn', note: 'An explosion crater born in the 1961 Askja eruption, with no warning at all. Brewed in the German festival style: full of flavour, still light.' },
    { slug: 'gryla', name: 'Grýla', style: 'Winter ale', abv: '5,2%', season: 'Christmas', note: 'The geyser Grýla in Hveragerði and the troll of the same name have both mellowed with age. Malt, cinnamon, pine and orange. Let her warm up a little before drinking.' }
  ],

  menu: {
    note: '12″ pizzas from the wood-fired oven. Every pizza can be made as a calzone.',
    pizzas: [
      { n: 1, is: 'Sósa, ferskur mozzarella, ferskur basil, ólífuolía', en: 'Sauce, fresh mozzarella, fresh basil, olive oil', p: 2850 },
      { n: 2, is: 'Sósa, ostur, skinka, sveppir, þistilhjörtu', en: 'Sauce, cheese, ham, mushrooms, artichokes. Perfect as a calzone', p: 3400 },
      { n: 3, is: 'Sósa, ostur, skinka, ananas', en: 'Sauce, cheese, ham, pineapple', p: 3150 },
      { n: 4, is: 'Sósa, ostur, tvöfalt magn af pepperoni', en: 'Sauce, cheese, double pepperoni', p: 3400 },
      { n: 5, is: 'Sósa, ostur, pepperoni, beikon, piparostur, sterk Gillasósa', en: 'Sauce, cheese, pepperoni, bacon, black pepper cheese, Gilli hot sauce', p: 3600, heat: 2 },
      { n: 6, is: 'Sósa, ostur, beikon, döðlur, gráðostur', en: 'Sauce, cheese, bacon, dates, blue cheese', p: 3450 },
      { n: 7, is: 'Sósa, vegan ostur, vegan mexíkóskt hakk, paprika, nachos flögur, vegan chili mayo, vorlaukur', en: 'Sauce, vegan cheese, Mexican vegan mince, bell pepper, nacho chips, vegan chilli mayo, spring onion', p: 3650, vegan: true },
      { n: 8, is: 'Sósa, ostur, kjúklingur, paprika, rauðlaukur, rjómaostur', en: 'Sauce, cheese, chicken, bell pepper, red onion, cream cheese', p: 3650 },
      { n: 9, is: 'Ölverk pestó, sveppir, vorlaukur, kókosflögur, ferskur chili, íslensk söl, sesamolía', en: 'Ölverk pesto, mushrooms, spring onion, coconut flakes, fresh chilli, Icelandic dulse, sesame oil', p: 3650, vegan: true, nuts: true },
      { n: 10, is: 'Sósa, mozzarella, hráskinka, klettasalat, parmesan, ólífuolía', en: 'Sauce, mozzarella, dry-cured ham, rocket, parmesan, olive oil', p: 3850 },
      { n: 11, is: 'Sósa, ostur, pepperoni, bananar, rjómaostur, mulinn pipar', en: 'Sauce, cheese, pepperoni, banana, cream cheese, crushed black pepper', p: 3450 },
      { n: 12, is: 'Pizza kokksins', en: 'Chef’s choice, with their favourite toppings of the day', p: 3650 },
      { n: 13, is: 'Hvítsósa, ostur, hvítlauksolía, gráðostur, piparostur, brie, rifsberjasulta', en: 'White sauce, cheese, garlic oil, blue cheese, pepper cheese, brie. Redcurrant jelly on the side', p: 3650 },
      { n: 14, is: 'Hvítsósa, ostur, hvítlauksolía, parmesan', en: 'White sauce, cheese, garlic oil, parmesan', p: 2650 },
      { n: 15, is: 'Pizzusósa og ostur', en: 'Sauce, cheese', p: 2650 },
      { n: 16, is: 'Hvítsósa, ostur, brie, gráðostur, valhnetur, perur, vorlaukur, hunang, chiliflögur', en: 'White sauce, cheese, brie, blue cheese, walnuts, pear, spring onion, honey, chilli flakes', p: 3850, heat: 1, nuts: true },
      { n: 17, is: 'Sósa, ostur, chorizo hakk, súrsaður laukur, piparostur, Ölverk chili-hnetu Krisp, lime-svartpipar mayo', en: 'Sauce, cheese, chorizo mince, pickled onion, pepper cheese, Ölverk chilli-nut crisp, lime and black pepper mayo', p: 3850, heat: 1, nuts: true },
      { n: 18, is: 'Hvítsósa, sterk ostablanda, hvítlauksolía, parmesan', en: 'White sauce, spicy cheese blend, garlic oil, parmesan', p: 2850, heat: 2 }
    ],
    snacks: [
      { is: 'Pretzel úr héraði með Ölverk bjórostaídýfu', en: 'Locally baked pretzel with our Ölverk beer cheese dip', p: 1950 },
      { is: 'Zaatar flatbrauð með Ölverk bjórostaídýfu', en: 'Zaatar flatbread with our Ölverk beer cheese dip', p: 1950 },
      { is: 'Ostafylltar brauðstangir með Ölverk pizzusósu', en: 'Cheese-stuffed breadsticks with Ölverk pizza sauce', p: 2450 },
      { is: 'Sterkar ostafylltar brauðstangir með gráðostasósu', en: 'Spicy cheese-stuffed breadsticks with blue cheese sauce', p: 2450, heat: 1 },
      { is: 'Franskar, ein sósa fylgir', en: 'French fries, one sauce included', p: 1250 },
      { is: 'Sætkartöflufranskar, ein sósa fylgir', en: 'Sweet potato fries, one sauce included', p: 1350 }
    ],
    beer: [
      { is: 'Ölverk af krana', en: 'Ölverk on tap, up to eight beers brewed here', p: 1400, from: true },
      { is: 'Bjórsmakk, 4 × 150 ml', en: 'Tasting flight, four Ölverk beers we choose for you', p: 2800 },
      { is: 'Bjórkanna, 1,8 l', en: 'Beer pitcher to share, 1.8 litres', p: 6000, from: true }
    ],
    monthly: { is: 'Íslenski brokkólí draumurinn', en: 'The Icelandic broccoli dream', desc: 'Pizza sauce, cheese, pepperoni, pickled Icelandic broccoli, pepper cheese, hot honey and black pepper', p: 3650 },
    lunch: { when: 'Mon-Fri, 11:30-13:00', items: [
      { en: '12″ pizza with sauce, cheese and two toppings, plus a soft drink', p: 2990 },
      { en: '12″ pizza with sauce, cheese and two toppings, plus 400 ml Ölverk Pils, Red Ale or IPA', p: 3990 }
    ] },
    toppings: 'Extra toppings: vegetables and fruit 350 kr., meat 500 kr.'
  },

  tours: [
    { name: 'Brewery tour', time: '45+ min', price: 4600, desc: 'The story of Ölverk, geothermal brewing in the Hengill area and four Ölverk beers to taste.' },
    { name: 'Tour + pizza feast', time: '90-120 min', price: 7600, desc: 'The brewery tour, then a spread of our most popular menu pizzas.' },
    { name: 'Pizza feast', time: 'For groups', price: 3500, desc: 'A spread of our most popular menu pizzas. No more pizzas than people.' }
  ],

  /* Shop. cat: sosur | gjafir | glos | fatnadur | smavara | gjafakort.
     img: a/shop/<handle>.webp. cut: transparent cutout to stand on colour. tile: tile colour. */
  products: [
    { h: 'gilli-icelandic-hot-sauce-150ml', name: 'Gilli', sub: 'Chipotle. The first Eldtungur sauce', size: '150 ml', p: 1750, cat: 'sosur', cut: 'a/sauces/gilli.webp', ar: 0.277, px: [277, 1000], tile: '#E8821E',
      desc: 'Smoked chipotle. Gilli was the first hot sauce in the Eldtungur line, and it is the one on pizza no. 5.' },
    { h: 'gosi-hot-sauce-150ml', name: 'Gosi', sub: 'Habanero and mango. Sweet and spicy', size: '150 ml', p: 1750, cat: 'sosur', cut: 'a/sauces/gosi.webp', ar: 0.275, px: [275, 1000], tile: '#E9B819',
      desc: 'Sweet and spicy, and one of the most popular sauces in the line.' },
    { h: 'tad-icelandic-hot-sauce-150ml', name: 'Tað', sub: 'Chilli smoked over sheep dung', size: '150 ml', p: 1750, cat: 'sosur', cut: 'a/sauces/tad.webp', ar: 0.273, px: [273, 1000], tile: '#B8742C',
      desc: 'Chilli smoked over sheep dung. Without doubt one of the most mind-blowing sauces in the line.' },
    { h: '0ddur-icelandic-hot-sauce-150ml', name: 'Oddur', sub: 'Extra spicy. The hottest of the five', size: '150 ml', p: 2150, cat: 'sosur', cut: 'a/sauces/oddur.webp', ar: 0.276, px: [276, 1000], tile: '#D8361F',
      desc: 'Handle with caution. All of the heat went into this one, the spiciest of the five Eldtungur sauces.' },
    { h: 'sif-icelandic-hot-sauce-pineapple-curry-5oz-150ml', name: 'Sif', sub: 'Pineapple and curry', size: '150 ml', p: 1750, cat: 'sosur', cut: 'a/sauces/sif.webp', ar: 0.81, px: [810, 1000], tile: '#F0A11C', wide: true,
      desc: 'A nod to the Thai palate. Curry dances with pineapple and chilli in a sauce for dishes that need a little light and heat.' },
    { h: 'krisp-sprengjandi-icelandic-chili-crisp-280gr', name: 'Krisp', sub: 'Icelandic chilli crisp', size: '280 g', p: 2150, cat: 'sosur', img: 'a/shop/krisp-sprengjandi-icelandic-chili-crisp-280gr.webp', cover: true,
      desc: 'Chilli crisp in the Chinese style, packed with flavour. In China it goes on noodles and rice. At Ölverk it goes on pizza no. 17.' },
    { h: 'eldfikja-bjorfikju-chili-sulta', name: 'Eldfíkja', sub: 'Beer-fig chilli jam', size: '130 g', p: 1550, cat: 'sosur', img: 'a/shop/eldfikja-bjorfikju-chili-sulta.webp', cover: true,
      desc: 'The newest Eldtungur product. A beer-fig chilli jam for cheese, burgers and pizza.' },
    { h: 'eldtungur-mixbox-icelandic-hot-sauce-4-x-50ml', name: 'Eldtungur mini pack', sub: 'Four sauces, 4 × 50 ml', size: '4 × 50 ml', p: 4800, cat: 'gjafir', img: 'a/shop/eldtungur-mixbox-icelandic-hot-sauce-4-x-50ml.webp', cover: true,
      desc: 'Taste four Eldtungur sauces, Tað, Gilli, Gosi and Oddur, in a small gift box.' },
    { h: 'eldtungur-hot-sauce-variety-pack-3-x-150ml-large-bottles', name: 'Eldtungur large pack', sub: 'Three sauces, 3 × 150 ml', size: '3 × 150 ml', p: 5800, cat: 'gjafir', img: 'a/shop/eldtungur-hot-sauce-variety-pack-3-x-150ml-large-bottles.webp', cover: true,
      desc: 'Three full-size Eldtungur sauces, Tað, Gosi and Gilli, in one gift box.' },
    { h: 'thirsty-gift-pack-from-olverk-iceland', name: 'Gift pack: Thirsty', sub: '4 beers, glass, sticker', size: 'Gift pack A', p: 4000, cat: 'gjafir', img: 'a/shop/thirsty-gift-pack-from-olverk-iceland.webp', cover: true,
      desc: 'Four 330 ml Ölverk beers, picked at random on each order, with an Ölverk glass and a sticker.' },
    { h: 'gourmet-giftpack-from-olverk-iceland', name: 'Gift pack: Gourmet', sub: 'Beers, glass and Eldtungur sauces', size: 'Gift pack B', p: 6800, cat: 'gjafir', img: 'a/shop/gourmet-giftpack-from-olverk-iceland.webp', cover: true,
      desc: 'Two 330 ml Ölverk beers picked at random, a 330 ml Ölverk glass and Eldtungur sauces.' },
    { h: 'giftcards', name: 'Gift card for two', sub: 'Two pizzas and two drinks at Ölverk', size: 'Gift card', p: 7800, cat: 'gjafakort', img: 'a/shop/giftcards.webp', fit: '#F1EEF5',
      variants: [{ t: 'Two pizzas + two soft drinks', p: 7800 }, { t: 'Two pizzas + two large Ölverk beers', p: 9000 }],
      desc: 'Two 12″ pizzas from the menu and two drinks, plus Ölverk stickers and a key ring.' },
    { h: 'bjorsmakkplatti-beer-flight', name: 'Tasting flight', sub: 'Gift card, 4 × 150 ml at the bar', size: 'Gift card', p: 2800, cat: 'gjafakort', img: 'a/shop/bjorsmakkplatti-beer-flight.webp', cover: true,
      desc: 'A tasting flight of four Ölverk beers, redeemed at the bar in Hveragerði.' },
    { h: 'olverk-beer-glass-330ml', name: 'Ölverk glass', sub: 'For a 330 ml can', size: '330 ml', p: 1500, cat: 'glos', img: 'a/shop/olverk-beer-glass-330ml.webp', cover: true,
      desc: 'The perfect glass for a 330 ml can. Beer not included. In Iceland we say skál.' },
    { h: 'olverk-beer-glass-400ml', name: 'Ölverk glass', sub: 'Go big', size: '400 ml', p: 1600, cat: 'glos', img: 'a/shop/olverk-beer-glass-400ml.webp', cover: true,
      desc: 'The go-big-or-go-home glass. Beer not included.' },
    { h: 'olverk-beer-glass-200ml', name: 'Ölverk glass', sub: 'For the in-betweeners', size: '200 ml', p: 1200, cat: 'glos', img: 'a/shop/olverk-beer-glass-200ml.webp', cover: true,
      desc: 'For when a small glass is too small and a big one is too big. Beer not included.' },
    { h: 'olverk-beer-glass-150-ml', name: 'Ölverk glass', sub: 'The tasting glass', size: '150 ml', p: 1000, cat: 'glos', img: 'a/shop/olverk-beer-glass-150-ml.webp', cover: true,
      desc: 'The sample glass for a tasting at home. Beer not included.' },
    { h: 'olverk-t-shirt-unisex', name: 'Ölverk T-shirt', sub: 'Unisex, organic cotton', size: 'S-3XL', p: 5500, cat: 'fatnadur', img: 'a/shop/olverk-t-shirt-unisex.webp', cover: true,
      variants: ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'].map(t => ({ t, p: 5500 })),
      desc: 'The first official Ölverk T-shirt. 100% organic cotton, climate-neutral fabric.' },
    { h: 'olverk-pizza-shark-t-shirt', name: 'Pizza Shark T-shirt', sub: 'Unisex, organic cotton', size: 'S-3XL', p: 5500, cat: 'fatnadur', img: 'a/shop/olverk-pizza-shark-t-shirt.webp', cover: true,
      variants: [{ t: 'Small', p: 5500 }, { t: 'Medium', p: 5500 }, { t: 'Large', p: 5500 }, { t: 'X-Large', p: 5500 }, { t: 'XX-Large', p: 5500 }, { t: 'XXX-Large', p: 4900 }],
      desc: 'Pizza shark on the front and ICELAND on the side. 100% organic cotton.' },
    { h: 'olverk-cap-flat-bill', name: 'Ölverk cap', sub: 'Flat bill, snapback', size: 'One size', p: 4500, cat: 'fatnadur', img: 'a/shop/olverk-cap-flat-bill.webp', cover: true,
      desc: 'The old-school original. One size, snapback closure, flat bill.' },
    { h: 'olverk-cap-slightly-pre-curved-bill', name: 'Ölverk cap', sub: 'Pre-curved bill, snapback', size: 'One size', p: 4500, cat: 'fatnadur', img: 'a/shop/olverk-cap-slightly-pre-curved-bill.webp', cover: true,
      desc: 'One size, snapback closure, slightly pre-curved bill.' },
    { h: 'olverk-tote-bag', name: 'Ölverk tote bag', sub: 'Organic cotton', size: 'One size', p: 1500, cat: 'fatnadur', img: 'a/shop/olverk-tote-bag.webp', cover: true,
      desc: 'Thick tote in 100% organic cotton (OCS 100). Long handles for the shoulder.' },
    { h: 'olverk-sticker-laufey-elvar', name: 'Sticker: Laufey & Elvar', sub: 'Holographic, 102 × 91 mm', size: 'Sticker', p: 300, cat: 'smavara', img: 'a/shop/olverk-sticker-laufey-elvar.webp', cover: true,
      desc: 'The power couple, holographic. 102 × 91 mm.' },
    { h: 'olverk-holographic-sticker', name: 'Holographic sticker', sub: 'Round, 102 mm', size: 'Sticker', p: 350, cat: 'smavara', img: 'a/shop/olverk-holographic-sticker.webp', cover: true,
      desc: 'Round holographic Ölverk sticker, 102 × 102 mm.' },
    { h: 'olverk-sticker-large', name: 'Logo sticker', sub: 'Round, 102 mm', size: 'Sticker', p: 300, cat: 'smavara', img: 'a/shop/olverk-sticker-large.webp', cover: true,
      desc: 'Black Ölverk logo sticker, 102 × 102 mm.' },
    { h: 'olverk-pin-elvar', name: 'Pin: Elvar', sub: 'Round pinback button', size: 'Pin', p: 200, cat: 'smavara', img: 'a/shop/olverk-pin-elvar.webp', cover: true,
      desc: 'Round pinback button with Elvar on it.' },
    { h: 'olverk-pin-logo', name: 'Pin: logo', sub: 'Round pinback button', size: 'Pin', p: 200, cat: 'smavara', img: 'a/shop/olverk-pin-logo.webp', fit: '#F5F4F9',
      desc: 'Round pinback button with the Ölverk mark.' },
    { h: 'asgardur-starter-sett', name: 'Ásgarður disc golf set', sub: 'Þór, Freyja, Óðinn', size: 'Set', p: 5500, cat: 'smavara', img: 'a/shop/asgardur-starter-sett.webp', cover: true, soldOut: true,
      desc: 'Disc golf starter set from Frisbígolfbúðin: Þór fairway driver, Freyja mid-range, Óðinn putter and a mini marker.' }
  ],
  cats: [
    ['all', 'Everything'], ['sosur', 'Hot sauce'], ['gjafir', 'Gift packs'], ['gjafakort', 'Gift cards'],
    ['glos', 'Glasses'], ['fatnadur', 'Clothing'], ['smavara', 'Pins, stickers & more']
  ]
};
