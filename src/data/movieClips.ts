import type { MovieClip, MovieSentence } from '../types'

/* ========== 时间戳计算：根据字数估算时长 ========== */
function calcDuration(words: number, pauseSec = 0.35): number {
  return words / 2.5 + pauseSec
}

function buildSentences(
  lines: { english: string; chinese: string }[],
): MovieSentence[] {
  let t = 0
  return lines.map(({ english, chinese }) => {
    const words = english.split(/\s+/).length
    const end = t + calcDuration(words)
    const s: MovieSentence = { english, chinese, startTime: t, endTime: end }
    t = end
    return s
  })
}

/* ============================================ */
/*   Clip 1: The Pursuit of Happyness          */
/* ============================================ */
const CLIP_1: MovieClip = {
  id: 'pursuit-happyness',
  title: 'The Pursuit of Happyness',
  source: '当幸福来敲门',
  sentences: buildSentences([
    { english: "Hey, don't ever let somebody tell you you can't do something.", chinese: '嘿，永远不要让任何人告诉你你做不到某件事。' },
    { english: 'Not even me.', chinese: '连我也不行。' },
    { english: "You got a dream, you gotta protect it.", chinese: '你有梦想，就得去保护它。' },
    { english: "People can't do something themselves, they wanna tell you you can't do it.", chinese: '自己做不到的人，就想告诉你你也做不到。' },
    { english: 'If you want something, go get it.', chinese: '如果你想要什么，就去争取。' },
    { english: 'Period.', chinese: '就这样。' },
    { english: "What would you say if a guy walked in for an interview with no shirt on, and I hired him?", chinese: '如果有个人没穿衬衫就来面试，我还录用了他，你会怎么说？' },
    { english: 'Then he must have had on some really nice pants.', chinese: '那他一定穿了条很不错的裤子。' },
    { english: "I'm the type of person, if you ask me a question and I don't know the answer, I'm gonna tell you that I don't know.", chinese: '我是那种人，如果你问我一个问题，我不知道答案，我会告诉你我不知道。' },
    { english: 'But I bet you what, I know how to find the answer, and I will find the answer.', chinese: '但我保证，我知道怎么找到答案，而且我一定会找到答案。' },
    { english: 'Is that fair enough?', chinese: '这样公平吗？' },
    { english: "Christopher, I'm so proud of you.", chinese: '克里斯托弗，我真为你骄傲。' },
    { english: "This is a part of my life, this is called happiness.", chinese: '这是我人生的一部分，这叫做幸福。' },
    { english: "It was right then that I started to think about Thomas Jefferson and the Declaration of Independence.", chinese: '就在那一刻，我开始思考托马斯·杰斐逊和《独立宣言》。' },
    { english: "They talk about the pursuit of happiness.", chinese: '他们谈到了追求幸福。' },
    { english: "Maybe happiness is something that we can only pursue, and maybe we can actually have it.", chinese: '也许幸福是我们只能追求的东西，也许我们真的能拥有它。' },
  ]),
  duration: 0, // will compute below
  vocab: {
    pursue: 'v. 追求，追赶',
    pursuit: 'n. 追求；追赶',
    protect: 'v. 保护',
    dream: 'n./v. 梦想；做梦',
    interview: 'n./v. 面试；采访',
    hire: 'v. 雇用',
    type: 'n. 类型，种类',
    fair: 'adj. 公平的；晴朗的',
    proud: 'adj. 骄傲的，自豪的',
    declaration: 'n. 宣言，声明',
    independence: 'n. 独立',
    happiness: 'n. 幸福，快乐',
    period: 'n. 时期；句号',
  },
}

