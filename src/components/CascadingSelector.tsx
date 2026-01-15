import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, X, Copy, Check } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface HierarchyData {
  [key: string]: {
    [key: string]: string[]
  }
}

const hierarchyData: HierarchyData = {
  "Technology": {
    "Software": ["Web Development", "Mobile Apps", "Desktop Applications", "DevOps Tools", "Database Systems"],
    "Hardware": ["Computers", "Networking Equipment", "Storage Devices", "Peripherals", "Servers"],
    "Cloud Services": ["Infrastructure (IaaS)", "Platform (PaaS)", "Software (SaaS)", "Serverless", "Container Services"]
  },
  "Business": {
    "Operations": ["Supply Chain", "Logistics", "Quality Control", "Process Management", "Facilities"],
    "Finance": ["Accounting", "Budgeting", "Investments", "Risk Management", "Auditing"],
    "Human Resources": ["Recruitment", "Training", "Benefits", "Performance", "Compensation"]
  },
  "Marketing": {
    "Digital": ["Social Media", "Email Campaigns", "SEO/SEM", "Content Marketing", "Analytics"],
    "Traditional": ["Print Advertising", "TV/Radio", "Direct Mail", "Events", "Outdoor"],
    "Brand": ["Brand Strategy", "Visual Identity", "Messaging", "Public Relations", "Partnerships"]
  },
  "Sales": {
    "Direct Sales": ["B2B Sales", "B2C Sales", "Enterprise", "Inside Sales", "Field Sales"],
    "Channel Sales": ["Resellers", "Distributors", "Affiliates", "Partnerships", "OEM"],
    "Customer Success": ["Onboarding", "Support", "Retention", "Upselling", "Renewals"]
  }
}

export function CascadingSelector() {
  const [level1, setLevel1] = useState<string>("")
  const [level2, setLevel2] = useState<string>("")
  const [level3, setLevel3] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const level2Options = level1 ? Object.keys(hierarchyData[level1] || {}) : []
  const level3Options = level1 && level2 ? hierarchyData[level1]?.[level2] || [] : []

  const combinedValue = level1 && level2 && level3 
    ? `${level1} / ${level2} / ${level3}` 
    : level1 && level2 
    ? `${level1} / ${level2} / ...`
    : level1
    ? `${level1} / ...`
    : ""

  useEffect(() => {
    setLevel2("")
    setLevel3("")
  }, [level1])

  useEffect(() => {
    setLevel3("")
  }, [level2])

  const handleReset = () => {
    setLevel1("")
    setLevel2("")
    setLevel3("")
    toast.success("Selection cleared")
  }

  const handleCopy = async () => {
    if (combinedValue && level1 && level2 && level3) {
      await navigator.clipboard.writeText(combinedValue)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const hasSelections = level1 || level2 || level3

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[32px] font-semibold tracking-tight text-foreground mb-2">
            Cascading Selector Control
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Select from three hierarchical levels to build a combined value. Each selection unlocks the next level.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-6 md:p-8 shadow-lg border-border/50">
            <div className="space-y-6">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="level1" className="text-sm font-medium">
                    Level 1 - Primary Category
                  </Label>
                  <Select value={level1} onValueChange={setLevel1}>
                    <SelectTrigger 
                      id="level1" 
                      className="h-11 transition-all duration-200 hover:border-accent focus:ring-accent"
                    >
                      <SelectValue placeholder="Select primary category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(hierarchyData).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <AnimatePresence>
                  {level1 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <ArrowRight size={20} className="text-accent" weight="bold" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="level2" className="text-sm font-medium">
                          Level 2 - Sub-Category
                        </Label>
                        <Select value={level2} onValueChange={setLevel2} disabled={!level1}>
                          <SelectTrigger 
                            id="level2" 
                            className="h-11 transition-all duration-200 hover:border-accent focus:ring-accent disabled:opacity-50"
                          >
                            <SelectValue placeholder="Select sub-category..." />
                          </SelectTrigger>
                          <SelectContent>
                            {level2Options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {level2 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <ArrowRight size={20} className="text-accent" weight="bold" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="level3" className="text-sm font-medium">
                          Level 3 - Specific Item
                        </Label>
                        <Select value={level3} onValueChange={setLevel3} disabled={!level2}>
                          <SelectTrigger 
                            id="level3" 
                            className="h-11 transition-all duration-200 hover:border-accent focus:ring-accent disabled:opacity-50"
                          >
                            <SelectValue placeholder="Select specific item..." />
                          </SelectTrigger>
                          <SelectContent>
                            {level3Options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Combined Value</Label>
                  <AnimatePresence>
                    {level1 && level2 && level3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                          Complete
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <Input
                    value={combinedValue}
                    readOnly
                    placeholder="Select all three levels to generate value..."
                    className="h-12 pr-12 font-medium tracking-wide bg-muted/50 border-2 transition-all duration-150"
                  />
                  <AnimatePresence>
                    {level1 && level2 && level3 && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleCopy}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-accent/10 transition-colors duration-100"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check size={18} className="text-green-600" weight="bold" />
                        ) : (
                          <Copy size={18} className="text-muted-foreground hover:text-accent transition-colors" />
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {level1 && !level2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground"
                  >
                    Continue by selecting a sub-category
                  </motion.p>
                )}

                {level2 && !level3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground"
                  >
                    Complete by selecting a specific item
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleReset}
                  disabled={!hasSelections}
                  variant="destructive"
                  className="transition-all duration-150 disabled:opacity-40"
                >
                  <X size={16} weight="bold" className="mr-2" />
                  Reset Selection
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="p-6 bg-secondary/30 border-border/30">
            <h2 className="text-sm font-medium mb-3 text-foreground">Current Selections</h2>
            <div className="flex flex-wrap gap-2">
              {level1 && (
                <Badge variant="outline" className="bg-white border-primary/30">
                  <span className="text-xs text-muted-foreground mr-1">L1:</span>
                  {level1}
                </Badge>
              )}
              {level2 && (
                <Badge variant="outline" className="bg-white border-primary/30">
                  <span className="text-xs text-muted-foreground mr-1">L2:</span>
                  {level2}
                </Badge>
              )}
              {level3 && (
                <Badge variant="outline" className="bg-white border-primary/30">
                  <span className="text-xs text-muted-foreground mr-1">L3:</span>
                  {level3}
                </Badge>
              )}
              {!hasSelections && (
                <p className="text-sm text-muted-foreground">No selections made yet</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
