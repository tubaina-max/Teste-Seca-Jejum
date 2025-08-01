"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Flame, Sparkles, TrendingUp, Heart, Brain, AlertTriangle } from "lucide-react"
import type { QuizAnswers, QuizOption } from "@/types/quiz" // Importe QuizStep também
import { quizSteps } from "@/data/quiz-steps"
import { useRouter } from "next/navigation"
import { useDynamicSteps } from "@/hooks/useDynamicSteps" // Importe useDynamicSteps
import { analyzeFitnessLevel, analyzePlan } from "@/utils/quizAnalysis" // Importe as funções de análise

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [showInsight, setShowInsight] = useState(false)
  const [liveUsers, setLiveUsers] = useState(127)
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([])
  const [showFinalLoading, setShowFinalLoading] = useState(false)
  const [isLoadingBMI, setIsLoadingBMI] = useState(false) // Estado para simular carregamento do IMC

  const router = useRouter()

  // Gerar etapas dinâmicas baseadas nas respostas
  const { step37, step39 } = useDynamicSteps(answers)

  // Combinar etapas estáticas com dinâmicas
  const allSteps = useMemo(() => {
    const steps = [...quizSteps]
    // Substituir etapa 37 (índice 36)
    if (step37) {
      steps[36] = step37
    }
    // Adicionar etapa 39 (plan-preview) como a penúltima etapa, antes da finalização
    // Se a etapa 39 for a última etapa do quiz, ela deve ser adicionada aqui.
    // Se a etapa 41 (creating-plan) for a última, a 39 deve vir antes dela.
    // Pelo seu `quiz-steps.ts` anterior, a etapa 41 é a última estática.
    // Então, a 39 deve ser inserida antes da 41.
    // A etapa 41 tem índice 37 no array `quizSteps` original (0-indexed).
    // Se a etapa 39 for inserida, ela se tornará o novo índice 37, e a 41 passará para 38.
    steps.splice(37, 0, step39) // Insere step39 no índice 37, empurrando o restante
    return steps
  }, [step37, step39])

  const currentQuizStep = allSteps[currentStep]

  // Função para preservar UTMs na navegação
  const navigateWithUTMs = (path: string) => {
    if (typeof window === "undefined") return
    const currentParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()

    // Preservar todos os parâmetros UTM e outros parâmetros de tracking
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "msclkid",
      "ttclid",
      "ref",
      "referrer",
      "source",
      "aid",
      "cid",
      "sid",
    ]

    trackingParams.forEach((param) => {
      const value = currentParams.get(param)
      if (value) {
        utmParams.set(param, value)
      }
    })

    const finalUrl = utmParams.toString() ? `${path}?${utmParams.toString()}` : path

    router.push(finalUrl)
  }

  // Initialize slider value when step changes
  useEffect(() => {
    if (currentQuizStep.type === "slider" && currentQuizStep.defaultValue) {
      setSliderValue(currentQuizStep.defaultValue)
    }
    if (currentQuizStep.type === "input") {
      setInputValue("")
    }

    // Handle BMI loading for fitness-summary step
    if (currentQuizStep.id === "fitness-summary") {
      setIsLoadingBMI(true)
      setTimeout(() => {
        setIsLoadingBMI(false)
      }, 1500) // Simulate 1.5 seconds of loading for BMI diagnosis
    } else {
      setIsLoadingBMI(false) // Ensure it's false for other steps
    }

    // Google Analytics event for quiz step view
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "quiz_step_view", {
        step_id: currentQuizStep.id,
        step_number: currentStep + 1,
        question: currentQuizStep.question,
      })
    }
  }, [currentStep, currentQuizStep])

  // Simulate live users counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const progress = ((currentStep + 1) / allSteps.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))

    // Google Analytics event for quiz answer
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "quiz_answer_submitted", {
        step_id: questionId,
        step_number: currentStep + 1,
        question: currentQuizStep.question,
        answer: JSON.stringify(answer),
      })
    }

    if (currentQuizStep.insight) {
      setShowInsight(true)
      setTimeout(() => {
        setShowInsight(false)
        nextStep()
      }, 2500)
    } else {
      nextStep()
    }
  }

  const handleMultipleChoice = (value: string) => {
    setSelectedMultiple((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const nextStep = () => {
    if (currentStep < allSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedMultiple([])
    } else {
      // CORREÇÃO PRINCIPAL: Preservar UTMs na navegação final
      setShowFinalLoading(true)
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "quiz_final_loading_started")
      }
      setTimeout(() => {
        navigateWithUTMs("/results") // Usando função que preserva UTMs
      }, 3000)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // --- BMI Calculation for Fitness Summary (Etapa 37) ---
  const { bmi, bmiCategory, bmiPosition } = useMemo(() => {
    const heightCm = answers["height"] as number
    const weightKg = answers["current-weight"] as number

    if (!heightCm || !weightKg) {
      return { bmi: 0, bmiCategory: "", bmiPosition: 0 }
    }

    const heightM = heightCm / 100
    const calculatedBmi = weightKg / (heightM * heightM)

    let category = ""
    let position = 0 // 0 to 100 for slider position

    // Define BMI categories and their approximate ranges for visual bar
    const BMI_UNDERWEIGHT_THRESHOLD = 18.5
    const BMI_NORMAL_THRESHOLD = 25
    const BMI_OVERWEIGHT_THRESHOLD = 30 // For "Obeso" visual range

    // Scale position across the 0-100 range of the bar
    const minBmiForBar = 15
    const maxBmiForBar = 40
    const scaledBmi = Math.max(minBmiForBar, Math.min(maxBmiForBar, calculatedBmi))
    position = ((scaledBmi - minBmiForBar) / (maxBmiForBar - minBmiForBar)) * 100

    if (calculatedBmi < BMI_UNDERWEIGHT_THRESHOLD) {
      category = "Abaixo do peso"
    } else if (calculatedBmi >= BMI_UNDERWEIGHT_THRESHOLD && calculatedBmi < BMI_NORMAL_THRESHOLD) {
      category = "Normal"
    } else if (calculatedBmi >= BMI_NORMAL_THRESHOLD && calculatedBmi < BMI_OVERWEIGHT_THRESHOLD) {
      category = "Sobrepeso"
    } else {
      category = "Obeso"
    }
    position = Math.min(100, Math.max(0, position)) // Clamp between 0 and 100

    return { bmi: calculatedBmi, bmiCategory: category, bmiPosition: position }
  }, [answers])

  // --- Mappings for Fitness Summary (Etapa 37) ---
  const lifestyleMap: { [key: string]: string } = {
    "always-supported": "Busca mudanças",
    "sometimes-supported": "Busca mudanças",
    "not-supported": "Busca mudanças",
  }

  const exerciseMap: { [key: string]: string } = {
    daily: "Exercício intenso",
    "several-times": "Exercício moderado",
    "3-4-times": "Exercício moderado",
    "1-2-times": "Exercício leve",
    monthly: "Exercício leve",
    never: "Sedentário",
  }

  const activityMap: { [key: string]: string } = {
    sedentary: "Sedentário",
    mixed: "Intermediário",
    standing: "Ativo",
  }

  // A análise do plano ainda é feita, mas a etapa 39 não será renderizada aqui
  const planAnalysis = useMemo(() => analyzePlan(answers), [answers])
  const fitnessAnalysis = useMemo(() => analyzeFitnessLevel(answers), [answers])

  if (showInsight && currentQuizStep.insight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Insight Personalizado</h3>
            <p className="text-gray-600 leading-relaxed">{currentQuizStep.insight}</p>
            <div className="mt-6">
              <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Analisando sua resposta...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showFinalLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Flame className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Criando o seu Plano Personalizado de Jejum</h2>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full animate-pulse"
                style={{ width: "94%" }}
              ></div>
            </div>

            <p className="text-lg font-semibold text-gray-700 mb-2">94%</p>
            <p className="text-gray-600 mb-6">Finalizando...</p>
            <p className="text-sm text-gray-500">
              Analisando suas {allSteps.length} respostas para criar seu protocolo único de jejum intermitente...
            </p>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-gray-800 mb-2">+15 mil mulheres</p>
              <p className="text-sm text-gray-600">já transformaram seus corpos com nossos planos personalizados...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={prevStep} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <Flame className="w-6 h-6 text-orange-500 mr-2" />
              <span className="text-xl font-bold text-gray-800">Plano A - Seca Jejum</span>
            </div>
            <div className="w-9"></div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">
                Etapa {currentStep + 1} de {allSteps.length}
              </span>
              <div className="flex items-center text-sm text-green-600">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>Análise gratuita</span>
              </div>
            </div>
          </div>

          {/* Live users indicator */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>{liveUsers} pessoas fazendo agora</span>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center leading-tight">
              {currentQuizStep.question}
            </h2>

            {/* Social Proof (se não for uma etapa dinâmica com renderização customizada) */}
            {currentQuizStep.socialProof && !currentQuizStep.isDynamic && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={currentQuizStep.socialProof.mainImage || "/placeholder.svg"}
                    alt="Social proof"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-gray-700 italic">"{currentQuizStep.socialProof.text}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Renderização customizada para Etapa 37 (Fitness Summary) */}
            {currentQuizStep.id === "fitness-summary" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Índice de massa corporal (IMC)</h3>
                <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-red-400"></div>
                  <div className="absolute inset-y-0 left-1/3 w-1/3 bg-green-400"></div>
                  <div className="absolute inset-y-0 left-2/3 w-1/3 bg-orange-400"></div>
                  {isLoadingBMI ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-gray-600 text-sm">
                      Calculando...
                    </div>
                  ) : (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-md whitespace-nowrap transition-all duration-1000 ease-out"
                      style={{ left: `${bmiPosition}%`, transform: "translateX(-50%)" }}
                    >
                      Você está aqui
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-600 px-2">
                    <span>Anormal</span>
                    <span>Normal</span>
                    <span>Obeso</span>
                  </div>
                </div>

                <Card className="p-4 bg-gray-50 border">
                  <p className="font-semibold text-gray-800 mb-1">Estilo de vida:</p>
                  <p className="text-sm text-gray-600">
                    {lifestyleMap[answers["family-support"] as string] || "Não informado"}
                  </p>
                </Card>
                <Card className="p-4 bg-gray-50 border">
                  <p className="font-semibold text-gray-800 mb-1">Nível de Exercício:</p>
                  <p className="text-sm text-gray-600">
                    {exerciseMap[answers["exercise-frequency"] as string] || "Não informado"}
                  </p>
                </Card>
                <Card className="p-4 bg-gray-50 border">
                  <p className="font-semibold text-gray-800 mb-1">Nível de atividade:</p>
                  <p className="text-sm text-gray-600">
                    {activityMap[answers["daily-activity"] as string] || "Não informado"}
                  </p>
                </Card>

                {/* Conditional warning message and image */}
                {(bmiCategory === "Abaixo do peso" || bmiCategory === "Sobrepeso" || bmiCategory === "Obeso") && (
                  <div className="text-center mt-8">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FireShot%20Capture%20107%20-%20SECA%20JEJUM%20-%20%5Bsecajejum.xquiz.io%5D-juVqIyEEKswb2Py5z7NxsvRANq6o65.png"
                      alt="Sua situação é preocupante"
                      className="w-full max-w-[300px] mx-auto rounded-lg shadow-lg object-cover mb-4"
                    />
                    <div className="bg-white rounded-lg p-4 shadow-sm border text-left">
                      <div className="flex items-start mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-gray-800">Sua situação é preocupante!</h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Parabéns por dar o primeiro passo. Vamos criar um plano personalizado para acelerar o seu
                        metabolismo, aumentar sua força e melhorar sua saúde.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Renderização customizada para Etapa 39 (Plan Preview) */}
            {currentQuizStep.id === "plan-preview" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Seu Plano Personalizado: Jejum {planAnalysis.fastingType} para {planAnalysis.objective}
                </h3>
                <img
                  src={planAnalysis.image || "/placeholder.svg"}
                  alt="Preview do Plano"
                  className="w-full rounded-lg shadow-lg object-cover mb-4"
                />
                <Card className="p-4 bg-gray-50 border">
                  <p className="font-semibold text-gray-800 mb-1">Duração Estimada:</p>
                  <p className="text-sm text-gray-600">{planAnalysis.timeline}</p>
                </Card>
                <Card className="p-4 bg-gray-50 border">
                  <p className="font-semibold text-gray-800 mb-1">Principais Benefícios:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {planAnalysis.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </Card>
                {currentQuizStep.insight && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="text-blue-700 text-sm">💡 {currentQuizStep.insight}</p>
                  </div>
                )}
              </div>
            )}

            {/* Opções (para tipos de pergunta padrão) */}
            {currentQuizStep.type === "single-choice" && !currentQuizStep.isDynamic && currentQuizStep.options && (
              <div className="space-y-3">
                {currentQuizStep.options?.map((option, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-green-400"
                    onClick={() => handleAnswer(currentQuizStep.id, option.value)}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      {option.image && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={option.image || "/placeholder.svg"}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {option.emoji && <div className="text-2xl flex-shrink-0">{option.emoji}</div>}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{option.label}</p>
                        {option.description && <p className="text-sm text-gray-600 mt-1">{option.description}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentQuizStep.type === "multiple-choice" && currentQuizStep.options && (
              <div className="space-y-6">
                {Object.entries(
                  currentQuizStep.options?.reduce(
                    (acc, option) => {
                      const category = option.category || "Outros"
                      if (!acc[category]) {
                        acc[category] = { emoji: option.categoryEmoji, options: [] }
                      }
                      acc[category].options.push(option)
                      return acc
                    },
                    {} as Record<string, { emoji?: string; options: QuizOption[] }>,
                  ) || {},
                ).map(([categoryName, categoryData]) => (
                  <div key={categoryName}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      {categoryData.emoji && <span className="mr-2">{categoryData.emoji}</span>}
                      {categoryName}
                    </h3>
                    <div
                      className={`grid gap-3 ${
                        currentQuizStep.id === "bad-habits" || currentQuizStep.id === "weight-gain-events"
                          ? "grid-cols-1"
                          : "grid-cols-2"
                      }`}
                    >
                      {categoryData.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`h-auto py-4 px-3 text-base font-medium rounded-lg border-2 transition-all duration-300 text-wrap ${
                            selectedMultiple.includes(option.value)
                              ? "border-green-400 bg-green-50 text-green-800"
                              : "border-gray-200 hover:border-green-400 hover:bg-green-50"
                          }`}
                          onClick={() => handleMultipleChoice(option.value)}
                        >
                          <div className="flex flex-col items-center justify-center text-center w-full">
                            {option.image && (
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mb-2">
                                <img
                                  src={option.image || "/placeholder.svg"}
                                  alt={option.label}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            {option.emoji && <div className="text-2xl mb-2">{option.emoji}</div>}
                            <span className="text-sm font-medium text-gray-800">{option.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => handleAnswer(currentQuizStep.id, selectedMultiple)}
                  disabled={selectedMultiple.length === 0}
                >
                  Continuar
                </Button>
              </div>
            )}

            {currentQuizStep.type === "slider" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {sliderValue}
                    <span className="text-lg text-gray-500 ml-1">{currentQuizStep.unit}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={currentQuizStep.min}
                      max={currentQuizStep.max}
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{currentQuizStep.sliderLabel}</p>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => handleAnswer(currentQuizStep.id, sliderValue)}
                >
                  Continuar
                </Button>
              </div>
            )}

            {currentQuizStep.type === "input" && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={currentQuizStep.placeholder}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-center text-lg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => handleAnswer(currentQuizStep.id, inputValue)}
                  disabled={!inputValue.trim()}
                >
                  Enviar
                </Button>
              </div>
            )}
          </div>

          {/* Value reinforcement */}
          {currentStep % 5 === 0 && currentStep > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 text-center mb-6">
              <TrendingUp className="w-5 h-5 mx-auto mb-2" />
              <p className="text-sm font-medium">
                🎯 Sua análise está ficando mais precisa!
                <br />
                <span className="text-blue-100">
                  Dados coletados: {currentStep + 1}/{allSteps.length}
                </span>
              </p>
            </div>
          )}

          {/* Social proof testimonial */}
          {currentStep === Math.floor(allSteps.length / 2) && (
            <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 italic">
                    "Este teste mudou minha vida! Finalmente entendi meu corpo."
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- Maria, 34 anos</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
