import type { QuizStep } from "@/types/quiz"

export const quizSteps: QuizStep[] = [
  // 1 - Descubra seu tipo de Jejum intermitente ideal (já está na landing page)

  // 2 - Qual é o seu principal objetivo?
  {
    id: "main-objective",
    question: "Qual é o seu principal objetivo?",
    type: "single-choice",
    options: [
      {
        label: "Perder peso",
        value: "weight-loss",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-woman-showcasing-a-two_QbAUOafwRHSw70sAGWpQQQ_e0QoxTLvRDirOl-XtvMzlA.jpeg",
      },
      {
        label: "Ficar em forma",
        value: "get-fit",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-focuses-on-the-powerful-tor_Z4FHeIdxQeSPdmxzgDRLRg_nw4SdWjBQx-0HK9IjKRUMg.jpeg",
      },
      {
        label: "Melhorar a saúde do coração",
        value: "heart-health",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-professional-portrait-photograph-showc_bMz6RWw3QtqfBDKESMmEKw_fekGZM17SXuAI7ejX6MYYQ.jpeg",
      },
      {
        label: "Aliviar o estresse",
        value: "stress-relief",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-vibrant-portrait-photograph-captures-a_xadpjavsTOiUzia64vzkVQ_2lF6PnPsTnCXBRtFgYWCPw.jpeg",
      },
    ],
  },

  // 3 - Escolha o tamanho da sua roupa?
  {
    id: "current-size",
    question: "Escolha o tamanho da sua roupa?",
    type: "single-choice",
    options: [
      {
        label: "PP",
        value: "pp",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-young-woman-with-long-_yDErrPmjTaK1MN8GcSkyjw_1o01mK7OSRmMUdzUCU2N1w.jpeg",
      },
      {
        label: "P",
        value: "p",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-young-woman-with-long-_cxs0uMoxQzOrZQGyQkYYWg_1o01mK7OSRmMUdzUCU2N1w.jpeg",
      },
      {
        label: "M",
        value: "m",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-confident-woman-with-w_co1K3M78SmqUTf2qfzLcYA_oCu5EmseS-qAgeCtI4U4cQ.jpeg",
      },
      {
        label: "G",
        value: "g",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-confident-woman-with-w_HJcLKNlRSKKHFm3MIswJ7Q_Bu33yAxDSs67Z6oKXZAotA.jpeg",
      },
      {
        label: "GG",
        value: "gg",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-imagem-mostra-uma-mulher-com-fisico-cu_8ceyzEKPTRCek4A04MsZsw_crl3f2QGSjmdbE7ymphidA.jpeg",
      },
      {
        label: "XGG",
        value: "xgg",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/08/Black-White-Beige-Grey-Minimalist-Simple-Modern-Photo-Collage-Instagram-Post.png",
      },
    ],
  },

  // 4 - Escolha o tamanho que você quer usar?
  {
    id: "desired-size",
    question: "Escolha o tamanho que você quer usar?",
    type: "single-choice",
    options: [
      {
        label: "PP",
        value: "pp",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-imagem-mostra-uma-mulher-com-um-fisico_7ToSL1XuQF-GRgkcmuAUUg_r8DfHEwJQ7yLjMhwZ0aOTA.jpeg",
      },
      {
        label: "P",
        value: "p",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-imagem-mostra-uma-mulher-jovem-e-sorri_2B7awq7yRSq50POz_EXK3A_1o01mK7OSRmMUdzUCU2N1w.jpeg",
      },
      {
        label: "M",
        value: "m",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-confident-woman-with-d_qtHvitNlT-ibWDrgq63rcQ_oCu5EmseS-qAgeCtI4U4cQ.jpeg",
      },
      {
        label: "G",
        value: "g",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-showcases-a-confident-woman_r1ahqajHRRqm2q9-VpJEdg_crl3f2QGSjmdbE7ymphidA.jpeg",
      },
      {
        label: "GG",
        value: "gg",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-of-a-woman-with-a-curvy-fig_ABdaYM9uQZOt1K7sdHc_rw_crl3f2QGSjmdbE7ymphidA-1.jpeg",
      },
      {
        label: "XGG",
        value: "xgg",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-imagem-mostra-uma-mulher-com-fisico-cu_bSBTELU5STmR1EJLSJjSlA_crl3f2QGSjmdbE7ymphidA.jpeg",
      },
    ],
  },

  // 5 - Você tem dificuldade para escolher suas roupas com seu peso atual?
  {
    id: "clothes-difficulty",
    question: "Você tem dificuldade para escolher suas roupas com seu peso atual?",
    type: "single-choice",
    options: [
      { label: "Quase sempre", value: "almost-always" },
      { label: "Às vezes", value: "sometimes" },
      { label: "Raramente", value: "rarely" },
      { label: "Nunca", value: "never" },
    ],
  },

  // 6 - Vestindo roupas antigas novamente
  {
    id: "transformation-story",
    question: "Vestindo roupas esquecidas",
    type: "single-choice",
    options: [{ label: "Continuar", value: "continue" }],
    socialProof: {
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Body-B9juEAuPht5oSTMhtLtLbJLR1xeKMb.png",
      secondaryImages: [
        "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/blue-gradient-travel-Presentation-169.png",
      ],
    },
    insight: "Histórias como a da Manuela mostram que é possível! Vamos criar seu plano personalizado.",
  },

  // 7 - Quais áreas do corpo você quer focar?
  {
    id: "focus-areas",
    question: "Quais áreas do corpo você quer focar?",
    type: "multiple-choice",
    options: [
      {
        label: "Barriga",
        value: "belly",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-imagem-mostra-o-torso-de-uma-pessoa-em_D1v2d1vzS1-YaEyqH1go4g_tAHRg6ghSlaVkvixI-eeBw.jpeg",
      },
      {
        label: "Bunda",
        value: "butt",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-photograph-showcases-a-woman-s-back-el_kN-nOhBITIilHDNiOQdFLA_LiQ1Mt16T9alx6mbkKnKTw.jpeg",
      },
      {
        label: "Peito",
        value: "chest",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-soft-natural-light-photograph-showcase_a7gILYuPSmS6FsIoNNS-xg_7L_dwBpVR2WzY-LMgY7Rkg-e1753983078439.jpeg",
      },
      {
        label: "Pernas",
        value: "legs",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-minimalist-fine-art-photograph-showcas_P6oCcnuvT0mxt8zM_OFbGw_Ei0oAYAAQQe3bEb0Cn2vjA.jpeg",
      },
    ],
  },

  // 8 - O que mais te descreve?
  {
    id: "main-challenge",
    question: "O que mais te descreve?",
    type: "single-choice",
    options: [
      { label: "Tenho dificuldade em ganhar músculos", value: "muscle-gain", emoji: "😳" },
      { label: "Eu ganho e perco peso sem esforço", value: "weight-fluctuation", emoji: "💪" },
      { label: "Eu ganho peso facilmente, mas tenho dificuldade para perder", value: "weight-loss", emoji: "😬" },
    ],
    insight: "Entendi seu perfil metabólico! Isso vai influenciar diretamente seu plano de jejum.",
  },

  // 9 - Faz quanto tempo que você se sentiu na sua melhor forma?
  {
    id: "best-shape-time",
    question: "Faz quanto tempo que você se sentiu na sua melhor forma?",
    type: "single-choice",
    options: [
      { label: "0 a 6 meses atrás", value: "0-6-months" },
      { label: "7 a 12 meses atrás", value: "7-12-months" },
      { label: "1 a 3 anos atrás", value: "1-3-years" },
      { label: "Mais de 3 anos atrás", value: "3-plus-years" },
    ],
    insight: "Essa informação é crucial para definir a intensidade ideal do seu jejum!",
  },

  // 10 - O que você sabe sobre o jejum intermitente?
  {
    id: "knowledge",
    question: "O que você sabe sobre o jejum intermitente?",
    type: "single-choice",
    options: [
      { label: "Não sei nada", value: "nothing", emoji: "🤔" },
      { label: "Já ouvi falar um pouco", value: "little", emoji: "🤷‍♂️" },
      { label: "Entendo bastante", value: "much", emoji: "😎" },
    ],
    insight: "Perfeito! Vamos personalizar sua jornada baseada no seu nível de conhecimento atual.",
  },

  // 11 - Quando foi a última vez que você se sentiu desejada?
  {
    id: "last-desired",
    question: "Quando foi a última vez que você se sentiu desejada?",
    type: "single-choice",
    options: [
      { label: "Eu me sinto desejada o tempo todo", value: "always" },
      { label: "De vez em quando, eu me sinto desejada", value: "sometimes" },
      { label: "Já faz alguns anos, quando eu era mais magra", value: "years-ago" },
      { label: "Não me lembro da última vez que me senti assim", value: "dont-remember" },
    ],
  },

  // 12 - Aumente o seu libido
  {
    id: "libido-boost",
    question: "Desperte Sua Energia Íntima: Como a Perda de Peso Reacende Sua Libido Naturalmente",
    type: "single-choice",
    options: [{ label: "Continuar", value: "continue" }],
    socialProof: {
      mainImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/g1.png",
      text: "Quando você perde peso de forma saudável, seu corpo naturalmente equilibra os hormônios responsáveis pelo desejo e bem-estar.",
    },
    insight: "O jejum intermitente pode melhorar significativamente seus níveis hormonais e energia!",
  },

  // 13 - Quando você costuma tomar seu café da manhã?
  {
    id: "breakfast-time",
    question: "Quando você costuma tomar seu café da manhã?",
    type: "single-choice",
    options: [
      {
        label: "Entre 6 e 8 da manhã",
        value: "6-8",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/f3d86503-225e-419e-a2f1-5ed00e6806fe.png",
      },
      {
        label: "Entre 8 e 10 da manhã",
        value: "8-10",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/090b795a-0356-4790-afa1-58c6566a39c3.png",
      },
      {
        label: "Entre 10h e meio-dia",
        value: "10-12",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/f7c5d183-97f9-41a2-9a74-1b9320cabfbc.png",
      },
      {
        label: "Eu costumo pular o café da manhã",
        value: "skip",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/b51ff6c9-6923-4be7-8cf8-a583bdfc239a.png",
      },
    ],
  },

  // 14 - Quando você costuma almoçar?
  {
    id: "lunch-time",
    question: "Quando você costuma almoçar?",
    type: "single-choice",
    options: [
      {
        label: "Entre 10h e meio-dia",
        value: "10-12",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/b288d43f-7182-4f99-8703-9c932a989e53.png",
      },
      {
        label: "Entre meio-dia e 14h",
        value: "12-14",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/bba1af31-3b23-4b0b-9767-51d96351881b.png",
      },
      {
        label: "Entre 14h e 16h",
        value: "14-16",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/ae190bf8-79f9-4b6f-b580-fcd7699febf5.png",
      },
      {
        label: "Eu costumo pular o almoço",
        value: "skip",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/11857cfc-0157-46f5-bb95-26c2bcc47703.png",
      },
    ],
  },

  // 15 - Quando você janta?
  {
    id: "dinner-time",
    question: "Quando você janta?",
    type: "single-choice",
    options: [
      {
        label: "Entre 16h e 18h",
        value: "16-18",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/73e41cdc-09f2-4885-ae08-29a803bb1340.png",
      },
      {
        label: "Entre 18h e 20h",
        value: "18-20",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/e3584f79-99b0-41ce-9e66-872a0b1ab6a6.png",
      },
      {
        label: "Entre 20h e 22h",
        value: "20-22",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/f66d23d7-53c5-460b-ad8a-a9b31eea2546.png",
      },
      {
        label: "Eu costumo pular o jantar",
        value: "skip",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/11857cfc-0157-46f5-bb95-26c2bcc47703.png",
      },
    ],
  },

  // 16 - Você tem alguma restrição alimentar?
  {
    id: "dietary-restrictions",
    question: "Você tem alguma restrição alimentar?",
    type: "multiple-choice",
    options: [
      { label: "Sem lactose", value: "lactose-free", description: "Eu não consumo alimentos com lactose" },
      { label: "Sem glúten", value: "gluten-free", description: "Eu evito grãos com glúten" },
      { label: "Vegetariano", value: "vegetarian", description: "Eu não como carne" },
      { label: "Vegano", value: "vegan", description: "Eu não consumo produto de origem animal" },
      { label: "Nenhum peixe", value: "no-fish", description: "Não como nenhum tipo de peixe" },
      { label: "Nenhuma das opções", value: "none", description: "Eu como quase tudo" },
    ],
  },

  // 17 - Escolha as comidas que você gosta (Etapa 16 na contagem do usuário)
  {
    id: "food-preferences",
    question: "Escolha as comidas que você gosta",
    type: "multiple-choice",
    options: [
      { label: "Tomate", value: "tomato", category: "Vegetais", categoryEmoji: "🥬" },
      { label: "Pepino", value: "cucumber", category: "Vegetais", categoryEmoji: "🥬" },
      { label: "Cebola", value: "onion", category: "Vegetais", categoryEmoji: "🥬" },
      { label: "Pimentão", value: "pepper", category: "Vegetais", categoryEmoji: "🥬" },
      { label: "Cenoura", value: "carrot", category: "Vegetais", categoryEmoji: "🥬" },
      { label: "Alface", value: "lettuce", category: "Vegetais", categoryEmoji: "🥬" },

      { label: "Arroz", value: "rice", category: "Grãos e Pães", categoryEmoji: "🍞" },
      { label: "Espaguete", value: "spaghetti", category: "Grãos e Pães", categoryEmoji: "🍞" },
      { label: "Pão integral", value: "whole-wheat-bread", category: "Grãos e Pães", categoryEmoji: "🍞" },
      { label: "Cuscuz", value: "couscous", category: "Grãos e Pães", categoryEmoji: "🍞" },

      { label: "Ovo", value: "egg", category: "Carnes e ovos", categoryEmoji: "🍗" },
      { label: "Frango", value: "chicken", category: "Carnes e ovos", categoryEmoji: "🍗" },

      { label: "Salmão", value: "salmon", category: "Peixe", categoryEmoji: "🐟" },
      { label: "Atum", value: "tuna", category: "Peixe", categoryEmoji: "🐟" },
      { label: "Tilápia", value: "tilapia", category: "Peixe", categoryEmoji: "🐟" },
      { label: "Camarão", value: "shrimp", category: "Peixe", categoryEmoji: "🐟" },

      { label: "Leite", value: "milk", category: "Lacticínio", categoryEmoji: "🥛" },
      { label: "Queijo", value: "cheese", category: "Lacticínio", categoryEmoji: "🥛" },
      { label: "Iogurte", value: "yogurt", category: "Lacticínio", categoryEmoji: "🥛" },
      { label: "Requeijão", value: "cream-cheese", category: "Lacticínio", categoryEmoji: "🥛" },

      { label: "Maçã", value: "apple", category: "Frutas", categoryEmoji: "🍎" },
      { label: "Banana", value: "banana", category: "Frutas", categoryEmoji: "🍎" },
      { label: "Laranja", value: "orange", category: "Frutas", categoryEmoji: "🍎" },
      { label: "Morango", value: "strawberry", category: "Frutas", categoryEmoji: "🍎" },
      { label: "Manga", value: "mango", category: "Frutas", categoryEmoji: "🍎" },
      { label: "Abacate", value: "avocado", category: "Frutas", categoryEmoji: "🍎" },
    ],
  },

  // 18 - Você prefere cozinhar, comer fora ou pedir comida?
  {
    id: "cooking-preference",
    question: "Você prefere cozinhar, comer fora ou pedir comida?",
    type: "single-choice",
    options: [
      {
        label: "Cozinhar em casa",
        value: "cook",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/5b55df79-4a5c-428f-ae14-160c2550b2ea.png",
      },
      {
        label: "Eu prefiro ir a um restaurante",
        value: "restaurant",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/9dde8e32-1c2d-43c9-a4be-b10423e8626d.png",
      },
      {
        label: "Gosto de pedir comida",
        value: "delivery",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/5e3088d9-ac8c-48d8-8ea2-9df6f9def874.png",
      },
      { label: "Eu faço um pouco de tudo", value: "mixed", emoji: "😊" },
    ],
  },

  // 19 - Você precisa de uma pausa no Jejum para o final de semana?
  {
    id: "weekend-break",
    question: "Você precisa de uma pausa no Jejum para o final de semana?",
    type: "single-choice",
    options: [
      { label: "Claro que sim! Final de semana é para curtir", value: "yes", emoji: "👌" },
      { label: "Não paro nem no fim de semana!", value: "no", emoji: "💪" },
    ],
  },

  // 20 - Com que frequência você se exercita?
  {
    id: "exercise-frequency",
    question: "Com que frequência você se exercita?",
    type: "single-choice",
    options: [
      { label: "Quase todos os dias", value: "daily" },
      { label: "Várias vezes por semana", value: "several-times" },
      { label: "Várias vezes por mês", value: "monthly" },
      { label: "Nunca", value: "never" },
    ],
  },

  // 21 - Sua família e amigos apoiam você para manter a forma?
  {
    id: "family-support",
    question: "Sua família e amigos apoiam você para manter a forma?",
    type: "single-choice",
    options: [
      { label: "Eu sempre me sinto apoiado pela minha família e amigos", value: "always-supported", emoji: "🥰" },
      { label: "Às vezes me sinto apoiado, mas nem sempre", value: "sometimes-supported", emoji: "😔" },
      { label: "Não sinto muito apoio deles", value: "not-supported", emoji: "💔" },
    ],
  },

  // 22 - Como é a sua rotina de trabalho?
  {
    id: "work-routine",
    question: "Como é a sua rotina de trabalho?",
    type: "single-choice",
    options: [
      { label: "das 09:00 às 18:00", value: "9-18" },
      { label: "Turnos noturnos", value: "night-shifts" },
      { label: "Meu horário é flexível", value: "flexible" },
      { label: "Estou aposentada", value: "retired" },
    ],
  },

  // 23 - Como você descreve o seu dia a dia?
  {
    id: "daily-activity",
    question: "Como você descreve o seu dia a dia?",
    type: "single-choice",
    options: [
      { label: "Eu passo a maior parte do dia sentado", value: "sedentary", emoji: "💻" },
      { label: "Um pouco sentado e um pouco caminhando", value: "mixed", emoji: "🧘‍♀️" },
      { label: "Fico em pé o dia todo", value: "standing", emoji: "🏃‍♀️" },
    ],
  },

  // 24 - Dinheiro e peso: um impacto inesperado na sua carreira
  {
    id: "career-impact",
    question: "O Segredo que Ninguém Conta: Como Seu Peso Influencia Seu Sucesso Profissional",
    type: "single-choice",
    options: [{ label: "Continuar", value: "continue" }],
    socialProof: {
      mainImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/08/g1-2-1.png",
      text: "Um estudo da Universidade de Harvard e Stanford com 3.200 profissionais revelou que pessoas que mantêm um peso saudável têm 34% mais chances de receber promoções e relatam 67% mais confiança em apresentações e reuniões importantes.",
    },
    insight: "Estudos mostram que manter um peso saudável pode impactar positivamente sua carreira e autoestima!",
  },

  // 25 - Você fica sem fôlego depois de subir um lance de escadas?
  {
    id: "stairs-breathless",
    question: "Você fica sem fôlego depois de subir um lance de escadas?",
    type: "single-choice",
    options: [
      { label: "Fico tão sem fôlego que não consigo falar", value: "very-breathless", emoji: "😰" },
      { label: "Fico um pouco sem fôlego, mas consigo falar", value: "little-breathless", emoji: "💨" },
      { label: "Fico bem depois de um lance de escadas", value: "fine", emoji: "🙂" },
      { label: "Eu consigo subir alguns lances de escada facilmente", value: "easy", emoji: "🚀" },
    ],
  },

  // 26 - Com que frequência você sai para caminhar?
  {
    id: "walking-frequency",
    question: "Com que frequência você sai para caminhar?",
    type: "single-choice",
    options: [
      { label: "Quase todos os dias", value: "daily", emoji: "😎" },
      { label: "3 a 4 vezes por semana", value: "3-4-times", emoji: "💪" },
      { label: "1 a 2 vezes por semana", value: "1-2-times", emoji: "🙂" },
      { label: "Mais de uma vez por mês", value: "monthly", emoji: "👍" },
    ],
  },

  // 27 - Quantas horas você costuma dormir?
  {
    id: "sleep-hours",
    question: "Quantas horas você costuma dormir?",
    type: "single-choice",
    options: [
      { label: "Durmo pouco (menos de 5 horas)", value: "less-5" },
      { label: "Eu consigo dormir um pouco (5-6 horas)", value: "5-6" },
      { label: "Eu durmo muito e bem (7-8 horas)", value: "7-8" },
      { label: "Gosto de dormir até mais tarde (mais de 8 horas)", value: "more-8" },
    ],
  },

  // 28 - Qual é a sua ingestão diária de água?
  {
    id: "water-intake",
    question: "Qual é a sua ingestão diária de água?",
    type: "single-choice",
    options: [
      { label: "Eu só tomo café ou chá", value: "coffee-tea" },
      { label: "Cerca de 2 copos", value: "2-glasses" },
      { label: "2 a 6 copos", value: "2-6-glasses" },
      { label: "Mais de 6 copos", value: "more-6-glasses" },
    ],
  },

  // 29 - Você tem algum desses problemas?
  {
    id: "health-problems",
    question: "Você tem algum desses problemas?",
    type: "multiple-choice",
    options: [
      {
        label: "Joelhos sensíveis",
        value: "sensitive-knees",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/73a34c99-17b0-43cc-b207-84765c0d8439.png",
      },
      {
        label: "Costas sensíveis",
        value: "sensitive-back",
        image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/67eecb36-b6d4-4fb3-8e89-86903cad58c0.png",
      },
      {
        label: "Nenhuma das opções",
        value: "none",
        image:
          "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/descricao-da-pessoa-mulher-jovem-com-exp_hkhHNnqNTWeLqNUQ3h_KsQ__isfdPpeS7CqtoKbFSfoLQ.jpeg",
      },
    ],
  },

  // 30 - Você tem algum desses hábitos que podem estar atrapalhando sua vida?
  {
    id: "bad-habits",
    question: "Você tem algum desses hábitos que podem estar atrapalhando sua vida?",
    type: "multiple-choice",
    options: [
      { label: "Eu como tarde da noite", value: "late-eating", emoji: "💤" },
      { label: "Não consigo parar de comer doces", value: "sweets-addiction", emoji: "😊" },
      { label: "Eu amo refrigerantes", value: "love-sodas", emoji: "🥤" },
      { label: "Eu adoro alimentos gordurosos ou salgados", value: "fatty-salty", emoji: "🧂" },
      { label: "Nenhuma das opções", value: "none", emoji: "❌" },
    ],
  },

  // 31 - Algum desses acontecimentos fez você ganhar peso nos últimos anos?
  {
    id: "weight-gain-events",
    question: "Algum desses acontecimentos fez você ganhar peso nos últimos anos?",
    type: "multiple-choice",
    options: [
      { label: "Casamento ou relacionamento", value: "marriage", emoji: "👰‍♀️" },
      { label: "Rotina corrida com trabalho ou família", value: "busy-routine", emoji: "😓" },
      { label: "Dificuldades financeiras", value: "financial", emoji: "💰" },
      { label: "Lesão ou incapacidade", value: "injury", emoji: "🏥" },
      { label: "Estresse ou problemas de saúde mental", value: "stress", emoji: "😰" },
      { label: "Metabolismo mais lento devido a idade", value: "slow-metabolism", emoji: "🤷‍♀️" },
      { label: "Complicações pós-tratamentos", value: "post-treatment", emoji: "🩺" },
      { label: "Nenhuma das opções", value: "none", emoji: "❌" },
    ],
  },

  // 32 - Quão motivado você está para perder peso?
  {
    id: "motivation-level",
    question: "Quão motivado você está para perder peso?",
    type: "single-choice",
    options: [
      { label: "Estou tentando fazer o jejum apenas por curiosidade", value: "curious", emoji: "🤔" },
      { label: "Estou determinado a diminuir um ou dois tamanhos", value: "determined", emoji: "🤘" },
      { label: "Eu não vou parar até atingir meu peso ideal", value: "unstoppable", emoji: "🔥" },
    ],
  },

  // 33 - Qual é a sua altura?
  {
    id: "height",
    question: "Qual é a sua altura?",
    type: "slider",
    min: 140,
    max: 200,
    defaultValue: 170,
    unit: "cm",
    sliderLabel: "Arraste para selecionar a sua altura",
  },

  // 34 - Qual é o seu peso atual?
  {
    id: "current-weight",
    question: "Qual é o seu peso atual?",
    type: "slider",
    min: 40,
    max: 120,
    defaultValue: 75,
    unit: "kg",
    sliderLabel: "Arraste para selecionar o seu peso",
  },

  // 35 - Qual é o seu peso desejado?
  {
    id: "desired-weight",
    question: "Qual é o seu peso desejado?",
    type: "slider",
    min: 40,
    max: 120,
    defaultValue: 65,
    unit: "kg",
    sliderLabel: "Arraste para selecionar o seu peso desejado",
  },

  // 36 - Qual é a sua idade?
  {
    id: "age",
    question: "Qual é a sua idade?",
    type: "input",
    placeholder: "Digite sua idade aqui",
    insight: "Sua idade é um fator chave para personalizar seu plano de jejum. Estamos ajustando tudo para você!",
  },

  // 37 - Resumo do seu nível de condicionamento físico
  {
    id: "fitness-summary",
    question: "Descoberta Importante Sobre Seu Condicionamento Físico",
    type: "single-choice",
    options: [{ label: "Continuar", value: "continue" }],
    socialProof: {
      mainImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/08/Voce-esta-aqui.png",
      text: "Seu IMC revelou algo que 9 em 10 pessoas descobrem tarde demais: você está na 'Zona de Aceleração Reversa' - onde cada semana perdida torna a recuperação 3x mais difícil.",
    },
  },

  // 38 - Você tem algum evento importante chegando?
  {
    id: "upcoming-events",
    question: "Você tem algum evento importante chegando?",
    type: "single-choice",
    options: [
      { label: "Férias", value: "vacation", emoji: "✈️" },
      { label: "Casamento", value: "wedding", emoji: "👰‍♀️" },
      { label: "Feriado", value: "holiday", emoji: "🏖️" },
      { label: "Encontro de amigos", value: "friends-meeting", emoji: "🎂" },
      { label: "Aniversário", value: "birthday", emoji: "🎉" },
    ],
    insight: "Eventos importantes são ótimos motivadores! Seu plano será otimizado para te ajudar a brilhar.",
  },

  // 39 - O único plano que você precisa para entrar em forma
  {
    id: "plan-preview",
    question: "Seu Plano Exclusivo de Transformação Está Quase Pronto",
    type: "single-choice",
    options: [{ label: "Continuar", value: "continue" }],
    socialProof: {
      mainImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-photograph-of-a-woman-showcasing-a-two_QbAUOafwRHSw70sAGWpQQQ_e0QoxTLvRDirOl-XtvMzlA.jpeg",
      text: "Com base nas suas 39 respostas únicas, nosso algoritmo está finalizando um plano de jejum intermitente que já transformou mais de 15.000 mulheres como você! ",
    },
    insight: "Seu plano está quase pronto! Ele será o único que você precisará para atingir seus objetivos.",
  },
]