/* ============================================ */
/*   Clip 2: Forrest Gump                      */
/* ============================================ */
const CLIP_2: MovieClip = {
  id: 'forrest-gump',
  title: 'Forrest Gump',
  source: '阿甘正传',
  sentences: buildSentences([
    { english: "Life was like a box of chocolates.", chinese: '人生就像一盒巧克力。' },
    { english: "You never know what you're gonna get.", chinese: '你永远不知道下一颗是什么味道。' },
    { english: "My mama always said, life was like a box of chocolates.", chinese: '我妈妈总是说，人生就像一盒巧克力。' },
    { english: "You never know what you're gonna get.", chinese: '你永远不知道下一颗是什么味道。' },
    { english: "That's the only thing I remember my mama saying that I really agree with.", chinese: '这是唯一一句我记得妈妈说过并且我真心认同的话。' },
    { english: "Now, why don't you just sit back and relax?", chinese: '现在，你为什么不坐下来放松一下呢？' },
    { english: "She was always making sure I understood what she was trying to teach me.", chinese: '她总是确保我理解她想要教我的东西。' },
    { english: "She said, you have to do the best with what God gave you.", chinese: '她说，你必须用上帝给予你的做到最好。' },
    { english: "You're no different than anybody else is.", chinese: '你和别人没有什么不同。' },
    { english: "Did you hear what I said, Forrest?", chinese: '你听到我说的了吗，阿甘？' },
    { english: "You're the same as everybody else.", chinese: '你和所有人都一样。' },
    { english: "Your boy is different, Jenny.", chinese: '你的孩子不一样，珍妮。' },
    { english: "But he's going to be just fine.", chinese: '但他会没事的。' },
    { english: "I happen to believe you make your own destiny.", chinese: '我恰好相信你创造自己的命运。' },
    { english: "You have to do the best with what God gave you.", chinese: '你必须用上帝给予你的做到最好。' },
    { english: "Run, Forrest, run!", chinese: '跑啊，阿甘，跑！' },
    { english: "I bet I could run across the whole country.", chinese: '我打赌我可以跑遍整个国家。' },
  ]),
  duration: 0,
  vocab: {
    chocolate: 'n. 巧克力',
    agree: 'v. 同意，赞同',
    relax: 'v. 放松，休息',
    teach: 'v. 教授，教导',
    different: 'adj. 不同的，有差异的',
    same: 'adj. 相同的，同样的',
    destiny: 'n. 命运，天命',
    happen: 'v. 发生；碰巧',
    believe: 'v. 相信，认为',
    across: 'prep. 横穿，跨越',
    whole: 'adj. 全部的，整个的',
    bet: 'v. 打赌；确信',
    remember: 'v. 记住，回忆',
    understand: 'v. 理解，明白',
  },
}

/* ============================================ */
/*   Clip 3: The Lion King                     */
/* ============================================ */
const CLIP_3: MovieClip = {
  id: 'lion-king',
  title: 'The Lion King',
  source: '狮子王',
  sentences: buildSentences([
    { english: "Everything the light touches is our kingdom.", chinese: '阳光所及之处都是我们的王国。' },
    { english: "There's more to being a king than getting your way all the time.", chinese: '当国王不仅仅是随心所欲。' },
    { english: "Being a king means understanding your responsibility.", chinese: '当国王意味着理解你的责任。' },
    { english: "Look at the stars, the great kings of the past look down on us.", chinese: '看那些星星，过去的伟大国王在注视着我们。' },
    { english: "Remember who you are.", chinese: '记住你是谁。' },
    { english: "You are my son and the one true king.", chinese: '你是我的儿子，是真正的国王。' },
    { english: "I'm only brave when I have to be.", chinese: '我只在必要时才会勇敢。' },
    { english: "Being brave doesn't mean you go looking for trouble.", chinese: '勇敢并不意味着你去自找麻烦。' },
    { english: "Hakuna Matata, it means no worries.", chinese: '哈库拉玛塔塔，意思是无忧无虑。' },
    { english: "What I really wanted was to be like you.", chinese: '我真正想要的是成为你那样的人。' },
    { english: "I just didn't know how to tell you that.", chinese: '我只是不知道怎么告诉你。' },
    { english: "We are all connected in the great circle of life.", chinese: '在生命的伟大循环中，我们都是相连的。' },
    { english: "When we die, our bodies become the grass, and the antelope eat the grass.", chinese: '当我们死去，身体化作青草，羚羊以草为食。' },
    { english: "So we are all connected in this great circle of life.", chinese: '所以在这个伟大的生命循环中，我们紧密相连。' },
    { english: "The past can hurt, but the way I see it, you can either run from it or learn from it.", chinese: '往事会伤人，但在我看来，你可以选择逃避，或者从中学习。' },
    { english: "He lives in you.", chinese: '他活在你心中。' },
    { english: "It's time to take your place in the circle of life.", chinese: '是时候在生命的循环中找到你的位置了。' },
  ]),
  duration: 0,
  vocab: {
    kingdom: 'n. 王国，国度',
    touch: 'v. 触摸，接触',
    responsibility: 'n. 责任，职责',
    star: 'n. 星星，恒星',
    brave: 'adj. 勇敢的',
    trouble: 'n. 麻烦，困难',
    worry: 'n./v. 担忧，烦恼',
    connect: 'v. 连接，联系',
    circle: 'n. 圆；循环，圈子',
    antelope: 'n. 羚羊',
    hurt: 'v. 伤害，疼痛',
    either: 'adv. 要么，也',
    escape: 'v. 逃跑，逃避',
    learn: 'v. 学习，学会',
  },
}

/* ========== 计算总时长 ========== */
CLIP_1.duration = CLIP_1.sentences[CLIP_1.sentences.length - 1].endTime
CLIP_2.duration = CLIP_2.sentences[CLIP_2.sentences.length - 1].endTime
CLIP_3.duration = CLIP_3.sentences[CLIP_3.sentences.length - 1].endTime

export const MOVIE_CLIPS: MovieClip[] = [CLIP_1, CLIP_2, CLIP_3]

export function pickRandomClip(): MovieClip {
  return MOVIE_CLIPS[Math.floor(Math.random() * MOVIE_CLIPS.length)]
}
