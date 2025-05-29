import katex from 'katex'

function markdownKatex(md, options = {}) 
{
  // Block math: $$ dan raw LaTeX
  md.block.ruler.before('paragraph', 'math_block', (state, start, end, silent) => 
  {
    const max = state.eMarks[start]
    const pos = state.bMarks[start] + state.tShift[start]
    const line = state.src.slice(pos, max).trim()
    
    let content = ''
    let nextLine = start
    let isBlock = false
    
    // $$ block
    if (line.startsWith('$$')) 
    {
      isBlock = true
      content = line.slice(2)
      
      if (content.endsWith('$$')) 
      { content = content.slice(0, -2) } 
      else 
      {
        while (++nextLine < end) 
        {
          const nextMax = state.eMarks[nextLine]
          const nextPos = state.bMarks[nextLine] + state.tShift[nextLine]
          const nextContent = state.src.slice(nextPos, nextMax).trim()
          
          if (nextContent.endsWith('$$')) 
          {
            content += '\n' + nextContent.slice(0, -2)
            break
          }
          content += '\n' + nextContent
        }
      }
    }
    // Raw LaTeX (starts with \)
    else if (line.match(/^\\[a-zA-Z]/)) 
    {
      isBlock = true
      content = line
      
      while (++nextLine < end) 
      {
        const nextMax = state.eMarks[nextLine]
        const nextPos = state.bMarks[nextLine] + state.tShift[nextLine]
        const nextContent = state.src.slice(nextPos, nextMax).trim()
        
        if (!nextContent || (!nextContent.includes('\\') 
         && !nextContent.match(/[{}^_=\-+*/()\[\],]/))) 
        { break }
        
        content += '\n' + nextContent
      }
    }
    
    if (isBlock && !silent) 
    {
      const token = state.push('math_block', 'div', 0)
      token.content = content.trim()
    }
    
    if (isBlock) 
    {
      state.line = nextLine + 1
      return true
    }
    
    return false
  })
  
  // Inline math: $...$
  md.inline.ruler.after('escape', 'math_inline', (state, silent) => 
  {
    if (state.src[state.pos] !== '$') return false
    
    const start = state.pos + 1
    const end = state.src.indexOf('$', start)
    if (end === -1) return false
    
    if (!silent) 
    {
      const token = state.push('math_inline', '', 0)
      token.content = state.src.slice(start, end)
    }
    
    state.pos = end + 1
    return true
  })
  
  // Renderers
  md.renderer.rules.math_block = (tokens, idx) => 
  {
    try 
    {
      const content = tokens[idx].content
      const rendered = katex.renderToString(content, { displayMode: true })
      return `
      <VPLatex code="${encodeURIComponent(content)}" class="language-latex">
        <div class="math-display">${rendered}</div>
      </VPLatex>`

    } catch (e) {   
      return `<pre class="math-error">${tokens[idx].content}\n${e.message}</pre>`
    }
  }
  
  md.renderer.rules.math_inline = (tokens, idx) => 
  {
    try {
      return katex.renderToString(tokens[idx].content, { displayMode: false })
    } catch (e) {
      return `<code class="math-error">${tokens[idx].content}\n${e.message}</code>`
    }
  }
}

export { markdownKatex }