"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Flame, Sparkles, TrendingUp, Heart, Brain } from "lucide-react"
import type { QuizData, QuizOption } from "@/types/quiz"
import { quizSteps } from "@/data/quiz-steps"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizData>({})
  const [showInsight, setShowInsight] = useState(false)
  const [liveUsers, setLiveUsers] = useState(127)
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([])
  const [showFinalLoading, setShowFinalLoading] = useState(false)
  
  const router = useRouter()

  // ✅ Função para preservar UTMs na navegação
  const navigateWithUTMs = (path: string) => {
    if (typeof window === "undefined") return

    const currentParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()
    
    // Preservar todos os parâmetros UTM e outros parâmetros de tracking
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'fbclid', 'msclkid', 'ttclid',
      'ref', 'referrer', 'source', 'aid', 'cid', 'sid',
    ]
    
    trackingParams.forEach(param => {
      const value = currentParams.get(param)
      if (value) {
        utmParams.set(param, value)
      }
    })
    
    const finalUrl = utmParams.toString() 
      ? `${path}?${utmParams.toString()}`
      : path
    
    router.push(finalUrl)
  }

  // ✅ USEEFFECT OTIMIZADO - SEM SCRIPTS DUPLICADOS
  useEffect(() => {
    const currentQuizStep = quizSteps[currentStep]
    if (currentQuizStep.type === "slider" && currentQuizStep.defaultValue) {
      setSliderValue(currentQuizStep.defaultValue)
    }
    if (currentQuizStep.type === "input") {
      setInputValue("")
    }

    // 🎯 TRACKING UNIFICADO - Quiz Step View
    if (typeof window !== "undefined" && window.trackEvent) {
      window.trackEvent('ViewContent', {
        content_name: `Quiz Step: ${currentQuizStep.question}`,
        content_category: 'quiz_step',
        step_id: currentQuizStep.id,
        step_number: currentStep + 1,
        question: currentQuizStep.question,
        value: 0,
        currency: 'BRL'
      });
      console.log(`✅ Quiz Step ${currentStep + 1} - ViewContent disparado`);
    }
  }, [currentStep])

  // Simulate live users counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentQuizStep = quizSteps[currentStep]
  const progress = ((currentStep + 1) / quizSteps.length) * 100

  // ✅ FUNÇÃO OTIMIZADA - handleAnswer
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))

    // 🎯 TRACKING UNIFICADO - Quiz Answer
    if (typeof window !== "undefined" && window.trackEvent) {
      window.trackEvent('ViewContent', {
        content_name: `Quiz Answer: ${currentQuizStep.question}`,
        content_category: 'quiz_answer',
        step_id: questionId,
        step_number: currentStep + 1,
        question: currentQuizStep.question,
        answer: JSON.stringify(answer),
        value: 0,
        currency: 'BRL'
      });
      console.log(`✅ Quiz Answer ${currentStep + 1} - ViewContent disparado:`, answer);
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
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedMultiple([])
    } else {
      // ✅ QUIZ COMPLETO - Disparar evento e navegar
      setShowFinalLoading(true)
      
      // 🎯 TRACKING - Quiz Completed
      if (typeof window !== "undefined" && window.trackEvent) {
        window.trackEvent('ViewContent', {
          content_name: 'Quiz Completed',
          content_category: 'quiz_completion',
          total_steps: quizSteps.length,
          value: 19.90,
          currency: 'BRL'
        });
        console.log("✅ Quiz Completed - ViewContent disparado");
      }
      
      setTimeout(() => {
        navigateWithUTMs("/results")
      }, 3000)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

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
            <p className="text-sm text-gray-500">Analisando suas 39 respostas para criar seu protocolo único de jejum intermitente...</p>

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
              Etapa {currentStep + 1} de {quizSteps.length}
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

          {/* Social Proof */}
          {currentQuizStep.socialProof && (
            <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
              <div className="text-center">
                {currentQuizStep.socialProof.mainImage && (
                  <img
                    src={currentQuizStep.socialProof.mainImage || "/placeholder.svg"}
                    alt="Prova social principal"
                    className="w-full h-auto object-contain rounded-lg mb-3"
                  />
                )}
                <p className="text-sm text-gray-700 italic mt-2">{currentQuizStep.socialProof.text}</p>
                {currentQuizStep.socialProof.secondaryImages &&
                  currentQuizStep.socialProof.secondaryImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="relative w-full mt-4"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <img
                        src={imgSrc || "/placeholder.svg"}
                        alt={`Prova social secundária ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Render different question types */}
          {currentQuizStep.type === "single-choice" && (
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

          {currentQuizStep.type === "multiple-choice" && (
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
                Dados coletados: {currentStep + 1}/{quizSteps.length}
              </span>
            </p>
          </div>
        )}

        {/* Social proof testimonial */}
        {currentStep === Math.floor(quizSteps.length / 2) && (
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
  )
}
