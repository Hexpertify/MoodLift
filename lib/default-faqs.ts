export type DefaultFaqPage = 'home' | 'games' | 'discover' | 'assessment';

export type DefaultFaqItem = {
  question: string;
  answer: string;
  sort_order: number;
};

export const DEFAULT_FAQS: Record<DefaultFaqPage, DefaultFaqItem[]> = {
  home: [
    {
      sort_order: 0,
      question: 'What is MoodLift?',
      answer:
        'MoodLift is an AI-powered emotional wellness platform that combines psychometric assessments, therapeutic games, breathing exercises, and personalized recommendations to support your mental health journey.',
    },
    {
      sort_order: 1,
      question: 'How accurate are the mood assessments?',
      answer:
        'Our assessments use validated psychometric scales (PHQ-9, GAD-7, PANAS-SF) developed by leading mental health researchers. These are the same tools used in clinical settings worldwide.',
    },
    {
      sort_order: 2,
      question: 'Are the games scientifically backed?',
      answer:
        'Yes! All our games and activities are based on evidence-based therapeutic techniques like CBT, MBSR, DBT, and somatic practices. Each game comes with detailed information about its mood benefits.',
    },
    {
      sort_order: 3,
      question: 'Is my data secure and private?',
      answer:
        'Absolutely. We use enterprise-grade encryption, secure servers, and comply with GDPR and data protection regulations. Your personal data is never shared with third parties.',
    },
    {
      sort_order: 4,
      question: 'Can I use MoodLift as a replacement for therapy?',
      answer:
        "MoodLift is designed to complement, not replace, professional mental health treatment. If you're experiencing a mental health crisis, please reach out to a healthcare professional or crisis helpline immediately.",
    },
    {
      sort_order: 5,
      question: 'How do I pin my favorite games?',
      answer:
        "Simply click the pin icon on any game card to save it to your favorites. Your pinned games appear in the 'Your Favorites' section for quick access.",
    },
  ],
  games: [
    {
      sort_order: 0,
      question: 'How long does each activity take?',
      answer: 'Most activities take 3-15 minutes. Specific durations are displayed on each game card and in the detailed view.',
    },
    {
      sort_order: 1,
      question: "What's the difference between breathing exercises and grounding techniques?",
      answer:
        'Breathing exercises focus on controlling your breath to calm the nervous system. Grounding techniques use sensory awareness to bring you into the present moment and reduce anxiety.',
    },
    {
      sort_order: 2,
      question: 'Can I practice activities multiple times?',
      answer:
        'Yes! You can practice any activity as many times as you like. Regular practice enhances the benefits. We track your activity history in your dashboard.',
    },
    {
      sort_order: 3,
      question: "Which game should I start with if I'm new?",
      answer:
        "We recommend starting with Box Breathing or Describe Your Room if you're new to wellness activities. These are gentle, easy-to-follow exercises perfect for beginners.",
    },
    {
      sort_order: 4,
      question: 'How do I know which game is right for my mood?',
      answer:
        "Take our Mood Assessment first! Based on your results, we'll recommend specific games tailored to your emotional state and wellness goals.",
    },
    {
      sort_order: 5,
      question: 'Are games available offline?',
      answer:
        'Games work best online for the full experience, but you can access descriptions and benefits offline. The activities themselves are web-based.',
    },
  ],
  discover: [
    {
      sort_order: 0,
      question: "What's the difference between the Discover page and the Games page?",
      answer:
        'The Discover page is your personalized hub with your favorites, all activities, and book recommendations. The Games page focuses specifically on wellness games and activities.',
    },
    {
      sort_order: 1,
      question: 'How do I add games and books to my favorites?',
      answer:
        "Click the pin icon on any game or book card. Your favorites appear in the 'Your Favorites' section for quick access. You can manage favorites from any page.",
    },
    {
      sort_order: 2,
      question: 'Can I get book recommendations based on my mood?',
      answer:
        "Yes! After completing a mood assessment, we recommend books tailored to your emotional state and wellness goals. You'll see personalized suggestions on the Discover page.",
    },
    {
      sort_order: 3,
      question: 'How do I start using the recommended resources?',
      answer:
        "Browse the Activities and Books sections, click on any item to see details, then click 'Start Playing' for games or 'Learn More' for books. Everything is accessible from the Discover page.",
    },
    {
      sort_order: 4,
      question: 'Can I view my progress with different games and books?',
      answer:
        'Yes! Visit your Dashboard to see your activity history, progress over time, and insights about your wellness journey.',
    },
    {
      sort_order: 5,
      question: 'Are the book recommendations free?',
      answer:
        'We provide detailed recommendations and summaries. Links are provided to purchase or borrow books from various platforms. Some resources may be available free online.',
    },
  ],
  assessment: [
    {
      sort_order: 0,
      question: 'What does the PANAS-SF test assess?',
      answer:
        'PANAS-SF measures your current emotional state by assessing two dimensions: Positive Affect (PA) and Negative Affect (NA). It provides a quick snapshot of how you are feeling right now.',
    },
    {
      sort_order: 1,
      question: 'What is the full form of PHQ-9?',
      answer:
        'PHQ-9 stands for Patient Health Questionnaire-9. It is a 9-item screening tool used to assess the presence and severity of depressive symptoms.',
    },
    {
      sort_order: 2,
      question: 'How accurate are MoodLift assessments?',
      answer:
        'MoodLift uses widely accepted, validated scales like PHQ-9, GAD-7, and PANAS-SF. These tools are widely used in clinical and research settings, but they are screening tools and should be interpreted as guidance rather than a diagnosis.',
    },
    {
      sort_order: 3,
      question: 'Are these assessments clinically validated?',
      answer:
        'Yes. All assessments used on MoodLift such as PHQ-9, GAD-7, and PANAS-SF are scientifically validated psychological tools that have been tested in peer-reviewed clinical and academic research. These tools are widely used by mental health professionals to screen for symptoms related to depression, anxiety, and emotional well-being. However, results should be interpreted as screening insights, not a medical diagnosis.',
    },
    {
      sort_order: 4,
      question: 'Can these tests replace professional diagnosis?',
      answer:
        'No. These assessments do not replace a professional mental health diagnosis. They are designed to help individuals understand their emotional state, recognize potential concerns, and decide whether to seek professional support. If your results indicate high levels of distress, anxiety, or depression, it is strongly recommended to consult a qualified mental health professional.',
    },
  ],
};
