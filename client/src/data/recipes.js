export const recipesData = [
    {
        id: 1,
        title: 'Golden Turmeric Latte',
        category: 'Elixirs',
        image: 'https://images.unsplash.com/photo-1623595560668-3ac045e771c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '5 min',
        difficulty: 'Easy',
        rating: 4.8,
        dosha: ['Vata', 'Kapha'],
        elements: ['Fire', 'Earth'],
        tags: ['Immunity', 'Calming'],
        calories: 120,
        description: 'A warm, healing drink to soothe inflammation and ground the nervous system.',
        ingredients: [
            '1 cup almond milk (or milk of choice)',
            '1/2 tsp turmeric powder',
            '1/4 tsp cinnamon',
            '1/4 tsp ginger powder',
            'Pinch of black pepper (activates turmeric)',
            '1 tsp honey or maple syrup',
            '1/2 tsp coconut oil (optional)'
        ],
        instructions: [
            'Pour the milk into a small saucepan and heat over medium/low heat.',
            'Add the turmeric, cinnamon, ginger, and black pepper. Whisk constantly as the milk warms.',
            'Once hot (but not boiling), remove from heat.',
            'Stir in the coconut oil and sweetener of your choice.',
            'Pour into a mug and sprinkle with a little extra cinnamon. Enjoy warm!'
        ],
        benefits: 'Turmeric is tridoshic but especially good for balancing Kapha and Vata due to its warming and drying qualities. It reduces inflammation, aids digestion, and boosts immunity.'
    },
    {
        id: 2,
        title: 'Cooling Cucumber & Mint Salad',
        category: 'Lunch',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '10 min',
        difficulty: 'Easy',
        rating: 4.9,
        dosha: ['Pitta'],
        elements: ['Water', 'Air'],
        tags: ['Cooling', 'Hydrating'],
        calories: 180,
        description: 'The perfect antidote to summer heat or internal fire. Reduces acidity.',
        ingredients: [
            '2 cups cucumber, diced',
            '1/4 cup fresh mint leaves, chopped',
            '2 tbsp lime juice',
            '1 tbsp olive oil',
            'Pinch of rock salt (Himalayan)',
            '1 tbsp toasted sunflower seeds'
        ],
        instructions: [
            'Wash and dye the cucumber into bite-sized cubes.',
            'In a bowl, toss the cucumber with the lime juice, olive oil, and salt.',
            'Gently fold in the chopped mint leaves.',
            'Garnish with toasted sunflower seeds for crunch.',
            'Serve immediately to maintain freshness.'
        ],
        benefits: 'Cucumber and mint are classic cooling foods (Sheetavirya). They pacify excess Pitta dosha, reduce internal heat, and hydrate the tissues.'
    },
    {
        id: 3,
        title: 'Spiced Mung Bean Ichari',
        category: 'Dinner',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '40 min',
        difficulty: 'Medium',
        rating: 5.0,
        dosha: ['Tridoshic'],
        elements: ['Earth', 'Fire', 'Air'],
        tags: ['Detox', 'Digestion'],
        calories: 320,
        description: 'The ultimate Ayurvedic detox meal. Easy to digest and balancing for all.',
        ingredients: [
            '1 cup yellow mung dal (split)',
            '1/2 cup basmati rice',
            '1 tbsp ghee',
            '1 tsp cumin seeds',
            '1 tsp mustard seeds',
            '1/2 tsp turmeric',
            '1 inch fresh ginger, grated',
            '4 cups water',
            'Salt to taste',
            'Fresh cilantro for garnish'
        ],
        instructions: [
            'Rinse the mung dal and rice together until the water runs clear.',
            'In a pot, heat the ghee over medium heat. Add cumin and mustard seeds until they pop.',
            'Add the grated ginger and turmeric, sautéing for 30 seconds.',
            'Stir in the rinsed dal and rice, coating them with the spices.',
            'Add water and bring to a boil. Reduce heat to low, cover, and simmer for 25-30 minutes until soft.',
            'Add salt to taste and garnish with fresh cilantro.'
        ],
        benefits: 'Kitchari is considered the perfect food in Ayurveda. It provides a complete protein, is easy to digest, and cleanses the digestive tract while nourishing all tissues.'
    },
    {
        id: 4,
        title: 'Roasted Root Vegetable Bowl',
        category: 'Dinner',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '45 min',
        difficulty: 'Medium',
        rating: 4.7,
        dosha: ['Vata'],
        elements: ['Earth', 'Fire'],
        tags: ['Grounding', 'Nutrient-Dense'],
        calories: 450,
        description: 'Sweet potatoes, carrots, and beets roasted with warming spices.',
        ingredients: [
            '2 sweet potatoes, cubed',
            '2 carrots, chopped',
            '2 beets, peeled and cubed',
            '2 tbsp sesame oil',
            '1 tsp cumin powder',
            '1/2 tsp cinnamon',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'Toss all the vegetables in a large bowl with sesame oil and spices.',
            'Spread evenly on a baking sheet.',
            'Roast for 35-40 minutes, tossing halfway through, until tender and caramelized.',
            'Serve warm, optionally with a drizzle of tahini.'
        ],
        benefits: 'Root vegetables grow deep in the earth, absorbing heavy, grounding qualities. This makes them excellent for pacifying the light, mobile nature of Vata dosha.'
    },
    {
        id: 5,
        title: 'Energizing Green Detox Soup',
        category: 'Dinner',
        image: 'https://images.unsplash.com/photo-1604542031651-5367d6928e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '25 min',
        difficulty: 'Medium',
        rating: 4.6,
        dosha: ['Kapha'],
        elements: ['Air', 'Ether'],
        tags: ['Light', 'Cleansing'],
        calories: 200,
        description: 'Light, spicy greens to stimulate metabolism and clear congestion.',
        ingredients: [
            '1 bunch spinach',
            '1 bunch kale, stems removed',
            '1 green chili (optional)',
            '1 tsp black pepper',
            '1/2 tsp dried ginger',
            '1 tbsp lemon juice',
            '2 cups vegetable broth'
        ],
        instructions: [
            'Roughly chop the spinach and kale.',
            'In a pot, bring the broth to a simmer.',
            'Add the greens and chili. Cook for 5-7 minutes until wilted.',
            'Transfer to a blender, add spices, and blend until smooth.',
            'Stir in lemon juice before serving.'
        ],
        benefits: 'Bitter and pungent tastes found in leafy greens and spices help to scrape away excess mucus and stimulate sluggish Kapha digestion.'
    },
    {
        id: 6,
        title: 'Coconut & Lime Rice',
        category: 'Lunch',
        image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '20 min',
        difficulty: 'Easy',
        rating: 4.5,
        dosha: ['Pitta', 'Vata'],
        elements: ['Water', 'Earth'],
        tags: ['Nourishing', 'Sweet'],
        calories: 380,
        description: 'A cooling, sweet carbohydrate source that pacifies excess heat.',
        ingredients: [
            '1 cup basmati rice',
            '1 cup coconut milk',
            '1 cup water',
            '1 lime (zest and juice)',
            '1 tbsp shredded coconut',
            'Pinch of salt'
        ],
        instructions: [
            'Combine rice, coconut milk, water, and salt in a pot.',
            'Bring to a boil, then reduce heat to low and cover.',
            'Simmer for 15-20 minutes until liquid is absorbed.',
            'Remove from heat. Fluff with a fork and stir in lime juice and zest.',
            'Top with shredded coconut.'
        ],
        benefits: 'Coconut is cooling and sweet, making it ideal for Pitta types. It provides sustenance without overheating the body.'
    },
    {
        id: 7,
        title: 'Warm Spiced Oatmeal with Dates',
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '15 min',
        difficulty: 'Easy',
        rating: 4.8,
        dosha: ['Vata', 'Pitta'],
        elements: ['Earth', 'Water'],
        tags: ['Grounding', 'Nourishing'],
        calories: 320,
        description: 'Creamy oats cooked with cardamom, cinnamon, and sweet dates for a grounding start.',
        ingredients: [
            '1/2 cup rolled oats',
            '1 cup almond milk',
            '2 dates, chopped',
            '1/4 tsp cardamom',
            '1/4 tsp cinnamon',
            '1 tbsp crushed walnuts'
        ],
        instructions: [
            'In a pot, bring milk to a simmer.',
            'Add oats, dates, and spices. Cook on low heat for 10 minutes.',
            'Stir occasionally until creamy.',
            'Top with walnuts and serve warm.'
        ],
        benefits: 'Oats are heavy and grounding, perfect for calming Vata. Spices improve digestibility.'
    },
    {
        id: 8,
        title: 'Ojas-Building Date & Almond Shake',
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '5 min',
        difficulty: 'Easy',
        rating: 4.9,
        dosha: ['Vata', 'Pitta'],
        elements: ['Earth', 'Water'],
        tags: ['Energizing', 'Rejuvenating'],
        calories: 250,
        description: 'A nutrient-dense shake to build Ojas (vitality) and provide sustained energy.',
        ingredients: [
            '1 cup warm almond milk',
            '2 soaked dates',
            '5 soaked almonds (peeled)',
            'Pinch of saffron',
            'Pinch of cardamom'
        ],
        instructions: [
            'Blend all ingredients until smooth and frothy.',
            'Serve warm for better digestion.'
        ],
        benefits: 'Dates and almonds are excellent for building strength and vitality (Ojas).'
    },
    {
        id: 9,
        title: 'Saffron & Cardamom Rice Pudding',
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        time: '35 min',
        difficulty: 'Medium',
        rating: 4.7,
        dosha: ['Pitta', 'Vata'],
        elements: ['Water', 'Earth'],
        tags: ['Sweet', 'Comforting'],
        calories: 280,
        description: 'A rich, creamy dessert scented with royal spices. Pure comfort.',
        ingredients: [
            '1/4 cup basmati rice',
            '2 cups milk (dairy or almond)',
            '2 tbsp raw sugar or maple syrup',
            '1/4 tsp cardamom powder',
            'Pinch of saffron strands',
            '1 tbsp roasted pistachios'
        ],
        instructions: [
            'Rinse rice and simmer with milk in a heavy-bottomed pan.',
            'Cook on low heat, stirring often, until rice is very soft and milk thickens (about 25-30 mins).',
            'Add sugar, cardamom, and saffron. Cook for another 5 mins.',
            'Serve warm or chilled, topped with pistachios.'
        ],
        benefits: 'Rice pudding (Kheer) is cooling and nutritive, excellent for pacifying high Pitta.'
    }
];
