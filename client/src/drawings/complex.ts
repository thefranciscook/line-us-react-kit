import { moveTo, lineTo, dot, finish } from '../lib/drawingCommands'

export const complex = () => {


    const centerX = 1200
    const centerY = 0
    const innerRadius = 100
    const outerRadius = 350
    const linkRadius = 200
    const mainLines = 30
    const linkLines = 40
    const rays = 50
    
    for (let i = 0; i < mainLines; i++) {
      const angle = (i * Math.PI * 2) / mainLines
      const x = centerX + innerRadius * Math.cos(angle)
      const y = centerY + innerRadius * Math.sin(angle)
      moveTo(centerX, centerY)
      lineTo(x, y)
    }
    
    for (let j = 0; j < linkLines; j++) {
      const angle = (j * Math.PI * 2) / linkLines
      const x = centerX + linkRadius * Math.cos(angle)
      const y = centerY + linkRadius * Math.sin(angle)
      const xOuter = centerX + outerRadius * Math.cos(angle)
      const yOuter = centerY + outerRadius * Math.sin(angle)
      moveTo(x, y)
      lineTo(xOuter, yOuter)
    }
    
    const startX = 650
    const startY = 800
    const endX = 1750
    const spacing = 20
    
    for (let k = 0; k < rays; k++) {
      moveTo(startX, startY - k * spacing)
      lineTo(endX, startY - k * spacing)
    }
    
    finish()


}
