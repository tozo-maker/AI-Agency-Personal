import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ka' | 'ru';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // DynamicPanel
  selectBothToContinue: {
    en: "Select both to continue — this shapes the conversation.",
    ka: "აირჩიეთ ორივე გასაგრძელებლად — ეს აყალიბებს საუბარს.",
    ru: "Выберите оба варианта, чтобы продолжить — это формирует разговор."
  },
  
  // App.tsx
  toggleTheme: {
    en: "Toggle theme",
    ka: "თემის შეცვლა",
    ru: "Переключить тему"
  },
  whatActuallyHappens: {
    en: "What actually happens here",
    ka: "რა ხდება სინამდვილეში აქ",
    ru: "Что здесь происходит на самом деле"
  },
  step1Title: {
    en: "You tell me what you're working on.",
    ka: "თქვენ მეუბნებით რაზე მუშაობთ.",
    ru: "Вы рассказываете мне, над чем работаете."
  },
  step1Desc: {
    en: "The adaptive sentence at the top is the first step. It takes 10 seconds and sets up a more useful conversation than a contact form ever could.",
    ka: "ადაპტური წინადადება ზედა ნაწილში არის პირველი ნაბიჯი. ეს იღებს 10 წამს და ქმნის უფრო სასარგებლო საუბარს, ვიდრე საკონტაქტო ფორმა ოდესმე შეძლებდა.",
    ru: "Адаптивное предложение наверху — это первый шаг. Это занимает 10 секунд и создает более полезный разговор, чем любая контактная форма."
  },
  step2Title: {
    en: "We think through it together.",
    ka: "ჩვენ ერთად ვფიქრობთ ამაზე.",
    ru: "Мы обдумываем это вместе."
  },
  step2Desc: {
    en: "A conversation follows, guided by how I approach problems. AI handles the initial questions; I read every conversation.",
    ka: "საუბარი გრძელდება იმის მიხედვით, თუ როგორ ვუდგები პრობლემებს. AI უმკლავდება საწყის კითხვებს; მე ვკითხულობ ყველა საუბარს.",
    ru: "Далее следует разговор, основанный на моем подходе к проблемам. ИИ обрабатывает начальные вопросы; я читаю каждый разговор."
  },
  step3Title: {
    en: "If it makes sense, we talk.",
    ka: "თუ აზრი აქვს, ვსაუბრობთ.",
    ru: "Если в этом есть смысл, мы общаемся."
  },
  step3Desc: {
    en: "No pressure, no pitch. A call happens when both of us think it's worth it.",
    ka: "არანაირი ზეწოლა, არანაირი შეთავაზება. ზარი ხდება მაშინ, როდესაც ორივე ვფიქრობთ, რომ ეს ღირს.",
    ru: "Никакого давления, никаких презентаций. Звонок происходит, когда мы оба считаем, что это того стоит."
  },
  whatICanHelpWith: {
    en: "What I can help you think through",
    ka: "რით შემიძლია დაგეხმაროთ",
    ru: "С чем я могу помочь вам разобраться"
  },
  cap1: {
    en: "Positioning and clarity work — who this is for, what it says, why it matters",
    ka: "პოზიციონირება და სიცხადე — ვისთვის არის ეს, რას ამბობს, რატომ არის მნიშვნელოვანი",
    ru: "Позиционирование и ясность — для кого это, о чем говорит, почему это важно"
  },
  cap2: {
    en: "AI integration that actually fits the workflow (not AI for its own sake)",
    ka: "AI ინტეგრაცია, რომელიც რეალურად ერგება სამუშაო პროცესს (არა AI მხოლოდ AI-სთვის)",
    ru: "Интеграция ИИ, которая действительно вписывается в рабочий процесс (а не ИИ ради ИИ)"
  },
  cap3: {
    en: "Product thinking — what to build, what to cut, how to validate cheaply",
    ka: "პროდუქტის აზროვნება — რა ავაშენოთ, რა ამოვჭრათ, როგორ შევამოწმოთ იაფად",
    ru: "Продуктовое мышление — что создавать, что убрать, как дешево проверить"
  },
  cap4: {
    en: "Automation of repeatable work — to free up judgment for hard problems",
    ka: "განმეორებადი სამუშაოს ავტომატიზაცია — რთული პრობლემებისთვის განსჯის გასათავისუფლებლად",
    ru: "Автоматизация повторяющейся работы — чтобы освободить мышление для сложных задач"
  },
  cap5: {
    en: "Founder-facing strategy — pricing, packaging, go-to-market for small teams",
    ka: "დამფუძნებელზე ორიენტირებული სტრატეგია — ფასები, შეფუთვა, ბაზარზე გასვლა მცირე გუნდებისთვის",
    ru: "Стратегия для основателей — ценообразование, упаковка, выход на рынок для небольших команд"
  },
  cap6: {
    en: "Discovery and synthesis — making sense of messy information fast",
    ka: "აღმოჩენა და სინთეზი — არეული ინფორმაციის სწრაფად გაგება",
    ru: "Обнаружение и синтез — быстрое осмысление запутанной информации"
  },
  honestTitle: {
    en: "A few things I want to be honest about",
    ka: "რამდენიმე რამ, რაზეც მინდა გულწრფელი ვიყო",
    ru: "Несколько вещей, о которых я хочу быть честным"
  },
  honest1: {
    en: "AI is involved in this conversation. That's intentional and it's disclosed because you deserve to know. The AI is trained on my thinking and frameworks. It asks questions I would ask. I read what comes through.",
    ka: "AI ჩართულია ამ საუბარში. ეს განზრახ არის და გამჟღავნებულია, რადგან თქვენ იმსახურებთ იცოდეთ. AI გაწვრთნილია ჩემს აზროვნებასა და ჩარჩოებზე. ის სვამს კითხვებს, რომლებსაც მე დავსვამდი. მე ვკითხულობ იმას, რაც შემოდის.",
    ru: "ИИ участвует в этом разговоре. Это сделано намеренно и раскрыто, потому что вы заслуживаете это знать. ИИ обучен моему мышлению и фреймворкам. Он задает вопросы, которые задал бы я. Я читаю то, что приходит."
  },
  honest2: {
    en: "No conversation data is used to train AI models. I'm not building a list. There's no retargeting, no follow-up sequence, no sales team.",
    ka: "საუბრის მონაცემები არ გამოიყენება AI მოდელების მოსამზადებლად. მე არ ვაშენებ სიას. არ არის რეტარგეტინგი, არ არის შემდგომი მიმდევრობა, არ არის გაყიდვების გუნდი.",
    ru: "Данные разговоров не используются для обучения моделей ИИ. Я не собираю базу. Нет ретаргетинга, нет цепочек писем, нет отдела продаж."
  },
  honest3: {
    en: "If I think I'm not the right fit for what you're working on, I'll say so.",
    ka: "თუ ვფიქრობ, რომ არ ვარ შესაფერისი იმისთვის, რაზეც მუშაობთ, ამას ვიტყვი.",
    ru: "Если я пойму, что не подхожу для того, над чем вы работаете, я так и скажу."
  },
  startConversation: {
    en: "Start the conversation",
    ka: "დაიწყეთ საუბარი",
    ru: "Начать разговор"
  },
  conversationGuided: {
    en: "The conversation ahead is guided by AI — trained on how I think and reviewed by me. You'll always know where the human is in this loop.",
    ka: "წინამდებარე საუბარი იმართება AI-ს მიერ — გაწვრთნილი იმაზე, თუ როგორ ვფიქრობ და გადამოწმებული ჩემს მიერ. თქვენ ყოველთვის გეცოდინებათ, სად არის ადამიანი ამ ციკლში.",
    ru: "Предстоящий разговор ведется ИИ — обученным тому, как я мыслю, и проверяемым мной. Вы всегда будете знать, где находится человек в этом цикле."
  },
  about: {
    en: "About",
    ka: "შესახებ",
    ru: "Обо мне"
  },
  startOver: {
    en: "Start Over",
    ka: "თავიდან დაწყება",
    ru: "Начать заново"
  },
  bookCall: {
    en: "Book a call",
    ka: "დაჯავშნეთ ზარი",
    ru: "Забронировать звонок"
  },
  footerText: {
    en: "One person. AI-assisted. Human-reviewed.",
    ka: "ერთი ადამიანი. AI-ს დახმარებით. ადამიანის მიერ გადამოწმებული.",
    ru: "Один человек. С помощью ИИ. Проверено человеком."
  },
  aboutText1: {
    en: "I've been doing this for 18 years. I work alone, on purpose.",
    ka: "ამას 18 წელია ვაკეთებ. მარტო ვმუშაობ, განზრახ.",
    ru: "Я занимаюсь этим 18 лет. Я работаю один, намеренно."
  },
  aboutText2: {
    en: "My focus is on helping founders and teams find clarity in their positioning, product strategy, and operational systems.",
    ka: "ჩემი ფოკუსია დავეხმარო დამფუძნებლებს და გუნდებს სიცხადის პოვნაში მათ პოზიციონირებაში, პროდუქტის სტრატეგიასა და ოპერაციულ სისტემებში.",
    ru: "Мой фокус — помощь основателям и командам в обретении ясности в их позиционировании, продуктовой стратегии и операционных системах."
  },
  bookCallDirectly: {
    en: "Book a call directly",
    ka: "დაჯავშნეთ ზარი პირდაპირ",
    ru: "Забронировать звонок напрямую"
  },
  bookCallText: {
    en: "Let's find 30 minutes to talk through what you're building.",
    ka: "მოდით ვიპოვოთ 30 წუთი, რომ ვისაუბროთ იმაზე, რასაც აშენებთ.",
    ru: "Давайте найдем 30 минут, чтобы обсудить то, что вы создаете."
  },
  
  // AdaptiveSentence
  imBuildingA: {
    en: "I'm running a",
    ka: "მე ვმართავ",
    ru: "Я руковожу"
  },
  andMyFocusIs: {
    en: "and my biggest focus right now is",
    ka: "და ჩემი მთავარი ფოკუსი ახლა არის",
    ru: "и мой главный фокус сейчас — это"
  },
  
  // Business Types
  bt_saas: {
    en: "SaaS product",
    ka: "SaaS პროდუქტი",
    ru: "SaaS продукт"
  },
  bt_service: {
    en: "Service business",
    ka: "სერვისის ბიზნესი",
    ru: "Сервисный бизнес"
  },
  bt_ecommerce: {
    en: "E-commerce",
    ka: "ელექტრონული კომერცია",
    ru: "Электронная коммерция"
  },
  bt_internal: {
    en: "Internal operations",
    ka: "შიდა ოპერაციები",
    ru: "Внутренние операции"
  },
  bt_other: {
    en: "Something else",
    ka: "სხვა რამ",
    ru: "Что-то другое"
  },

  // Focus Areas - SaaS
  fa_saas_1: {
    en: "AI-driven user onboarding",
    ka: "AI-ზე დაფუძნებული მომხმარებლის ონბორდინგი",
    ru: "Пользовательский онбординг на базе ИИ"
  },
  fa_saas_2: {
    en: "automating internal ops",
    ka: "შიდა ოპერაციების ავტომატიზაცია",
    ru: "автоматизация внутренних операций"
  },
  fa_saas_3: {
    en: "predictive churn analysis",
    ka: "გადინების პროგნოზირებადი ანალიზი",
    ru: "предиктивный анализ оттока"
  },
  fa_saas_4: {
    en: "enhancing product with AI",
    ka: "პროდუქტის გაუმჯობესება AI-ით",
    ru: "улучшение продукта с помощью ИИ"
  },
  fa_saas_5: {
    en: "streamlining support",
    ka: "მხარდაჭერის გამარტივება",
    ru: "оптимизация поддержки"
  },

  // Focus Areas - Service
  fa_service_1: {
    en: "automating client onboarding",
    ka: "კლიენტების ონბორდინგის ავტომატიზაცია",
    ru: "автоматизация онбординга клиентов"
  },
  fa_service_2: {
    en: "scaling delivery with AI",
    ka: "მიწოდების მასშტაბირება AI-ით",
    ru: "масштабирование доставки с помощью ИИ"
  },
  fa_service_3: {
    en: "reducing manual data entry",
    ka: "მონაცემთა ხელით შეყვანის შემცირება",
    ru: "сокращение ручного ввода данных"
  },
  fa_service_4: {
    en: "improving team efficiency",
    ka: "გუნდის ეფექტურობის გაუმჯობესება",
    ru: "повышение эффективности команды"
  },
  fa_service_5: {
    en: "systematizing knowledge",
    ka: "ცოდნის სისტემატიზაცია",
    ru: "систематизация знаний"
  },

  // Focus Areas - E-commerce
  fa_ecom_1: {
    en: "automating customer support",
    ka: "მომხმარებელთა მხარდაჭერის ავტომატიზაცია",
    ru: "автоматизация поддержки клиентов"
  },
  fa_ecom_2: {
    en: "inventory & supply chain AI",
    ka: "ინვენტარისა და მიწოდების ჯაჭვის AI",
    ru: "ИИ для инвентаризации и цепочки поставок"
  },
  fa_ecom_3: {
    en: "personalized marketing",
    ka: "პერსონალიზებული მარკეტინგი",
    ru: "персонализированный маркетинг"
  },
  fa_ecom_4: {
    en: "order fulfillment workflows",
    ka: "შეკვეთის შესრულების სამუშაო პროცესები",
    ru: "рабочие процессы выполнения заказов"
  },
  fa_ecom_5: {
    en: "understanding our data",
    ka: "ჩვენი მონაცემების გაგება",
    ru: "понимание наших данных"
  },

  // Focus Areas - Internal
  fa_int_1: {
    en: "connecting siloed systems",
    ka: "იზოლირებული სისტემების დაკავშირება",
    ru: "объединение разрозненных систем"
  },
  fa_int_2: {
    en: "automating repetitive tasks",
    ka: "განმეორებადი ამოცანების ავტომატიზაცია",
    ru: "автоматизация повторяющихся задач"
  },
  fa_int_3: {
    en: "building internal AI agents",
    ka: "შიდა AI აგენტების შექმნა",
    ru: "создание внутренних ИИ-агентов"
  },
  fa_int_4: {
    en: "replacing manual spreadsheets",
    ka: "ხელით ცხრილების ჩანაცვლება",
    ru: "замена ручных электронных таблиц"
  },
  fa_int_5: {
    en: "optimizing resource allocation",
    ka: "რესურსების განაწილების ოპტიმიზაცია",
    ru: "оптимизация распределения ресурсов"
  },

  // Focus Areas - Other
  fa_other_1: {
    en: "exploring AI opportunities",
    ka: "AI შესაძლებლობების შესწავლა",
    ru: "изучение возможностей ИИ"
  },
  fa_other_2: {
    en: "validating an automation idea",
    ka: "ავტომატიზაციის იდეის ვალიდაცია",
    ru: "проверка идеи автоматизации"
  },
  fa_other_3: {
    en: "getting unstuck with tech",
    ka: "ტექნოლოგიებთან დაკავშირებული პრობლემების მოგვარება",
    ru: "решение проблем с технологиями"
  },
  fa_other_4: {
    en: "finding operational bottlenecks",
    ka: "ოპერაციული დაბრკოლებების პოვნა",
    ru: "поиск операционных узких мест"
  },

  // Dynamic Copy - SaaS
  dc_saas_1: {
    en: "Onboarding is where you win or lose. AI can turn static tutorials into dynamic, personalized experiences that adapt to what the user actually needs to achieve.",
    ka: "ონბორდინგი არის ადგილი, სადაც იგებთ ან აგებთ. AI-ს შეუძლია სტატიკური გაკვეთილები გადააქციოს დინამიურ, პერსონალიზებულ გამოცდილებად, რომელიც ერგება იმას, რისი მიღწევაც რეალურად სჭირდება მომხმარებელს.",
    ru: "Онбординг — это то, где вы выигрываете или проигрываете. ИИ может превратить статические руководства в динамичный, персонализированный опыт, который адаптируется к тому, чего на самом деле нужно достичь пользователю."
  },
  dc_saas_2: {
    en: "SaaS companies often scale headcount linearly with revenue. Automating internal ops breaks that curve, allowing your team to focus on product and growth instead of manual provisioning and billing.",
    ka: "SaaS კომპანიები ხშირად ზრდიან პერსონალს შემოსავლის პროპორციულად. შიდა ოპერაციების ავტომატიზაცია არღვევს ამ მრუდს, რაც საშუალებას აძლევს თქვენს გუნდს ფოკუსირება მოახდინოს პროდუქტზე და ზრდაზე, ხელით უზრუნველყოფისა და ბილინგის ნაცვლად.",
    ru: "SaaS-компании часто увеличивают штат линейно с ростом доходов. Автоматизация внутренних операций ломает эту кривую, позволяя вашей команде сосредоточиться на продукте и росте вместо ручного обеспечения и биллинга."
  },
  dc_saas_3: {
    en: "By the time a user cancels, they made the decision weeks ago. AI can identify the subtle usage patterns that precede churn, allowing you to intervene before it's too late.",
    ka: "იმ დროისთვის, როდესაც მომხმარებელი აუქმებს, მან გადაწყვეტილება კვირებით ადრე მიიღო. AI-ს შეუძლია ამოიცნოს გამოყენების დახვეწილი შაბლონები, რომლებიც წინ უძღვის გადინებას, რაც საშუალებას გაძლევთ ჩაერიოთ სანამ გვიან არ არის.",
    ru: "К тому времени, когда пользователь отменяет подписку, он принял решение несколько недель назад. ИИ может выявить тонкие паттерны использования, предшествующие оттоку, позволяя вам вмешаться, пока не стало слишком поздно."
  },
  dc_saas_4: {
    en: "Don't just add an AI chatbot because everyone else is. The real value comes from embedding AI deeply into the core workflow to make the user 10x faster at their primary task.",
    ka: "უბრალოდ ნუ დაამატებთ AI ჩატბოტს, რადგან ყველა სხვა ასე აკეთებს. ნამდვილი ღირებულება მოდის AI-ს ღრმად ჩაშენებით ძირითად სამუშაო პროცესში, რათა მომხმარებელი 10-ჯერ უფრო სწრაფი გახდეს თავის მთავარ ამოცანაში.",
    ru: "Не добавляйте ИИ-чатбота просто потому, что все так делают. Настоящая ценность заключается во внедрении ИИ глубоко в основной рабочий процесс, чтобы сделать пользователя в 10 раз быстрее в его главной задаче."
  },
  dc_saas_5: {
    en: "Support shouldn't be a cost center. AI agents can resolve 60-80% of tier 1 tickets instantly, leaving your human team to handle the complex, high-value relationship building.",
    ka: "მხარდაჭერა არ უნდა იყოს ხარჯების ცენტრი. AI აგენტებს შეუძლიათ მყისიერად გადაჭრან პირველი დონის ბილეთების 60-80%, რაც თქვენს ადამიანურ გუნდს დაუტოვებს რთული, მაღალი ღირებულების ურთიერთობების დამყარებას.",
    ru: "Поддержка не должна быть центром затрат. ИИ-агенты могут мгновенно решать 60-80% тикетов первого уровня, оставляя вашей команде людей работу над сложным, высокоценным построением отношений."
  },

  // Dynamic Copy - Service
  dc_service_1: {
    en: "First impressions matter. Automating the intake, contract, and initial data collection process makes you look incredibly professional while saving hours of administrative overhead.",
    ka: "პირველ შთაბეჭდილებას მნიშვნელობა აქვს. მიღების, კონტრაქტისა და მონაცემთა საწყისი შეგროვების პროცესის ავტომატიზაცია წარმოუდგენლად პროფესიონალურად გამოგაჩენთ, ამასთან დაზოგავს ადმინისტრაციული ხარჯების საათებს.",
    ru: "Первое впечатление имеет значение. Автоматизация процесса приема, заключения контрактов и первоначального сбора данных делает вас невероятно профессиональными, экономя часы административных накладных расходов."
  },
  dc_service_2: {
    en: "Service businesses hit a ceiling when the founder runs out of hours. AI allows you to productize your methodology, turning bespoke services into scalable, repeatable systems.",
    ka: "სერვისის ბიზნესი აღწევს ჭერს, როდესაც დამფუძნებელს ეწურება საათები. AI საშუალებას გაძლევთ მოახდინოთ თქვენი მეთოდოლოგიის პროდუქტიზაცია, გადააქციოთ შეკვეთილი სერვისები მასშტაბირებად, განმეორებად სისტემებად.",
    ru: "Сервисный бизнес достигает потолка, когда у основателя заканчиваются часы. ИИ позволяет вам продуктизировать вашу методологию, превращая индивидуальные услуги в масштабируемые, повторяемые системы."
  },
  dc_service_3: {
    en: "If your team is copying and pasting data between systems, you are burning margin. AI and automation tools can seamlessly connect your CRM, project management, and billing.",
    ka: "თუ თქვენი გუნდი აკოპირებს და სვამს მონაცემებს სისტემებს შორის, თქვენ წვავთ მარჟას. AI და ავტომატიზაციის ინსტრუმენტებს შეუძლიათ შეუფერხებლად დააკავშირონ თქვენი CRM, პროექტების მართვა და ბილინგი.",
    ru: "Если ваша команда копирует и вставляет данные между системами, вы сжигаете маржу. Инструменты ИИ и автоматизации могут легко связать вашу CRM, управление проектами и биллинг."
  },
  dc_service_4: {
    en: "Efficiency isn't about working harder; it's about removing friction. AI can draft reports, summarize meetings, and organize research, freeing your team to do the actual strategic work.",
    ka: "ეფექტურობა არ ნიშნავს უფრო მეტ მუშაობას; ეს ნიშნავს ხახუნის მოცილებას. AI-ს შეუძლია შეადგინოს ანგარიშები, შეაჯამოს შეხვედრები და მოაწყოს კვლევა, გაათავისუფლოს თქვენი გუნდი რეალური სტრატეგიული სამუშაოს შესასრულებლად.",
    ru: "Эффективность — это не значит работать усерднее; это значит устранять трение. ИИ может составлять отчеты, резюмировать встречи и организовывать исследования, освобождая вашу команду для реальной стратегической работы."
  },
  dc_service_5: {
    en: "When your best employee leaves, their knowledge shouldn't leave with them. AI-powered knowledge bases can capture and retrieve your agency's collective intelligence instantly.",
    ka: "როდესაც თქვენი საუკეთესო თანამშრომელი მიდის, მისი ცოდნა მასთან ერთად არ უნდა წავიდეს. AI-ზე დაფუძნებულ ცოდნის ბაზებს შეუძლიათ მყისიერად აღბეჭდონ და მოიძიონ თქვენი სააგენტოს კოლექტიური ინტელექტი.",
    ru: "Когда уходит ваш лучший сотрудник, его знания не должны уходить вместе с ним. Базы знаний на базе ИИ могут мгновенно фиксировать и извлекать коллективный интеллект вашего агентства."
  },

  // Dynamic Copy - E-commerce
  dc_ecom_1: {
    en: "WISMO (Where Is My Order) tickets shouldn't require human intervention. AI can handle order tracking, returns, and basic inquiries 24/7, dramatically reducing response times.",
    ka: "WISMO (სად არის ჩემი შეკვეთა) ბილეთები არ უნდა მოითხოვდეს ადამიანის ჩარევას. AI-ს შეუძლია გაუმკლავდეს შეკვეთების თვალყურის დევნებას, დაბრუნებას და ძირითად მოთხოვნებს 24/7, რაც მკვეთრად ამცირებს რეაგირების დროს.",
    ru: "Тикеты WISMO (Где мой заказ) не должны требовать вмешательства человека. ИИ может обрабатывать отслеживание заказов, возвраты и базовые запросы 24/7, значительно сокращая время ответа."
  },
  dc_ecom_2: {
    en: "Stockouts cost revenue; overstock costs capital. Predictive AI models can forecast demand with far greater accuracy than historical spreadsheets.",
    ka: "მარაგების ამოწურვა ღირს შემოსავალი; ჭარბი მარაგი ღირს კაპიტალი. პროგნოზირებად AI მოდელებს შეუძლიათ მოთხოვნის პროგნოზირება ბევრად უფრო დიდი სიზუსტით, ვიდრე ისტორიულ ცხრილებს.",
    ru: "Нехватка запасов стоит доходов; избыток запасов стоит капитала. Предиктивные модели ИИ могут прогнозировать спрос с гораздо большей точностью, чем исторические электронные таблицы."
  },
  dc_ecom_3: {
    en: "Batch-and-blast emails are dead. AI enables hyper-personalized product recommendations and dynamic pricing based on individual browsing behavior and purchase history.",
    ka: "ჯგუფური და მასობრივი ელფოსტა მკვდარია. AI იძლევა ჰიპერ-პერსონალიზებული პროდუქტის რეკომენდაციების და დინამიური ფასების შესაძლებლობას ინდივიდუალური დათვალიერების ქცევისა და შესყიდვების ისტორიის საფუძველზე.",
    ru: "Массовые рассылки мертвы. ИИ позволяет создавать гипер-персонализированные рекомендации продуктов и динамическое ценообразование на основе индивидуального поведения при просмотре и истории покупок."
  },
  dc_ecom_4: {
    en: "The gap between a placed order and a shipped package is filled with micro-inefficiencies. Automating the routing and fulfillment logic speeds up delivery and reduces errors.",
    ka: "განთავსებულ შეკვეთასა და გაგზავნილ პაკეტს შორის არსებული ხარვეზი სავსეა მიკრო-არაეფექტურობით. მარშრუტიზაციისა და შესრულების ლოგიკის ავტომატიზაცია აჩქარებს მიწოდებას და ამცირებს შეცდომებს.",
    ru: "Разрыв между размещенным заказом и отправленной посылкой заполнен микро-неэффективностью. Автоматизация логики маршрутизации и выполнения ускоряет доставку и снижает количество ошибок."
  },
  dc_ecom_5: {
    en: "You don't need more dashboards. You need an AI layer that can proactively tell you which products are trending, which campaigns are failing, and where your margin is leaking.",
    ka: "თქვენ არ გჭირდებათ მეტი დაფა. თქვენ გჭირდებათ AI ფენა, რომელსაც შეუძლია პროაქტიულად გითხრათ, რომელი პროდუქტებია ტრენდული, რომელი კამპანიები მარცხდება და სად ჟონავს თქვენი მარჟა.",
    ru: "Вам не нужно больше дашбордов. Вам нужен слой ИИ, который может проактивно сказать вам, какие продукты в тренде, какие кампании терпят неудачу и где утекает ваша маржа."
  },

  // Dynamic Copy - Internal
  dc_int_1: {
    en: "Data trapped in silos is useless. Modern integration platforms and AI can bridge the gap between legacy systems and modern tools without requiring a massive IT overhaul.",
    ka: "იზოლირებული მონაცემები უსარგებლოა. თანამედროვე ინტეგრაციის პლატფორმებს და AI-ს შეუძლიათ გადალახონ უფსკრული ძველ სისტემებსა და თანამედროვე ინსტრუმენტებს შორის მასიური IT რესტრუქტურიზაციის გარეშე.",
    ru: "Данные, запертые в разрозненных системах, бесполезны. Современные интеграционные платформы и ИИ могут преодолеть разрыв между устаревшими системами и современными инструментами, не требуя масштабной перестройки ИТ."
  },
  dc_int_2: {
    en: "If a process requires no human judgment, a human shouldn't be doing it. RPA and AI agents can handle invoice processing, data extraction, and routine approvals.",
    ka: "თუ პროცესი არ მოითხოვს ადამიანის განსჯას, ადამიანი არ უნდა აკეთებდეს მას. RPA და AI აგენტებს შეუძლიათ გაუმკლავდნენ ინვოისების დამუშავებას, მონაცემთა ამოღებას და რუტინულ დამტკიცებებს.",
    ru: "Если процесс не требует человеческого суждения, человек не должен его выполнять. RPA и ИИ-агенты могут обрабатывать счета, извлекать данные и выполнять рутинные утверждения."
  },
  dc_int_3: {
    en: "Imagine having an AI assistant trained on all your company's internal documents, policies, and historical data. It's like giving every employee a super-smart research assistant.",
    ka: "წარმოიდგინეთ, რომ გყავთ AI ასისტენტი, რომელიც გაწვრთნილია თქვენი კომპანიის ყველა შიდა დოკუმენტზე, პოლიტიკასა და ისტორიულ მონაცემებზე. ეს ჰგავს თითოეული თანამშრომლისთვის სუპერ-ჭკვიანი კვლევის ასისტენტის მიცემას.",
    ru: "Представьте себе ИИ-ассистента, обученного на всех внутренних документах, политиках и исторических данных вашей компании. Это как дать каждому сотруднику супер-умного помощника по исследованиям."
  },
  dc_int_4: {
    en: "Spreadsheets are great for prototyping, terrible for scaling. We can transition critical spreadsheet workflows into robust, automated internal applications.",
    ka: "ცხრილები შესანიშნავია პროტოტიპირებისთვის, საშინელია მასშტაბირებისთვის. ჩვენ შეგვიძლია გადავიტანოთ კრიტიკული ცხრილების სამუშაო პროცესები ძლიერ, ავტომატიზირებულ შიდა აპლიკაციებში.",
    ru: "Электронные таблицы отлично подходят для прототипирования, но ужасны для масштабирования. Мы можем перевести критические рабочие процессы электронных таблиц в надежные автоматизированные внутренние приложения."
  },
  dc_int_5: {
    en: "AI can analyze project timelines, team capacity, and historical performance to suggest the optimal allocation of your most expensive resource: your people.",
    ka: "AI-ს შეუძლია გააანალიზოს პროექტის ვადები, გუნდის შესაძლებლობები და ისტორიული შესრულება, რათა შემოგთავაზოთ თქვენი ყველაზე ძვირადღირებული რესურსის: თქვენი ხალხის ოპტიმალური განაწილება.",
    ru: "ИИ может анализировать сроки проектов, возможности команды и историческую производительность, чтобы предложить оптимальное распределение вашего самого дорогого ресурса: ваших людей."
  },

  // Dynamic Copy - Other
  dc_other_1: {
    en: "AI is moving fast. The key isn't to adopt everything, but to find the one or two high-leverage areas where AI can create an immediate, measurable impact on your bottom line.",
    ka: "AI სწრაფად მოძრაობს. მთავარია არა ყველაფრის მიღება, არამედ იმ ერთი ან ორი მაღალი ბერკეტის მქონე სფეროს პოვნა, სადაც AI-ს შეუძლია შექმნას მყისიერი, გაზომვადი გავლენა თქვენს საბოლოო შედეგზე.",
    ru: "ИИ развивается быстро. Ключ не в том, чтобы внедрять все подряд, а в том, чтобы найти одну или две области с высоким рычагом воздействия, где ИИ может оказать немедленное, измеримое влияние на вашу прибыль."
  },
  dc_other_2: {
    en: "Before spending thousands on custom development, most automation ideas can be validated in a weekend using no-code tools and off-the-shelf AI models.",
    ka: "სანამ ათასებს დახარჯავთ პერსონალურ განვითარებაზე, ავტომატიზაციის იდეების უმეტესობა შეიძლება დადასტურდეს შაბათ-კვირას no-code ინსტრუმენტებისა და მზა AI მოდელების გამოყენებით.",
    ru: "Прежде чем тратить тысячи на индивидуальную разработку, большинство идей автоматизации можно проверить за выходные с помощью инструментов no-code и готовых моделей ИИ."
  },
  dc_other_3: {
    en: "Technology should accelerate your business, not hold it back. Sometimes you just need an outside perspective to untangle the mess and chart a clear path forward.",
    ka: "ტექნოლოგიამ უნდა დააჩქაროს თქვენი ბიზნესი და არა შეაფერხოს იგი. ზოგჯერ უბრალოდ გჭირდებათ გარე პერსპექტივა, რათა გაშალოთ არეულობა და დასახოთ მკაფიო გზა წინ.",
    ru: "Технологии должны ускорять ваш бизнес, а не сдерживать его. Иногда вам просто нужен взгляд со стороны, чтобы распутать беспорядок и наметить четкий путь вперед."
  },
  dc_other_4: {
    en: "You can't fix what you can't see. We use process mapping and AI analysis to identify exactly where your operations are slowing down and costing you money.",
    ka: "თქვენ ვერ გამოასწორებთ იმას, რასაც ვერ ხედავთ. ჩვენ ვიყენებთ პროცესის რუკების შედგენას და AI ანალიზს, რათა ზუსტად დავადგინოთ, სად ნელდება თქვენი ოპერაციები და გიჯდებათ ფული.",
    ru: "Вы не можете исправить то, чего не видите. Мы используем картирование процессов и анализ ИИ, чтобы точно определить, где ваши операции замедляются и стоят вам денег."
  },
  dc_fallback: {
    en: "That's a meaningful place to be focusing. The challenges here are rarely about working harder, but about seeing the system clearly enough to know where a small change creates outsized leverage.",
    ka: "ეს არის მნიშვნელოვანი ადგილი ფოკუსირებისთვის. გამოწვევები აქ იშვიათად ეხება უფრო მეტ მუშაობას, არამედ სისტემის საკმარისად ნათლად დანახვას, რათა იცოდეთ სად ქმნის მცირე ცვლილება დიდ ბერკეტს.",
    ru: "Это значимое место для фокусировки. Проблемы здесь редко связаны с тем, чтобы работать усерднее, а скорее с тем, чтобы видеть систему достаточно ясно, чтобы знать, где небольшое изменение создает огромный рычаг."
  },
  
  // DiscoveryChat
  closeChat: {
    en: "Close chat",
    ka: "ჩატის დახურვა",
    ru: "Закрыть чат"
  },
  voiceInput: {
    en: "Voice Input",
    ka: "ხმოვანი შეყვანა",
    ru: "Голосовой ввод"
  },
  client: {
    en: "Client",
    ka: "კლიენტი",
    ru: "Клиент"
  },
  otherSpecify: {
    en: "Other (please specify)...",
    ka: "სხვა (გთხოვთ მიუთითოთ)...",
    ru: "Другое (пожалуйста, укажите)..."
  },
  submitSelection: {
    en: "Submit Selection",
    ka: "არჩევანის გაგზავნა",
    ru: "Отправить выбор"
  },
  practicalQuestions: {
    en: "A few practical questions.",
    ka: "რამდენიმე პრაქტიკული კითხვა.",
    ru: "Несколько практических вопросов."
  },
  practicalQuestionsDesc: {
    en: "These help me give you a more useful sense of what's realistic.",
    ka: "ეს მეხმარება მოგცეთ უფრო სასარგებლო წარმოდგენა იმაზე, თუ რა არის რეალისტური.",
    ru: "Это поможет мне дать вам более полезное представление о том, что реально."
  },
  budgetRange: {
    en: "What's your rough budget range for this kind of work?",
    ka: "რა არის თქვენი მიახლოებითი ბიუჯეტი ამ ტიპის სამუშაოსთვის?",
    ru: "Каков ваш примерный бюджет для такого рода работы?"
  },
  budget1: {
    en: "Under €5k",
    ka: "€5k-ზე ნაკლები",
    ru: "Менее €5k"
  },
  budget2: {
    en: "€5k–15k",
    ka: "€5k–15k",
    ru: "€5k–15k"
  },
  budget3: {
    en: "€15k–50k",
    ka: "€15k–50k",
    ru: "€15k–50k"
  },
  budget4: {
    en: "Open — let's talk first",
    ka: "ღიაა — მოდით ჯერ ვისაუბროთ",
    ru: "Открытый — давайте сначала поговорим"
  },
  timeline: {
    en: "When would you like to start seeing progress?",
    ka: "როდის გსურთ დაიწყოთ პროგრესის დანახვა?",
    ru: "Когда вы хотели бы начать видеть прогресс?"
  },
  timeline1: {
    en: "Right away",
    ka: "ახლავე",
    ru: "Прямо сейчас"
  },
  timeline2: {
    en: "Next 1–3 months",
    ka: "მომდევნო 1–3 თვეში",
    ru: "В ближайшие 1–3 месяца"
  },
  timeline3: {
    en: "Exploratory — no fixed timeline",
    ka: "საძიებო — ფიქსირებული ვადების გარეშე",
    ru: "Ознакомительный — без фиксированных сроков"
  },
  selectAllThatApply: {
    en: "Select all that apply:",
    ka: "აირჩიეთ ყველა შესაბამისი:",
    ru: "Выберите все подходящие варианты:"
  },
  discoverySession: {
    en: "Discovery Session",
    ka: "აღმოჩენის სესია",
    ru: "Ознакомительная сессия"
  },
  complete: {
    en: "Complete",
    ka: "დასრულებულია",
    ru: "Завершено"
  },
  text: {
    en: "Text",
    ka: "ტექსტი",
    ru: "Текст"
  },
  voice: {
    en: "Voice",
    ka: "ხმა",
    ru: "Голос"
  },
  voiceDiscovery: {
    en: "Voice Discovery",
    ka: "ხმოვანი აღმოჩენა",
    ru: "Голосовое ознакомление"
  },
  voiceDesc: {
    en: "Have a natural conversation with our AI consultant to explore your needs.",
    ka: "გქონდეთ ბუნებრივი საუბარი ჩვენს AI კონსულტანტთან თქვენი საჭიროებების შესასწავლად.",
    ru: "Проведите естественную беседу с нашим ИИ-консультантом, чтобы изучить ваши потребности."
  },
  agentVoice: {
    en: "Agent Voice:",
    ka: "აგენტის ხმა:",
    ru: "Голос агента:"
  },
  endCall: {
    en: "End Call",
    ka: "ზარის დასრულება",
    ru: "Завершить звонок"
  },
  startVoiceCall: {
    en: "Start Voice Call",
    ka: "ხმოვანი ზარის დაწყება",
    ru: "Начать голосовой звонок"
  },
  liveCaptions: {
    en: "Live Captions",
    ka: "ცოცხალი სუბტიტრები",
    ru: "Живые субтитры"
  },
  strategicBrief: {
    en: "Strategic Brief",
    ka: "სტრატეგიული ბრიფი",
    ru: "Стратегический бриф"
  },
  demoMode: {
    en: "Demo Mode:",
    ka: "დემო რეჟიმი:",
    ru: "Демо-режим:"
  },
  demoModeText: {
    en: "In a production environment, this brief would be automatically emailed to",
    ka: "საწარმოო გარემოში, ეს ბრიფი ავტომატურად გაიგზავნებოდა ელფოსტით",
    ru: "В рабочей среде этот бриф был бы автоматически отправлен по электронной почте на"
  },
  downloadToSave: {
    en: "Please use the download button below to save your copy.",
    ka: "გთხოვთ, გამოიყენოთ ჩამოტვირთვის ღილაკი ქვემოთ თქვენი ასლის შესანახად.",
    ru: "Пожалуйста, используйте кнопку загрузки ниже, чтобы сохранить вашу копию."
  },
  downloadPdf: {
    en: "Download PDF",
    ka: "PDF-ის ჩამოტვირთვა",
    ru: "Скачать PDF"
  },
  bookCallToExecute: {
    en: "Book a Call to Execute",
    ka: "დაჯავშნეთ ზარი შესასრულებლად",
    ru: "Забронировать звонок для выполнения"
  },
  providedPracticalDetails: {
    en: "Provided practical details.",
    ka: "მოწოდებულია პრაქტიკული დეტალები.",
    ru: "Предоставлены практические детали."
  },
  sourcesAnalyzed: {
    en: "Sources analyzed:",
    ka: "გაანალიზებული წყაროები:",
    ru: "Проанализированные источники:"
  },
  letsGetContext: {
    en: "Let's get some context.",
    ka: "მოდით მივიღოთ გარკვეული კონტექსტი.",
    ru: "Давайте получим некоторый контекст."
  },
  yourName: {
    en: "Your Name",
    ka: "თქვენი სახელი",
    ru: "Ваше имя"
  },
  emailAddress: {
    en: "Email Address",
    ka: "ელფოსტის მისამართი",
    ru: "Адрес электронной почты"
  },
  companyName: {
    en: "Company Name",
    ka: "კომპანიის სახელი",
    ru: "Название компании"
  },
  websiteUrl: {
    en: "Website URL",
    ka: "ვებსაიტის URL",
    ru: "URL веб-сайта"
  },
  linkedinProfile: {
    en: "LinkedIn Profile",
    ka: "LinkedIn პროფილი",
    ru: "Профиль LinkedIn"
  },
  continueConversation: {
    en: "Continue conversation",
    ka: "საუბრის გაგრძელება",
    ru: "Продолжить разговор"
  },
  skipForNow: {
    en: "Skip for now",
    ka: "გამოტოვება ჯერჯერობით",
    ru: "Пока пропустить"
  },
  budgetAndTimeline: {
    en: "Budget & Timeline",
    ka: "ბიუჯეტი და ვადები",
    ru: "Бюджет и сроки"
  },
  whatIsBudget: {
    en: "What is your approximate budget for this initiative?",
    ka: "რა არის თქვენი მიახლოებითი ბიუჯეტი ამ ინიციატივისთვის?",
    ru: "Каков ваш примерный бюджет для этой инициативы?"
  },
  whenToStart: {
    en: "When are you looking to start?",
    ka: "როდის აპირებთ დაწყებას?",
    ru: "Когда вы планируете начать?"
  },
  synthesizingInsights: {
    en: "Synthesizing Insights...",
    ka: "ინსაითების სინთეზირება...",
    ru: "Синтез инсайтов..."
  },
  generateStrategicBrief: {
    en: "Generate Strategic Brief",
    ka: "სტრატეგიული ბრიფის გენერირება",
    ru: "Создать стратегический бриф"
  },
  listening: {
    en: "Listening...",
    ka: "გისმენთ...",
    ru: "Слушаю..."
  },
  typeResponse: {
    en: "Type your response...",
    ka: "აკრიფეთ თქვენი პასუხი...",
    ru: "Введите ваш ответ..."
  },
  preferToTalk: {
    en: "Prefer to talk directly?",
    ka: "გირჩევნიათ პირდაპირ საუბარი?",
    ru: "Предпочитаете поговорить напрямую?"
  },
  book30Min: {
    en: "Book 30 minutes",
    ka: "დაჯავშნეთ 30 წუთი",
    ru: "Забронировать 30 минут"
  },
  preparedFor: {
    en: "Prepared for",
    ka: "მომზადებულია",
    ru: "Подготовлено для"
  },
  at: {
    en: "at",
    ka: "კომპანიაში",
    ru: "в"
  },
  generatedBy: {
    en: "Generated by AI Automation & Operations Architect",
    ka: "გენერირებულია AI Automation & Operations Architect-ის მიერ",
    ru: "Сгенерировано AI Automation & Operations Architect"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof Translations) => {
    return translations[key]?.[language] || translations[key]?.['en'] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
