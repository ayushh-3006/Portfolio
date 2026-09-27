import type { Dictionary } from "./en";

/**
 * Hindi copy.
 *
 * Written as Hindi advertising copy, not as a translation. Many lines say
 * something different from their English counterpart on purpose — the goal is
 * that each one lands in Hindi, not that it maps back word for word.
 *
 * Some deliberate localisations:
 * - "spreadsheet" becomes "Excel शीट". Indian small businesses say Excel; it is
 *   the concrete, recognisable thing, where "स्प्रेडशीट" is a category noun.
 * - Everyday idiom carries the argument: सिरदर्द, जुगाड़, नाप का, जवाब दे जाना.
 *   These are what make copy sound written rather than converted.
 * - Loanwords stay in Devanagari where Indian business people use them
 *   (सॉफ़्टवेयर, बिज़नेस, डैशबोर्ड). Sanskritised replacements would read like a
 *   government notice rather than like someone you would hire.
 *
 * Typed as `Dictionary`, so the build fails if a key is missing or renamed.
 */
export const hi: Dictionary = {
  meta: {
    title: "आयुष कुमार सिंह — फुल-स्टैक और AI डेवलपर",
    description:
      "कंप्यूटर साइंस के छात्र और फुल-स्टैक डेवलपर जो आधुनिक वेब एप्लिकेशन, बैकएंड सिस्टम और AI-पावर्ड प्रोडक्ट्स बनाते हैं।",
    keywords: [
      "फुल-स्टैक डेवलपर",
      "बैकएंड डेवलपर",
      "AI ऐप्लिकेशन डेवलपमेंट",
      "वेब ऐप्लिकेशन डेवलपमेंट",
      "GenAI डेवलपर",
      "MERN स्टैक डेवलपर",
      "React डेवलपर",
      "Node.js डेवलपर",
    ],
  },

  profile: {
    role: "सॉफ़्टवेयर इंजीनियर और प्रोडक्ट बिल्डर",
    availabilityLabel: "Building. Learning. Shipping.",
    availabilityDetail: "",
    locationLabel: "भारत से",
  },

  nav: {
    links: [
      { label: "होम", href: "#top" },
      { label: "मेरे बारे में", href: "#about" },
      { label: "प्रोजेक्ट्स", href: "#projects" },
      { label: "हुनर", href: "#capabilities" },
      { label: "मेरे साथ क्यों?", href: "#why" },
      { label: "संपर्क", href: "#contact" },
    ],
    cta: "रेज़्यूमे",
    openMenu: "मेन्यू खोलें",
    closeMenu: "मेन्यू बंद करें",
    switchLanguage: "भाषा बदलें",
  },

  hero: {
    headlineA: "आयुष कुमार सिंह",
    // Stronger than a literal "I turn it into software": it claims the whole
    // job in three words, which is exactly the positioning.
    headlineB: "मैं इंटेलिजेंस बनाता हूँ, और उसे खूबसूरत भी।",
    lede: "आइडिया आपका। सॉफ़्टवेयर मेरा।",
    ctaPrimary: "मेरा काम देखिए",
    ctaSecondary: "चलिए बात करते हैं →",
    preferToTalk: "सीधे बात करनी है?",
    pipelineDescription:
      "यह दिखाता है कि कोई प्रोजेक्ट एक आइडिया से शुरू होकर चलते हुए प्रोडक्ट तक कैसे पहुँचता है",
    // "Excel शीट", not "स्प्रेडशीट" — this is the sentence an Indian business
    // owner actually says out loud.
    pipelineQuote: "“हर ऑर्डर आज भी Excel शीट में ही चढ़ता है।”",
    pipelineQuoteLabel: "यूज़र कहता है",
    pipelineStages: {
      idea: "आइडिया",
      architecture: "आर्किटेक्चर",
      interface: "इंटरफ़ेस",
      code: "कोड",
      ai: "AI",
      data: "डेटा",
      deploy: "डिप्लॉय",
      live: "लाइव",
    },
    pipelineAi: ["समझता है", "ढूँढता है", "तय करता है", "जवाब देता है"],
    pipelineDeploy: ["बिल्ड पास", "टेस्ट पास", "डेटाबेस तैयार", "लाइव"],
    pipelineTiles: ["आज के", "बाक़ी", "पूरे"],
  },

  trust: {
    text: "आधुनिक वेब तकनीक और AI के साथ फुल-स्टैक प्रोडक्ट्स बनाना — आइडिया से लेकर डिप्लॉयमेंट तक।",
    categories: [
      "FULL STACK",
      "AI / GENAI",
      "BACKEND",
      "REST APIs",
      "MONGODB",
      "DEVOPS",
    ],
  },

  problems: {
    eyebrow: "कुछ जाना-पहचाना लगा?",
    title:
      "किसी को सॉफ़्टवेयर नहीं चाहिए होता। चाहिए बस यह होता है कि जो दिक़्क़त रोज़ खा रही है, वो ख़त्म हो जाए।",
    lede: "इनमें से जो आपकी रोज़ की कहानी लगे — बात वहीं से शुरू होती है।",
    answerLabel: "इसका हल",
    items: [
      {
        id: "spreadsheets",
        problem: "पूरा बिज़नेस आज भी Excel शीट पर चल रहा है?",
        solution: "कस्टम बिज़नेस सॉफ़्टवेयर",
        detail:
          "एक ही फ़ाइल के चार वर्ज़न। किसी ने ग़लती से एक कॉलम उड़ा दिया। और किसी को पक्का नहीं पता कि सही आँकड़ा कौन-सा है। Excel तब तक ठीक है जब तक टीम छोटी है — उसके बाद वो पैसे बचाती नहीं, चुपचाप खाने लगती है।",
        outcome: "एक सिस्टम। एक सही आँकड़ा। और जिसे जितना दिखना चाहिए, बस उतना।",
      },
      {
        id: "manual",
        problem: "टीम हर हफ़्ते वही काम दोबारा कर रही है?",
        solution: "ऑटोमेशन",
        detail:
          "एक जगह से डेटा उठाकर दूसरी जगह डालना। वही ऑर्डर फिर से टाइप करना। हर सोमवार वही रिपोर्ट बनाना। जो काम हर बार हूबहू एक जैसा होता है, वो इंसान का नहीं, सॉफ़्टवेयर का काम है — वो न थकता है, न शाम छह बजे ग़लती करता है।",
        outcome: "हर हफ़्ते कई घंटे वापस, और ग़लतियाँ लगभग ख़त्म।",
      },
      {
        id: "idea",
        problem: "आइडिया तो है, पर बनवाएँ किससे?",
        solution: "शुरू से आख़िर तक प्रोडक्ट डेवलपमेंट",
        detail:
          "न आपको टीम खड़ी करनी है, न यह समझना है कि बैकएंड होता क्या है, न तीन अलग-अलग लोग ढूँढने हैं जो आपस में बात तक न करें। बस एक इंसान चाहिए जो आपकी बात सुने और चीज़ बनाकर लाइव कर दे।",
        outcome: "आइडिया से चलता हुआ प्रोडक्ट — और जवाबदेह सिर्फ़ एक इंसान।",
      },
      {
        id: "ai",
        problem: "ग्राहक अब AI वाली सहूलियत माँगने लगे हैं?",
        solution: "AI इंटीग्रेशन",
        detail:
          "प्रेस रिलीज़ वाला AI नहीं। ऐसा AI जो असल में कुछ करे — आपके अपने दस्तावेज़ों से जवाब निकाले, वो फ़ॉर्म पढ़े जो कोई पढ़ना नहीं चाहता, और पहला जवाब ख़ुद दे दे ताकि आपकी टीम बड़े काम पर लगे।",
        outcome: "ऐसा AI जो काम घटाए — डेमो न बढ़ाए।",
      },
      {
        id: "fit",
        problem: "सॉफ़्टवेयर आपके हिसाब से नहीं, आप सॉफ़्टवेयर के हिसाब से चल रहे हैं?",
        solution: "आपके तरीक़े पर बना सॉफ़्टवेयर",
        detail:
          "हर बिज़नेस का अपना तरीक़ा होता है। बाज़ार के टूल चाहते हैं कि आप अपना तरीक़ा उनके हिसाब से बदल लें। कभी-कभी चल जाता है। जब नहीं चलता, तो रोज़-रोज़ का जुगाड़ ही सबसे महँगा पड़ता है।",
        outcome: "सॉफ़्टवेयर आपके हिसाब से चले — उल्टा नहीं।",
      },
      {
        id: "scale",
        problem: "जो जल्दी में बनवाया था, अब वही अटकाने लगा है?",
        solution: "दोबारा बनाना और स्केल करना",
        detail:
          "जिस वर्ज़न से शुरुआत हुई थी, अक्सर वही सबसे पहले जवाब दे जाता है — पेज धीमे पड़ जाते हैं, छोटा-सा बदलाव भी हफ़्ते भर का काम बन जाता है, और हर फ़िक्स के साथ कहीं और कुछ टूट जाता है।",
        outcome: "ऐसी नींव जो बिज़नेस बढ़ने पर भी साथ दे।",
      },
    ],
  },

  projects: {
    eyebrow: "प्रोजेक्ट्स",
    title: "मैंने क्या बनाया है",
    lede: "मेरे हालिया काम की एक झलक। मुझे अपने प्रोजेक्ट्स की जानकारी दें और मैं इसे अपडेट कर दूंगा।",
    items: [
      {
        id: "project-1",
        title: "Resume-Pilot-AI",
        description:
          "एक AI-आधारित रेज़्यूमे प्लेटफ़ॉर्म जिसमें ATS एनालिसिस, AI से रेज़्यूमे इनसाइट्स, पर्सनलाइज़्ड सुधार और मॉक इंटरव्यू टूल्स शामिल हैं।",
        tags: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Clerk", "Groq API"],
        image: "/resume-pilot-ai.png",
        liveUrl: "https://resume-pilot-ai-gamma.vercel.app/",
        githubUrl: "https://github.com/ayushh-3006/ResumePilot-AI",
      },
      {
        id: "project-2",
        title: "Cravings",
        description:
          "MERN-आधारित फ़ूड डिलीवरी प्लेटफ़ॉर्म जहाँ यूज़र्स रेस्टोरेंट देख सकते हैं, खाना ऑर्डर कर सकते हैं और अपनी प्रोफ़ाइल मैनेज कर सकते हैं। इसमें ग्राहकों, रेस्टोरेंट्स, राइडर्स और एडमिन्स के लिए अलग-अलग डैशबोर्ड हैं।",
        tags: ["React.js", "JavaScript", "Node.js", "Express.js", "Cloudinary", "JWT"],
        image: "/cravings.png",
        liveUrl: "https://craving-house-amber.vercel.app/",
        githubUrl: "https://github.com/ayushh-3006/Food-Delivery-App",
      },
      {
        id: "project-3",
        title: "TalkX",
        description:
          "एक रीयल-टाइम MERN चैट एप्लीकेशन जिसमें सुरक्षित ऑथेंटिकेशन, वन-टू-वन मैसेजिंग और रिस्पॉन्सिव UI है। अभी निर्माण के अधीन है।",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/ayushh-3006/TalkX",
      },
    ],
  },



  capabilities: {
    eyebrow: "Skills",
    title: "The tools I use to build.",
    lede: "A practical stack I've worked with to build full-stack applications, backend services, and AI-powered products.",
    groups: [
      {
        id: "languages",
        label: "भाषाएँ",
        headline: "",
        items: ["Java", "JavaScript", "TypeScript", "SQL"],
      },
      {
        id: "frameworks",
        label: "फ्रेमवर्क",
        headline: "",
        items: ["React", "Next.js", "Node.js", "Express.js"],
      },
      {
        id: "tools",
        label: "टूल्स",
        headline: "",
        items: ["Git", "GitHub", "Postman", "OAuth 2.0"],
      },
      {
        id: "databases",
        label: "डेटाबेस",
        headline: "",
        items: ["MongoDB", "MySQL"],
      },
      {
        id: "ai",
        label: "AI / ML",
        headline: "",
        items: ["Generative AI", "LLM APIs"],
      },
    ],
  },



  whyMe: {
    eyebrow: "मेरे साथ काम क्यों करें",
    title: "One developer.\nBuilt across the stack.",
    lede: "मैं स्टैक के सिर्फ एक हिस्से पर फोकस करने के बजाय फ्रंटएंड, बैकएंड, डेटाबेस और AI — पूरे सिस्टम पर काम करता हूँ ताकि एक पूरा प्रोडक्ट बनाया जा सके।",
    kicker: "",
    items: [
      {
        title: "फुल-स्टैक नज़रिया",
        body: "मैं समझता हूँ कि सारे हिस्से कैसे जुड़ते हैं — इंटरफेस और API से लेकर डेटाबेस, ऑथेंटिकेशन और AI इंटीग्रेशन तक।",
      },
      {
        title: "मकसद के साथ काम",
        body: "मेरा पहला फोकस असल प्रॉब्लम को सॉल्व करने पर होता है, फिर मैं उस प्रोजेक्ट के लिए सबसे सही टेक्नोलॉजी और आर्किटेक्चर चुनता हूँ।",
      },
      {
        title: "हमेशा सीखना",
        body: "मैं रियल-वर्ल्ड प्रोजेक्ट्स बनाकर अपने बैकएंड, DevOps, सिस्टम डिज़ाइन और AI स्किल्स को लगातार बेहतर कर रहा हूँ।",
      },
    ],
  },


  contact: {
    eyebrow: "संपर्क",
    title: "Let's Build Something",
    lede: "I'm open to projects, collaborations, and ideas. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    callLabel: "कॉल या WhatsApp",
    emailLabel: "ईमेल",
    whatsappCta: "WhatsApp पर मैसेज कीजिए →",
  },

  quickContact: {
    call: "कॉल",
    whatsapp: "WhatsApp",
    email: "ईमेल",
  },

  finalCta: {
    titleA: "आपका अगला प्रोडक्ट",
    titleB: "एक आइडिया से शुरू होता है।",
    body: "आइडिया आपके पास पहले से है। उसके और एक चलते हुए प्रोडक्ट के बीच बस एक बातचीत बची है।",
    cta: "चलिए बनाते हैं",
  },

  footer: {
    tagline:
      "कस्टम सॉफ़्टवेयर, वेब प्लेटफ़ॉर्म, मोबाइल ऐप्स और AI प्रोडक्ट्स — शुरू से आख़िर तक।",
    contactHeading: "संपर्क करें",
    elsewhereHeading: "और कहाँ मिलेंगे",
    rights: "सर्वाधिकार सुरक्षित।",
    backToTop: "ऊपर जाएँ",
  },
};
