const fs = require('fs')
let content = fs.readFileSync('src/data/wordBank.ts', 'utf8')

const collocations = [
  ['admire', ["admire sb. for 钦佩某人", "admire the view 欣赏美景"]],
  ['adopt', ["adopt a policy 采用政策", "adopt a child 收养孩子"]],
  ['advance', ["in advance 提前", "advance technology 先进技术"]],
  ['advantage', ["take advantage of 利用", "have an advantage 有优势"]],
  ['advertise', ["advertise a product 为产品做广告", "advertise for 招聘"]],
  ['affect', ["affect the result 影响结果", "be affected by 受到…影响"]],
  ['afford', ["afford to do 负担得起做", "can't afford 负担不起"]],
  ['aggressive', ["aggressive behavior 攻击性行为", "aggressive marketing 积极营销"]],
  ['allocate', ["allocate resources 分配资源", "allocate funds 拨出资金"]],
  ['alternative', ["alternative option 替代选择", "have no alternative 别无选择"]],
  ['ambition', ["achieve ambition 实现抱负", "have the ambition 有雄心"]],
  ['analyze', ["analyze data 分析数据", "analyze the situation 分析情况"]],
  ['appreciate', ["appreciate help 感激帮助", "appreciate art 欣赏艺术"]],
  ['approach', ["a new approach 新方法", "approach the problem 处理问题"]],
  ['appropriate', ["appropriate measure 适当措施", "appropriate time 适当时机"]],
  ['approve', ["approve a plan 批准计划", "approve of 赞成"]],
  ['arise', ["arise from 由…引起", "problems arise 出现问题"]],
  ['arrange', ["arrange a meeting 安排会议", "arrange for 为…安排"]],
  ['artificial', ["artificial intelligence 人工智能", "artificial flowers 假花"]],
  ['assemble', ["assemble a team 组建团队", "assemble furniture 组装家具"]],
  ['assess', ["assess the situation 评估形势", "assess performance 评估表现"]],
  ['assign', ["assign homework 布置作业", "assign to 指派到"]],
  ['absurd', ["absurd idea 荒谬的想法", "absurd behavior 荒唐的行为"]],
  ['abundance', ["an abundance of 大量的", "abundance of resources 资源丰富"]],
  ['accumulate', ["accumulate wealth 积累财富", "accumulate experience 积累经验"]],
  ['acute', ["acute pain 剧痛", "acute sense 敏锐的感觉"]],
  ['adhere', ["adhere to 坚持/遵守", "adhere to rules 遵守规则"]],
  ['adverse', ["adverse effect 不利影响", "adverse conditions 不利条件"]],
  ['advocate', ["advocate for 提倡", "strong advocate 坚定倡导者"]],
  ['aesthetic', ["aesthetic value 美学价值", "aesthetic sense 审美感"]],
  ['alleviate', ["alleviate pain 缓解疼痛", "alleviate poverty 缓解贫困"]],
  ['alternate', ["alternate between 交替", "alternate route 替代路线"]],
]

for (const [word, colls] of collocations) {
  // Find:  ],\n    '🎬...
  // Insert before:    ['coll1', 'coll2'],\n
  const wordIdx = content.indexOf(`  w('${word}',`)
  if (wordIdx === -1) {
    console.log(`Word not found: ${word}`)
    continue
  }
  // Find the last '],' after this word and before the next word
  const rest = content.slice(wordIdx)
  // Find the next closing pattern: ],\n    '
  const closePattern = rest.search(/\],\n    '/)
  if (closePattern === -1) {
    console.log(`Pattern not found for: ${word}`)
    continue
  }
  const insertAt = wordIdx + closePattern + 3 // after '],\n'
  const collLine = `    [${colls.map(c => `'${c}'`).join(', ')}],\n`
  content = content.slice(0, insertAt) + collLine + content.slice(insertAt)
  console.log(`OK: ${word}`)
}

fs.writeFileSync('src/data/wordBank.ts', content)
console.log('All done')
