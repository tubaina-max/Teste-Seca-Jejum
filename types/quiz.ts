export interface SocialProof {
  mainImage?: string // Primary image for the social proof block
  text: string // Main text/quote for the social proof
  secondaryImages?: string[] // Additional images for the social proof block
}

export interface QuizOption {
  label: string
  value: string
  description?: string
  image?: string
  emoji?: string
  category?: string // Adicionado para categorização de opções
  categoryEmoji?: string // Adicionado para o emoji da categoria
}

export interface QuizStep {
  id: string
  question: string
  type: "single-choice" | "multiple-choice" | "slider" | "input"
  options?: QuizOption[]
  min?: number
  max?: number
  defaultValue?: number
  unit?: string
  sliderLabel?: string
  placeholder?: string
  insight?: string
  socialProof?: SocialProof
}

export interface QuizData {
  [key: string]: any
}
